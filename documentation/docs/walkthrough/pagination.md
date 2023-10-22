---
sidebar_position: 7
---


# Pagination

There is a special type of object we use to handle data on different pages where the order matters.


## The problem

Here is the problem we face when dealing with **feeds**. *(Infinite scrolling feeds on mobile apps/web apps)*

Let's say we have **two** types of pages in our app that have **feeds**.
- `Home Feed` - Which contains many posts
- `Profile Feed` - Which contains many posts created by that user, liked by that user or even shared by that user.

Everytime we visit the `Home Page` we need to see the `Home Feed`, when we click on a `Profile Page`, we need to see the `Profile Feed` for that user id. The order in which the posts come in is important.

When we add a new `object` to the `store`, we need to update a given feed.

Let's say we create a new `Post` and the server returns the new `Post`, now we add it in the store, then next thing we need to do is add it to our `Profile Feed` where the userId is our id, and we need to add it to the `Home Feed`.

## The solution

Instead of manually handling adding a `Post` to certain pages after some action, it would be better if the `post` just adds itself and sorts itself correctly.

This is why we have [`createRelationalObjectIndex()`](../api/createRelationalObjectIndex). We can create an index that [`sorts`](../api/createRelationalObjectIndex#sort) our objects and maintains an index for us to perform [`select`](../api/store.select) operations on.


## Setting up [`createRelationalObjectIndex()`](../api/createRelationalObjectIndex)

First we need to define an index and pass it to our [`createStore()`](../api/createStore#indexes) function.

```ts title="example-project/index.js"
const user = createRelationalObject("user")
const image = createRelationalObject("image")
const thumbnail = createRelationalObject("thumbnail")
const post = createRelationalObject("post")

post.hasOne(user)
post.hasMany(image, "images")
user.hasOne(image, "profileImage")
image.hasMany(thumbnail, "thumbnails")
user.hasMany(post, "posts")

// Create a postFeed index object.
// createRelationalObjectIndex(name, ORS.RelationalCreator[], sortingFunction)
const postFeed = createRelationalObjectIndex("postFeed", [post], (a, b) => a.id > b.id ? 1 : -1)

const store = createStore({

  relationalCreators: [
    user,
    image,
    thumbnail,
    post,
  ],

  // Pass all indexes here
  indexes: [
    postFeed
  ],

  identifier: {
    user: o => "username" in o,
    post: o => "caption" in o,
    image: o => "aspectRatio" in o,
    thumbnail: o => "uri" in o,
  }
});
```

## Naming, Creating and Selecting from the object index

One important thing to note is how object indexes are named.

We named the index **postFeed**

We selected the data using [`store.selectIndex()`](../api/store.selectIndex)


:::tip Important Links
Read up on [`createRelationalObjectIndex()`](../api/createRelationalObjectIndex) and [`__indexes__`](../api/store.mutate#__indexes__) for more information
:::
```ts
const postFeed = createRelationalObjectIndex("postFeed", [post], (a, b) => a.id > b.id ? -1 : 1)
```

When we upsert data into this feed, we need to specify the **`name`-`uniqueKey`**. The `uniqueKey` can be anything. If this index contained posts related to a particular `userId`, the name would have been something like `postFeed-1`.

```ts
store.mutate({...myPost}, {__indexes__: ["postFeed-home"]});
```

When we select data from this index using a [`name`](../api/store.selectIndex#name), we need to use **`name`-`uniqueKey`** to identify the index and pass a [`selector`](../api/store.select) for that object


:::tip Important Links
Read up on [`store.selectIndex()`](../api/store.selectIndex) for more information
:::
```ts
const homeFeed = store.selectIndex(
  // The name of the index (name-uniqueKey)
  `postFeed-home`,
  {
    // This index contains post objects, so pass a selector for post
    // This is optional
    post: {
      from: "post",
      fields: "*",
    }
  }
)
```



## Using the object index for pagination

Lets do this using examples.

We will make use of [`withOptions()`](../api/withOptions) here.

### Home Page

Here we retrieve many posts from a server.

```ts title="example-project/index.js"
import { posts } from "./data.js";

// We got many posts from our API request.
// Endpoint: /home
const results = posts;

// Here we upsert these posts into the store.
// We also use __indexes__ to tell the store that these posts belong to the index 'postFeed-home'
store.mutate(withOptions(results, {__indexes__: ["postFeed-home"]}));

// With a custom selector for posts
const homeFeed = store.selectIndex(`postFeed-home`, {
  post: {
    from: "post",
    fields: ["id"],
  }
})

// Without a custom selector
// const homeFeed = store.selectIndex(`postFeed-home`)


console.log("homeFeed", homeFeed)
```
We received all posts in decending order because of our [`sort`](../api/createRelationalObjectIndex#sort) function
Run `node index.js` and you should see this in the terminal.
```bash
homeFeed [ { id: 10 }, { id: 9 }, { id: 8 }, { id: 7 }, { id: 6 } ]
```


### Profile Page


```ts title="example-project/index.js"
// ...Home Page Code...

// Endpoint: /user/1

// In reality, all the results will belond to user 1 so we just upsert it like this.
// store.mutate(withOptions(results, {__indexes__: ["postFeed-1"]}));

// However, in this example, posts contain everyting, even user 2 posts, so we will filter it
store.mutate(withOptions(results, {__indexes__: o => o.user.id === 1 ? ["postFeed-1"] : undefined}));

const profileFeed = store.selectIndex(`postFeed-1`, {
  post: {
    from: "post",
    fields: ["id"],
  }
})

console.log("profileFeed", profileFeed)
```
We received all posts in decending order because of our [`sort`](../api/createRelationalObjectIndex#sort) function
Run `node index.js` and you should see this in the terminal.
```bash
profileFeed [ { id: 8 }, { id: 7 } ]
homeFeed [ { id: 10 }, { id: 9 }, { id: 8 }, { id: 7 }, { id: 6 } ]
```

### Add a new post.

Let's say we scroll down on the `Profile Feed` and we get a new post that belongs to user 1. We want that post to be present on the `Profile Feed` but not on the `Home Feed`.

If you've done a feed, I'm sure you know why that is.

However, if it's not clear, here is a better explaination.

On the `Profile Feed`, we scroll down and eventually load all posts that were created by that user. When we go back to the `Home Feed`, we do not want to see those posts on the home feed because the order would be wrong. When you scroll down on the `Home Feed`, you'll keep seeing the oldest post created by user 1 because the `Home Feed` is sorted by id.

The `Home Feed` index and `Profile Feed` index must maintain a seperate index.

The user created a new post, it needs to be added to both feeds

```ts
// ...Home Page Code...
// ...Profile Page Code...

// The user created a new post, it needs to be added to both feeds
const createdPost = {id: 11}
store.mutate(withOptions(createdPost, { __identify__: "post", __indexes__: ["postFeed-1", "postFeed-home"] }));

console.log("profileFeed", store.selectIndex(`postFeed-home`, {
  post: {
    from: "post",
    fields: ["id"],
  }
}))

console.log("homeFeed", store.selectIndex(`postFeed-1`, {
  post: {
    from: "post",
    fields: ["id"],
  }
}))
```

Run `node index.js` and you should see this in the terminal.
```bash
profileFeed [ { id: 11 }, { id: 8 }, { id: 7 } ]
homeFeed [ { id: 11 }, { id: 10 }, { id: 9 }, { id: 8 }, { id: 7 }, { id: 6 } ]
```

### Remove a post.

The user deleted a post/hide a post, it needs to be remove from both feeds

```ts
// Delete the post that was added
// store.mutate({id: 8, __identify__: "post", __destroy__: true});

// Keep the post, just remove it from the index(s)
store.mutate({id: 8, __identify__: "post", __removeFromIndexes__: ["postFeed-1", "postFeed-home"] });

console.log("profileFeed", store.selectIndex(`postFeed-home`, {
  post: {
    from: "post",
    fields: ["id"],
  }
}))

console.log("homeFeed", store.selectIndex(`postFeed-1`, {
  post: {
    from: "post",
    fields: ["id"],
  }
}))
```

As you can see, post with id 8 has been removed from both indexes
Run `node index.js` and you should see this in the terminal.
```bash
ProfileFeed [ { id: 11 }, { id: 10 }, { id: 9 }, { id: 7 }, { id: 6 } ]
homeFeed [ { id: 11 }, { id: 7 } ]
```
