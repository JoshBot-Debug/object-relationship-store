---
sidebar_position: 1
---

# createRelationalObject()

Used to define the object and its relationships with other objects.

## Basic usage

```ts
import { createRelationalObject } from "@jjmyers/object-relationship-store";

const user = createRelationalObject("user");
const image = createRelationalObject("image");

user.hasOne(image, "profileImage");
```

## Properties

`createRelationalObject(name, primaryKey)`

### `name`

Assigns the given name to the object. The object will be selected by the give name when using [`store.select()`](./store.select) or [`store.selectIndex()`](./store.select)

```ts
createRelationalObject("user");
```

### `primaryKey`

The field in the object that will be used as a `primaryKey` to identify the object.

`default value` id

```ts
createRelationalObject("user", "id");
```

## Return values

```ts
const user = createRelationalObject("user");

user.hasOne();
user.hasMany();
```


### `hasOne(object, as)`

Tells the target object that it has one field that contains another related object.

```ts
const user = createRelationalObject("user");
const image = createRelationalObject("image");

user.hasOne(image, "profileImage");
```

Expected shape of the object
```json
{
  id: 1,
  username: "the_overlord",
  profileImage: {
    id: 249,
    uri: "https://example.com/some-image"
  }
}
```

### `hasMany(object, as)`

Tells the target object that it has one field that contains and `Array` of related object.

```ts
const user = createRelationalObject("user");
const image = createRelationalObject("image");

user.hasMany(image, "galleryImages");
```

Expected shape of the object
```json
{
  id: 1,
  username: "the_overlord",
  galleryImages: [
    { id: 150, uri: "https://example.com/some-image" }
    { id: 151, uri: "https://example.com/some-image" }
  ]
}
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
      <td>Sets the name of the object. The object will be selected by the give name when using <code>store.select()</code> or <code>store.selectIndex()</code></td>
    </tr>
    <tr>
      <td><code>primaryKey</code></td>
      <td><code>string</code></td>
      <td><code>id</code></td>
      <td>Sets the field name in the object that will be used by the store as a <code>primaryKey</code> to maintain relationships and uniqueness.</td>
    </tr>
  </tbody>
</table>

### Return values

<table>
  <thead>
    <tr>
      <th width="10%">Name</th>
      <th width="10%">Type</th>
      <th width="40%">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>.hasOne(object, as)</code></td>
      <td><code>ORS.RelationalCreator&lt;string&gt;.hasOne</code></td>
      <td>Creates a <code>one to one</code> relationship between the <code>target object</code> and the <code>give object</code>, optionally you can pass an <code>alias</code> if the <code>give object</code> comes under a different field name in the <code>target object</code>.</td>
    </tr>
    <tr>
      <td><code>.hasMany(object, as)</code></td>
      <td><code>ORS.RelationalCreator&lt;string&gt;.hasMany</code></td>
      <td>Creates a <code>one to many</code> relationship between the <code>target object</code> and the <code>give object</code>, optionally you can pass an <code>alias</code> if the <code>give object</code> comes under a different field name in the <code>target object</code>.</td>
    </tr>
  </tbody>
</table>
