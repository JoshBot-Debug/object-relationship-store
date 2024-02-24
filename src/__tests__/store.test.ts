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
    id: 2,
    isB: true,
  };

  const _a = {
    id: 1,
    isA: true,
    b: _b,
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({ b: { "2": ["a.1.b"] } });

  // #B reference is removed in #A
  store.mutate({
    id: 1,
    isA: true,
    b: null,
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true } },
    b: { "2": { id: 2, isB: true } },
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
    id: 2,
    isB: true,
  };

  const _a = {
    id: 1,
    isA: true,
    b: _b,
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({ b: { "2": ["a.1.b"] } });

  store.mutate({
    id: 2,
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
    id: 2,
    isB: true,
  };

  const _a = {
    id: 1,
    isA: true,
    b: _b,
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({ b: { "2": ["a.1.b"] } });

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
      id: 2,
      isB: true,
    },
  };

  const _b = {
    id: 2,
    isB: true,
    a: {
      id: 1,
      isA: true,
    },
  };

  store.mutate([_a, _b]);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true, a: 1 } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "2": ["a.1.b"] },
    a: { "1": ["b.2.a"] },
  });

  store.mutate({
    id: 1,
    isA: true,
    b: null,
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true } },
    b: { "2": { id: 2, isB: true, a: 1 } },
  });
  expect(store.getReferences()).toStrictEqual({ b: {}, a: { "1": ["b.2.a"] } });
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
      id: 2,
      isB: true,
    },
  };

  const _b = {
    id: 2,
    isB: true,
    a: {
      id: 1,
      isA: true,
    },
  };

  store.mutate([_a, _b]);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true, a: 1 } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "2": ["a.1.b"] },
    a: { "1": ["b.2.a"] },
  });

  store.mutate({
    id: 2,
    isB: true,
    a: null,
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true } },
  });
  expect(store.getReferences()).toStrictEqual({ b: { "2": ["a.1.b"] }, a: {} });
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
      id: 2,
      isB: true,
    },
  };

  const _b = {
    id: 2,
    isB: true,
    a: {
      id: 1,
      isA: true,
    },
  };

  store.mutate([_a, _b]);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true, a: 1 } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "2": ["a.1.b"] },
    a: { "1": ["b.2.a"] },
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
      id: 2,
      isB: true,
    },
  };

  const _b = {
    id: 2,
    isB: true,
    a: {
      id: 1,
      isA: true,
    },
  };

  store.mutate([_a, _b]);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true, a: 1 } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "2": ["a.1.b"] },
    a: { "1": ["b.2.a"] },
  });

  store.mutate([
    {
      id: 1,
      isA: true,
      __destroy__: true,
    },
    {
      id: 2,
      isB: true,
      __destroy__: true,
    },
  ]);

  expect(store.getState()).toStrictEqual({
    a: {},
    b: {},
  });
  expect(store.getReferences()).toStrictEqual({ b: {}, a: {} });
});

test("#A references many #B, #C references #B1 - #B1 is removed from #A", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");
  const c = createRelationalObject("c");

  c.hasOne(b);
  a.hasMany(b, "bs");

  const store = createStore({
    relationalCreators: [a, b, c],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
      c: (o) => "isC" in o,
    },
  });

  const _b1 = {
    id: 2,
    isB: true,
  };

  const _b2 = {
    id: 3,
    isB: true,
  };

  const _a = {
    id: 1,
    isA: true,
    bs: [_b1, _b2],
  };

  const _c = {
    id: 4,
    isC: true,
    b: _b2,
  };

  store.mutate([_a, _c]);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [2, 3] } },
    b: { "2": { id: 2, isB: true }, "3": { id: 3, isB: true } },
    c: { "4": { id: 4, isC: true, b: 3 } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "2": ["a.1.bs"], "3": ["a.1.bs", "c.4.b"] },
  });

  store.mutate({
    id: 1,
    isA: true,
    bs: [2],
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [2] } },
    b: { "2": { id: 2, isB: true }, "3": { id: 3, isB: true } },
    c: { "4": { id: 4, isC: true, b: 3 } },
  });
  expect(store.getReferences()).toStrictEqual({
    b: { "2": ["a.1.bs"], "3": ["c.4.b"] },
  });
});

test("#A references many #B, #C references #B1 - #B1, #B1 is removed from #A by null", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");
  const c = createRelationalObject("c");

  c.hasOne(b);
  a.hasMany(b, "bs");

  const store = createStore({
    relationalCreators: [a, b, c],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
      c: (o) => "isC" in o,
    },
  });

  const _b1 = {
    id: 2,
    isB: true,
  };

  const _b2 = {
    id: 3,
    isB: true,
  };

  const _a = {
    id: 1,
    isA: true,
    bs: [_b1, _b2],
  };

  const _c = {
    id: 4,
    isC: true,
    b: _b2,
  };

  store.mutate([_a, _c]);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [2, 3] } },
    b: { "2": { id: 2, isB: true }, "3": { id: 3, isB: true } },
    c: { "4": { id: 4, isC: true, b: 3 } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "2": ["a.1.bs"], "3": ["a.1.bs", "c.4.b"] },
  });

  store.mutate({
    id: 1,
    isA: true,
    bs: null,
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true } },
    b: { "2": { id: 2, isB: true }, "3": { id: 3, isB: true } },
    c: { "4": { id: 4, isC: true, b: 3 } },
  });
  expect(store.getReferences()).toStrictEqual({ b: { "3": ["c.4.b"] } });
});

test("#A references many #B, #C references #B1 - #B1, #B1 is removed from #A by []", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");
  const c = createRelationalObject("c");

  c.hasOne(b);
  a.hasMany(b, "bs");

  const store = createStore({
    relationalCreators: [a, b, c],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
      c: (o) => "isC" in o,
    },
  });

  const _b1 = {
    id: 2,
    isB: true,
  };

  const _b2 = {
    id: 3,
    isB: true,
  };

  const _a = {
    id: 1,
    isA: true,
    bs: [_b1, _b2],
  };

  const _c = {
    id: 4,
    isC: true,
    b: _b2,
  };

  store.mutate([_a, _c]);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [2, 3] } },
    b: { "2": { id: 2, isB: true }, "3": { id: 3, isB: true } },
    c: { "4": { id: 4, isC: true, b: 3 } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "2": ["a.1.bs"], "3": ["a.1.bs", "c.4.b"] },
  });

  store.mutate({
    id: 1,
    isA: true,
    bs: [],
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [] } },
    b: { "2": { id: 2, isB: true }, "3": { id: 3, isB: true } },
    c: { "4": { id: 4, isC: true, b: 3 } },
  });
  expect(store.getReferences()).toStrictEqual({ b: { "3": ["c.4.b"] } });
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
    id: 2,
    isB: true,
  };

  const _b2 = {
    id: 3,
    isB: true,
  };

  const _a = {
    id: 1,
    isA: true,
    bs: [_b1, _b2],
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [2, 3] } },
    b: { "2": { id: 2, isB: true }, "3": { id: 3, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "2": ["a.1.bs"], "3": ["a.1.bs"] },
  });

  store.mutate({
    id: 1,
    isA: true,
    bs: [_b1],
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [2, 3] } },
    b: { "2": { id: 2, isB: true }, "3": { id: 3, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "2": ["a.1.bs"], "3": ["a.1.bs"] },
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
    id: 2,
    isB: true,
  };

  const _b2 = {
    id: 3,
    isB: true,
  };

  const _a = {
    id: 1,
    isA: true,
    bs: [_b1, _b2],
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [2, 3] } },
    b: { "2": { id: 2, isB: true }, "3": { id: 3, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "2": ["a.1.bs"], "3": ["a.1.bs"] },
  });

  store.mutate({
    id: 1,
    isA: true,
    bs: null,
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true } },
    b: { "2": { id: 2, isB: true }, "3": { id: 3, isB: true } },
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
    id: 2,
    isB: true,
  };

  const _b2 = {
    id: 3,
    isB: true,
  };

  const _a = {
    id: 1,
    isA: true,
    bs: [_b1, _b2],
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [2, 3] } },
    b: { "2": { id: 2, isB: true }, "3": { id: 3, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "2": ["a.1.bs"], "3": ["a.1.bs"] },
  });

  store.mutate({
    id: 1,
    isA: true,
    bs: [],
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [] } },
    b: { "2": { id: 2, isB: true }, "3": { id: 3, isB: true } },
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
    id: 2,
    isB: true,
  };

  const _b2 = {
    id: 3,
    isB: true,
  };

  const _a = {
    id: 1,
    isA: true,
    bs: [_b1, _b2],
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [2, 3] } },
    b: { "2": { id: 2, isB: true }, "3": { id: 3, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "2": ["a.1.bs"], "3": ["a.1.bs"] },
  });

  store.mutate({
    id: 2,
    isB: true,
    __destroy__: true,
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [3] } },
    b: { "3": { id: 3, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "3": ["a.1.bs"] },
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
    id: 2,
    isB: true,
  };

  const _b2 = {
    id: 3,
    isB: true,
  };

  const _a = {
    id: 1,
    isA: true,
    bs: [_b1, _b2],
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, bs: [2, 3] } },
    b: { "2": { id: 2, isB: true }, "3": { id: 3, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "2": ["a.1.bs"], "3": ["a.1.bs"] },
  });

  store.mutate({
    id: 2,
    isB: true,
    __destroy__: true,
  });

  store.mutate({
    id: 3,
    isB: true,
    __destroy__: true,
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true } },
    b: {},
  });

  expect(store.getReferences()).toStrictEqual({
    b: {},
  });
});

test("#A references #B references #C - #A is deleted", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");
  const c = createRelationalObject("c");

  a.hasOne(b);
  b.hasOne(c);

  const store = createStore({
    relationalCreators: [a, b, c],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
      c: (o) => "isC" in o,
    },
  });

  const _c = {
    id: 3,
    isC: true,
  };

  const _b = {
    id: 2,
    isB: true,
    c: _c,
  };

  const _a = {
    id: 1,
    isA: true,
    b: _b,
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true, c: 3 } },
    c: { "3": { id: 3, isC: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    c: { "3": ["b.2.c"] },
    b: { "2": ["a.1.b"] },
  });

  store.mutate({
    id: 1,
    isA: true,
    __destroy__: true,
  });

  expect(store.getState()).toStrictEqual({
    a: {},
    b: {},
    c: {},
  });

  expect(store.getReferences()).toStrictEqual({
    b: {},
    c: {},
  });
});

test("#A references #B references #C - #B is deleted", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");
  const c = createRelationalObject("c");

  a.hasOne(b);
  b.hasOne(c);

  const store = createStore({
    relationalCreators: [a, b, c],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
      c: (o) => "isC" in o,
    },
  });

  const _c = {
    id: 3,
    isC: true,
  };

  const _b = {
    id: 2,
    isB: true,
    c: _c,
  };

  const _a = {
    id: 1,
    isA: true,
    b: _b,
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true, c: 3 } },
    c: { "3": { id: 3, isC: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    c: { "3": ["b.2.c"] },
    b: { "2": ["a.1.b"] },
  });

  store.mutate({
    id: 2,
    isB: true,
    __destroy__: true,
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true } },
    b: {},
    c: {},
  });

  expect(store.getReferences()).toStrictEqual({
    b: {},
    c: {},
  });
});

test("#A references #B references #C - #C is deleted", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");
  const c = createRelationalObject("c");

  a.hasOne(b);
  b.hasOne(c);

  const store = createStore({
    relationalCreators: [a, b, c],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
      c: (o) => "isC" in o,
    },
  });

  const _c = {
    id: 3,
    isC: true,
  };

  const _b = {
    id: 2,
    isB: true,
    c: _c,
  };

  const _a = {
    id: 1,
    isA: true,
    b: _b,
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true, c: 3 } },
    c: { "3": { id: 3, isC: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    c: { "3": ["b.2.c"] },
    b: { "2": ["a.1.b"] },
  });

  store.mutate({
    id: 3,
    isC: true,
    __destroy__: true,
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true } },
    c: {},
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "2": ["a.1.b"] },
    c: {},
  });
});

test("#A references #B references #C - #B is dereferenced from #A", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");
  const c = createRelationalObject("c");

  a.hasOne(b);
  b.hasOne(c);

  const store = createStore({
    relationalCreators: [a, b, c],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
      c: (o) => "isC" in o,
    },
  });

  const _c = {
    id: 3,
    isC: true,
  };

  const _b = {
    id: 2,
    isB: true,
    c: _c,
  };

  const _a = {
    id: 1,
    isA: true,
    b: _b,
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true, c: 3 } },
    c: { "3": { id: 3, isC: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    c: { "3": ["b.2.c"] },
    b: { "2": ["a.1.b"] },
  });

  store.mutate({
    id: 1,
    isA: true,
    b: null,
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true } },
    b: { "2": { id: 2, isB: true, c: 3 } },
    c: { "3": { id: 3, isC: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    c: { "3": ["b.2.c"] },
    b: {},
  });
});

test("#A references #B references #C - #C is dereferenced from #B", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");
  const c = createRelationalObject("c");

  a.hasOne(b);
  b.hasOne(c);

  const store = createStore({
    relationalCreators: [a, b, c],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
      c: (o) => "isC" in o,
    },
  });

  const _c = {
    id: 3,
    isC: true,
  };

  const _b = {
    id: 2,
    isB: true,
    c: _c,
  };

  const _a = {
    id: 1,
    isA: true,
    b: _b,
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true, c: 3 } },
    c: { "3": { id: 3, isC: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    c: { "3": ["b.2.c"] },
    b: { "2": ["a.1.b"] },
  });

  store.mutate({
    id: 2,
    isB: true,
    c: null,
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true } },
    c: { "3": { id: 3, isC: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    c: {},
    b: { "2": ["a.1.b"] },
  });
});

test("#A, #B ref each other #B ref #C - #A is deleted", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");
  const c = createRelationalObject("c");

  a.hasOne(b);
  b.hasOne(a);
  b.hasOne(c);

  const store = createStore({
    relationalCreators: [a, b, c],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
      c: (o) => "isC" in o,
    },
  });

  const _c = {
    id: 3,
    isC: true,
  };

  const _b = {
    id: 2,
    isB: true,
    c: _c,
    a: {
      id: 1,
      isA: true,
    },
  };

  const _a = {
    id: 1,
    isA: true,
    b: _b,
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true, a: 1, c: 3 } },
    c: { "3": { id: 3, isC: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    c: { "3": ["b.2.c"] },
    a: { "1": ["b.2.a"] },
    b: { "2": ["a.1.b"] },
  });

  store.mutate({
    id: 1,
    isA: true,
    __destroy__: true,
  });

  expect(store.getState()).toStrictEqual({
    a: {},
    b: {},
    c: {},
  });

  expect(store.getReferences()).toStrictEqual({
    c: {},
    a: {},
    b: {},
  });
});

test("#A, #B ref each other #B ref #C - #A is dereferenced from #B", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");
  const c = createRelationalObject("c");

  a.hasOne(b);
  b.hasOne(a);
  b.hasOne(c);

  const store = createStore({
    relationalCreators: [a, b, c],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
      c: (o) => "isC" in o,
    },
  });

  const _c = {
    id: 3,
    isC: true,
  };

  const _b = {
    id: 2,
    isB: true,
    c: _c,
    a: {
      id: 1,
      isA: true,
    },
  };

  const _a = {
    id: 1,
    isA: true,
    b: _b,
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true, a: 1, c: 3 } },
    c: { "3": { id: 3, isC: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    c: { "3": ["b.2.c"] },
    a: { "1": ["b.2.a"] },
    b: { "2": ["a.1.b"] },
  });

  store.mutate({
    id: 2,
    isB: true,
    a: null,
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true, c: 3 } },
    c: { "3": { id: 3, isC: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    c: { "3": ["b.2.c"] },
    a: {},
    b: { "2": ["a.1.b"] },
  });
});

test("#A, #B ref each other #B ref #C - #B is deleted", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");
  const c = createRelationalObject("c");

  a.hasOne(b);
  b.hasOne(a);
  b.hasOne(c);

  const store = createStore({
    relationalCreators: [a, b, c],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
      c: (o) => "isC" in o,
    },
  });

  const _c = {
    id: 3,
    isC: true,
  };

  const _b = {
    id: 2,
    isB: true,
    c: _c,
    a: {
      id: 1,
      isA: true,
    },
  };

  const _a = {
    id: 1,
    isA: true,
    b: _b,
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true, a: 1, c: 3 } },
    c: { "3": { id: 3, isC: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    c: { "3": ["b.2.c"] },
    a: { "1": ["b.2.a"] },
    b: { "2": ["a.1.b"] },
  });

  store.mutate({
    id: 2,
    isB: true,
    __destroy__: true,
  });

  expect(store.getState()).toStrictEqual({
    a: {},
    b: {},
    c: {},
  });

  expect(store.getReferences()).toStrictEqual({
    c: {},
    a: {},
    b: {},
  });
});

test("#A, #B ref each other #B ref #C - #C is deleted", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");
  const c = createRelationalObject("c");

  a.hasOne(b);
  b.hasOne(a);
  b.hasOne(c);

  const store = createStore({
    relationalCreators: [a, b, c],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
      c: (o) => "isC" in o,
    },
  });

  const _c = {
    id: 3,
    isC: true,
  };

  const _b = {
    id: 2,
    isB: true,
    c: _c,
    a: {
      id: 1,
      isA: true,
    },
  };

  const _a = {
    id: 1,
    isA: true,
    b: _b,
  };

  store.mutate(_a);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true, a: 1, c: 3 } },
    c: { "3": { id: 3, isC: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    c: { "3": ["b.2.c"] },
    a: { "1": ["b.2.a"] },
    b: { "2": ["a.1.b"] },
  });

  store.mutate({
    id: 3,
    isC: true,
    __destroy__: true,
  });

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 2 } },
    b: { "2": { id: 2, isB: true, a: 1 } },
    c: {},
  });

  expect(store.getReferences()).toStrictEqual({
    c: {},
    a: { "1": ["b.2.a"] },
    b: { "2": ["a.1.b"] },
  });
});

test("#A, #B ref #C - #A is deleted", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");
  const c = createRelationalObject("c");

  a.hasOne(c);
  b.hasOne(c);

  const store = createStore({
    relationalCreators: [a, b, c],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
      c: (o) => "isC" in o,
    },
  });

  const _c = {
    id: 3,
    isC: true,
  };

  const _b = {
    id: 2,
    isB: true,
    c: _c,
  };

  const _a = {
    id: 1,
    isA: true,
    c: _c,
  };

  store.mutate([_a, _b]);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, c: 3 } },
    b: { "2": { id: 2, isB: true, c: 3 } },
    c: { "3": { id: 3, isC: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    c: { "3": ["a.1.c", "b.2.c"] },
  });

  store.mutate({
    id: 1,
    isA: true,
    __destroy__: true,
  });

  expect(store.getState()).toStrictEqual({
    a: {},
    b: { "2": { id: 2, isB: true, c: 3 } },
    c: { "3": { id: 3, isC: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    c: { "3": ["b.2.c"] },
  });
});

test("#A1, #A2 ref #B - #A1 is deleted", () => {
  const a = createRelationalObject("a");
  const b = createRelationalObject("b");

  a.hasOne(b);

  const store = createStore({
    relationalCreators: [a, b],
    identifier: {
      a: (o) => "isA" in o,
      b: (o) => "isB" in o,
    },
  });

  const _b = {
    id: 3,
    isB: true,
  };

  const _a1 = {
    id: 1,
    b: _b,
    isA: true,
  };

  const _a2 = {
    id: 2,
    b: _b,
    isA: true,
  };

  store.mutate([_a1, _a2]);

  expect(store.getState()).toStrictEqual({
    a: { "1": { id: 1, isA: true, b: 3 }, "2": { id: 2, isA: true, b: 3 } },
    b: { "3": { id: 3, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "3": ["a.1.b", "a.2.b"] },
  });

  store.mutate({
    id: 1,
    isA: true,
    __destroy__: true,
  });

  expect(store.getState()).toStrictEqual({
    a: { "2": { id: 2, isA: true, b: 3 } },
    b: { "3": { id: 3, isB: true } },
  });

  expect(store.getReferences()).toStrictEqual({
    b: { "3": ["a.2.b"] },
  });
});
