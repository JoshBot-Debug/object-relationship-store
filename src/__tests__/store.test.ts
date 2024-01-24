import { posts } from "../data";
import { createRelationalObject, createStore } from "../lib/index";
import v8 from "v8";

function getObjectMemoryUsageInMB(object: any) {
  const sizeInBytes = v8.serialize(object).byteLength;
  return sizeInBytes / (1024 * 1024);
}

const user = createRelationalObject("user");
const image = createRelationalObject("image");
const thumbnail = createRelationalObject("thumbnail");
const post = createRelationalObject("post");

image.hasMany(thumbnail, "thumbnails");
user.hasOne(image, "profileImage");
post.hasMany(image, "images");
post.hasOne(user);

const store = createStore({
  relationalCreators: [user, post, image, thumbnail],
  identifier: {
    user: (o) => !!o.username,
    image: (o) => !!o.aspectRatio,
    thumbnail: (o) => !!o.uri,
    post: (o) => !!o.caption,
  },
});

store.mutate(posts);

test("Memory should not increase when the same object is passed twice", () => {
  store.mutate(posts);

  const memoryBefore = getObjectMemoryUsageInMB(store.getState());

  store.mutate([...posts, ...posts, ...posts, ...posts, ...posts, ...posts]);

  const memoryAfter = getObjectMemoryUsageInMB(store.getState());

  expect(memoryBefore).toBe(memoryAfter);
});

test("Memory should not increase when we add more relationships", () => {
  const store1 = createStore({
    relationalCreators: [user, post, image, thumbnail],
    identifier: {
      user: (o) => !!o.username,
      image: (o) => !!o.aspectRatio,
      thumbnail: (o) => !!o.uri,
      post: (o) => !!o.caption,
    },
  });

  store1.mutate(posts);

  const memoryStore1 = getObjectMemoryUsageInMB(store1.getState());

  user.hasMany(post, "posts");
  image.hasOne(user, "user");

  const store2 = createStore({
    relationalCreators: [user, post, image, thumbnail],
    identifier: {
      user: (o) => !!o.username,
      image: (o) => !!o.aspectRatio,
      thumbnail: (o) => !!o.uri,
      post: (o) => !!o.caption,
    },
  });

  store2.mutate(posts);

  const memoryStore2 = getObjectMemoryUsageInMB(store2.getState());

  // Increased very slightly because of an additional field and a few extra references
  expect(memoryStore2).toBe(memoryStore1 + 0.0000476837158203125);
});

test("upsertWhere", () => {
  const store1 = createStore({
    relationalCreators: [user, post, image, thumbnail],
    identifier: {
      user: (o) => !!o.username,
      image: (o) => !!o.aspectRatio,
      thumbnail: (o) => !!o.uri,
      post: (o) => !!o.caption,
    },
  });

  store1.mutate(posts);

  store1.mutateWhere<any, any>(
    {
      from: "image",
      fields: ["id", "thumbnails"],
      where: { id: 54 },
      join: [{ on: "thumbnails", fields: ["id", "uri"] }],
    },
    (current) => {
      return { id: 54, thumbnails: [206] };
    }
  );

  expect(store1.getReferences().thumbnail[207]).toBe(undefined);
  expect(store1.getState().image[54].thumbnails.length).toBe(1);
});

test("upsertByPk", () => {
  const store1 = createStore({
    relationalCreators: [user, post, image, thumbnail],
    identifier: {
      user: (o) => !!o.username,
      image: (o) => !!o.aspectRatio,
      thumbnail: (o) => !!o.uri,
      post: (o) => !!o.caption,
    },
  });

  store1.mutate(posts);

  store1.mutate({
    id: 10,
    user: 1,
    __identify__: "post",
  });

  expect(store1.getState().post[10].user).toBe(1);
});

test("#A references #B - #B reference is removed in #A", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");

  a.hasOne(b, "b");

  const store = createStore({
    relationalCreators: [a, b],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
    },
  });

  const _b = {
    id: 1,
    isB: true,
  };

  const _a = {
    id: 1,
    isA: true,
    b: _b,
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 1 } },
    b: { "1": { id: 1, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({ b: { "1": ["a.1.b"] } });

  // #B reference is removed in #A
  store.mutate({
    id: 1,
    isA: true,
    b: null,
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true } },
    b: { "1": { id: 1, isB: true } },
  });
  expect(store.getReferences()).toStrictEqual({ b: {} });
});

test("#A references #B - #B is deleted.", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");

  a.hasOne(b, "b");

  const store = createStore({
    relationalCreators: [a, b],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
    },
  });

  const _b = {
    id: 1,
    isB: true,
  };

  const _a = {
    id: 1,
    isA: true,
    b: _b,
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 1 } },
    b: { "1": { id: 1, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({ b: { "1": ["a.1.b"] } });

  store.mutate({
    id: 1,
    isB: true,
    __destroy__: true,
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true } },
    b: {},
  });
  expect(store.getReferences()).toStrictEqual({ b: {} });
});

test("#A references #B - #A is deleted.", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");

  a.hasOne(b, "b");

  const store = createStore({
    relationalCreators: [a, b],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
    },
  });

  const _b = {
    id: 1,
    isB: true,
  };

  const _a = {
    id: 1,
    isA: true,
    b: _b,
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 1 } },
    b: { "1": { id: 1, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({ b: { "1": ["a.1.b"] } });

  store.mutate({
    id: 1,
    isA: true,
    __destroy__: true,
  });

  expect(store.getState()).toStrictEqual({ a: {}, b: {} });
  expect(store.getReferences()).toStrictEqual({ b: {} });
});

test("#A and #B references each other - #A ref to #B is removed from #B", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");

  b.hasOne(a);
  a.hasOne(b);

  const store = createStore({
    relationalCreators: [a, b],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
    },
  });

  const _a = {
    id: 1,
    isA: true,
    b: {
      id: 1,
      isB: true,
    },
  };

  const _b = {
    id: 1,
    isB: true,
    a: {
      id: 1,
      isA: true,
    },
  };

  store.mutate([_a, _b]);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 1 } },
    b: { "1": { id: 1, isB: true, a: 1 } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "1": ["a.1.b"] },
    a: { "1": ["b.1.a"] },
  });

  store.mutate({
    id: 1,
    isA: true,
    b: null,
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true } },
    b: { "1": { id: 1, isB: true, a: 1 } },
  });
  expect(store.getReferences()).toStrictEqual({ b: {}, a: { "1": ["b.1.a"] } });
});

test("#A and #B references each other - #B ref to #A is removed from #A", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");

  b.hasOne(a);
  a.hasOne(b);

  const store = createStore({
    relationalCreators: [a, b],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
    },
  });

  const _a = {
    id: 1,
    isA: true,
    b: {
      id: 1,
      isB: true,
    },
  };

  const _b = {
    id: 1,
    isB: true,
    a: {
      id: 1,
      isA: true,
    },
  };

  store.mutate([_a, _b]);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 1 } },
    b: { "1": { id: 1, isB: true, a: 1 } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "1": ["a.1.b"] },
    a: { "1": ["b.1.a"] },
  });

  store.mutate({
    id: 1,
    isB: true,
    a: null,
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 1 } },
    b: { "1": { id: 1, isB: true } },
  });
  expect(store.getReferences()).toStrictEqual({ b: { "1": ["a.1.b"] }, a: {} });
});

test("#A and #B references each other - #A is deleted", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");

  b.hasOne(a);
  a.hasOne(b);

  const store = createStore({
    relationalCreators: [a, b],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
    },
  });

  const _a = {
    id: 1,
    isA: true,
    b: {
      id: 1,
      isB: true,
    },
  };

  const _b = {
    id: 1,
    isB: true,
    a: {
      id: 1,
      isA: true,
    },
  };

  store.mutate([_a, _b]);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 1 } },
    b: { "1": { id: 1, isB: true, a: 1 } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "1": ["a.1.b"] },
    a: { "1": ["b.1.a"] },
  });

  store.mutate({
    id: 1,
    isA: true,
    __destroy__: true,
  });

  expect(store.getState()).toStrictEqual({
    a: {},
    b: {},
  });
  expect(store.getReferences()).toStrictEqual({ b: {}, a: {} });
});

test("#A and #B references each other - #A, #B is deleted", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");

  b.hasOne(a);
  a.hasOne(b);

  const store = createStore({
    relationalCreators: [a, b],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
    },
  });

  const _a = {
    id: 1,
    isA: true,
    b: {
      id: 1,
      isB: true,
    },
  };

  const _b = {
    id: 1,
    isB: true,
    a: {
      id: 1,
      isA: true,
    },
  };

  store.mutate([_a, _b]);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 1 } },
    b: { "1": { id: 1, isB: true, a: 1 } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "1": ["a.1.b"] },
    a: { "1": ["b.1.a"] },
  });

  store.mutate([{
    id: 1,
    isA: true,
    __destroy__: true,
  }, {
    id: 1,
    isB: true,
    __destroy__: true,
  }]);

  expect(store.getState()).toStrictEqual({
    a: {},
    b: {},
  });
  expect(store.getReferences()).toStrictEqual({ b: {}, a: {} });
});

test("#A references many #B - #B1 is removed from #A", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");

  a.hasMany(b, "bs");

  const store = createStore({
    relationalCreators: [a, b],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
    },
  });

  const _b1 = {
    id: 1,
    isB: true,
  };

  const _b2 = {
    id: 2,
    isB: true,
  };

  const _a = {
    id: 1,
    isA: true,
    bs: [_b1, _b2],
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [1, 2] } },
    b: { "1": { id: 1, isB: true }, "2": { id: 2, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "1": ["a.1.bs"], "2": ["a.1.bs"] },
  });

  store.mutate({
    id: 1,
    isA: true,
    bs: [1],
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [1] } },
    b: { "1": { id: 1, isB: true }, "2": { id: 2, isB: true } },
  });
  expect(store.getReferences()).toStrictEqual({ b: { "1": ["a.1.bs"] } });
});

test("#A references many #B - #B1 is object is not received", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");

  a.hasMany(b, "bs");

  const store = createStore({
    relationalCreators: [a, b],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
    },
  });

  const _b1 = {
    id: 1,
    isB: true,
  };

  const _b2 = {
    id: 2,
    isB: true,
  };

  const _a = {
    id: 1,
    isA: true,
    bs: [_b1, _b2],
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [1, 2] } },
    b: { "1": { id: 1, isB: true }, "2": { id: 2, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "1": ["a.1.bs"], "2": ["a.1.bs"] },
  });

  store.mutate({
    id: 1,
    isA: true,
    bs: [_b1],
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [1, 2] } },
    b: { "1": { id: 1, isB: true }, "2": { id: 2, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "1": ["a.1.bs"], "2": ["a.1.bs"] },
  });
});

test("#A references many #B - #B1, #B2 is removed from #A - by passing null", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");

  a.hasMany(b, "bs");

  const store = createStore({
    relationalCreators: [a, b],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
    },
  });

  const _b1 = {
    id: 1,
    isB: true,
  };

  const _b2 = {
    id: 2,
    isB: true,
  };

  const _a = {
    id: 1,
    isA: true,
    bs: [_b1, _b2],
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [1, 2] } },
    b: { "1": { id: 1, isB: true }, "2": { id: 2, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "1": ["a.1.bs"], "2": ["a.1.bs"] },
  });

  store.mutate({
    id: 1,
    isA: true,
    bs: null,
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true } },
    b: { "1": { id: 1, isB: true }, "2": { id: 2, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: {},
  });
});

test("#A references many #B - #B1, #B2 is removed from #A - by passing []", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");

  a.hasMany(b, "bs");

  const store = createStore({
    relationalCreators: [a, b],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
    },
  });

  const _b1 = {
    id: 1,
    isB: true,
  };

  const _b2 = {
    id: 2,
    isB: true,
  };

  const _a = {
    id: 1,
    isA: true,
    bs: [_b1, _b2],
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [1, 2] } },
    b: { "1": { id: 1, isB: true }, "2": { id: 2, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "1": ["a.1.bs"], "2": ["a.1.bs"] },
  });

  store.mutate({
    id: 1,
    isA: true,
    bs: [],
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [] } },
    b: { "1": { id: 1, isB: true }, "2": { id: 2, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: {},
  });
});

test("#A references many #B - #B1 is deleted", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");

  a.hasMany(b, "bs");

  const store = createStore({
    relationalCreators: [a, b],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
    },
  });

  const _b1 = {
    id: 1,
    isB: true,
  };

  const _b2 = {
    id: 2,
    isB: true,
  };

  const _a = {
    id: 1,
    isA: true,
    bs: [_b1, _b2],
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [1, 2] } },
    b: { "1": { id: 1, isB: true }, "2": { id: 2, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "1": ["a.1.bs"], "2": ["a.1.bs"] },
  });

  store.mutate({
    id: 1,
    isB: true,
    __destroy__: true
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [2] } },
    b: { "2": { id: 2, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "2": ["a.1.bs"] },
  });
});

test("#A references many #B - #B1, #B2 is deleted", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");

  a.hasMany(b, "bs");

  const store = createStore({
    relationalCreators: [a, b],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
    },
  });

  const _b1 = {
    id: 1,
    isB: true,
  };

  const _b2 = {
    id: 2,
    isB: true,
  };

  const _a = {
    id: 1,
    isA: true,
    bs: [_b1, _b2],
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [1, 2] } },
    b: { "1": { id: 1, isB: true }, "2": { id: 2, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "1": ["a.1.bs"], "2": ["a.1.bs"] },
  });

  store.mutate({
    id: 1,
    isB: true,
    __destroy__: true
  });

  store.mutate({
    id: 2,
    isB: true,
    __destroy__: true
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true } },
    b: { },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { },
  });
});