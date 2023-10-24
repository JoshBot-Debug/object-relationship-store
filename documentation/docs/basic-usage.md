---
sidebar_position: 1
---

# Basic Usage

Let's discover **how to use [@jjmyers/object-relationship-store](https://www.npmjs.com/package/@jjmyers/object-relationship-store)**.

## Getting Started

Get started by **installing the package** in you project.

```bash
npm install @jjmyers/object-relationship-store
```

## Let's look at a JSON object

In this example, we are going to use this data structure. All types are defined using `typescript`

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

Based on the data structure above, we can see that this will be `post` object:

```json
  {
    "id": 10,
    "caption": "This is post 10",
    "createdAt": "2023-06-26T14:24:04.000Z",
    "images": [
      {
        "id": 54,
        "aspectRatio": 0.890625,
        "thumbnails": [
          { "id": 206, "uri": "/post.1687789438225.0-1.128.jpeg" },
          { "id": 207, "uri": "/post.1687789438225.0-2.256.jpeg" },
        ]
      },
      {
        "id": 55,
        "aspectRatio": 0.773438,
        "thumbnails": [
          { "id": 211, "uri": "/post.1687789438226.1-1.128.jpeg" },
          { "id": 212, "uri": "/post.1687789438226.1-2.256.jpeg" },
        ]
      }
    ],
    "user": {
      "id": 2,
      "username": "qwerty",
      "profileImage": {
        "id": 48,
        "aspectRatio": 0.777344,
        "thumbnails": [
          { "id": 186, "uri": "/profilePhoto.256.jpeg?1687444436097" },
          { "id": 187, "uri": "/profilePhoto.512.jpeg?1687444436097" },
        ]
      }
    }
  }
```

## Create the model for this data

Lets define the relationship of these objects so that object-relationship-store knows what data to expect and how they are related to each other.

Before we move forward, remember this '**All objects must contain a unique identifier**' if they are to be upserted into the store. Generally this is the object's `primary key` which is the `id` field.

- Import [`createRelationalObject()`](./api/createRelationalObject). We will use [`createRelationalObject()`](./api/createRelationalObject) to define our objects.

```ts
import { createRelationalObject } from "@jjmyers/object-relationship-store";
```

- Define all objects. [`createRelationalObject()`](./api/createRelationalObject) accepts two arguments
the first argument is the `name` of the object, the second is the `primaryKey` field. All objects must have a unique identifier, this is usually the `primaryKey` which is the field `id`. **The default value for *primaryKey* is *id***.

```ts
// If left blank, the primary key is "id"
const user = createRelationalObject("user", "id")
const image = createRelationalObject("image")
const thumbnail = createRelationalObject("thumbnail")
const post = createRelationalObject("post")
```

- Define the relationship between each object. The [`hasOne()`](./api/createRelationalObject#hasoneobject-as) and [`hasMany()`](./api/createRelationalObject#hasmanyobject-as) properties accepts two arguments. The first argument is the object we are referring to, the second argument is an alias. By default the name of the field in the target object, is the name of the referred object. In this case, a `Post` has a field `user` which is a `User` object. A `Post` has a field `images` which is an array of `Image` objects.

```ts
// "Post" has one "User" as user
post.hasOne(user)

// "Post" has many "Image" as images
post.hasMany(image, "images")

// "User" has one "Image" as profileImage
user.hasOne(image, "profileImage")

// "Image" has many "Thumbnail" as thumbnails
image.hasMany(thumbnail, "thumbnails")
```

## Create a store

Once you have finished defining the relationship of you objects, you are ready to create a store.

- Pass all created objects into the property [`relationalCreators`](./api/createStore#relationalcreators)
- Pass an identifier function for each object. ***This function will be used to identify an object when it is upserted into the store***

```ts
const store = createStore({

  // All my objects defined with createRelationalObject()
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

## You're done!

Lets look at what we've got so far

```ts
import { createRelationalObject, createStore } from "@jjmyers/object-relationship-store";

const user = createRelationalObject("user")
const image = createRelationalObject("image")
const thumbnail = createRelationalObject("thumbnail")
const post = createRelationalObject("post")

post.hasOne(user)
post.hasMany(image, "images")
user.hasOne(image, "profileImage")
image.hasMany(thumbnail, "thumbnails")

const store = createStore({
  relationalCreators: [
    user,
    image,
    thumbnail,
    post,
  ],
  identifier: {
    user: o => "username" in o,
    post: o => "caption" in o,
    image: o => "aspectRatio" in o,
    thumbnail: o => "uri" in o,
  }
});
```

You are now ready to upsert the following objects: **User**, **Post**, **Image**, **Thumbnail**. The data will be normalised based on the relationship defined and selecting the data will be just as easy!

## Mutate the store

Use [`store.mutate()`](./api/store.mutate) to set, update, delete objects. In fact, it's used to do everyting you can imagine with an object.

You'll need to read the full documentation to understand it completely. However, if you just want an example and you'll take it from there, here's your example.

```ts
const post: Post = {id: 1, ...otherFields}

store.mutate(post)
```

- Upsert many objects
```ts
const posts: Post[] = [...]

store.mutate(posts)
```

- Update an object
```ts
store.mutate({
  id: 1 // The post id that we want to update
  content: "Updated content"
})
```

- Update many objects
```ts
store.mutate([
  {
    id: 1 // The post id that we want to update
    content: "Updated content 1"
  },
  {
    id: 2 // The post id that we want to update
    content: "Updated content 2"
  }
])
```

- Delete an object

:::note
Check [`__destroy__`](./api/store.mutate#__destroy__) and [`__identify__`](./api/store.mutate#__identify__)
:::
```ts
store.mutate({
  id: 1 // The post id that we want to update

  /**
   * The identifier function will not be able to identify this 
   * object, so we use __identify__ to help it figure out what 
   * object this is.
   */
  __identify__: "post", 

  /**
   * This will delete the object from the store, 
   * all references will be removed.
   */
  __destroy__: true,
})
```

## Select data from the store

Here is an example of how you would select data from the store

```ts
const result = store.select({
  from: "image",
  fields: "*",
  where: { aspectRatio: 0.777344 },
  join: [
    {
      on: "thumbnails",
      fields: ["id"]
    }
  ],
})
```

## If you've made it this far, you are awesome. 

That's all we're going to show here. Everything else will be covered [in the walkthrough](./walkthrough/create-a-project)