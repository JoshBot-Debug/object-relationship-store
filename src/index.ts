import { posts as anArrayOfPostObjects } from "./data";
import withOptions from "../lib/helper/withOptions";
import {
  createStore,
  createRelationalObject,
  createRelationalObjectIndex,
} from "../lib/index";

// const user = createRelationalObject("user");
// const image = createRelationalObject("image");
// const imageThumbnail = createRelationalObject("thumbnail");
// const post = createRelationalObject("post");
// const postComment = createRelationalObject("postComment");
// const following = createRelationalObject("following");

// const blockedUsers = createRelationalObjectIndex(
//   "blockedUsers",
//   [user],
//   (a, b) => (a.id > b.id ? -1 : 1)
// );
// const profilePosts = createRelationalObjectIndex(
//   "profilePosts",
//   [post],
//   (a, b) => (a.id > b.id ? -1 : 1)
// );
// const homeFeed = createRelationalObjectIndex("homeFeed", [post], (a, b) =>
//   a.id > b.id ? -1 : 1
// );
// const postComments = createRelationalObjectIndex(
//   "postComments",
//   [postComment],
//   (a, b) => (a.id > b.id ? -1 : 1)
// );

// postComment.hasMany(postComment, "replies");
// postComment.hasOne(postComment, "replyingTo");
// postComment.hasOne(post);
// postComment.hasOne(user);

// post.hasOne(user);
// post.hasMany(image, "images");

// user.hasOne(image, "profileImage");
// user.hasOne(image, "bannerImage");
// user.hasOne(image, "layoutImage");
// image.hasMany(imageThumbnail, "thumbnails");

// following.hasOne(user);
// following.hasOne(user, "following");

// const message = createRelationalObject("message");
// const room = createRelationalObject("room");
// const roomParticipant = createRelationalObject("roomParticipant");
// const messageRoom = createRelationalObjectIndex(
//   "messageRoom",
//   [message],
//   (a, b) => (a.id > b.id ? -1 : 1)
// );

// room.hasOne(roomParticipant, "participant");
// room.hasMany(roomParticipant, "participants");
// room.hasMany(message, "messages");
// room.hasMany(user, "typing");
// roomParticipant.hasOne(room, "room");
// roomParticipant.hasOne(user, "user");
// roomParticipant.hasOne(user, "privateOtherUser");
// room.hasOne(image, "image");
// room.hasOne(image, "backgroundImage");
// user.hasMany(roomParticipant, "roomMembership");

// const inbox = createRelationalObjectIndex("inbox", [room], (a, b) =>
//   +new Date(a.updatedAt) > +new Date(b.updatedAt) ? -1 : 1
// );
// const groups = createRelationalObjectIndex("groups", [room], (a, b) =>
//   +new Date(a.updatedAt) > +new Date(b.updatedAt) ? -1 : 1
// );
// const members = createRelationalObjectIndex(
//   "members",
//   [roomParticipant],
//   (a, b) => (+new Date(a.updatedAt) > +new Date(b.updatedAt) ? -1 : 1)
// );
// const followings = createRelationalObjectIndex("follow", [following], (a, b) =>
//   +new Date(a.updatedAt) > +new Date(b.updatedAt) ? -1 : 1
// );

// const store = createStore({
//   relationalCreators: [
//     user,
//     image,
//     imageThumbnail,
//     post,
//     postComment,
//     room,
//     roomParticipant,
//     message,
//     following,
//   ],
//   indexes: [
//     homeFeed,
//     postComments,
//     profilePosts,
//     blockedUsers,
//     inbox,
//     groups,
//     messageRoom,
//     members,
//     followings,
//   ],
//   identifier: {
//     user: (o) => "username" in o,
//     post: (o) => "caption" in o,
//     image: (o) => "baseScale" in o,
//     thumbnail: (o) => "uri" in o,
//     postComment: (o) => "replyingToId" in o,
//     message: (o) => "roomId" in o && "userId" in o && "content" in o,
//     room: (o) => "participants" in o || "participant" in o || "isPrivate" in o,
//     following: (o) => "followingUserId" in o,
//     roomParticipant: (o) =>
//       "privateOtherUser" in o ||
//       "isChatAccepted" in o ||
//       ("roomId" in o && ("userId" in o || "user" in o)) ||
//       "isBanned" in o ||
//       "isModerator" in o ||
//       "isAdministrator" in o,
//   },
// });

// // store.mutate({"contentRating": "SFK", "id": 203, "profileImage": {id: 1, thumbnails: [{id: 2, __identify__: "thumbnail"}], __identify__: "image"}, "username": "abc"})
// // console.log(store.getState())
// // console.log(store.getReferences())

// // store.mutate({"contentRating": "SFK", "id": 203, "profileImage": null, "username": "abc"})
// // store.mutate({"id": 203, "images": [{id: 1, __identify__: "image"}], __identify__: "post"})
// // store.mutate({"id": 203, "images": null, __identify__: "post"})
// // console.log(store.getState())
// // console.log(store.getReferences())
// // { from: "room", where: { id: message.roomId }, fields: ["typing"] }
// // store.mutate({
// //   __identify__: "user",
// //   id: 10,
// // })
// store.restore({
//   "state": {
//       "user": {
//           "2": {
//               "id": 2,
//               "username": "the_overlord",
//               "contentRating": "SFK",
//               "profileImage": 11,
//               "isOnline": true,
//               "profileImageId": 11
//           },
//           "3": {
//               "id": 3,
//               "username": "qwerty",
//               "roomMembership": [
//                   78
//               ]
//           },
//           "201": {
//               "id": 201,
//               "username": "ise",
//               "roomMembership": [
//                   82
//               ]
//           },
//           "203": {
//               "id": 203,
//               "username": "abc",
//               "roomMembership": [
//                   85
//               ]
//           }
//       },
//       "image": {
//           "11": {
//               "id": 11,
//               "baseScale": "1.4",
//               "pinchScale": "1",
//               "translateX": "0",
//               "translateY": "0",
//               "originContainerWidth": "252",
//               "originContainerHeight": "252",
//               "aspectRatio": 0.730469,
//               "thumbnails": [
//                   40,
//                   41,
//                   42
//               ]
//           },
//           "12": {
//               "id": 12,
//               "baseScale": "1",
//               "pinchScale": "1",
//               "translateX": "0",
//               "translateY": "0",
//               "originContainerWidth": "768",
//               "originContainerHeight": "455",
//               "aspectRatio": 0.796875,
//               "thumbnails": [
//                   43,
//                   44,
//                   45,
//                   46,
//                   47
//               ]
//           },
//           "13": {
//               "id": 13,
//               "baseScale": "1",
//               "pinchScale": "1",
//               "translateX": "0",
//               "translateY": "0",
//               "originContainerWidth": "768",
//               "originContainerHeight": "455",
//               "aspectRatio": 0.664062,
//               "thumbnails": [
//                   48,
//                   49,
//                   50,
//                   51,
//                   52
//               ]
//           },
//           "14": {
//               "id": 14,
//               "baseScale": "1",
//               "pinchScale": "1",
//               "translateX": "0",
//               "translateY": "0",
//               "originContainerWidth": "768",
//               "originContainerHeight": "455",
//               "aspectRatio": 0.679688,
//               "thumbnails": [
//                   53,
//                   54,
//                   55,
//                   56,
//                   57
//               ]
//           },
//           "15": {
//               "id": 15,
//               "baseScale": "1",
//               "pinchScale": "1",
//               "translateX": "0",
//               "translateY": "0",
//               "originContainerWidth": "768",
//               "originContainerHeight": "455",
//               "aspectRatio": 0.664062,
//               "thumbnails": [
//                   58,
//                   59,
//                   60,
//                   61,
//                   62
//               ]
//           },
//           "16": {
//               "id": 16,
//               "baseScale": "1",
//               "pinchScale": "1",
//               "translateX": "0",
//               "translateY": "0",
//               "originContainerWidth": "768",
//               "originContainerHeight": "455",
//               "aspectRatio": 0.984375,
//               "thumbnails": [
//                   63,
//                   64,
//                   65,
//                   66,
//                   67
//               ]
//           },
//           "26": {
//               "id": 26,
//               "baseScale": "1",
//               "pinchScale": "1",
//               "translateX": "0",
//               "translateY": "0",
//               "originContainerWidth": "768",
//               "originContainerHeight": "453",
//               "aspectRatio": 0.664062,
//               "thumbnails": [
//                   97,
//                   98,
//                   99,
//                   100,
//                   101
//               ]
//           },
//           "28": {
//               "id": 28,
//               "baseScale": "1",
//               "pinchScale": "1",
//               "translateX": "0",
//               "translateY": "0",
//               "originContainerWidth": "768",
//               "originContainerHeight": "453",
//               "aspectRatio": 0.921875,
//               "thumbnails": [
//                   107,
//                   108,
//                   109,
//                   110,
//                   111
//               ]
//           }
//       },
//       "thumbnail": {
//           "40": {
//               "id": 40,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/profilePhoto.256.jpeg?1696660732580",
//               "height": 256,
//               "width": 187
//           },
//           "41": {
//               "id": 41,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/profilePhoto.512.jpeg?1696660732581",
//               "height": 512,
//               "width": 373
//           },
//           "42": {
//               "id": 42,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/profilePhoto.original.jpeg?1696660732579",
//               "height": 851,
//               "width": 620
//           },
//           "43": {
//               "id": 43,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262726.0-1.128.jpeg",
//               "height": 128,
//               "width": 102
//           },
//           "44": {
//               "id": 44,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262726.0-2.256.jpeg",
//               "height": 256,
//               "width": 204
//           },
//           "45": {
//               "id": 45,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262727.0-3.512.jpeg",
//               "height": 512,
//               "width": 408
//           },
//           "46": {
//               "id": 46,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262727.0-4.720.jpeg",
//               "height": 720,
//               "width": 574
//           },
//           "47": {
//               "id": 47,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262724.0-0.original.jpeg",
//               "height": 3880,
//               "width": 3092
//           },
//           "48": {
//               "id": 48,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262727.1-1.128.jpeg",
//               "height": 128,
//               "width": 85
//           },
//           "49": {
//               "id": 49,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262728.1-2.256.jpeg",
//               "height": 256,
//               "width": 171
//           },
//           "50": {
//               "id": 50,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262728.1-3.512.jpeg",
//               "height": 512,
//               "width": 341
//           },
//           "51": {
//               "id": 51,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262728.1-4.720.jpeg",
//               "height": 720,
//               "width": 480
//           },
//           "52": {
//               "id": 52,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262727.1-0.original.jpeg",
//               "height": 1152,
//               "width": 768
//           },
//           "53": {
//               "id": 53,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262729.2-1.128.jpeg",
//               "height": 128,
//               "width": 87
//           },
//           "54": {
//               "id": 54,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262729.2-2.256.jpeg",
//               "height": 256,
//               "width": 174
//           },
//           "55": {
//               "id": 55,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262730.2-3.512.jpeg",
//               "height": 512,
//               "width": 349
//           },
//           "56": {
//               "id": 56,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262730.2-4.720.jpeg",
//               "height": 720,
//               "width": 490
//           },
//           "57": {
//               "id": 57,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262729.2-0.original.jpeg",
//               "height": 4512,
//               "width": 3072
//           },
//           "58": {
//               "id": 58,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262731.3-1.128.jpeg",
//               "height": 128,
//               "width": 85
//           },
//           "59": {
//               "id": 59,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262731.3-2.256.jpeg",
//               "height": 256,
//               "width": 171
//           },
//           "60": {
//               "id": 60,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262731.3-3.512.jpeg",
//               "height": 512,
//               "width": 341
//           },
//           "61": {
//               "id": 61,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262731.3-4.720.jpeg",
//               "height": 720,
//               "width": 480
//           },
//           "62": {
//               "id": 62,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262730.3-0.original.jpeg",
//               "height": 1728,
//               "width": 1152
//           },
//           "63": {
//               "id": 63,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262731.4-1.128.jpeg",
//               "height": 128,
//               "width": 126
//           },
//           "64": {
//               "id": 64,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262731.4-2.256.jpeg",
//               "height": 256,
//               "width": 252
//           },
//           "65": {
//               "id": 65,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262731.4-3.512.jpeg",
//               "height": 512,
//               "width": 505
//           },
//           "66": {
//               "id": 66,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262731.4-4.720.jpeg",
//               "height": 720,
//               "width": 710
//           },
//           "67": {
//               "id": 67,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1696871262731.4-0.original.jpeg",
//               "height": 2240,
//               "width": 2208
//           },
//           "97": {
//               "id": 97,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1703845078929.0-1.128.jpeg",
//               "height": 128,
//               "width": 85
//           },
//           "98": {
//               "id": 98,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1703845078929.0-2.256.jpeg",
//               "height": 256,
//               "width": 171
//           },
//           "99": {
//               "id": 99,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1703845078929.0-3.512.jpeg",
//               "height": 512,
//               "width": 341
//           },
//           "100": {
//               "id": 100,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1703845078929.0-4.720.jpeg",
//               "height": 720,
//               "width": 480
//           },
//           "101": {
//               "id": 101,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1703845078927.0-0.original.jpeg",
//               "height": 2304,
//               "width": 1536
//           },
//           "107": {
//               "id": 107,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1705241642398.0-1.128.jpeg",
//               "height": 128,
//               "width": 118
//           },
//           "108": {
//               "id": 108,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1705241642398.0-2.256.jpeg",
//               "height": 256,
//               "width": 236
//           },
//           "109": {
//               "id": 109,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1705241642398.0-3.512.jpeg",
//               "height": 512,
//               "width": 472
//           },
//           "110": {
//               "id": 110,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1705241642399.0-4.720.jpeg",
//               "height": 720,
//               "width": 664
//           },
//           "111": {
//               "id": 111,
//               "uri": "https://isekaied-photos.us-southeast-1.linodeobjects.com/2/post.1705241642397.0-0.original.jpeg",
//               "height": 889,
//               "width": 820
//           }
//       },
//       "post": {
//           "3": {
//               "id": 3,
//               "caption": "Warning... HENTAI 🔥",
//               "contentRating": "R18",
//               "createdAt": "2023-10-09T17:07:45.000Z",
//               "likeCount": 3,
//               "commentsCount": 3,
//               "isLiked": 1,
//               "images": [
//                   12,
//                   13,
//                   14,
//                   15,
//                   16
//               ],
//               "user": 2
//           },
//           "5": {
//               "id": 5,
//               "caption": "",
//               "contentRating": "SFK",
//               "createdAt": "2023-12-29T10:18:02.000Z",
//               "likeCount": 1,
//               "commentsCount": 3,
//               "isLiked": 1,
//               "images": [
//                   26
//               ],
//               "user": 2
//           },
//           "7": {
//               "id": 7,
//               "caption": "Guess who  😂",
//               "contentRating": "SFK",
//               "createdAt": "2024-01-14T14:14:04.000Z",
//               "likeCount": 2,
//               "commentsCount": 4,
//               "isLiked": 1,
//               "images": [
//                   28
//               ],
//               "user": 2
//           }
//       },
//       "homeFeed-main": [
//           "post-7",
//           "post-5",
//           "post-3"
//       ],
//       "room": {
//           "38": {
//               "id": 38,
//               "updatedAt": "2023-12-05T13:25:14.423Z",
//               "title": null,
//               "isPrivate": true,
//               "participant": 78,
//               "lastMessage": "k"
//           },
//           "40": {
//               "id": 40,
//               "updatedAt": "2024-01-23T15:58:16.503Z",
//               "title": null,
//               "isPrivate": true,
//               "participant": 82,
//               "lastMessage": "Hey"
//           },
//           "41": {
//               "id": 41,
//               "updatedAt": "2024-01-23T16:17:53.701Z",
//               "title": null,
//               "isPrivate": true,
//               "participant": 85,
//               "lastMessage": "d",
//               "typing": [
//                   203
//               ]
//           }
//       },
//       "inbox-main": [
//           "room-41",
//           "room-40",
//           "room-38"
//       ],
//       "roomParticipant": {
//           "78": {
//               "id": 78,
//               "roomId": 38,
//               "isChatAccepted": 1,
//               "user": 3,
//               "room": 38
//           },
//           "82": {
//               "id": 82,
//               "roomId": 40,
//               "isChatAccepted": 1,
//               "user": 201,
//               "room": 40
//           },
//           "85": {
//               "id": 85,
//               "roomId": 41,
//               "isChatAccepted": 1,
//               "user": 203,
//               "room": 41
//           }
//       }
//   },
//   "references": {
//       "thumbnail": {
//           "40": [
//               "image.11.thumbnails"
//           ],
//           "41": [
//               "image.11.thumbnails"
//           ],
//           "42": [
//               "image.11.thumbnails"
//           ],
//           "43": [
//               "image.12.thumbnails"
//           ],
//           "44": [
//               "image.12.thumbnails"
//           ],
//           "45": [
//               "image.12.thumbnails"
//           ],
//           "46": [
//               "image.12.thumbnails"
//           ],
//           "47": [
//               "image.12.thumbnails"
//           ],
//           "48": [
//               "image.13.thumbnails"
//           ],
//           "49": [
//               "image.13.thumbnails"
//           ],
//           "50": [
//               "image.13.thumbnails"
//           ],
//           "51": [
//               "image.13.thumbnails"
//           ],
//           "52": [
//               "image.13.thumbnails"
//           ],
//           "53": [
//               "image.14.thumbnails"
//           ],
//           "54": [
//               "image.14.thumbnails"
//           ],
//           "55": [
//               "image.14.thumbnails"
//           ],
//           "56": [
//               "image.14.thumbnails"
//           ],
//           "57": [
//               "image.14.thumbnails"
//           ],
//           "58": [
//               "image.15.thumbnails"
//           ],
//           "59": [
//               "image.15.thumbnails"
//           ],
//           "60": [
//               "image.15.thumbnails"
//           ],
//           "61": [
//               "image.15.thumbnails"
//           ],
//           "62": [
//               "image.15.thumbnails"
//           ],
//           "63": [
//               "image.16.thumbnails"
//           ],
//           "64": [
//               "image.16.thumbnails"
//           ],
//           "65": [
//               "image.16.thumbnails"
//           ],
//           "66": [
//               "image.16.thumbnails"
//           ],
//           "67": [
//               "image.16.thumbnails"
//           ],
//           "97": [
//               "image.26.thumbnails"
//           ],
//           "98": [
//               "image.26.thumbnails"
//           ],
//           "99": [
//               "image.26.thumbnails"
//           ],
//           "100": [
//               "image.26.thumbnails"
//           ],
//           "101": [
//               "image.26.thumbnails"
//           ],
//           "107": [
//               "image.28.thumbnails"
//           ],
//           "108": [
//               "image.28.thumbnails"
//           ],
//           "109": [
//               "image.28.thumbnails"
//           ],
//           "110": [
//               "image.28.thumbnails"
//           ],
//           "111": [
//               "image.28.thumbnails"
//           ]
//       },
//       "image": {
//           "11": [
//               "user.2.profileImage"
//           ],
//           "12": [
//               "post.3.images"
//           ],
//           "13": [
//               "post.3.images"
//           ],
//           "14": [
//               "post.3.images"
//           ],
//           "15": [
//               "post.3.images"
//           ],
//           "16": [
//               "post.3.images"
//           ],
//           "26": [
//               "post.5.images"
//           ],
//           "28": [
//               "post.7.images"
//           ]
//       },
//       "user": {
//           "2": [
//               "post.7.user",
//               "post.5.user",
//               "post.3.user"
//           ],
//           "3": [
//               "roomParticipant.78.user"
//           ],
//           "201": [
//               "roomParticipant.82.user"
//           ],
//           "203": [
//               "roomParticipant.85.user",
//               "room.41.typing"
//           ]
//       },
//       "roomParticipant": {
//           "78": [
//               "user.3.roomMembership",
//               "room.38.participant"
//           ],
//           "82": [
//               "user.201.roomMembership",
//               "room.40.participant"
//           ],
//           "85": [
//               "user.203.roomMembership",
//               "room.41.participant"
//           ]
//       },
//       "room": {
//           "38": [
//               "roomParticipant.78.room"
//           ],
//           "40": [
//               "roomParticipant.82.room"
//           ],
//           "41": [
//               "roomParticipant.85.room"
//           ]
//       }
//   }
// })

// function mutate(roomId: number, isTyping: boolean, user: {id: number, username: string}) {

//   store.mutateWhere<"room", any>({
//     from: "room",
//     where: { id: roomId },
//     fields: ["typing"],
//     join: [{ on: "typing", fields: ["id", "username"] }],
//   },
//   (current) => {
//     const roomTyping = current?.typing ?? [];

//     // Find the users index in room.typing
//     const userIndex =
//       roomTyping.findIndex((u: any) => u.id === user.id) ?? -1;

//     // If the user is typing and the userIndex is not found in room.typing, add the user
//     if (isTyping && userIndex === -1)
//       return { id: roomId, typing: [...roomTyping, user] };

//     // If the user index is not found in room.typing OR if the user is typing and the index is not found skip any updates
//     if (userIndex === -1 || (isTyping && userIndex !== -1)) return null;

//     // Otherwise the user is not typing so remove him from room.typing
//     return {
//       id: roomId,
//       typing: roomTyping.filter((u: any) => u.id !== user.id),
//     };
//   });
// }

// mutate(41, true, {id: 203, username: "abc"})
// console.log(store.getState()["room"][41])

// mutate(41, false, {id: 203, username: "abc"})

// // console.log(store.getState());
// console.log(store.getState()["room"][41])

// export type From =
//   | "user"
//   | "post"
//   | "image"
//   | "thumbnail"
//   | "postComment"
//   | "room"
//   | "roomParticipant"
//   | "message";

// /**
//  * Example data
//  */
// const posts = [...anArrayOfPostObjects]

// // A helper function for the documentation.
// // Don't write tests like this, use jest or something else.
// const isTrue = (message: string, value: boolean) => {
//   if (!value) throw new Error(`Value was not true! - ${message}`);
//   console.log(`[${String(value).toUpperCase()}] ${message}`)
// }

// const user = createRelationalObject("user")
// const image = createRelationalObject("image")
// const thumbnail = createRelationalObject("thumbnail")
// const post = createRelationalObject("post")

// const homeFeed = createRelationalObjectIndex("homeFeed", [post], (a, b) => a.id > b.id ? -1 : 1)

// post.hasOne(user)
// post.hasMany(image, "images")

// user.hasMany(post, "posts")
// user.hasOne(image, "profileImage")
// image.hasMany(thumbnail, "thumbnails")

// const store = createStore({
//   relationalCreators: [
//     user,
//     image,
//     thumbnail,
//     post,
//   ],
//   indexes: [homeFeed],
//   identifier: {
//     user: o => "username" in o,
//     post: o => "caption" in o,
//     image: o => "aspectRatio" in o,
//     thumbnail: o => "uri" in o,
//   }
// });

// console.log("\n\n1. UPSERT DATA INTO THE STORE\n")

// /**
//  * Upsert one object in the store
//  */
// store.mutate(posts[0])
// isTrue("One object upserted", Object.keys(store.getState().post).length === 1)

// /**
//  * Upsert many objects in the store
//  */
// store.mutate(posts)
// isTrue("Many object upserted", Object.keys(store.getState().post).length === 5)

// /**
//  * Upsert an object and manually determine the type
//  */
// try { store.mutate({ id: 11 }) }
// catch (error: any) {
//   // Because this post does not contain a "caption" field, the identifier
//   // will fail to identify the object
//   isTrue("Cannot identify the object", error.message === 'Identifier was not able to identify this object {"id":11}')
// }

// // If identifier cannot determine the type of the object,
// // you can manually specify the type like this
// store.mutate({ id: 11, __identify__: "post" })
// isTrue("Used __identify__ to determine the type of the object", Object.keys(store.getState().post).length === 6)

// // You can also use withOptions()
// store.mutate(withOptions({ id: 11 }, { __identify__: "post" }))
// isTrue("Used withOptions() to determine the type of the object", Object.keys(store.getState().post).length === 6)

// // withOptions() also accepts a callback on all options,
// // you can use the callback to check the object
// store.mutate(withOptions({ id: 11 }, { __identify__: o => { if (o.id === 11) { return "post" } throw new Error("Should never come here"); } }))
// isTrue("Used withOptions() callback to determine the type of the object", Object.keys(store.getState().post).length === 6)

// // You can also use withOptions() to identify an array of objects
// store.mutate(withOptions([{ id: 11 }, { id: 12 }], { __identify__: "post" }))
// isTrue("Used withOptions() to determine the type of an array of objects", Object.keys(store.getState().post).length === 7)

// // withOptions() also accepts a callback on all options,
// // you can use the callback to check all the objects
// try {
//   store.mutate(withOptions([{ id: 11 }, { id: 12 }], { __identify__: o => { if (o.id === 11) { return "post" } throw new Error(`id ${o.id}`); } }))
// } catch (error: any) {
//   isTrue("Expect id 12 to not be identified.", error.message === "id 12")
// }

// /**
//  * So far we've seen a few ways to upsert data
//  *
//  * store.mutate({...someObject})
//  *
//  * store.mutate([ {...someObject}, {...someOtherObject} ])
//  *
//  * store.mutate({...someObject, __identify__: "post" })
//  *
//  * store.mutate(withOptions({...someObject}, { __identify__: "post" } ))
//  */

// console.log("\nEND OF UPSERT DEMO\n")

// console.log("\n\n2. DELETE DATA FROM THE STORE\n")

// /**
//  * Deleting an object from the store is the same as upsert
//  * Except, there's one small difference
//  */
// isTrue("Post 12 exists", !!store.getState().post[12])

// store.mutate({ id: 12, __identify__: "post", __destroy__: true })

// isTrue("Post 12 does not exist", !store.getState().post[12])

// /**
//  * To delete an object, just pass __destroy__ as true
//  *
//  * This can be done on an array or a single object. You can also use withOptions()
//  *
//  * Note: All orphaned children and references to the object will be removed.
//  */

// /**
//  * All references are gone.
//  */
// isTrue("Profile image 52 exists on user 1", store.getState().user[1].profileImage === 52)

// // Delete an image where the id is 52
// // Destroy can be done on an array or a single object. You can also use withOptions()
// store.mutate({ id: 52, __identify__: "image", __destroy__: true })

// isTrue("Profile image 52 does not exist on user 1", store.getState().user[1].profileImage === undefined)

// /**
//  * All orphaned children are gone
//  */

// isTrue("User 2 has posts 10, 9, 6", JSON.stringify(store.getState().user[2].posts) === "[10,9,6]")
// isTrue("Post 10, 9, 6 all exist", !!store.getState().post[10] && !!store.getState().post[9] && !!store.getState().post[6])
// // Deleted user where id is 2
// // Destroy can be done on an array or a single object. You can also use withOptions()
// store.mutate(withOptions([{ id: 2 }], { __identify__: "user", __destroy__: true }))
// isTrue("User 2 is deleted", !store.getState().user[2])
// isTrue("Post 10, 9, 6 all deleted", !store.getState().post[10] && !store.getState().post[9] && !store.getState().post[6])

// /**
//  * So we've seen that we can delete data from the store and all references and orphaned children are deleted as well.
//  *
//  * If you do not want this behaviour, you'll have to do a soft delete by using a key in you object like "isDeleted". You will
//  * handle it manually (if isDeleted hide) or something like that.
//  *
//  * Destroy can be done on an array or a single object. You can also use withOptions()
//  *
//  */

// console.log("\nEND OF DELETE DEMO\n")

// console.log("\n\n3. SELECT DATA FROM THE STORE\n")

// // Upsert posts again so that we have data to work with
// store.mutate(posts)

// /**
//  * This is how you select data
//  *
//  * store.select()
//  */
// const result = store.select({

//   // Name of the object you want to select
//   from: "image",

//   /**
//    * Fields, can be "*" for all fields OR an array like ["id", "users", "thumbnail"]
//    *
//    * fields: "*"
//    * fields: ["id", "users", "thumbnail"]
//    *
//    * If you don't type the function, you may need to add @ts-ignore
//    */
//   // @ts-ignore
//   // fields: ["id", "users", "thumbnails"],
//   fields: "*",

//   /**
//    * The where clause,
//    * can be an object, and array of object or a function.
//    * Using the primaryKey of the object will be faster than using other properties.
//    *
//    * where: {id: 48}                    // Will return an object or null
//    * where: [ {id: 48}, {id: 49} ]      // Will return an array of matching objects or an empty array
//    * where o => [48, 49].includes(o.id) // Will return an array of matching objects or an empty array
//    * where: { aspectRatio: 0.777344 },  // Will return an array of matching objects or an empty array
//    *
//    */
//   where: { aspectRatio: 0.777344 },

//   /**
//    * Join operation,
//    * if you don't use a join, any objects referenced in the selected object will be the primaryKey
//    * If you want the object instead of the primaryKey, join!
//    *
//    * Depending on the structure of you object, you need to build you join.
//    */
//   join: [
//     {
//       on: "thumbnails",
//       fields: ["id"]
//     }
//   ],
// })

// // We have a result here.
// // console.log(result)
// isTrue("Result is the object we expected", JSON.stringify(result) === '[{"id":48,"aspectRatio":0.777344,"thumbnails":[{"id":186},{"id":187}]}]')

// /**
//  *
//  * Note: The result from store.select() is memonized
//  *
//  * It will change only if the object changes or the select statement changes
//  *
//  */

// console.log("\nEND OF SELECT DEMO\n")

// /**
//  * So far we have:
//  * 1. Upsert one object into the store
//  * 2. Upserted many objects into the store
//  * 3. Delete one and many objects and all references and orphaned children
//  * 4. Selected one object and an array of objects
//  */

// console.log("\n\n4. SELECT DATA FROM INDEX\n")

// /**
//  * While the above ability to upsert, select and delete covers most cases,
//  * sometimes the order in which the data was received is important.
//  *
//  * Like in a feed where you can scroll down infinitely.
//  *
//  * For this, example, we have "homeFeed" index
//  *
//  * const homeFeed = createRelationalObjectIndex("homeFeed", [post])
//  *
//  * We named it "homeFeed" and said that it contains post objects. You can pass multiple objects to to an index,
//  * like this for example
//  *
//  * Here we are saying homeFeed contains posts, articles and newsArticles.
//  * const homeFeed = createRelationalObjectIndex("homeFeed", [post, article, newsArticle])
//  *
//  * In this example, we will use only one type of object in the index, "post".
//  *
//  * The index behaves very similar to a regular select and upsert, there are only a few differences
//  */

// // Upsert data
// // Here we used withOptions() to upsert and array of posts to the store, and we
// // Also mentioned an index as an array or a single index
// // store.mutate(withOptions(posts, { __indexes__: ["homeFeed-home", "otherFeed-1"] }))
// store.mutate(withOptions(posts, { __indexes__: "homeFeed-home" }))

// /**
//  *
//  * An indexKey is broken into two parts
//  * "homeFeed" - which is the name of the index
//  * "home" - which is a unique key
//  *
//  * They are seperated by "-"
//  *
//  * This is because if you have an index called "comments", you want seperate indexes for them.
//  * Example comments page for post id 1, 2, 3
//  * All have different comments
//  *
//  * So the index will be something like this for example
//  * By providing different unique keys, "comments" will create new indexes for each of them.
//  * "comments-postId1"
//  * "comments-postId2"
//  * "comments-postId3"
//  *
//  */

// /**
//  * The order of the index by default will be the order in which it was upserted,
//  * However, when creating an index, you can pass a sorting function like so:~
//  *
//  * const homeFeed = createRelationalObjectIndex("homeFeed", [post], (a, b) => a.id > b.id ? -1 : 1)
//  */

// const selected = store.selectIndex("homeFeed-home", {

//   /**
//    * This select object is the same as the one above except,
//    * The "where" can only be a function
//    */
//   post: {
//     from: "post",
//     fields: ["id"],
//   },

//   // If we had more than one object type in this index
//   // article: { from: "article", fields: ["id"] }
// })

// isTrue("Result is the an array containg posts, in the order it was upserted.", JSON.stringify(selected) === '[{"id":10},{"id":9},{"id":8},{"id":7},{"id":6}]')

// // Here we upsert another post with ID of 5
// store.mutate(withOptions({ id: 5 }, { __indexes__: "homeFeed-home", __identify__: "post" }))

// // We select the index again
// const selected2 = store.selectIndex("homeFeed-home", { post: { from: "post", fields: ["id"] } })

// isTrue("The additional post was added to the index.", JSON.stringify(selected2) === '[{"id":10},{"id":9},{"id":8},{"id":7},{"id":6},{"id":5}]')

// console.log("\nEND OF SELECT INDEX DEMO\n")

// /**
//  * If we want to remove the object from an index without destroying it, it can be done using __removeFromIndexes__
//  */

// // Here we upsert post with ID of 5, and remove it from the homeFeed-home index
// // Upsert with and update the current object if needed.
// store.mutate(withOptions({ id: 5, content: "Update fields if needed" }, { __removeFromIndexes__: "homeFeed-home", __identify__: "post" }))

// // @ts-ignore
// const result1 = store.select({ from: "post", fields: ["id", "content"], where: { id: 5 } })

// // @ts-ignore
// const selected3 = store.selectIndex("homeFeed-home", { post: { from: "post", fields: ["id"] } })
// isTrue("The post was removed from the index.", JSON.stringify(selected3) === '[{"id":10},{"id":9},{"id":8},{"id":7},{"id":6}]')

// // @ts-ignore
// isTrue("The content in the post was updated.", result1.content === 'Update fields if needed')

// /**
//  * Save state to storage.
//  * Restore state from storage.
//  */
// const storage: { myData: any } = {
//   myData: {}
// };

// store.save(data => {
//   // Save the data to storage.
//   storage.myData = data;
// })

// // You can get the data from storage and restore it.
// store.restore(storage.myData)

// store.mutate(posts);

// // const getUser = () => store.select<any, any>({
// //   from: "user",
// //   fields: ["id", "posts"],
// //   where: { id: 1 },
// //   join: [{ on: "posts", fields: ["id"] }]
// // })

// // const getPost = () => store.select<any, any>({
// //   from: "post",
// //   fields: ["id", "user"],
// //   where: { id: 7 },
// // })

// // console.log("User Before", getUser())

// // console.log(store.getReferences())
// // store.mutate({
// //   id: 1,
// //   __identify__: "user",
// //   posts: [8]
// // });
// // console.log(store.getReferences())

// // console.log("User After", getUser())
// // console.log("User After", getPost())

// // const getPost = () => store.select<any, any>({
// //   from: "post",
// //   fields: ["id", "user"],
// //   where: { id: 7 },
// // })

// // console.log("Post Before", getPost())

// // store.mutate({
// //   id: 7,
// //   __identify__: "post",
// //   user: null
// // });

// // console.log("Post After", getPost())
// // console.log("User After", store.select<any, any>({
// //   from: "user",
// //   fields: ["id", "posts"],
// //   where: { id: 1 },
// // }))
// // console.log(store.getReferences()["user"][1])
// // console.log(store.getReferences()["post"])

// const getUser = () => store.select<any, any>({
//   from: "user",
//   fields: ["id", "posts"],
//   where: { id: 1 },
// })

// console.log("Before", getUser())

// store.mutate({
//   id: 1,
//   __identify__: "user",
//   posts: [8]
// });

// console.log("User After", getUser())
// console.log("Post After", store.select<any, any>({
//   from: "post",
//   fields: ["id", "user"],
//   where: { id: 8 },
// }))
// console.log(store.getReferences()["user"][1])
// console.log(store.getReferences()["post"])

function bench(name: string, callback: () => void, runs = 1, warmUpRuns = 0) {
  let totalTime = 0;

  // Warm-up runs
  for (let i = 0; i < warmUpRuns; i++) {
    callback();
  }

  // Actual benchmark runs
  for (let i = 0; i < runs; i++) {
    const start = performance.now();
    try {
      callback();
    } catch (error) {
      console.error(`[${name}] Error during benchmark:`, error);
      return;
    }
    const time = performance.now() - start;
    totalTime += time;
  }

  const averageTime = totalTime / runs;
  console.log(`[${name}]: Average time: ${averageTime.toFixed(3)}ms`);
}

import { faker } from "@faker-js/faker";

const user = createRelationalObject("user");
const image = createRelationalObject("image");
const home = createRelationalObjectIndex("home", [user], (a, b) => {
  return a.id > b.id ? 1 : -1
});

user.hasOne(image, "profileImage");
user.hasMany(image, "gallery");

const store = createStore({
  relationalCreators: [user, image],
  indexes: [home],
  identifier: {
    user: (o) => "username" in o,
    image: (o) => "url" in o,
  },
});

function generateRandomId() {
  const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 1000000);
  return `${timestamp}-${randomNumber}`;
}

function createImage() {
  const url = faker.image.url();
  return { id: generateRandomId(), url };
}

function createUser(_: any, id: number) {
  const username = faker.person.firstName();

  return {
    id,
    username,
    profileImage: createImage(),
    gallery: [createImage(), createImage(), createImage()],
  };
}

const users = new Array(10).fill(0).flatMap((v, i) => i % 2 ? createUser(v, i) : []);

const BENCH = {
  runs: 1,
  warmups: 0,
};

// bench(
//   "Add users",
//   () => {
//     store.mutate(users);
//   },
//   BENCH.runs,
//   BENCH.warmups
// );

// store.purge();
store.mutate(users.map((u) => ({ ...u, __indexes__: "home-1" })));

// bench(
//   "Select by id",
//   () => {
//     store.select<any, any>({
//       from: "user",
//       fields: "*",
//       where: { id: 45876 },
//     });
//   },
//   BENCH.runs,
//   BENCH.warmups
// );

// bench(
//   "Select by username",
//   () => {
//     store.select<any, any>({
//       from: "user",
//       fields: "*",
//       where: { username: "Joey" },
//     });
//   },
//   BENCH.runs,
//   BENCH.warmups
// );

// bench(
//   "Select by username /w join",
//   () => {
//     store.select<any, any>({
//       from: "user",
//       fields: "*",
//       where: { username: "Joey" },
//       join: [
//         { on: "profileImage", fields: "*" },
//         { on: "gallery", fields: "*" },
//       ],
//     });
//   },
//   BENCH.runs,
//   BENCH.warmups
// );

// bench(
//   "Select by username /w fn",
//   () => {
//     store.select<any, any>({
//       from: "user",
//       fields: "*",
//       where: (f) => f.username === "Joey",
//     });
//   },
//   BENCH.runs,
//   BENCH.warmups
// );

// bench(
//   "Select by username /w fn /w join",
//   () => {
//     store.select<any, any>({
//       from: "user",
//       fields: "*",
//       where: (f) => f.username === "Joey",
//       join: [
//         { on: "profileImage", fields: "*" },
//         { on: "gallery", fields: "*" },
//       ],
//     });
//   },
//   BENCH.runs,
//   BENCH.warmups
// );

// store.subscribe(() => {
//   console.log("SUB", store.selectIndex("home-1", { user: {from: "user", fields: ["id"]} }));
// })

// store.mutate({id: 2, username: "TEST", __indexes__: "home-1"})
// store.mutate({id: 4, username: "TEST", __indexes__: "home-1"})