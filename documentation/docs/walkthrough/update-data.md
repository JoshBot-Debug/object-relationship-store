---
sidebar_position: 5
---



# Update data

Update an object in the store



## Update one object

Updating an object is the same as setting an object in the store. The only difference here is that the object with that `id` already exists in the store.

Here we will add a **new** user object into the store and then update it.

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