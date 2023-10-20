---
sidebar_position: 2
---

# Create a store

Create a model that represents the data and a store.

## Data structure

In this example, we are going to use this data structure. It is based on the `posts` data provided in [this section](./create-a-project#prepare-some-data). We will use `typescript` to define the structure of our objects. However, the example project is in `vanilla js`.

```ts

interface User {
  id: number;
  username: string;
  profileImage: Image;
}

interface Image {
  id: number;
  aspectRatio: number;
  thumbnails: Thumbnail[];
}

interface Thumbnail {
  id: number;
  uri: string;
}

interface Post {
  id: number;
  caption: string;
  createdAt: string;
  images: Image[];
  user: User;
}

```

Here is the relationship we can see based on the above structure.

- One `User` has one `Image` as `profileImage`
- One `Image` has many `Thumbnail` as `thumbnails`
- One `Post` has one `User` as `user`
- One `Post` has many `Image` as `images`

*Based on this, it's safe to say that we can possibly have a `user.posts`, where one `User` can have many `Post` objects, probably under the key `posts` (could be anything we want). Remember this, we'll come back to it later.*


## Create a model and define relationships

Now that we have an idea of what the data we will be upserting into the store looks like, we can start creating the model and define their relationships.

**API**: [`createRelationalObject()`](../apis/createRelationalObject)
```ts title="example-project/index.js"
import { createRelationalObject } from "@jjmyers/object-relationship-store";

const user = createRelationalObject("user")
const image = createRelationalObject("image")
const thumbnail = createRelationalObject("thumbnail")
const post = createRelationalObject("post")

// "Post" has one "User" as user
post.hasOne(user)

// "Post" has many "Image" as images
post.hasMany(image, "images")

// "User" has one "Image" as profileImage
user.hasOne(image, "profileImage")

// "Image" has many "Thumbnail" as thumbnails
image.hasMany(thumbnail, "thumbnails")

/**
 * "User" has many "Post" as posts
 * The example JSON data `posts` does not contain a user which has the field posts.
 * However, we can define this relationship.
 */ 
user.hasOne(post, "posts")
```

So far, we have used [`createRelationalObject()`](../apis/createRelationalObject) to define our objects and their relationships.  
*Note: Even though the data we receive does not contain a `User` object that has a field `posts` that contains many `Post` objects, we have still defined this relationship.*


## Create the store

Now we can create the **store** and pass our **models** into it. We will also have to tell the store how to identify an object.  
The store will use these [`identifier`](../apis/createStore#identifier) functions to identify the type of the object **if it is not specified in the object.** *(Will be discussed later.)*

**API**: [`createStore()`](../apis/createStore)
```ts title="example-project/index.js"
import { createStore } from "@jjmyers/object-relationship-store";

const store = createStore({

  // All the objects defined with createRelationalObject()
  relationalCreators: [
    user,
    image,
    thumbnail,
    post,
  ],

  identifier: {
    // If the field "username" is in the object, this is a "User" object.
    user: o => "username" in o,
    post: o => "caption" in o,
    image: o => "aspectRatio" in o,
    thumbnail: o => "uri" in o,
  }
});
```