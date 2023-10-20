---
sidebar_position: 1
---

# Create a project

Create an project and install the **@jjmyers/object-relationship-store**

## Create a project directory

Create the project directory, and cd into it. We will be working from this directory
```bash
mkdir example-project && \
cd example-project/
```

## Install dependencies

Initialize an npm project and install all required dependencies.
```bash
npm init -y && \
npm install @jjmyers/object-relationship-store
```

Make sure to add `"type": "module"` in you package.json file.
```json title="example-project/package.json"
{
  "name": "example-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@jjmyers/object-relationship-store": "^2.0.25"
  }
}
```


## Create an index.js file

Create an `index.js` file and other required files.
```ts
touch index.js && \
touch data.js
```

## Prepare some data

Here is the data we will be using in this walkthrough, copy it if you want to follow along.  
***In any real project, your data will most likely be fetched from a server. This is just an example JSON response.***
```ts title="example-project/data.js"
export const posts = [
  {
    "id": 10,
    "caption": "This is post 10",
    "createdAt": "2023-06-26T14:24:04.000Z",
    "images": [
      {
        "id": 54,
        "aspectRatio": 0.890625,
        "thumbnails": [
          { "id": 206, "uri": "/post.1687789438225.0-1.128.jpeg" },
          { "id": 207, "uri": "/post.1687789438225.0-2.256.jpeg" },
        ]
      },
      {
        "id": 55,
        "aspectRatio": 0.773438,
        "thumbnails": [
          { "id": 211, "uri": "/post.1687789438226.1-1.128.jpeg" },
          { "id": 212, "uri": "/post.1687789438226.1-2.256.jpeg" },
        ]
      },
      {
        "id": 56,
        "aspectRatio": 0.890625,
        "thumbnails": [
          { "id": 216, "uri": "/post.1687789438226.2-1.128.jpeg" },
          { "id": 217, "uri": "/post.1687789438227.2-2.256.jpeg" },
        ]
      },
      {
        "id": 57,
        "aspectRatio": 0.890625,
        "thumbnails": [
          { "id": 221, "uri": "/post.1687789438227.3-1.128.jpeg" },
          { "id": 222, "uri": "/post.1687789438227.3-2.256.jpeg" },
        ]
      }
    ],
    "user": {
      "id": 2,
      "username": "qwerty",
      "profileImage": {
        "id": 48,
        "aspectRatio": 0.777344,
        "thumbnails": [
          { "id": 186, "uri": "/profilePhoto.256.jpeg?1687444436097" },
          { "id": 187, "uri": "/profilePhoto.512.jpeg?1687444436097" },
        ]
      }
    }
  },
  {
    "id": 9,
    "caption": "This is post 9",
    "createdAt": "2023-06-25T15:03:16.000Z",
    "images": [
      {
        "id": 53,
        "aspectRatio": 0.890625,
        "thumbnails": [
          { "id": 201, "uri": "/post.1687705393873.0-1.128.jpeg" },
          { "id": 202, "uri": "/post.1687705393873.0-2.256.jpeg" },
        ]
      }
    ],
    "user": {
      "id": 2,
      "username": "qwerty",
      "profileImage": {
        "id": 48,
        "aspectRatio": 0.777344,
        "thumbnails": [
          { "id": 186, "uri": "/profilePhoto.256.jpeg?1687444436097" },
          { "id": 187, "uri": "/profilePhoto.512.jpeg?1687444436097" },
        ]
      }
    }
  },
  {
    "id": 8,
    "caption": "This is post 8",
    "createdAt": "2023-06-21T16:13:41.000Z",
    "images": [
      {
        "id": 47,
        "aspectRatio": 0.890625,
        "thumbnails": [
          { "id": 181, "uri": "/post.1687364014093.0-1.128.jpeg" },
          { "id": 182, "uri": "/post.1687364014093.0-2.256.jpeg" },
        ]
      }
    ],
    "user": {
      "id": 1,
      "username": "the_overlord",
      "profileImage": {
        "id": 52,
        "aspectRatio": 1.38378,
        "thumbnails": [
          { "id": 198, "uri": "/profilePhoto.256.jpeg?1687545543490" },
          { "id": 199, "uri": "/profilePhoto.512.jpeg?1687545543491" },
        ]
      }
    }
  },
  {
    "id": 7,
    "caption": "This is post 7",
    "createdAt": "2023-06-21T13:48:10.000Z",
    "images": [
      {
        "id": 46,
        "aspectRatio": 1.77778,
        "thumbnails": [
          { "id": 176, "uri": "/post.1687355288548.0-1.128.jpeg" },
          { "id": 177, "uri": "/post.1687355288548.0-2.256.jpeg" },
        ]
      }
    ],
    "user": {
      "id": 1,
      "username": "the_overlord",
      "profileImage": {
        "id": 52,
        "aspectRatio": 1.38378,
        "thumbnails": [
          { "id": 198, "uri": "/profilePhoto.256.jpeg?1687545543490" },
          { "id": 199, "uri": "/profilePhoto.512.jpeg?1687545543491" },
        ]
      }
    }
  },
  {
    "id": 6,
    "caption": "This is post 6",
    "createdAt": "2023-06-20T17:02:23.000Z",
    "images": [
      {
        "id": 43,
        "aspectRatio": 0.710938,
        "thumbnails": [
          { "id": 161, "uri": "/post.1687280539761.0-1.128.jpeg" },
          { "id": 162, "uri": "/post.1687280539761.0-2.256.jpeg" },
        ]
      },
      {
        "id": 44,
        "aspectRatio": 1.6,
        "thumbnails": [
          { "id": 166, "uri": "/post.1687280539761.1-1.128.jpeg" },
          { "id": 167, "uri": "/post.1687280539761.1-2.256.jpeg", },
        ]
      },
      {
        "id": 45,
        "aspectRatio": 1.77778,
        "thumbnails": [
          { "id": 171, "uri": "/post.1687280539762.2-1.128.jpeg" },
          { "id": 172, "uri": "/post.1687280539762.2-2.256.jpeg" },
        ]
      }
    ],
    "user": {
      "id": 2,
      "username": "qwerty",
      "profileImage": {
        "id": 48,
        "aspectRatio": 0.777344,
        "thumbnails": [
          { "id": 186, "uri": "/profilePhoto.256.jpeg?1687444436097" },
          { "id": 187, "uri": "/profilePhoto.512.jpeg?1687444436097" },
        ]
      }
    }
  }
]
```

## The directory structure

You're done, if you followed through, here is the directory structure you should be seeing.
```text title="Directory structure"
example-project/
  - node_modules/
  - data.js
  - index.js
  - package-lock.json
  - package.json
```