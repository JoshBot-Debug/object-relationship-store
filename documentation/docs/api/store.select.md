---
sidebar_position: 4
---

# store.select()

Used to select data from the store


## Basic usage

```ts
import { createStore } from "@jjmyers/object-relationship-store";

const store = createStore({
  // ...storeOptions
});

store.select({
  from: "user",
  where: { id: 1 },
  fields: ["id", "username", "profileImage"],
  join: [
    {
      on: "profileImage",
      fields: "*",
      join: [
        { on: "thumbnails", fields: "*" }
      ]
    }
  ]
})
```

## Properties

`store.select({ from, where, fields, join })`

### `from`

The name of the [`ORS.RelationalCreator`](./createRelationalObject) that you want to select `objects` from.

```ts
import { createStore, createRelationalObject } from "@jjmyers/object-relationship-store";

const user = createRelationalObject("user");

const store = createStore({
  // ...storeOptions
  relationalCreators: [
    // ...relationalCreators
    user
  ]
});

store.select({
  from: "user",
  // ...select
})
```

### `where`

The `where` clause accepts a few different values.
- an object containing the `primaryKey` i.e. `{id: 1}`
- an object containing a `field` i.e. `{username: "the_overlord"}`
- a function that returns a `boolean`: `(object) => object.age > 25`
- an array of of the above three i.e. `[ {id: 1}, {username: "the_overlord"}, object.username.startsWith("the_") ]`

The return type depends on the `where` clause. Except for the first example where you select by `primaryKey`, all the other will return an `array` of objects that matched. A `primaryKey` search will return a single `object`.

```ts
store.select({
  from: "user",
  fields: "*",

  // Will return a single object
  // where: { id: 1 },

  // Will return an array of objects
  // where: [ { id: 1 }, { id: 2 } ],
  // where: { username: "the_overlord" },
  // where: (object) => object.username.startsWith("the_"),
  where: [ { id: 1 }, { username: "the_overlord" }, (object) => object.username.startsWith("the_") ],
})
```

### `fields`

The fields which you want to return. The property `field` accepts two types of values.
- An array of strings: `[ "id", "username" ]`
- An asterisk, which symbolises all fields: `*`

:::tip
The result of the return value from `store.select()` is memonized.  
If you select only the fields you need and some other unselected field's value changes in the same object, the object returned will be the still be same.
:::

```ts
store.select({
  from: "user",
  fields: [ "id", "username" ],
  // fields: "*",
})
```


### `join`

When an object contains a reference to another object or to many other objects, it will return the `primaryKey` or an `array` of `primaryKey`.

Example:~
```ts
store.select({
  from: "user",
  fields: "*",
  where: { id: 1 },
})

// Result
{
  id: 1,
  username: "the_overlord",
  profileImage: 52,
  posts: [ 8, 7 ]
}
```

To convert these `references` to `objects`, we need to join them.

```ts
store.select({
  from: "user",
  fields: "*",
  where: { id: 1 },
  join: [
    { on: "posts", fields: "*" },
    {
      on: "profileImage",
      fields: "*",
      join: [
        { on: "thumbnails", fields: "*" }
      ]
    }
  ]
})

// Result
{
  id: 1,
  username: 'the_overlord',
  profileImage: { id: 52, aspectRatio: 1.38378, thumbnails: [ [Object], [Object] ] },
  posts: [
    {
      id: 8,
      caption: 'This is post 8',
      createdAt: '2023-06-21T16:13:41.000Z',
      images: [Array],
      user: 1
    },
    {
      id: 7,
      caption: 'This is post 7',
      createdAt: '2023-06-21T13:48:10.000Z',
      images: [Array],
      user: 1
    }
  ]
}
```


## API

### Properties

<table>
  <thead>
    <tr>
      <th width="10%">Property</th>
      <th width="10%">Type</th>
      <th width="10%">Default</th>
      <th width="40%">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>from</code></td>
      <td><code>string</code></td>
      <td><code>undefined</code></td>
      <td>The name of an <code>ORS.RelationalCreator</code></td>
    </tr>
    <tr>
      <td><code>where</code></td>
      <td><code>object</code> | <code>object[]</code> | <code>Function</code> | <code>Function[]</code> | <code>(Function | object)[]</code></td>
      <td><code>undefined</code></td>
      <td>Used to find matching object in the store.</td>
    </tr>
    <tr>
      <td><code>fields</code></td>
      <td><code>string[]</code></td>
      <td><code>undefined</code></td>
      <td>Determines the fields that will be returned in the object.</td>
    </tr>
    <tr>
      <td><code>join</code></td>
      <td><code>object[]</code></td>
      <td><code>undefined</code></td>
      <td>Replaces references in the object with the referenced object(s).</td>
    </tr>
  </tbody>
</table>

### Return value

`store.select()` returns a memonised object that contains data based on the selector options passed in.