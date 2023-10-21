---
sidebar_position: 4
---



# Read data

Read an object from the store. We will be using [`store.select()`](../apis/store.select) to retrieve data from the store.


## Get object by `primaryKey`

Select all [`fields`](../apis/store.select#fields) [`from`](../apis/store.select#from) `user` [`where`](../apis/store.select#where) `id` is 1.

When selecting by `primaryKey`, you will only receive one object or `null`.

Try selecting an ID that does not exist.

:::tip Selecting an object
When selecting `one` object from the store, selecting by `primaryKey` is the faster way to get data.
:::


```ts title="example-project/index.js"
import {posts} from "./data.js";

// Add some data to the store
store.mutate(posts);

const selectedUser = store.select({

  // From the 'user' model
  from: "user",

  // Return all fields
  // try passing ["id", "username"] into fields
  fields: "*",
  
  // Where the ID is 1
  where: {id: 1},
})

console.log(selectedUser);

```

Run `node index.js` and you should see this in the terminal.
```bash
{ id: 1, username: 'the_overlord', profileImage: 52, posts: [ 8, 7 ] }
```


## Get object by field value

Select all [`fields`](../apis/store.select#fields) [`from`](../apis/store.select#from) `user` [`where`](../apis/store.select#where) `username` starts with *qw*.

When selecting by any field that is not the `primaryKey`, you will receive an array of objects that matched the [`where`](../apis/store.select#where) clause.

:::tip Where clause
The [`where`](../apis/store.select#where) clause accepts an object, an array of objects or a function.
:::

```ts title="example-project/index.js"
import {posts} from "./data.js";

// Add some data to the store
store.mutate(posts);

const selectedUser = store.select({
  from: "user",
  fields: "*",
  where: {username: "qwerty"},
  // where: o => o.username.startsWith("qw"),
})

console.log(selectedUser);
```

Run `node index.js` and you should see this in the terminal.
```bash
[
  { id: 2, username: 'qwerty', profileImage: 48, posts: [ 10, 9, 6 ] }
]
```

## Get many objects

Select all [`fields`](../apis/store.select#fields) [`from`](../apis/store.select#from) `user` [`where`](../apis/store.select#where) `id` in 1,2.

You can get many objects by `primaryKey` by passing an array of objects into the [`where`](../apis/store.select#where) clause

:::tip Here's a tip
When a [`where`](../apis/store.select#where) clause contains a `primaryKey` field, all other fields are ignored and the data is selected by `primaryKey`.
`where: [{id: 1}, {id: 2, username: "Some non existent name"}]`

In this [`where`](../apis/store.select#where) clause, you will still get `user` 1 and 2.
:::

```ts title="example-project/index.js"
import {posts} from "./data.js";

// Add some data to the store
store.mutate(posts);

const selectedUser = store.select({
  from: "user",
  fields: "*",
  where: [{id: 1}, {id: 2}],
  // where: o => [1,2].includes(o.id),
})

console.log(selectedUser);
```

Run `node index.js` and you should see this in the terminal.
```bash
[
  {
    id: 1,
    username: 'the_overlord',
    profileImage: 52,
    posts: [ 8, 7 ]
  },
  { id: 2, username: 'qwerty', profileImage: 48, posts: [ 10, 9, 6 ] }
]
```

Try running the code below as well.

```ts title="example-project/index.js"
import {posts} from "./data.js";

// Add some data to the store
store.mutate(posts);

const selectedUser1 = store.select({
  from: "user",
  fields: "*",
  where: [{id: 1}, {username: "qwerty"}]
})

const selectedUser2 = store.select({
  from: "user",
  fields: "*",
  where: [{id: 1}, o => o.username === "qwerty"]
})

console.log(selectedUser1);
console.log(selectedUser2);
```

## Join objects

In the examples above, you would have noticed that the field value for `profileImage` was a `primaryKey` and the value for `posts` was an array of `primaryKey`.

Here we will [`join`](../apis/store.select#join) those objects.

:::tip Join
The [`join`](../apis/store.select#join) will not work if you do not select that field. In this example, we are selecting all fields `*`,
:::

```ts title="example-project/index.js"
import {posts} from "./data.js";

// Add some data to the store
store.mutate(posts);

const selectedUser = store.select({
  from: "user",

  // Try selecting only ["id", "profileImage"]
  fields: "*",
  where: {id: 1},
  join: [
    {
      on: "profileImage",
      fields: "*",
      join: [
        {on: "thumbnails", fields: "*"}
      ]
    },
    {on: "posts", fields: "*"}
  ]
})

console.log(selectedUser);
```

Run `node index.js` and you should see this in the terminal.
```bash
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

## Memonization

Results are memonized

```ts title="example-project/index.js"
import {posts} from "./data.js";

// Add some data to the store
store.mutate(posts);

const a = store.select({ from: "user", fields: ["id"], where: {id: 1} })

const b = store.select({ from: "user", fields: ["id"], where: {id: 1} })

const c = store.select({ from: "user", fields: ["id"], where: o => o.id === 1 })

const d = store.select({ from: "user", fields: ["id"], where: o => o.id === 1 })

const e = store.select({ from: "user", fields: ["id"], where: o => o.id === 2 })

// A and B are the same
console.log(a === b);

// A and C are NOT the same
console.log(a === c);

// C and D are the same
console.log(c === d);

// C and E are NOT the same
console.log(c === e);
```