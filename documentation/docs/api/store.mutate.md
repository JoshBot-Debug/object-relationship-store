---
sidebar_position: 3
---

# store.mutate()

To make any changes to the data in the `store`, `store.mutate()` will be used.

- Create data
- Update data
- Delete data

## Usage

### Create an object
```ts
store.mutate({
  id: 1,
  username: "the_overlord"
})
```

### Update an object
```ts
store.mutate({
  id: 1,
  username: "Updated!"
})
```

### Delete an object

:::note
Check [`__destroy__`](./store.mutate#__destroy__) and [`__identify__`](./store.mutate#__identify__)
:::
```ts
store.mutate({
  id: 1,
  __identify__: "user",
  __destroy__: true,
})
```

## Payload

The `payload` is an object that we want to create/update in the store.

```ts
const payload = { id: 1, username: "the_overlord" }
store.mutate(payload)
```

Payloads have 4 special fields

- **\_\_identify\_\_** a *string*, to tell the store what type of object this is.
- **\_\_indexes\_\_** a *string[]*, to tell the store which `indexes` this object belongs to.
- **\_\_removeFromIndexes\_\_** a *string[]*, to tell the store which `indexes` we should remove this object from.
- **\_\_destroy\_\_** a *boolean*, to tell the store that we want to delete this object from the store.


## \_\_identify\_\_

There are two ways an the `store` can identify the type of an object.

- Through the [`identifier`](./createStore#identifier)
- By adding \_\_identify\_\_ in the object

Adding data will be faster when using \_\_identify\_\_ in the object compaired to the [`identifier`](./createStore#identifier) function.

If \_\_identify\_\_ is found in the object, the store will not use the [`identifier`](./createStore#identifier) function.

Here the [`identifier`](./createStore#identifier) function will not know that this object is a `user` object, so we add \_\_identify\_\_ in the object to tell the store that this is a `user` object.

```ts
const store = createStore({
  // ...properties
  identifier: {
    user: o => "username" in o,
  }
});

store.mutate({
  id: 1,
  age: 25,
  __identify__: "user",
})
```

## \_\_indexes\_\_

When we add some object to the store or create a new object, we may need to add the objects to an [`index`](./createStore#indexes)

```ts
store.mutate({
  id: 1,
  age: 25,
  __indexes__: ["postFeed-home"]
})
```

When using an index, we folllow this naming structure **[indexName]-[uniqueKey]**

This way we can use the same index for multiple pages.

Example:
```ts
// We have a comments page, for each post.
const commentsIndex = createRelationalObjectIndex("commentsIndex", [comment]);

// Here is how we will select data in this index
// Post ID will be passed dynamically.
// So for each post comments page, we will maintain a seperate index of comments.
store.selectIndex(`commentsIndex-${postId}`, options);

// Add one comment to the store and to the index 'commentsIndex'
store.mutate({
  // ...comment
  __indexes__: [`commentsIndex-${postId}`]
})
```

## \_\_removeFromIndexes\_\_

To remove an object from an `index` but not from the `store`, we use `__removeFromIndexes__`.

:::note
Over here we passed the `id` of the comment, and used `__identify__` to identify the object as a comment and `__removeFromIndexes__` to remove it from the index.
:::

```ts
store.mutate({
  id: 10,
  __identify__: "comment",
  __removeFromIndexes__: [`commentsIndex-${postId}`]
})
```


## \_\_destroy\_\_

To delete an object from the store, pass `__destroy__` as `true`.

:::note
All references to this object's `primaryKey` will be removed.

All orphaned children will be deleted.

To keep the orphaned children and references, you must do a `soft delete`. *(probably using a field like 'isDeleted' to know if the object is deleted.)*
:::

```ts
store.mutate({
  id: 10,
  __identify__: "comment",
  __destroy__: true
})
```