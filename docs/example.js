!function(e){var t={};function n(r){if(t[r])return t[r].exports;var l=t[r]={i:r,l:!1,exports:{}};return e[r].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(r,l,function(t){return e[t]}.bind(null,l));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){e.exports=Vue},function(e,t,n){var r;window,e.exports=(r=n(2),function(e){var t={};function n(r){if(t[r])return t[r].exports;var l=t[r]={i:r,l:!1,exports:{}};return e[r].call(l.exports,l,l.exports,n),l.l=!0,l.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(r,l,function(t){return e[t]}.bind(null,l));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){var r=n(3),l=n(4),o=n(5);e.exports=function(e){return r(e)||l(e)||o()}},function(e,t){e.exports=r},function(e,t,n){"use strict";n.r(t),n.d(t,"ElTreeTable",function(){return l});var r,l=n(6).default;function o(e){r?console.warn("[ElTreeTable] already installed. Vue.use(ElTreeTable) should be called only once."):(r=e).component(l.name,l)}l.install=o,"undefined"!=typeof window&&window.Vue&&o(window.Vue)},function(e,t){e.exports=function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}},function(e,t){e.exports=function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}},function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-table",e._g(e._b({ref:"treeTable",staticClass:"el-tree-table",attrs:{"row-style":e.getRowStyle,"cell-style":e.getRowStyle,lazy:!1,data:e.data},on:{select:e.handleSelect}},"el-table",e.$attrs,!1),e.$listeners),[e._t("start"),e._v(" "),e.columnSelectionWidth?n("el-table-column",{attrs:{type:"selection",width:e.columnSelectionWidth}}):e._e(),e._v(" "),e.columnExpand?n("el-table-column",{attrs:{width:e.columnExpandWidth,"column-key":"columnExpand"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("div",{style:"margin-left: "+t.row.treeLevel*e.columnExpandIndent+"px;"},[t.row.treeChildrenLoading?n("span",[n("i",{staticClass:"el-icon-loading"})]):t.row.treeHasChildren?n("span",{on:{click:function(n){return e.toggleExpand(t.row,t.$index)}}},[t.row.treeExpand?n("i",{class:e.expandIcon,staticStyle:{cursor:"pointer"}}):n("i",{class:e.collapseIcon,staticStyle:{cursor:"pointer"}})]):n("span",[n("i",{class:e.leafIcon})])])]}}],null,!1,4083879389)}):e._e(),e._v(" "),e._t("default"),e._v(" "),e.columns.length?[e._l(e.columns,function(t){return[n("el-table-column",e._b({key:t.prop,scopedSlots:e._u([{key:"default",fn:function(r){return[r.row[t.prop]?[e._v(e._s(r.row[t.prop]))]:e._e(),e._v(" "),e.columnCustomRender[t.prop]&&e.columnCustomRender[t.prop].component?n(e.columnCustomRender[t.prop].component,e._b({tag:"component"},"component",Object.assign({},e.columnCustomRender[t.prop].props,{cellData:r}),!1)):e._e()]}}],null,!0)},"el-table-column",t,!1))]})]:e._e(),e._v(" "),e._t("end")],2)};r._withStripped=!0;var l=n(0),o=n.n(l),a=n(1),i=function(e,t,n,r,l,o,a,i){var s,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=[],c._compiled=!0),s)if(c.functional){c._injectStyles=s;var d=c.render;c.render=function(e,t){return s.call(t),d(e,t)}}else{var u=c.beforeCreate;c.beforeCreate=u?[].concat(u,s):[s]}return{exports:e,options:c}}({name:"ElTreeTable",components:{"el-table":a.Table,"el-table-column":a.TableColumn},inheritAttrs:!1,props:{treeChildrenKey:{type:String,default:"children"},treeChildrenLazyKey:{type:String,default:"lazy"},treeData:{type:Array,default:function(){return[]}},expandAll:{type:Boolean,default:!1},expandIndexes:{type:Array,default:function(){return[]}},columnSelectionWidth:{type:Number,default:55},selectionRelate:{type:Boolean,default:!0},columnExpand:{type:Boolean,default:!0},columnExpandIndent:{type:Number,default:20},columns:{type:Array,default:function(){return[]}},columnCustomRender:{type:Object,default:function(){return{}}},expandIcon:{type:String,default:"el-icon-caret-bottom"},collapseIcon:{type:String,default:"el-icon-caret-right"},leafIcon:{type:String,default:"el-icon-minus"}},data:function(){return{mapData:{},data:[],maxLevelShow:0,columnExpandWidth:55,click:"click"}},watch:{treeData:{handler:function(){if(this.mapData=[],this.data=[],this.maxLevelShow=0,this.treeData.length){var e=this.treeToTableData(this.treeData,!0);this.maxLevelShow=e.maxLevelShow,this.data=e.rows}this.$emit("init-data",this.data)},immediate:!0}},methods:{getRowStyle:function(e){return!1===e.row.rowShow?{display:"none"}:null},setTreeChildrenLoading:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.$set(e,"treeChildrenLoading",t)},expand:function(e){return this.expandAll||-1!==this.expandIndexes.indexOf(e.treeFullIndex)},getRowIndex:function(e){return this.data.findIndex(function(t){return String(t.treeFullIndex)===String(e.treeFullIndex)})},getParent:function(e){var t=String(e.treeFullIndex).replace(/-?\d$/,"");return t?this.data.find(function(e){return String(e.treeFullIndex)===t}):null},getExpandRows:function(){return"[object Array]"===Object.prototype.toString.call(this.data)&&this.data.length?this.data.filter(function(e){return e.treeExpand}):[]},getSrcNode:function(e){return this.mapData[String(e.treeFullIndex)]},treeToTableData:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{rows:[],maxLevelShow:0},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",l=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0;if("[object Array]"===Object.prototype.toString.call(e)&&e.length)for(var o=0,a=e.length;o<a;o++){var i=e[o];delete i.tableRowData;var s=JSON.parse(JSON.stringify(i));i.tableRowData=s,delete s[this.treeChildrenKey],n.rows.push(s),this.$set(s,"rowIndex",n.rows.length);var c=this.expand(s);0===l?r="":o&&(r=String(r).replace(/\d$/,"")),r="".concat(r).concat(o),this.$set(s,"treeFullIndex",String(r)),this.$set(s,"treeLevel",l),this.$set(s,"treeExpand",c),this.$set(s,"rowShow",t),this.$set(s,"treeHasChildren",Boolean(i[this.treeChildrenLazyKey])),l>n.maxLevelShow&&t&&(n.maxLevelShow=l,this.columnExpandWidth=55+n.maxLevelShow*this.columnExpandIndent),this.mapData[String(r)]=i;var d=i[this.treeChildrenKey];"[object Array]"===Object.prototype.toString.call(d)&&d.length&&(this.$set(s,"treeHasChildren",!0),this.treeToTableData(d,c,n,"".concat(r,"-"),l+1))}return n},delRow:function(e){var t=String(e.treeFullIndex),n=this.getRowIndex(e),r=1;if(e.treeHasChildren)for(var l=n+1,o=this.data.length;l<o;l++){var a=this.data[l];if(parseInt(a.treeLevel)<=parseInt(e.treeLevel))break;r++}var i=this.getParent(e);if(i){var s=this.getSrcNode(i),c=s[this.treeChildrenKey],d=c.length>1;if(d){var u=c.findIndex(function(e){return String(e.tableRowData.treeFullIndex)===t});c.splice(u,1),d=c.length>1}d||delete s[this.treeChildrenKey],this.$set(i,"treeHasChildren",d),delete this.mapData[t],this.data.splice(n,r)}else this.treeData.splice(this.treeData.findIndex(function(e){return String(e.tableRowData.treeFullIndex)===t}),1)},addTreeChildren:function(e,t){var n;delete e[this.treeChildrenLazyKey];var r=this.getSrcNode(e);delete r[this.treeChildrenLazyKey];var l=r[this.treeChildrenKey];if("[object Array]"===Object.prototype.toString.call(l))for(var a=l.length;a--;)this.delRow(l[a].tableRowData);r[this.treeChildrenKey]=t,this.$set(e,"treeHasChildren",!0);var i=this.treeToTableData(t,!0,{rows:[],maxLevelShow:this.maxLevelShow},"".concat(e.treeFullIndex,"-"),parseInt(e.treeLevel)+1);this.maxLevelShow=i.maxLevelShow;var s=this.getRowIndex(e);(n=this.data).splice.apply(n,[s+1,0].concat(o()(i.rows))),this.setTreeChildrenLoading(e,!1)},addTreeSibling:function(e,t,n){var r=this.getParent(e);if(r){var l=this.getSrcNode(r)[this.treeChildrenKey].slice();"[object Number]"!==Object.prototype.toString.call(n)&&(n=l.length),l.splice.apply(l,[n,0].concat(o()(t))),this.addTreeChildren(r,l)}else{var a;"[object Number]"!==Object.prototype.toString.call(n)&&(n=this.treeData.length),(a=this.treeData).splice.apply(a,[n,0].concat(o()(t)))}},toggleExpand:function(e){var t=this;if(this.$set(e,"treeExpand",!e.treeExpand),!e[this.treeChildrenLazyKey]){if(function n(r){"[object Array]"===Object.prototype.toString.call(r)&&r.forEach(function(r){var l=r.tableRowData;t.$set(l,"rowShow",e.treeExpand),e.treeExpand&&parseInt(l.treeLevel)>parseInt(t.maxLevelShow)&&l.rowShow&&(t.maxLevelShow=l.treeLevel),(!e.treeExpand||e.treeExpand&&l.treeExpand)&&n(r[t.treeChildrenKey])})}(this.getSrcNode(e)[this.treeChildrenKey]),!e.treeExpand&&parseInt(this.maxLevelShow)>=parseInt(e.treeLevel)){var n=this.treeData,r=this.getParent(e);r&&(n=this.getSrcNode(r)[this.treeChildrenKey]),n.some(function(e){return e.tableRowData.treeExpand})||(this.maxLevelShow=parseInt(e.treeLevel)-1,this.maxLevelShow<0&&(this.maxLevelShow=0))}this.columnExpandWidth=55+this.maxLevelShow*this.columnExpandIndent}this.$emit("toggle-expand",e)},toggleRowSelection:function(e,t){for(var n=e.rowIndex,r=this.data.length;n<r;n++){var l=this.data[n];if(!new RegExp("^".concat(e.treeFullIndex)).test(l.treeFullIndex))break;this.$refs.treeTable.toggleRowSelection(l,t)}},handleSelect:function(e,t){this.selectionRelate&&this.toggleRowSelection(t,e.some(function(e){return e.treeFullIndex===t.treeFullIndex})),this.$emit("select",e,t)}}},r);i.options.__file="src/ElTreeTable.vue",t.default=i.exports}]).ElTreeTable)},function(e,t){e.exports=ELEMENT},function(e,t,n){"use strict";n.r(t);var r=n(0),l=n.n(r),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("el-tree-table",{ref:"treeTable",staticStyle:{width:"100%"},attrs:{"expand-indexes":e.expandIndexes,"tree-data":e.treeData,columns:e.columns,"column-custom-render":e.columnCustomRender},on:{"init-data":e.initData,"toggle-expand":e.toggleExpand,"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{label:"slot用法",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.title))])]}}])})],1)],1)};o._withStripped=!0;var a=n(1),i={template:"\n            <div>\n              <slot/>\n            </div>\n            "};var s=function(e,t,n,r,l,o,a,i){var s,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=n,c._compiled=!0),r&&(c.functional=!0),o&&(c._scopeId="data-v-"+o),a?(s=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),l&&l.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},c._ssrRegister=s):l&&(s=i?function(){l.call(this,this.$root.$options.shadowRoot)}:l),s)if(c.functional){c._injectStyles=s;var d=c.render;c.render=function(e,t){return s.call(t),d(e,t)}}else{var u=c.beforeCreate;c.beforeCreate=u?[].concat(u,s):[s]}return{exports:e,options:c}}({name:"App",components:{ElTreeTable:n.n(a).a},data:function(){return{columns:[{prop:"id",label:"ID",width:65},{prop:"title",label:"标题","column-key":"title",filters:[{text:"标题1-2-1",value:"标题1-2-1"},{text:"标题1-2-2",value:"标题1-2-2"}],"filter-method":this.filterHandler},{prop:"action",label:"操作",width:150}],columnCustomRender:{action:{props:{cellData:{invalidData:!0},test1:1,test2:2,vm:this},component:{components:{TestComp:i},props:{cellData:{type:Object,default:function(){return{}}},vm:{type:Object,default:function(){return{}}},test2:Number},methods:{delHandler:function(){console.log(this.cellData,this.vm,this.$attrs.test1,this.test2),this.vm.$refs.treeTable.delRow(this.cellData.row)},copyHandler:function(){this.vm.$refs.treeTable.addTreeSibling(this.cellData.row,[this.cellData.row],0)}},template:'\n                      <test-comp>\n                        <el-button @click="delHandler">删除</el-button>\n                        <el-button @click="copyHandler">复制</el-button>\n                      </test-comp>\n                      '}}},expandIndexes:["0"],treeData:[{id:1,title:"标题1-1"},{id:2,title:"标题1-2",children:[{id:3,title:"标题1-2-1"},{id:4,title:"标题1-2-2",children:[{id:5,title:"标题1-2-2-1"},{id:6,title:"标题1-2-2-2"}]},{id:7,title:"标题1-2-3"},{id:8,title:"标题1-2-4",children:[{id:9,title:"标题1-2-4-1"},{id:10,title:"标题1-2-4-2"}]}]},{id:11,title:"标题1-3",lazy:!0}]}},methods:{handleSelectionChange:function(e){console.log("handleSelectionChange",e),e&&e.length&&console.log("handleSelectionChange P",this.$refs.treeTable.getParent(e[0]))},filterHandler:function(e,t,n){return t[n.property]===e},initData:function(e){console.log("initData",e)},toggleExpand:function(e){var t=this;console.log("getParent",this.$refs.treeTable.getParent(e)),e.treeExpand&&e.lazy&&(this.$refs.treeTable.setTreeChildrenLoading(e),setTimeout(function(){t.$refs.treeTable.addTreeChildren(e,[{id:12,title:"标题1-3-1",children:[{id:13,title:"标题1-3-1-1"}]}])},1e3))}}},o,[],!1,null,null,null);s.options.__file="example/components/App.vue";var c=s.exports;new l.a({el:"#app",render:function(e){return e(c)}})}]);