---
sidebar_position: 6
---

# createRelationalObjectIndex()

Used to define an object index, to keep track of which objects are on which page. Built to help with pagination.


## Basic usage

```ts
import { createRelationalObjectIndex } from "@jjmyers/object-relationship-store";

const homeFeed = createRelationalObjectIndex("homeFeed", [post, article, blog], (a, b) => a.id > b.id ? -1 : 1);

const store = createStore({
  // ...storeOptions
  indexes: [
    homeFeed
  ],
});
```

## Properties

`createRelationalObjectIndex(name, relationalCreators, sortingFunction)`

### `name`

The name of the index. Will be used when selecting data via [`store.selectIndex()`](./store.selectIndex#name).

```ts
createRelationalObjectIndex("homeFeed");
```

### `relationalCreators`

An array of object types this `index` is expected to have. Will be able to pass custom selectors when select data from this index using [`store.selectIndex()`](./store.selectIndex#options).

```ts
createRelationalObjectIndex("homeFeed", [post, article, blog]);
```

### `sortingFunction`

Sort the objects in a specific order. When a new object is inserted or deleted, the `sortingFunction` will make sure that the order of the index is correct.

```ts
createRelationalObjectIndex("homeFeed", [...], (a, b) => a.id > b.id ? -1 : 1);
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
      <td><code>relationalCreators</code></td>
      <td><code>ORS.RelationalCreators[]</code></td>
      <td><code>undefined</code></td>
      <td>An array of relationalCreators (<code>objects</code>) this index is expected to have.</td>
    </tr>
    <tr>
      <td><code>sortingFunction</code></td>
      <td><code>Function</code></td>
      <td><code>undefined</code></td>
      <td>A sorting function. Returns 1 or -1</td>
    </tr>
  </tbody>
</table>
