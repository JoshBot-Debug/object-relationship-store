"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[7148],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>b});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=o.createContext({}),s=function(e){var t=o.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return o.createElement(p.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},h=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=s(n),h=a,b=u["".concat(p,".").concat(h)]||u[h]||d[h]||r;return n?o.createElement(b,i(i({ref:t},c),{},{components:n})):o.createElement(b,i({ref:t},c))}));function b(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=h;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[u]="string"==typeof e?e:a,i[1]=l;for(var s=2;s<r;s++)i[s]=n[s];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}h.displayName="MDXCreateElement"},3050:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>s});var o=n(7462),a=(n(7294),n(3905));const r={sidebar_position:5},i="withOptions()",l={unversionedId:"api/withOptions",id:"api/withOptions",title:"withOptions()",description:"Helper function used to set payload options on a single object or multiple object.",source:"@site/docs/api/withOptions.md",sourceDirName:"api",slug:"/api/withOptions",permalink:"/object-relationship-store/docs/api/withOptions",draft:!1,editUrl:"https://github.com/JoshBot-Debug/object-relationship-store/tree/main/documentation/docs/api/withOptions.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"docsSidebar",previous:{title:"store.selectIndex()",permalink:"/object-relationship-store/docs/api/store.selectIndex"},next:{title:"createRelationalObjectIndex()",permalink:"/object-relationship-store/docs/api/createRelationalObjectIndex"}},p={},s=[{value:"Basic usage",id:"basic-usage",level:2},{value:"Properties",id:"properties",level:2},{value:"<code>object</code>",id:"object",level:3},{value:"<code>options</code>",id:"options",level:3},{value:"Return values",id:"return-values",level:2},{value:"<code>object with payload</code>",id:"object-with-payload",level:3},{value:"API",id:"api",level:2},{value:"Properties",id:"properties-1",level:3},{value:"Return values",id:"return-values-1",level:3}],c={toc:s},u="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"withoptions"},"withOptions()"),(0,a.kt)("p",null,"Helper function used to set ",(0,a.kt)("a",{parentName:"p",href:"./store.mutate#payload"},(0,a.kt)("inlineCode",{parentName:"a"},"payload"))," options on a single object or multiple object."),(0,a.kt)("h2",{id:"basic-usage"},"Basic usage"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'import { withOptions } from "@jjmyers/object-relationship-store";\n\nconst singleObject = { id: 1 }\nconst manyObjects = [{ id: 1 }, { id: 2 }]\n\n// Setting payload options on a single object\nwithOptions(singleObject, { \n  __identify__: "user",\n  __destroy__: true\n})\n\n// Setting payload options on multiple objects\nwithOptions(manyObjects, { \n  __identify__: "user",\n  __destroy__: true\n})\n')),(0,a.kt)("h2",{id:"properties"},"Properties"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"withOptions(object, options)")),(0,a.kt)("h3",{id:"object"},(0,a.kt)("inlineCode",{parentName:"h3"},"object")),(0,a.kt)("p",null,"The object(s) you want to apply the payload on."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"withOptions(object)\n")),(0,a.kt)("h3",{id:"options"},(0,a.kt)("inlineCode",{parentName:"h3"},"options")),(0,a.kt)("p",null,"The ",(0,a.kt)("a",{parentName:"p",href:"./store.mutate#payload"},(0,a.kt)("inlineCode",{parentName:"a"},"payload"))," options you want applied on the object(s)"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"withOptions(object, {...payloadOptions})\n")),(0,a.kt)("h2",{id:"return-values"},"Return values"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'const object = {id: 1};\nconst objectWithPayload = withOptions(object, { __identify__: "user", __destroy__: true });\n\nstore.mutate(objectWithPayload);\n')),(0,a.kt)("h3",{id:"object-with-payload"},(0,a.kt)("inlineCode",{parentName:"h3"},"object with payload")),(0,a.kt)("p",null,"The return value of ",(0,a.kt)("inlineCode",{parentName:"p"},"withOptions()")," is the object(s) with the payload applied on all of them. This payload can then be passed into ",(0,a.kt)("a",{parentName:"p",href:"./store.mutate"},(0,a.kt)("inlineCode",{parentName:"a"},"store.mutate()"))),(0,a.kt)("h2",{id:"api"},"API"),(0,a.kt)("h3",{id:"properties-1"},"Properties"),(0,a.kt)("table",null,(0,a.kt)("thead",null,(0,a.kt)("tr",null,(0,a.kt)("th",{width:"10%"},"Property"),(0,a.kt)("th",{width:"10%"},"Type"),(0,a.kt)("th",{width:"10%"},"Default"),(0,a.kt)("th",{width:"40%"},"Description"))),(0,a.kt)("tbody",null,(0,a.kt)("tr",null,(0,a.kt)("td",null,(0,a.kt)("code",null,"object")),(0,a.kt)("td",null,(0,a.kt)("code",null,"any")),(0,a.kt)("td",null,(0,a.kt)("code",null,"undefined")),(0,a.kt)("td",null,"The object that you want to apply the payload options to.")),(0,a.kt)("tr",null,(0,a.kt)("td",null,(0,a.kt)("code",null,"options")),(0,a.kt)("td",null,(0,a.kt)("code",null,"payload")),(0,a.kt)("td",null,(0,a.kt)("code",null,"undefined")),(0,a.kt)("td",null,"The payload options for all objects.")))),(0,a.kt)("h3",{id:"return-values-1"},"Return values"),(0,a.kt)("p",null,"Returns the object(s) with the payload applied"))}d.isMDXComponent=!0}}]);