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

image.hasMany(thumbnail, "thumbnails")
user.hasOne(image, "profileImage")
post.hasMany(image, "images")
post.hasOne(user)

const store = createStore({
  relationalCreators: [user, post, image, thumbnail],
  identifier: {
    'user': o => !!o.username,
    'image': o => !!o.aspectRatio,
    'thumbnail': o => !!o.uri,
    'post': o => !!o.caption,
  }
});

store.mutate(posts)


test("Memory should not increase when the same object is passed twice", () => {

  store.mutate(posts)

  const memoryBefore = getObjectMemoryUsageInMB(store.getState());

  store.mutate([...posts, ...posts, ...posts, ...posts, ...posts, ...posts])

  const memoryAfter = getObjectMemoryUsageInMB(store.getState());

  expect(memoryBefore).toBe(memoryAfter)
})

test("Memory should not increase when we add more relationships", () => {

  const store1 = createStore({
    relationalCreators: [user, post, image, thumbnail],
    identifier: {
      'user': o => !!o.username,
      'image': o => !!o.aspectRatio,
      'thumbnail': o => !!o.uri,
      'post': o => !!o.caption,
    }
  });

  store1.upsert(posts)

  const memoryStore1 = getObjectMemoryUsageInMB(store1.getState());

  user.hasMany(post, "posts")
  image.hasOne(user, "user")

  const store2 = createStore({
    relationalCreators: [user, post, image, thumbnail],
    identifier: {
      'user': o => !!o.username,
      'image': o => !!o.aspectRatio,
      'thumbnail': o => !!o.uri,
      'post': o => !!o.caption,
    }
  });

  store2.upsert(posts)

  const memoryStore2 = getObjectMemoryUsageInMB(store2.getState());

  // Increased very slightly because of an additional field and a few extra references
  expect(memoryStore2).toBe(memoryStore1 + 0.0000476837158203125)
})



test("upsertWhere", () => {

  const store1 = createStore({
    relationalCreators: [user, post, image, thumbnail],
    identifier: {
      'user': o => !!o.username,
      'image': o => !!o.aspectRatio,
      'thumbnail': o => !!o.uri,
      'post': o => !!o.caption,
    }
  });

  store1.upsert(posts)

  store1.upsertWhere<any, any>({
    from: "image",
    fields: ["id", "thumbnails"],
    where: {id: 54},
    join: [{on: "thumbnails", fields: ["id", "uri"]}]
  }, (current) => {
    return {id: 54, thumbnails: [206]}
  })

  expect(store1.getReferences().thumbnail[207].length).toBe(0)
  expect(store1.getState().image[54].thumbnails.length).toBe(1)
})

test("upsertByPk", () => {

  const store1 = createStore({
    relationalCreators: [user, post, image, thumbnail],
    identifier: {
      'user': o => !!o.username,
      'image': o => !!o.aspectRatio,
      'thumbnail': o => !!o.uri,
      'post': o => !!o.caption,
    }
  });

  store1.upsert(posts)

  store1.upsert({
    id: 10,
    user: 1,
    __identify__: "post",
  })

  expect(store1.getState().post[10].user).toBe(1)
})