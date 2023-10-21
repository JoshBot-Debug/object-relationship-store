---
sidebar_position: 6
---



# Delete data

Delete an object from the store



## Delete one object

When deleting an object from the store, 2 rules apply.

- All other **references** to the **deleted object** will be cleaned up.
- All **orphaned children** will be deleted.

If you do not want this behaviour, you will have to do a **soft delete**. If you don't know what a **soft delete** is, ask ChatGPT!

Once again, we will be using [`store.mutate()`](../apis/store.mutate)

```ts title="example-project/index.js"
import { posts } from "./data.js";

const getPost = () => store.select({ from: "post", fields: ["id"], where: { id: 7 } })

/**
 * Earlier, we defined this
 * 
 * user.hasMany(post, "posts")
 * 
 * Because we created this relationship when defining our model,
 * when a user is deleted, all orphaned posts are deleted
 * If you comment this line, the post will persist even after deleting the user.
 */

store.mutate(posts);

console.log("Before", getPost())

const updatedUser = {
  id: 1,
  __identify__: "user",
  __destroy__: true,
}

store.mutate(updatedUser);

console.log("After", getPost())
```

All orphaned children are removed an all foreign key references are removed.

Run `node index.js` and you should see this in the terminal.
```bash
Before { id: 7 }
After null
```


## Delete many objects

This is the same as deleting one object, except we will pass an array of object to [`store.mutate()`](../apis/store.mutate)

:::tip Using [`withOptions()`](../apis/withOptions)
Here we used the helper function [`withOptions()`](../apis/withOptions) to apply a common payload to all `user` objects in `usersToDelete`
:::
```ts
const usersToDelete = [{id: 1}, {id: 2}]
store.mutate(withOptions(usersToDelete, { __identify__: "user", __destroy__: true }));
```