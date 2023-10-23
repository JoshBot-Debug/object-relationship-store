---
sidebar_position: 4
---

# store.selectIndex()

Used to select data from an object `index` in the store

## Properties

`store.selectIndex(name, options)`

### `name`

The name of the `index` we want to select from. The structure of the name is important.

Lets say we name the `index` *`comments`*, when we select we need to pass the **[name]-[uniqueId]**.
So to select from the `comments` index, generally I'd imagine you would use `postId` or `articleId` or `blogId` as the `uniqueId` for the index.
This way for each `post`, `article` or `blog`, the `comments` index will be maintained seperately.

So we would select like this:
```ts
                //  index  - uniqueId
store.selectIndex(`comments-${postId}`)
```

### [`options`](./store.select#properties)

This property is the same as the arguments properties by [`store.select()`](./store.select#properties) 

The only difference here is that we can pass multiple `selectors`, one for each object in the `index`.

```ts
/**
 * Here we assume that on the Home Feed, we receive a mix of posts, articles and blogs.
 * This index was created to manage the order of those object.
 */
const homeFeed = createRelationalObjectIndex("homeFeed", [post, article, blog])

const store = createStore({
  // ...storeOptions
  indexes: [
    homeFeed
  ],
});

// Here we select data from the index, optionally, we can pass a different selector for each type of object.
store.selectIndex("homeFeed-main", {
  post: {
    from: "post",
    fields: "*"
  },
  article: {
    from: "article",
    fields: "*"
  },
  blog: {
    from: "blog",
    fields: "*"
  }
})
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
      <td><code>name</code></td>
      <td><code>string</code></td>
      <td><code>undefined</code></td>
      <td>The name of a the index.</td>
    </tr>
    <tr>
      <td><code>options</code></td>
      <td><code>Record&lt;string, selector&gt;</code></td>
      <td><code>undefined</code></td>
      <td>Used to select data from the respective object type.</td>
    </tr>
  </tbody>
</table>

### Return value

Same return value as [`store.select()`](./store.select#return-value)