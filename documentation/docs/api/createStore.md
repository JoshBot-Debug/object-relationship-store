---
sidebar_position: 2
---

# createStore()

Create the object relationship store.

## Basic usage

```ts
import { createStore, createRelationalObject } from "@jjmyers/object-relationship-store";

const user = createRelationalObject("user");
const image = createRelationalObject("image");

const store = createStore({
  relationalCreators: [
    user,
    image,
  ],
  identifier: {
    user: o => "username" in o,
    image: o => "uri" in o,
  }
});
```

## Properties

### `relationalCreators`

Expects an `Array` of `ORS.RelationalCreator` objects.

```ts
createStore({
  relationalCreators: [
    user,
    image,
  ]
});
```

### `identifier`

Expects an `object` where the `keys` are the [`names`](./createRelationalObject#name) of the [`ORS.RelationalCreator`](./createRelationalObject) objects and value is an identifier `Function` that returns a boolean. This `Function` will be used to identify an object when it is passed into the store.

```ts
createStore({
  identifier: {
    user: object => "username" in object,
    image: object => "uri" in object,
  }
});
```

### `indexes`

Expects an array of [`ORS.RelationalObjectIndex`](./createRelationalObjectIndex) objects

```ts
import { createStore, createRelationalObjectIndex } from "@jjmyers/object-relationship-store";

const postFeed = createRelationalObjectIndex("postFeed", [post]);

createStore({
  indexes: [
    postFeed
  ]
});
```

## Return values

```ts
const store = createStore({
  // ...properties
});

store.mutate()
store.mutateWhere()
store.select()
store.selectIndex()
store.destroy()
store.purge()
store.getReferences()
store.getState()
store.restore()
store.save()
store.subscribe()
```

### [`.mutate(payload)`](./store.mutate)

Push a payload into the store. Can create, update or delete objects in the store

Find out more about [`store.mutate()`](./store.mutate)

### .mutateWhere(selector, callback)

Push a payload into the store. Can create, update or delete objects in the store. The difference here is that it take in a `where` clause.

### .select(selector)

Select data from the store

Find out more about [`store.select()`](./store.select)

### .selectIndex(indexSelector)

Select data from an index in the store

Find out more about [`store.selectIndex()`](./store.selectIndex)

### .destroy(name)

Delete all objects associated with the `name`.

All `user` object in the store will be deleted.
```ts
store.destroy("user")
```


### .purge()

Delete all objects in the store.

```ts
store.purge()
```


### .getReferences()

Returns all object references

:::danger
Don't use this method, it will be removed in future versions. It's here just for debugging purposes.
:::
```ts
store.getReferences()
```

### .getState()

Returns all the objects in the store

:::info
Don't use this method, to get data from the store. Use [`store.select()`](./store.select).
:::
```ts
store.getState()
```

### .save(callback)

Save the current state of the store.

:::info
Use [`store.restore()`](./createStore#restoresavedstate) to restore the saved state.
:::
```ts
store.save(currentState => {
  // Save currentState to local storage.
})
```

### .restore(savedState)

Restore state from the saved state

:::info
Use [`store.save()`](./createStore#savecallback) to get `savedState`
:::
```ts

let savedState = null

store.save(currentState => {
  // Save currentState to local storage.
  savedState = currentState
})

store.restore(savedState)
```


### .subscribe()

Used to subscribe to changes that happed in the store.

:::tip
This method was created to help when integrating this library with React's `useSyncExternalStore()`
:::
```ts
store.subscribe()
```