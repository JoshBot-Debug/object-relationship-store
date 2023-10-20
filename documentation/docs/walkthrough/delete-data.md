---
sidebar_position: 4
---



# Delete data

Delete an object from the store



## Delete one object

When deleting an object from the store, a 2 rules apply.

- All other **references** to the **deleted object** will be cleaned up.
- All **orphaned children** will be deleted.

If you do not want this behaviour, you will have to do a **soft delete**. If you don't know what a **soft delete** is, ask ChatGPT!

***Read [`store.mutate()`](../apis/store.mutate). For more information on dealing with many objects, etc.***

```ts title="example-project/index.js"

const userObject = {
  id: 1,
  username: "the_overlord",
}

store.mutate(userObject);

console.log("Before", store.getState())

const updatedUser = {
  id: 1,
  username: "Update Name",
}

store.mutate(updatedUser);

console.log("After", store.getState())
```

Run `node index.js` and you should see this in the terminal.
```bash
Before { user: { '1': { id: 1, username: 'the_overlord' } } }
After { user: { '1': { id: 1, username: 'Update Name' } } }
```