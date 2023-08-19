import { posts } from "./data";
import { createStore, createRelationalObject, createRelationalObjectIndex } from "./lib/index";


const user = createRelationalObject("user", { id: "number" })
const image = createRelationalObject("image", { id: "number" })
const imageThumbnail = createRelationalObject("thumbnail", { id: "number" })
const post = createRelationalObject("post", { id: "number" })
const postComment = createRelationalObject("postComment", { id: "number" })

const profilePosts = createRelationalObjectIndex("profilePosts", [post])
const homeFeed = createRelationalObjectIndex("homeFeed", [post])
const postComments = createRelationalObjectIndex("postComments", [postComment], (a, b) => a.id > b.id ? -1 : 1)

postComment.hasMany(postComment, "replies")
postComment.hasOne(postComment, "replyingTo")
postComment.hasOne(post)
postComment.hasOne(user)

post.hasOne(user)
post.hasMany(image, "images")

user.hasMany(image, "images")
image.hasMany(user, "users")

user.hasMany(post, "posts")
user.hasOne(image, "profileImage")
user.hasOne(image, "bannerImage")
user.hasOne(image, "layoutImage")
image.hasMany(imageThumbnail, "thumbnails")

const store = createStore({
  relationalCreators: [
    user,
    image,
    imageThumbnail,
    post,
    postComment,
  ],
  indexes: [homeFeed, postComments, profilePosts],
  identifier: {
    user: o => "username" in o,
    post: o => "caption" in o,
    image: o => "aspectRatio" in o,
    thumbnail: o => "uri" in o,
    postComment: o => "replyingToId" in o
  }
});

export type From = "user" | "post" | "image" | "thumbnail" | "postComment"

// store.upsert([...posts, ...posts])


// store.upsert({ id: 3, username: "John" })

// type User = { id: number; username: string }
// type Image = { id: number; baseScale: number; thumbnails: Thumbnail[] }
// type Thumbnail = { id: number; height: number; widht: number; uri: string; }

// store.upsert({ id: 2, username: "John" })

// const result = store.select<"post", any>({
//   from: "post",
//   fields: "*",
//   where: { id: 10 },
//   join: [
//     {
//       on: "user",
//       fields: "*",
//       join: [
//         {on: "profileImage", fields: "*"}
//       ]
//     }
//   ],
// })


// console.log(selected)

// store.upsert({ id: 5, caption: "Hey there" }, { indexes: [{ index: "homeFeed", key: "2" }] })

// const selected2 = store.selectIndex("homeFeed-1", {
//   post: {
//     from: "post",
//     fields: ["id"],
//   },
//   user: {
//     from:"user",
//     fields: ["id"]
//   }
// })


// store.upsert([
//   {
//     "id": 2,
//     "caption": "First",
//     "images": [
//       {
//         "id": 2,
//         "aspectRatio": 0.789062,
//         "thumbnails": null
//       }
//     ],
//     "user": {
//       "id": 1,
//       "username": "qwerty",
//       "profileImage": null
//     }
//   }
// ], {
//   indexes: [{ index: "homeFeed", key: "home" }]
// })

// const result = store.selectIndex("homeFeed-home", {
//   post: {
//     from: "post",
//     // @ts-ignore
//     where: { id: 10 },
//     fields: ["user", "createdAt"],
//     join: [
//       {
//         on: "user",
//         fields: ["username", "profileImage"],
//         join: [
//           {
//             on: "profileImage",
//             fields: "*",
//             join: [{ on: "thumbnails", fields: "*" }]
//           }
//         ]
//       }
//     ]
//   }
// })

// const users: {[key: number]: any} = {
//   1: {
//     id: 1,
//     username: "Tom"
//   }
// }

// const other = {
//   user: null
// }

// other.user = users[1]

// // @ts-ignore
// delete users[1]
// // delete users[1];

// const result = store.select<"post", any>({
//   from: "post",
//   fields: "*",
//   where: o => o.images.includes(54),
//   join: [
//     {
//       on: "user",
//       fields: "*",
//       join: [
//         {on: "profileImage", fields: "*"}
//       ]
//     }
//   ],
// })


// store.upsert(posts, { indexes: [{ index: "homeFeed", key: "home" }] })

// store.upsert({
//   id: 10,
//   __identify__: "post",
//   __destroy__: true
// })


// const selected = store.selectIndex(
//   "homeFeed-home",
//   {
//     post: {
//       from: "post",
//       fields: ["id"],
//     }
//   }
// )

const otherImage = {
  id: 91,
  __identify__: "image"
}

const _profileImage = {
  id: 90,
  __identify__: "image"
}

store.upsert([
  { id: 1, __identify__: "user", profileImage: _profileImage },
  { id: 2, __identify__: "user", profileImage: _profileImage, images: [_profileImage, otherImage] }
])

// store.upsert({
//   id: 1,
//   __identify__: "user",
//   __destroy__: true
// })

// const selected = store.selectIndex(
//   "homeFeed-home",
//   {
//     post: {
//       from: "post",
//       fields: ["id"],
//     }
//   }
// )

let savedStore: any;

store.save(s => savedStore = JSON.stringify(s))
store.purge();

console.log("before", store.getState())

store.restore(JSON.parse(savedStore));

console.log("after", store.getState())


// console.log(store.getReferences())