"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[1936],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>h});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),d=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=d(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),p=d(n),m=a,h=p["".concat(c,".").concat(m)]||p[m]||u[m]||o;return n?r.createElement(h,l(l({ref:t},s),{},{components:n})):r.createElement(h,l({ref:t},s))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[p]="string"==typeof e?e:a,l[1]=i;for(var d=2;d<o;d++)l[d]=n[d];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},2:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>d});var r=n(7462),a=(n(7294),n(3905));const o={sidebar_position:6},l="createRelationalObjectIndex()",i={unversionedId:"api/createRelationalObjectIndex",id:"api/createRelationalObjectIndex",title:"createRelationalObjectIndex()",description:"Used to define an object index, to keep track of which objects are on which page. Built to help with pagination.",source:"@site/docs/api/createRelationalObjectIndex.md",sourceDirName:"api",slug:"/api/createRelationalObjectIndex",permalink:"/object-relationship-store/docs/api/createRelationalObjectIndex",draft:!1,editUrl:"https://github.com/JoshBot-Debug/object-relationship-store/tree/main/documentation/docs/api/createRelationalObjectIndex.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"docsSidebar",previous:{title:"withOptions()",permalink:"/object-relationship-store/docs/api/withOptions"}},c={},d=[{value:"Basic usage",id:"basic-usage",level:2},{value:"Properties",id:"properties",level:2},{value:"<code>name</code>",id:"name",level:3},{value:"<code>relationalCreators</code>",id:"relationalcreators",level:3},{value:"<code>sortingFunction</code>",id:"sortingfunction",level:3},{value:"API",id:"api",level:2},{value:"Properties",id:"properties-1",level:3}],s={toc:d},p="wrapper";function u(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"createrelationalobjectindex"},"createRelationalObjectIndex()"),(0,a.kt)("p",null,"Used to define an object index, to keep track of which objects are on which page. Built to help with pagination."),(0,a.kt)("h2",{id:"basic-usage"},"Basic usage"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'import { createRelationalObjectIndex } from "@jjmyers/object-relationship-store";\n\nconst homeFeed = createRelationalObjectIndex("homeFeed", [post, article, blog], (a, b) => a.id > b.id ? -1 : 1);\n\nconst store = createStore({\n  // ...storeOptions\n  indexes: [\n    homeFeed\n  ],\n});\n')),(0,a.kt)("h2",{id:"properties"},"Properties"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"createRelationalObjectIndex(name, relationalCreators, sortingFunction)")),(0,a.kt)("h3",{id:"name"},(0,a.kt)("inlineCode",{parentName:"h3"},"name")),(0,a.kt)("p",null,"The name of the index. Will be used when selecting data via ",(0,a.kt)("a",{parentName:"p",href:"./store.selectIndex#name"},(0,a.kt)("inlineCode",{parentName:"a"},"store.selectIndex()")),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'createRelationalObjectIndex("homeFeed");\n')),(0,a.kt)("h3",{id:"relationalcreators"},(0,a.kt)("inlineCode",{parentName:"h3"},"relationalCreators")),(0,a.kt)("p",null,"An array of object types this ",(0,a.kt)("inlineCode",{parentName:"p"},"index")," is expected to have. Will be able to pass custom selectors when select data from this index using ",(0,a.kt)("a",{parentName:"p",href:"./store.selectIndex#options"},(0,a.kt)("inlineCode",{parentName:"a"},"store.selectIndex()")),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'createRelationalObjectIndex("homeFeed", [post, article, blog]);\n')),(0,a.kt)("h3",{id:"sortingfunction"},(0,a.kt)("inlineCode",{parentName:"h3"},"sortingFunction")),(0,a.kt)("p",null,"Sort the objects in a specific order. When a new object is inserted or deleted, the ",(0,a.kt)("inlineCode",{parentName:"p"},"sortingFunction")," will make sure that the order of the index is correct."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'createRelationalObjectIndex("homeFeed", [...], (a, b) => a.id > b.id ? -1 : 1);\n')),(0,a.kt)("h2",{id:"api"},"API"),(0,a.kt)("h3",{id:"properties-1"},"Properties"),(0,a.kt)("table",null,(0,a.kt)("thead",null,(0,a.kt)("tr",null,(0,a.kt)("th",{width:"10%"},"Property"),(0,a.kt)("th",{width:"10%"},"Type"),(0,a.kt)("th",{width:"10%"},"Default"),(0,a.kt)("th",{width:"40%"},"Description"))),(0,a.kt)("tbody",null,(0,a.kt)("tr",null,(0,a.kt)("td",null,(0,a.kt)("code",null,"name")),(0,a.kt)("td",null,(0,a.kt)("code",null,"string")),(0,a.kt)("td",null,(0,a.kt)("code",null,"undefined")),(0,a.kt)("td",null,"The name of a the index.")),(0,a.kt)("tr",null,(0,a.kt)("td",null,(0,a.kt)("code",null,"relationalCreators")),(0,a.kt)("td",null,(0,a.kt)("code",null,"ORS.RelationalCreators[]")),(0,a.kt)("td",null,(0,a.kt)("code",null,"undefined")),(0,a.kt)("td",null,"An array of relationalCreators (",(0,a.kt)("code",null,"objects"),") this index is expected to have.")),(0,a.kt)("tr",null,(0,a.kt)("td",null,(0,a.kt)("code",null,"sortingFunction")),(0,a.kt)("td",null,(0,a.kt)("code",null,"Function")),(0,a.kt)("td",null,(0,a.kt)("code",null,"undefined")),(0,a.kt)("td",null,"A sorting function. Returns 1 or -1")))))}u.isMDXComponent=!0}}]);