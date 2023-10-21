"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[671],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(n),d=r,h=u["".concat(l,".").concat(d)]||u[d]||m[d]||i;return n?a.createElement(h,o(o({ref:t},p),{},{components:n})):a.createElement(h,o({ref:t},p))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:r,o[1]=s;for(var c=2;c<i;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9881:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var a=n(7462),r=(n(7294),n(3905));const i={sidebar_position:1},o="Basic Usage",s={unversionedId:"intro",id:"intro",title:"Basic Usage",description:"Let's discover how to use @jjmyers/object-relationship-store.",source:"@site/docs/intro.md",sourceDirName:".",slug:"/intro",permalink:"/object-relationship-store/docs/intro",draft:!1,editUrl:"https://github.com/JoshBot-Debug/object-relationship-store/documentation/docs/intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docsSidebar"},l={},c=[{value:"Getting Started",id:"getting-started",level:2},{value:"Let&#39;s look at a JSON object",id:"lets-look-at-a-json-object",level:2},{value:"Create the model for this data",id:"create-the-model-for-this-data",level:2},{value:"Create a store",id:"create-a-store",level:2},{value:"You&#39;re done!",id:"youre-done",level:2}],p={toc:c},u="wrapper";function m(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"basic-usage"},"Basic Usage"),(0,r.kt)("p",null,"Let's discover ",(0,r.kt)("strong",{parentName:"p"},"how to use ",(0,r.kt)("a",{parentName:"strong",href:"https://www.npmjs.com/package/@jjmyers/object-relationship-store"},"@jjmyers/object-relationship-store")),"."),(0,r.kt)("h2",{id:"getting-started"},"Getting Started"),(0,r.kt)("p",null,"Get started by ",(0,r.kt)("strong",{parentName:"p"},"installing the package")," in you project."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npm install @jjmyers/object-relationship-store\n")),(0,r.kt)("h2",{id:"lets-look-at-a-json-object"},"Let's look at a JSON object"),(0,r.kt)("p",null,"In this example, we are going to use this data structure. All types are defined using ",(0,r.kt)("inlineCode",{parentName:"p"},"typescript")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"\ninterface User {\n  id: number;\n  username: string;\n  profileImage: Image;\n}\n\ninterface Image {\n  id: number;\n  aspectRatio: number;\n  thumbnails: Thumbnail[];\n}\n\ninterface Thumbnail {\n  id: number;\n  uri: string;\n}\n\ninterface Post {\n  id: number;\n  caption: string;\n  createdAt: string;\n  images: Image[];\n  user: User;\n}\n\n")),(0,r.kt)("p",null,"Based on the data structure above, we can see that this will be ",(0,r.kt)("inlineCode",{parentName:"p"},"post")," object:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'  {\n    "id": 10,\n    "caption": "This is post 10",\n    "createdAt": "2023-06-26T14:24:04.000Z",\n    "images": [\n      {\n        "id": 54,\n        "aspectRatio": 0.890625,\n        "thumbnails": [\n          { "id": 206, "uri": "/post.1687789438225.0-1.128.jpeg" },\n          { "id": 207, "uri": "/post.1687789438225.0-2.256.jpeg" },\n        ]\n      },\n      {\n        "id": 55,\n        "aspectRatio": 0.773438,\n        "thumbnails": [\n          { "id": 211, "uri": "/post.1687789438226.1-1.128.jpeg" },\n          { "id": 212, "uri": "/post.1687789438226.1-2.256.jpeg" },\n        ]\n      }\n    ],\n    "user": {\n      "id": 2,\n      "username": "qwerty",\n      "profileImage": {\n        "id": 48,\n        "aspectRatio": 0.777344,\n        "thumbnails": [\n          { "id": 186, "uri": "/profilePhoto.256.jpeg?1687444436097" },\n          { "id": 187, "uri": "/profilePhoto.512.jpeg?1687444436097" },\n        ]\n      }\n    }\n  }\n')),(0,r.kt)("h2",{id:"create-the-model-for-this-data"},"Create the model for this data"),(0,r.kt)("p",null,"Lets define the relationship of these objects so that object-relationship-store knows what data to expect and how they are related to each other."),(0,r.kt)("p",null,"Before we move forward, remember this '",(0,r.kt)("strong",{parentName:"p"},"All objects must contain a unique identifier"),"' if they are to be upserted into the store. Generally this is the object's ",(0,r.kt)("inlineCode",{parentName:"p"},"primary key")," which is the ",(0,r.kt)("inlineCode",{parentName:"p"},"id")," field."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Import ",(0,r.kt)("inlineCode",{parentName:"li"},"createRelationalObject()"),". We will use ",(0,r.kt)("inlineCode",{parentName:"li"},"createRelationalObject()")," to define our objects.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'import { createRelationalObject } from "@jjmyers/object-relationship-store";\n')),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Define all objects. ",(0,r.kt)("inlineCode",{parentName:"li"},"createRelationalObject()")," accepts two arguments\nthe first argument is the ",(0,r.kt)("inlineCode",{parentName:"li"},"name")," of the object, the second is the ",(0,r.kt)("inlineCode",{parentName:"li"},"primaryKey")," field. All objects must have a unique identifier, this is usually the ",(0,r.kt)("inlineCode",{parentName:"li"},"primaryKey")," which is the field ",(0,r.kt)("inlineCode",{parentName:"li"},"id"),". ",(0,r.kt)("strong",{parentName:"li"},"The default value for ",(0,r.kt)("em",{parentName:"strong"},"primaryKey")," is ",(0,r.kt)("em",{parentName:"strong"},"id")),".")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'// If left blank, the primary key is "id"\nconst user = createRelationalObject("user", "id")\nconst image = createRelationalObject("image")\nconst thumbnail = createRelationalObject("thumbnail")\nconst post = createRelationalObject("post")\n')),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Define the relationship between each object. The ",(0,r.kt)("inlineCode",{parentName:"li"},"hasOne()")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"hasMany()")," properties accepts two arguments. The first argument is the object we are referring to, the second argument is an alias. By default the name of the field in the target object, is the name of the referred object. In this case, a ",(0,r.kt)("inlineCode",{parentName:"li"},"Post")," has a field ",(0,r.kt)("inlineCode",{parentName:"li"},"user")," which is a ",(0,r.kt)("inlineCode",{parentName:"li"},"User")," object. A ",(0,r.kt)("inlineCode",{parentName:"li"},"Post")," has a field ",(0,r.kt)("inlineCode",{parentName:"li"},"images")," which is an array of ",(0,r.kt)("inlineCode",{parentName:"li"},"Image")," objects.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'// "Post" has one "User" as user\npost.hasOne(user)\n\n// "Post" has many "Image" as images\npost.hasMany(image, "images")\n\n// "User" has one "Image" as profileImage\nuser.hasOne(image, "profileImage")\n\n// "Image" has many "Thumbnail" as thumbnails\nimage.hasMany(thumbnail, "thumbnails")\n')),(0,r.kt)("h2",{id:"create-a-store"},"Create a store"),(0,r.kt)("p",null,"Once you have finished defining the relationship of you objects, you are ready to create a store."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Pass all created objects into the property ",(0,r.kt)("inlineCode",{parentName:"li"},"relationalCreators")),(0,r.kt)("li",{parentName:"ul"},"Pass an identifier function for each object. ",(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("em",{parentName:"strong"},"This function will be used to identify an object when it is upserted into the store")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'const store = createStore({\n\n  // All my objects defined with createRelationalObject()\n  relationalCreators: [\n    user,\n    image,\n    thumbnail,\n    post,\n  ],\n  identifier: {\n    // If the field "username" is in the object, this is a "User" object.\n    user: o => "username" in o,\n    post: o => "caption" in o,\n    image: o => "aspectRatio" in o,\n    thumbnail: o => "uri" in o,\n  }\n});\n')),(0,r.kt)("h2",{id:"youre-done"},"You're done!"),(0,r.kt)("p",null,"Lets look at what we've got so far"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'import { createRelationalObject } from "@jjmyers/object-relationship-store";\n\nconst user = createRelationalObject("user")\nconst image = createRelationalObject("image")\nconst thumbnail = createRelationalObject("thumbnail")\nconst post = createRelationalObject("post")\n\npost.hasOne(user)\npost.hasMany(image, "images")\nuser.hasOne(image, "profileImage")\nimage.hasMany(thumbnail, "thumbnails")\n\nconst store = createStore({\n  relationalCreators: [\n    user,\n    image,\n    thumbnail,\n    post,\n  ],\n  identifier: {\n    user: o => "username" in o,\n    post: o => "caption" in o,\n    image: o => "aspectRatio" in o,\n    thumbnail: o => "uri" in o,\n  }\n});\n')),(0,r.kt)("p",null,"You are now ready to upsert the following objects: ",(0,r.kt)("strong",{parentName:"p"},"User"),", ",(0,r.kt)("strong",{parentName:"p"},"Post"),", ",(0,r.kt)("strong",{parentName:"p"},"Image"),", ",(0,r.kt)("strong",{parentName:"p"},"Thumbnail"),". The data will be normalised based on the relationship defined and selecting the data will be just as easy!"))}m.isMDXComponent=!0}}]);