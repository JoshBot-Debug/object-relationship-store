---
sidebar_position: 5
---



# Update data

Update an object in the store



## Update an object

Updating an object is the same as setting an object in the store. The only difference here is that the object with that `primaryKey` already exists in the store.

Here we will add a **new** user object into the store and then **update** it.

***Read [`store.mutate()`](../apis/store.mutate). For more information on dealing with many objects, etc.***

```ts title="example-project/index.js"

const userObject = {
  id: 1,
  username: "the_overlord",
}

const getUserOne = () => store.select({ from: "user", fields: ["id", "username"], where: {id: 1} })

store.mutate(userObject);

console.log("Before", getUserOne())

const updatedUser = {
  id: 1,
  username: "Update Name",
}

store.mutate(updatedUser);

console.log("After", getUserOne())
```

Run `node index.js` and you should see this in the terminal.
```bash
Before { id: 1, username: 'the_overlord' }
After { id: 1, username: 'Update Name' }
```


## Deep Update

If a new object is set in the store, and the object contains a child that already exists, it will be updated if there are changes.

```ts title="example-project/index.js"
import { posts } from "./data.js";

store.mutate(posts);

const getUserOne = () => store.select({ from: "user", fields: ["id", "username"], where: {id: 1} })

console.log("Before", getUserOne())

const updatedPost = {
  id: 8,
  __identify__: "post",
  user: {
    id: 1,
    username: "Updated!"
  }
}

store.mutate(updatedPost);

console.log("After", getUserOne())
```

Run `node index.js` and you should see this in the terminal.
```bash
Before { id: 1, username: 'the_overlord' }
After { id: 1, username: 'Updated!' }
```


## Update foreign key references

Let's say we have a `Post` object, the post belongs to `User` 1 and we want to change it to `User` 2.


```ts title="example-project/index.js"
import { posts } from "./data.js";

store.mutate(posts);

const getPost = () => store.select({
  from: "post",
  fields: ["id", "user"],
  where: { id: 8 },
  join: [{ on: "user", fields: ["id", "username"] }]
})

console.log("Before", getPost())

const updatedPost = {
  id: 8,
  __identify__: "post",
  user: 2
  // user: {id: 2, __identify__: "user"}
}

store.mutate(updatedPost);

console.log("After", getPost())
```

Run `node index.js` and you should see this in the terminal.
```bash
Before { id: 8, user: { id: 1, username: 'the_overlord' } }
After { id: 8, user: { id: 2, username: 'qwerty' } }
```

## Remove a foreign key reference

Sometimes we may want to remove a foreign key reference

```ts title="example-project/index.js"
import { posts } from "./data.js";

store.mutate(posts);

const getPost = () => store.select({
  from: "post",
  fields: ["id", "user"],
  where: { id: 8 },
  join: [{ on: "user", fields: ["id", "username"] }]
})

const getUser = () => store.select({
  from: "user",
  fields: ["id", "posts"],
  where: { id: 1 },
})


console.log("Post Before", getPost())
console.log("User Before", getUser())

const updatedPost = {
  id: 8,
  __identify__: "post",
  user: null // set as null to remove the reference
}

store.mutate(updatedPost);

console.log("Post After", getPost())
console.log("User After", getUser())
```

Run `node index.js` and you should see this in the terminal.
```bash
Post Before { id: 8, user: { id: 1, username: 'the_overlord' } }
User Before { id: 1, posts: [ 8, 7 ] }
Post After { id: 8 }
User After { id: 1, posts: [ 7 ] }
```

This can also be done the other way around by removing `post` 7 from `user` 1


```ts title="example-project/index.js"
import { posts } from "./data.js";

store.mutate(posts);

const getPost = () => store.select({
  from: "post",
  fields: ["id", "user"],
  where: { id: 8 },
  join: [{ on: "user", fields: ["id", "username"] }]
})

const getUser = () => store.select({
  from: "user",
  fields: ["id", "posts"],
  where: { id: 1 },
})


console.log("Post Before", getPost())
console.log("User Before", getUser())

const updatedPost = {
  id: 1,
  __identify__: "user",
  posts: [7] // removing post 8 from user 1
}

store.mutate(updatedPost);

console.log("Post After", getPost())
console.log("User After", getUser())
```

Run `node index.js` and you should see this in the terminal.
```bash
Post Before { id: 8, user: { id: 1, username: 'the_overlord' } }
User Before { id: 1, posts: [ 8, 7 ] }
Post After { id: 8 }
User After { id: 1, posts: [ 7 ] }
```