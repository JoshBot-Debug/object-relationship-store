---
sidebar_position: 5
---

# withOptions()

Helper function used to set [`payload`](./store.mutate#payload) options on a single object or multiple object.

## Basic usage

```ts
import { withOptions } from "@jjmyers/object-relationship-store";

const singleObject = { id: 1 }
const manyObjects = [{ id: 1 }, { id: 2 }]

// Setting payload options on a single object
withOptions(singleObject, { 
  __identify__: "user",
  __destroy__: true
})

// Setting payload options on multiple objects
withOptions(manyObjects, { 
  __identify__: "user",
  __destroy__: true
})
```

## Properties

`withOptions(object, options)`

### `object`

The object(s) you want to apply the payload on.

```ts
withOptions(object)
```

### `options`

The [`payload`](./store.mutate#payload) options you want applied on the object(s)

```ts
withOptions(object, {...payloadOptions})
```

## Return values

```ts
const object = {id: 1};
const objectWithPayload = withOptions(object, { __identify__: "user", __destroy__: true });

store.mutate(objectWithPayload);
```

### `object with payload`

The return value of `withOptions()` is the object(s) with the payload applied on all of them. This payload can then be passed into [`store.mutate()`](./store.mutate)

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
      <td><code>object</code></td>
      <td><code>any</code></td>
      <td><code>undefined</code></td>
      <td>The object that you want to apply the payload options to.</td>
    </tr>
    <tr>
      <td><code>options</code></td>
      <td><code>payload</code></td>
      <td><code>undefined</code></td>
      <td>The payload options for all objects.</td>
    </tr>
  </tbody>
</table>

### Return values

Returns the object(s) with the payload applied