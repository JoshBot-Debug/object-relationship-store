"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[1834],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var a=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var c=a.createContext({}),s=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=s(e.components);return a.createElement(c.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,l=e.mdxType,r=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=s(n),m=l,h=d["".concat(c,".").concat(m)]||d[m]||p[m]||r;return n?a.createElement(h,o(o({ref:t},u),{},{components:n})):a.createElement(h,o({ref:t},u))}));function h(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=n.length,o=new Array(r);o[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[d]="string"==typeof e?e:l,o[1]=i;for(var s=2;s<r;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3242:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>i,toc:()=>s});var a=n(7462),l=(n(7294),n(3905));const r={sidebar_position:1},o="createRelationalObject()",i={unversionedId:"api/createRelationalObject",id:"api/createRelationalObject",title:"createRelationalObject()",description:"Used to define the object and its relationships with other objects.",source:"@site/docs/api/createRelationalObject.md",sourceDirName:"api",slug:"/api/createRelationalObject",permalink:"/object-relationship-store/docs/api/createRelationalObject",draft:!1,editUrl:"https://github.com/JoshBot-Debug/object-relationship-store/tree/main/documentation/docs/api/createRelationalObject.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docsSidebar",previous:{title:"APIs",permalink:"/object-relationship-store/docs/category/apis"},next:{title:"createStore()",permalink:"/object-relationship-store/docs/api/createStore"}},c={},s=[{value:"Basic usage",id:"basic-usage",level:2},{value:"Properties",id:"properties",level:2},{value:"<code>name</code>",id:"name",level:3},{value:"<code>primaryKey</code>",id:"primarykey",level:3},{value:"Return values",id:"return-values",level:2},{value:"<code>hasOne(object, as)</code>",id:"hasoneobject-as",level:3},{value:"<code>hasMany(object, as)</code>",id:"hasmanyobject-as",level:3},{value:"API",id:"api",level:2},{value:"Properties",id:"properties-1",level:3},{value:"Return values",id:"return-values-1",level:3}],u={toc:s},d="wrapper";function p(e){let{components:t,...n}=e;return(0,l.kt)(d,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"createrelationalobject"},"createRelationalObject()"),(0,l.kt)("p",null,"Used to define the object and its relationships with other objects."),(0,l.kt)("h2",{id:"basic-usage"},"Basic usage"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},'import { createRelationalObject } from "@jjmyers/object-relationship-store";\n\nconst user = createRelationalObject("user");\nconst image = createRelationalObject("image");\n\nuser.hasOne(image, "profileImage");\n')),(0,l.kt)("h2",{id:"properties"},"Properties"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"createRelationalObject(name, primaryKey)")),(0,l.kt)("h3",{id:"name"},(0,l.kt)("inlineCode",{parentName:"h3"},"name")),(0,l.kt)("p",null,"Assigns the given name to the object. The object will be selected by the give name when using ",(0,l.kt)("a",{parentName:"p",href:"./store.select"},(0,l.kt)("inlineCode",{parentName:"a"},"store.select()"))," or ",(0,l.kt)("a",{parentName:"p",href:"./store.select"},(0,l.kt)("inlineCode",{parentName:"a"},"store.selectIndex()"))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},'createRelationalObject("user");\n')),(0,l.kt)("h3",{id:"primarykey"},(0,l.kt)("inlineCode",{parentName:"h3"},"primaryKey")),(0,l.kt)("p",null,"The field in the object that will be used as a ",(0,l.kt)("inlineCode",{parentName:"p"},"primaryKey")," to identify the object."),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"default value")," id"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},'createRelationalObject("user", "id");\n')),(0,l.kt)("h2",{id:"return-values"},"Return values"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},'const user = createRelationalObject("user");\n\nuser.hasOne();\nuser.hasMany();\n')),(0,l.kt)("h3",{id:"hasoneobject-as"},(0,l.kt)("inlineCode",{parentName:"h3"},"hasOne(object, as)")),(0,l.kt)("p",null,"Tells the target object that it has one field that contains another related object."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},'const user = createRelationalObject("user");\nconst image = createRelationalObject("image");\n\nuser.hasOne(image, "profileImage");\n')),(0,l.kt)("p",null,"Expected shape of the object"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'{\n  id: 1,\n  username: "the_overlord",\n  profileImage: {\n    id: 249,\n    uri: "https://example.com/some-image"\n  }\n}\n')),(0,l.kt)("h3",{id:"hasmanyobject-as"},(0,l.kt)("inlineCode",{parentName:"h3"},"hasMany(object, as)")),(0,l.kt)("p",null,"Tells the target object that it has one field that contains and ",(0,l.kt)("inlineCode",{parentName:"p"},"Array")," of related object."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},'const user = createRelationalObject("user");\nconst image = createRelationalObject("image");\n\nuser.hasMany(image, "galleryImages");\n')),(0,l.kt)("p",null,"Expected shape of the object"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'{\n  id: 1,\n  username: "the_overlord",\n  galleryImages: [\n    { id: 150, uri: "https://example.com/some-image" }\n    { id: 151, uri: "https://example.com/some-image" }\n  ]\n}\n')),(0,l.kt)("h2",{id:"api"},"API"),(0,l.kt)("h3",{id:"properties-1"},"Properties"),(0,l.kt)("table",null,(0,l.kt)("thead",null,(0,l.kt)("tr",null,(0,l.kt)("th",{width:"10%"},"Property"),(0,l.kt)("th",{width:"10%"},"Type"),(0,l.kt)("th",{width:"10%"},"Default"),(0,l.kt)("th",{width:"40%"},"Description"))),(0,l.kt)("tbody",null,(0,l.kt)("tr",null,(0,l.kt)("td",null,(0,l.kt)("code",null,"name")),(0,l.kt)("td",null,(0,l.kt)("code",null,"string")),(0,l.kt)("td",null,(0,l.kt)("code",null,"undefined")),(0,l.kt)("td",null,"Sets the name of the object. The object will be selected by the give name when using ",(0,l.kt)("code",null,"store.select()")," or ",(0,l.kt)("code",null,"store.selectIndex()"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,(0,l.kt)("code",null,"primaryKey")),(0,l.kt)("td",null,(0,l.kt)("code",null,"string")),(0,l.kt)("td",null,(0,l.kt)("code",null,"id")),(0,l.kt)("td",null,"Sets the field name in the object that will be used by the store as a ",(0,l.kt)("code",null,"primaryKey")," to maintain relationships and uniqueness.")))),(0,l.kt)("h3",{id:"return-values-1"},"Return values"),(0,l.kt)("table",null,(0,l.kt)("thead",null,(0,l.kt)("tr",null,(0,l.kt)("th",{width:"10%"},"Name"),(0,l.kt)("th",{width:"10%"},"Type"),(0,l.kt)("th",{width:"40%"},"Description"))),(0,l.kt)("tbody",null,(0,l.kt)("tr",null,(0,l.kt)("td",null,(0,l.kt)("code",null,".hasOne(object, as)")),(0,l.kt)("td",null,(0,l.kt)("code",null,"ORS.RelationalCreator<string>.hasOne")),(0,l.kt)("td",null,"Creates a ",(0,l.kt)("code",null,"one to one")," relationship between the ",(0,l.kt)("code",null,"target object")," and the ",(0,l.kt)("code",null,"give object"),", optionally you can pass an ",(0,l.kt)("code",null,"alias")," if the ",(0,l.kt)("code",null,"give object")," comes under a different field name in the ",(0,l.kt)("code",null,"target object"),".")),(0,l.kt)("tr",null,(0,l.kt)("td",null,(0,l.kt)("code",null,".hasMany(object, as)")),(0,l.kt)("td",null,(0,l.kt)("code",null,"ORS.RelationalCreator<string>.hasMany")),(0,l.kt)("td",null,"Creates a ",(0,l.kt)("code",null,"one to many")," relationship between the ",(0,l.kt)("code",null,"target object")," and the ",(0,l.kt)("code",null,"give object"),", optionally you can pass an ",(0,l.kt)("code",null,"alias")," if the ",(0,l.kt)("code",null,"give object")," comes under a different field name in the ",(0,l.kt)("code",null,"target object"),".")))))}p.isMDXComponent=!0}}]);