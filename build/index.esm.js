function e(e,r,n){return{__name:e.__name,__primaryKey:e.__primaryKey,__has:r,__alias:n}}function r(r,n){var t={__name:r,__primaryKey:null!=n?n:"id",__relationship:{},__indexes:[]};return Object.setPrototypeOf(t,{hasOne:function(r,n){var t=this,a=null!=n?n:r.__name,i=Object.entries(t.__relationship).find((function(e){return e[0],e[1].__name===r.__name}));if(i&&t.__relationship[i[0]].__primaryKey===r.__primaryKey&&r.__primaryKey===t.__name)throw new Error('"'.concat(r.__name,'" reference already exists in "').concat(t.__name,'" as "').concat(i[0],'" with the primary key (pk) "').concat(r.__primaryKey,'". "').concat(t.__name,'" table failed to create a hasOne relationship with "').concat(a,'" because it has the same primary key "').concat(r.__primaryKey,'" as "').concat(i[0],'". The primary key for "').concat(i[0],'" and "').concat(a,'" are not unique.'));return t.__relationship[a]=e(r,"hasOne",a),this},hasMany:function(r,n){var t=this,a=null!=n?n:r.__name,i=Object.entries(t.__relationship).find((function(e){return e[0],e[1].__name===r.__name}));if(i&&t.__relationship[i[0]].__primaryKey===r.__primaryKey&&r.__primaryKey===t.__name)throw new Error('"'.concat(r.__name,'" reference already exists in "').concat(t.__name,'" as "').concat(i[0],'" with the primary key (pk) "').concat(r.__primaryKey,'". "').concat(t.__name,'" table failed to create a hasOne relationship with "').concat(a,'" because it has the same primary key "').concat(r.__primaryKey,'" as "').concat(i[0],'". The primary key for "').concat(i[0],'" and "').concat(a,'" are not unique.'));return t.__relationship[a]=e(r,"hasMany",a),this}}),t}function n(e,r,n){return{__name:e,__objects:r.map((function(e){return e.__name})),__sort:null!=n?n:null}}var t=function(){return t=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++)for(var a in r=arguments[n])Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a]);return e},t.apply(this,arguments)};function a(e,r){for(var n=0,t=Object.entries(e);n<t.length;n++){var a=t[n],i=a[0],_=a[1];if(r[i]!==_)return!1}return!0}function i(e,r){if(!r)return null;var n={};function t(e){e.forEach((function(e){var t=r[e];void 0!==t&&(n[e]=t)}))}return t("*"===e?Object.keys(r):e),n}function _(e,r,n){var c=n.from,f=n.where,s=n.fields,u=n.join;if(Array.isArray(f))return f.flatMap((function(a){var i;return null!==(i=_(e,r,t(t({},n),{where:a})))&&void 0!==i?i:[]}));var y=null,l=e[c],m=r[c];if(!m)return null;if("*"===f&&(y=Object.values(m).flatMap((function(e){var r;return null!==(r=i(s,e))&&void 0!==r?r:[]}))),"object"==typeof f){var p=f[l.__primaryKey];if(p)(j=i(s,m[p]))&&(y=j);if(!p){y=[];for(var h=0,d=Object.entries(m);h<d.length;h++){var v=d[h];if(v[0],a(f,b=v[1]))(j=i(s,b))&&y.push(j)}}}if("function"==typeof f){y=[];for(var K=0,O=Object.entries(m);K<O.length;K++){var b,j,x=O[K];if(x[0],f(b=x[1]))(j=i(s,b))&&y.push(j)}}return y&&u&&(Array.isArray(y)&&y.forEach((function(n){o(n,{join:u,from:c,model:e,state:r})})),Array.isArray(y)||o(y,{join:u,from:c,model:e,state:r})),y}function o(e,r){var n=r.join,t=r.from,a=r.model,i=r.state,c=a[t];Object.values(n.reduce((function(e,r){return e[r.on]=r,e}),{})).forEach((function(r){var n,f=r.on,s=r.fields,u=r.join;if(e[f]){if(!c.__relationship[f])throw new Error('Field "'.concat(String(f),'" does not exist in object "').concat(t,'"'));if("hasOne"===c.__relationship[f].__has&&(e[f]=_(a,i,{fields:s,from:c.__relationship[f].__name,where:(n={},n[c.__relationship[f].__primaryKey]=e[f],n)})),"hasMany"===c.__relationship[f].__has){var y=[];e[f].forEach((function(e){var r,n=_(a,i,{fields:s,from:c.__relationship[f].__name,where:(r={},r[c.__relationship[f].__primaryKey]=e,r)});n&&y.push(n)})),e[f]=y}u&&("hasOne"===c.__relationship[f].__has&&o(e[f],{from:c.__relationship[f].__name,join:u,model:a,state:i}),"hasMany"===c.__relationship[f].__has&&e[f].forEach((function(e){o(e,{from:c.__relationship[f].__name,join:u,model:a,state:i})})))}}))}function c(e){if(null===e||"object"!=typeof e)return e;var r=Array.isArray(e)?[]:{};for(var n in e)e.hasOwnProperty(n)&&(r[n]=c(e[n]));return r}function f(e,r){if(e===r)return!0;if("object"!=typeof e||"object"!=typeof r||null===e||null===r)return!1;var n=Object.keys(e),t=Object.keys(r);if(n.length!==t.length)return!1;for(var a=0,i=n;a<i.length;a++){var _=i[a];if(!t.includes(_)||!f(e[_],r[_]))return!1}return!0}function s(e){var r=new Map;return function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];var a=JSON.stringify(n),i=e.apply(void 0,n),_=r.get(a);return r.has(a)&&f(_,i)?_:(r.set(a,i),i)}}function u(e,r){return Array.isArray(e)?e.map((function(e){return y(e,r)})):y(e,r)}function y(e,r){return"function"==typeof r.__destroy__?e.__destroy__=r.__destroy__(e):r.__destroy__&&(e.__destroy__=r.__destroy__),"function"==typeof r.__identify__?e.__identify__=r.__identify__(e):r.__identify__&&(e.__identify__=r.__identify__),"function"==typeof r.__indexes__?e.__indexes__=r.__indexes__(e):r.__indexes__&&(e.__indexes__=r.__indexes__),"function"==typeof r.__removeFromIndexes__?e.__removeFromIndexes__=r.__removeFromIndexes__(e):r.__removeFromIndexes__&&(e.__removeFromIndexes__=r.__removeFromIndexes__),e}function l(e){var r,n,a=e.relationalCreators,i=e.indexes,o=e.identifier,f=e.initialStore,y={current:null!==(r=null==f?void 0:f.references)&&void 0!==r?r:{},upsert:function(e){this.current[e.name]||(this.current[e.name]={}),this.current[e.name][e.primaryKey]?this.current[e.name][e.primaryKey].includes(e.ref)||this.current[e.name][e.primaryKey].push(e.ref):this.current[e.name][e.primaryKey]=[e.ref]},remove:function(e){var r=e.name,n=e.primaryKey,t=e.ref;this.current[r][n]=this.current[r][n].filter((function(e){return e!==t}))}},l=null!==(n=null==f?void 0:f.state)&&void 0!==n?n:{},m=new Set,p=a.reduce((function(e,r){var n;r.hasOne,r.hasMany;var a=function(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(t=Object.getOwnPropertySymbols(e);a<t.length;a++)r.indexOf(t[a])<0&&Object.prototype.propertyIsEnumerable.call(e,t[a])&&(n[t[a]]=e[t[a]])}return n}(r,["hasOne","hasMany"]);return t(t({},e),((n={})[a.__name]=a,n))}),{});function h(e){var r=c(Array.isArray(e)?e:[e]),n=r.reduce((function(e,r){if("string"==typeof r.__indexes__)return e.push(r.__indexes__.split("-")),e;if(r.__indexes__){var n=r.__indexes__.map((function(e){return e.split("-")}));e.push.apply(e,n)}return e}),[]);function t(e){var r=e.item,n=e.name,a=e.primaryKey,i=p[n];Object.entries(i.__relationship).forEach((function(e){var i,_=e[0],o=e[1];if(l[n][r[a]]){var c=l[n][r[a]][_];if(c)if("hasMany"!==o.__has){var f=y.current[o.__name][c];if(f){var s=f.every((function(e){var t=e.split("."),i=t[0],_=t[1];return i===n&&_===String(r[a])}));if(!s)return;t({item:(i={},i[o.__primaryKey]=c,i),name:o.__name,primaryKey:o.__primaryKey}),delete y.current[o.__name][c],delete l[o.__name][c]}}else c.forEach((function(e){var i,_=y.current[o.__name][e].every((function(e){var t=e.split("."),i=t[0],_=t[1];return i===n&&_===String(r[a])}));_&&(t({item:(i={},i[o.__primaryKey]=e,i),name:o.__name,primaryKey:o.__primaryKey}),delete y.current[o.__name][e],delete l[o.__name][e])}))}})),delete l[n][r[a]],i.__indexes.forEach((function(e){var t=l[e],i="".concat(n,"-").concat(r[a]),_=t.indexOf(i);-1!==_&&t.splice(_,1)}))}function a(e){var r=e.name,n=e.item,t=e.parentName,a=e.primaryKey,i=e.parentPrimaryKey,_=e.relationalObject,o=Object.values(_.__relationship).find((function(e){return e.__name===t}));if(o&&("hasOne"===o.__has&&(y.upsert({name:o.__name,primaryKey:i,ref:"".concat(r,".").concat(n[a],".").concat(o.__alias)}),l[r][n[a]][o.__alias]=i),"hasMany"===o.__has)){var c=l[r][n[a]][o.__alias];if(!Array.isArray(c))return y.upsert({name:o.__name,primaryKey:i,ref:"".concat(r,".").concat(n[a],".").concat(o.__alias)}),void(l[r][n[a]][o.__alias]=[i]);!!c.find((function(e){return e===i}))||(y.upsert({name:o.__name,primaryKey:i,ref:"".concat(r,".").concat(n[a],".").concat(o.__alias)}),c.push(i))}}function i(e){var r=e.item,n=e.parentName,_=e.parentField,c=e.parentFieldHasMany,f=e.parentPrimaryKey,s=function(e){if("__identify__"in e){var r=e.__identify__;return delete e.__identify__,r}for(var n in o)if(Object.prototype.hasOwnProperty.call(o,n)&&(0,o[n])(e))return n;throw new Error("Identifier was not able to identify this object ".concat(JSON.stringify(e)))}(r),u=p[s],m=u.__primaryKey;if(!r[m])throw new Error('Expected object "'.concat(s,'" to have a primaryKey "').concat(m,'".'));if("__destroy__"in r){if(r.__destroy__)return function(e){var r=e.item,n=e.name,a=e.primaryKey;if(l[n])if(y.current[n]){var i=r[a],_=y.current[n][i];_&&(_.forEach((function(e){var r=e.split("."),n=r[0],t=r[1],a=r[2];if(l[n][t])if("hasMany"===p[n].__relationship[a].__has){var _=l[n][t][a].indexOf(i);if(-1!==_){if(1===l[n][t][a].length)return void delete l[n][t][a];l[n][t][a].splice(_,1)}}else delete l[n][t][a]})),delete y.current[n][i]),t({item:r,name:n,primaryKey:a})}else t({item:r,name:n,primaryKey:a})}({item:r,name:s,primaryKey:m});delete r.__destroy__}if(l[s]||(l[s]={}),l[s][r[m]]||(l[s][r[m]]={}),!n){if("__indexes__"in r){var h="string"==typeof r.__indexes__?[r.__indexes__]:r.__indexes__;null==h||h.forEach((function(e){var n=e.split("-")[0],t=p[n];if(null==t?void 0:t.__objects.includes(s)){u.__indexes.includes(e)||u.__indexes.push(e),l[e]||(l[e]=[]);var a="".concat(s,"-").concat(r[m]);l[e].includes(a)||l[e].push(a)}})),delete r.__indexes__}if("__removeFromIndexes__"in r){var d="string"==typeof r.__removeFromIndexes__?[r.__removeFromIndexes__]:r.__removeFromIndexes__;null==d||d.forEach((function(e){if(l[e]){var n="".concat(s,"-").concat(r[m]),t=l[e].indexOf(n);t>-1&&l[e].splice(t,1)}})),delete r.__removeFromIndexes__}}if(Object.entries(r).forEach((function(e){var n=e[0],t=e[1];if(u.__relationship[n]){var a="hasMany"===u.__relationship[n].__has;if(!r[n])return;if(!a)return"object"!=typeof r[n]?void(l[s][r[m]][n]=r[n]):void i({item:r[n],parentPrimaryKey:r[m],parentField:n,parentName:s});if(r[n].every((function(e){return"object"!=typeof e}))){for(var _=u.__relationship[n].__name,o=r[m],c=l[s][o][n],f=[],p=0;p<(null==c?void 0:c.length);p++){var h=c[p];r[n].includes(h)?f.push(h):y.remove({name:_,primaryKey:h,ref:"".concat(s,".").concat(o,".").concat(n)})}return void(l[s][o][n]=f)}r[n].forEach((function(e){i({item:e,parentPrimaryKey:r[m],parentField:n,parentName:s,parentFieldHasMany:!0})}))}else l[s][r[m]][n]=t})),n&&_&&f){if(c){var v=l[n][f][_];return Array.isArray(v)?void(!!v.find((function(e){return e===r[m]}))||(y.upsert({name:s,primaryKey:r[m],ref:"".concat(n,".").concat(f,".").concat(_)}),v.push(r[m]),a({name:s,item:r,parentName:n,parentPrimaryKey:f,primaryKey:m,relationalObject:u}))):(y.upsert({name:s,primaryKey:r[m],ref:"".concat(n,".").concat(f,".").concat(_)}),l[n][f][_]=[r[m]],void a({name:s,item:r,parentName:n,parentPrimaryKey:f,primaryKey:m,relationalObject:u}))}y.upsert({name:s,primaryKey:r[m],ref:"".concat(n,".").concat(f,".").concat(_)}),l[n][f][_]=r[m],a({name:s,item:r,parentName:n,parentPrimaryKey:f,primaryKey:m,relationalObject:u})}}r.forEach((function(e){return!!e&&i({item:e})})),null==n||n.forEach((function(e){var r=e[0],n=e[1],t=p[r].__sort,a="".concat(r,"-").concat(n);t&&l[a]&&l[a].sort((function(e,r){var n=e.split("-"),a=n[0],i=n[1],_=r.split("-"),o=_[0],c=_[1];return t(l[a][i],l[o][c])}))})),m.forEach((function(e){return e()}))}null==i||i.forEach((function(e){return p[e.__name]=e}));var d=s((function(e){return _(p,l,e)})),v=s((function(e,r){var n=l[e],a=[];return n?(n.forEach((function(n){var i,o=n.split("-"),c=o[0],f=o[1],s=p[c].__primaryKey,u=r?r[c]:{from:c,fields:"*"};if(!u)throw new Error('selectIndex() expected SelectOptions for "'.concat(c,'" in the index "').concat(e,'".'));var y=_(p,l,t(t({},u),{where:(i={},i[s]=f,i)}));if(y)return(null==u?void 0:u.where)?void(("function"!=typeof(null==u?void 0:u.where)||(null==u?void 0:u.where(y)))&&a.push(y)):a.push(y)})),a):null}));return{save:function(e){e({state:l,references:y.current})},restore:function(e){y.current=e.references,Object.entries(e.state).map((function(e){var r=e[0],n=e[1];return l[r]=n}))},getState:function(){return l},getReferences:function(){return y.current},purge:function(){for(var e in l){if(!Object.prototype.hasOwnProperty.call(l,e))return;delete l[e]}y.current={}},select:d,selectIndex:v,upsert:h,upsertWhere:function(e,r){var n=d(e),a=r(n);if(a)return Array.isArray(a)?h(u(a,{__identify__:e.from})):n?void h(t(t(t({},n),a),{__identify__:e.from})):h(t(t({},a),{__identify__:e.from}))},subscribe:function(e){return m.add(e),function(){return m.delete(e)}},destroy:function(e){delete l[e]}}}"function"==typeof SuppressedError&&SuppressedError;export{r as createRelationalObject,n as createRelationalObjectIndex,l as createStore,u as withOptions};
