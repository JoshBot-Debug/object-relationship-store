---
sidebar_position: 3
---



# Create data

Create an object in the store



## Create one object

There are **3 different** ways data can be set in the store. This applies to creating, updating and deleting data.
- Using [`store.mutate()`](../apis/store.mutate)
- Using [`store.mutate()`](../apis/store.mutate) with [`__identify__`](../apis/store.mutate#__identify__)
- Using [`store.mutate()`](../apis/store.mutate) with [`withOptions()`](../apis/withOptions) 



### Using [`store.mutate()`](../apis/store.mutate)

Here we will add a new user object into the store.

```ts title="example-project/index.js"

const userObject = {
  id: 1,
  username: "the_overlord",
}

store.mutate(userObject);

console.log(store.getState())
```

Run `node index.js` and you should see this in the terminal.
```bash
{ user: { '1': { id: 1, username: 'the_overlord' } } }
```



### Using [`store.mutate()`](../apis/store.mutate) with [`__identify__`](../apis/store.mutate#__identify__)

When we created our store, in the identifier, we used the field `username`
to identify an object as a `User` object.  
Here we upsert a user object without the field `username` and instead passed [`__identify__`](../apis/store.mutate#__identify__) to tell
the store what type of object we are dealing with.

Check the value of `user` in `identifier` in [`the store we created`](./create-a-store#create-the-store)
```ts title="example-project/index.js"

// username is not in this object
const userObject = {
  id: 1,
}

// Without specifying __identify__, this would fail
store.mutate({...userObject, __identify__: "user"});

console.log(store.getState())
```

Run `node index.js` and you should see this in the terminal.
```bash
{ user: { '1': { id: 1 } } }
```



### Using [`store.mutate()`](../apis/store.mutate) with [`withOptions()`](../apis/withOptions)

[`withOptions()`](../apis/withOptions) is a helper function used to set values like [`__identify__`](../apis/store.mutate#__identify__) 
on an object(s). We will cover all the rest later.

This helper function may prove to be useful sooner or later.

```ts title="example-project/index.js"
import { withOptions } from "@jjmyers/object-relationship-store";

// username is not in this object
const userObject = {
  id: 1,
}

// Without specifying __identify__, this would fail
store.mutate(withOptions(userObject, { __identify__: "user" }));

console.log(store.getState())
```

Run `node index.js` and you should see this in the terminal.
```bash
{ user: { '1': { id: 1 } } }
```

## Set many objects

To set many object, just pass an array of objects instead of a single object!

```ts title="example-project/index.js"
import { withOptions } from "@jjmyers/object-relationship-store";

const userObjects = [
  { id: 1, username: "the_overlord" },
  { id: 2, username: "qwerty" }
]

// All three methods of upserting data work
store.mutate(withOptions(userObjects, { __identify__: "user" }));
store.mutate(userObjects);

console.log(store.getState())
```

Run `node index.js` and you should see this in the terminal.
```bash
{
  user: {
    '1': { id: 1, username: 'the_overlord' },
    '2': { id: 2, username: 'qwerty' }
  }
}
```