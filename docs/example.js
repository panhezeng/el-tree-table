!(function(e) {
  var t = {};
  function n(l) {
    if (t[l]) return t[l].exports;
    var r = (t[l] = { i: l, l: !1, exports: {} });
    return e[l].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function(e, t, l) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: l });
    }),
    (n.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var l = Object.create(null);
      if (
        (n.r(l),
        Object.defineProperty(l, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          n.d(
            l,
            r,
            function(t) {
              return e[t];
            }.bind(null, r)
          );
      return l;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 2));
})([
  function(e, t) {
    e.exports = ELEMENT;
  },
  function(e, t) {
    e.exports = Vue;
  },
  function(e, t, n) {
    "use strict";
    n.r(t);
    var l = n(1),
      r = n.n(l),
      a = function() {
        var e = this,
          t = e.$createElement,
          n = e._self._c || t;
        return n(
          "div",
          { attrs: { id: "app" } },
          [
            n(
              "el-tree-table",
              {
                ref: "treeTable",
                staticStyle: { width: "100%" },
                attrs: {
                  "expand-unique-values": e.expandUniqueValues,
                  "tree-data": e.treeData,
                  columns: e.columns,
                  "custom-render": e.customRender
                },
                on: {
                  "init-data": e.initData,
                  "toggle-expand": e.toggleExpand,
                  "selection-change": e.handleSelectionChange
                }
              },
              [
                n("el-table-column", {
                  attrs: { label: "slot用法", width: "100" },
                  scopedSlots: e._u([
                    {
                      key: "default",
                      fn: function(t) {
                        return [n("span", [e._v(e._s(t.row.title))])];
                      }
                    }
                  ])
                })
              ],
              1
            )
          ],
          1
        );
      };
    a._withStripped = !0;
    var o = function() {
      var e = this,
        t = e.$createElement,
        n = e._self._c || t;
      return n(
        "el-table",
        e._g(
          e._b(
            {
              ref: "treeTable",
              staticClass: "el-tree-table",
              attrs: { "row-style": e.getRowStyle, data: e.data },
              on: { select: e.handleSelect }
            },
            "el-table",
            e.$attrs,
            !1
          ),
          e.$listeners
        ),
        [
          e._t("start"),
          e._v(" "),
          e.columnSelectionWidth
            ? n("el-table-column", {
                attrs: { type: "selection", width: e.columnSelectionWidth }
              })
            : e._e(),
          e._v(" "),
          e.columnExpand
            ? n("el-table-column", {
                attrs: {
                  width: e.columnExpandWidth,
                  "column-key": "columnExpand"
                },
                scopedSlots: e._u([
                  {
                    key: "default",
                    fn: function(t) {
                      return [
                        n(
                          "div",
                          {
                            style:
                              "margin-left: " +
                              t.row.treeLevel * e.columnExpandIndent +
                              "px;"
                          },
                          [
                            e.loadingIcon(t.row)
                              ? n("span", [
                                  n("i", { staticClass: "el-icon-loading" })
                                ])
                              : t.row.treeHasChildren
                              ? n(
                                  "span",
                                  {
                                    on: {
                                      click: function(n) {
                                        return e.toggleExpand(t.row, t.$index);
                                      }
                                    }
                                  },
                                  [
                                    t.row.treeExpand
                                      ? n("i", { class: e.expandIcon })
                                      : n("i", { class: e.collapseIcon })
                                  ]
                                )
                              : n("span", [n("i", { class: e.leafIcon })])
                          ]
                        )
                      ];
                    }
                  }
                ])
              })
            : e._e(),
          e._v(" "),
          e._t("default"),
          e._v(" "),
          e.columns.length
            ? [
                e._l(e.columns, function(t) {
                  return [
                    e.customRender[t.prop]
                      ? n(
                          "el-table-column",
                          e._b(
                            {
                              key: t.prop,
                              scopedSlots: e._u([
                                {
                                  key: "default",
                                  fn: function(l) {
                                    return [
                                      n("span", {
                                        domProps: {
                                          innerHTML: e._s(
                                            e.customRender[t.prop](l)
                                          )
                                        }
                                      })
                                    ];
                                  }
                                }
                              ])
                            },
                            "el-table-column",
                            t,
                            !1
                          )
                        )
                      : n(
                          "el-table-column",
                          e._b({ key: t.prop }, "el-table-column", t, !1)
                        )
                  ];
                })
              ]
            : e._e(),
          e._v(" "),
          e._t("end")
        ],
        2
      );
    };
    o._withStripped = !0;
    var i = n(0);
    function d(e, t, n, l, r, a, o, i) {
      var d,
        u = "function" == typeof e ? e.options : e;
      if (
        (t && ((u.render = t), (u.staticRenderFns = n), (u._compiled = !0)),
        l && (u.functional = !0),
        a && (u._scopeId = "data-v-" + a),
        o
          ? ((d = function(e) {
              (e =
                e ||
                (this.$vnode && this.$vnode.ssrContext) ||
                (this.parent &&
                  this.parent.$vnode &&
                  this.parent.$vnode.ssrContext)) ||
                "undefined" == typeof __VUE_SSR_CONTEXT__ ||
                (e = __VUE_SSR_CONTEXT__),
                r && r.call(this, e),
                e && e._registeredComponents && e._registeredComponents.add(o);
            }),
            (u._ssrRegister = d))
          : r &&
            (d = i
              ? function() {
                  r.call(this, this.$root.$options.shadowRoot);
                }
              : r),
        d)
      )
        if (u.functional) {
          u._injectStyles = d;
          var c = u.render;
          u.render = function(e, t) {
            return d.call(t), c(e, t);
          };
        } else {
          var s = u.beforeCreate;
          u.beforeCreate = s ? [].concat(s, d) : [d];
        }
      return { exports: e, options: u };
    }
    var u = d(
      {
        name: "ElTreeTable",
        components: { "el-table": i.Table, "el-table-column": i.TableColumn },
        inheritAttrs: !1,
        props: {
          treeChildrenKey: { type: String, default: "children" },
          treeChildrenCountKey: { type: String, default: "children_count" },
          treeData: {},
          tableData: {},
          expandAll: { type: Boolean, default: !1 },
          expandUniqueValues: {
            type: Array,
            default: function() {
              return [];
            }
          },
          columnSelectionWidth: { type: Number, default: 55 },
          selectionRelate: { type: Boolean, default: !0 },
          columnExpand: { type: Boolean, default: !0 },
          columnExpandIndent: { type: Number, default: 20 },
          columns: {
            type: Array,
            default: function() {
              return [];
            }
          },
          customRender: {
            type: Object,
            default: function() {
              return {};
            }
          },
          expandIcon: { type: String, default: "el-icon-caret-bottom" },
          collapseIcon: { type: String, default: "el-icon-caret-right" },
          leafIcon: { type: String, default: "el-icon-minus" }
        },
        data: function() {
          return { data: [], columnExpandWidth: 55, loadingFullIndex: "" };
        },
        watch: {
          treeData: {
            handler: function() {
              this.initData();
            },
            immediate: !0
          },
          tableData: {
            handler: function() {
              this.initData();
            },
            immediate: !0
          }
        },
        methods: {
          loadingIcon: function(e) {
            return (
              this.loadingFullIndex && this.loadingFullIndex === e.treeFullIndex
            );
          },
          expand: function(e) {
            return (
              this.expandAll ||
              -1 !== this.expandUniqueValues.indexOf(e.treeFullIndex)
            );
          },
          getParent: function(e) {
            var t = String(e.treeFullIndex).replace(/-?\d$/, "");
            return t
              ? this.data.find(function(e) {
                  return String(e.treeFullIndex) === t;
                })
              : this.treeData;
          },
          getExpandRows: function() {
            return "[object Array]" ===
              Object.prototype.toString.call(this.data) && this.data.length
              ? this.data.filter(function(e) {
                  return e.treeExpand;
                })
              : [];
          },
          initData: function() {
            "[object Array]" ===
              Object.prototype.toString.call(this.treeData) &&
            this.treeData.length
              ? (this.data = this.treeToTableData(this.treeData, !0))
              : "[object Array]" ===
                  Object.prototype.toString.call(this.tableData) &&
                this.tableData.length &&
                (this.data = this.tableData),
              this.$emit("init-data", this.data);
          },
          treeToTableData: function(e, t) {
            var n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : [],
              l =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : "",
              r =
                arguments.length > 4 && void 0 !== arguments[4]
                  ? arguments[4]
                  : 0,
              a =
                arguments.length > 5 && void 0 !== arguments[5]
                  ? arguments[5]
                  : 0;
            if (
              "[object Array]" === Object.prototype.toString.call(e) &&
              e.length
            )
              for (var o = 0, i = e.length; o < i; o++) {
                var d = e[o];
                n.push(d), this.$set(d, "rowIndex", n.length);
                var u = this.expand(d);
                0 === r ? (l = "") : o && (l = String(l).replace(/\d$/, "")),
                  (l = "".concat(l).concat(o)),
                  this.$set(d, "treeFullIndex", l),
                  this.$set(d, "treeLevel", r),
                  this.$set(d, "treeExpand", u),
                  this.$set(d, "rowShow", t),
                  this.$set(
                    d,
                    "treeHasChildren",
                    Boolean(d[this.treeChildrenCountKey])
                  ),
                  r > a &&
                    t &&
                    ((a = r),
                    (this.columnExpandWidth =
                      55 + a * this.columnExpandIndent));
                var c = d[this.treeChildrenKey];
                "[object Array]" === Object.prototype.toString.call(c) &&
                  c.length &&
                  (this.$set(d, "treeHasChildren", !0),
                  this.treeToTableData(c, u, n, "".concat(l, "-"), r + 1, a));
              }
            return n;
          },
          getRowStyle: function(e) {
            return !1 === e.row.rowShow ? "display:none;" : "";
          },
          toggleExpand: function(e) {
            this.$set(e, "treeExpand", !e.treeExpand);
            for (
              var t = e.treeLevel, n = null, l = 0, r = this.data.length;
              l < r;
              l++
            ) {
              var a = this.data[l];
              if (a.treeFullIndex !== e.treeFullIndex) {
                if (n && n.test(a.treeFullIndex)) continue;
                new RegExp("^".concat(e.treeFullIndex)).test(a.treeFullIndex) &&
                  (this.$set(a, "rowShow", e.treeExpand),
                  (n = null),
                  e.treeExpand &&
                    a.treeHasChildren &&
                    !a.treeExpand &&
                    (n = new RegExp("^".concat(a.treeFullIndex)))),
                  a.treeLevel > t && a.rowShow && (t = a.treeLevel);
              }
            }
            (this.columnExpandWidth = 55 + t * this.columnExpandIndent),
              this.$emit("toggle-expand", e);
          },
          toggleRowSelection: function(e, t) {
            for (var n = e.rowIndex, l = this.data.length; n < l; n++) {
              var r = this.data[n];
              if (
                !new RegExp("^".concat(e.treeFullIndex)).test(r.treeFullIndex)
              )
                break;
              this.$refs.treeTable.toggleRowSelection(r, t);
            }
          },
          handleSelect: function(e, t) {
            this.selectionRelate &&
              this.toggleRowSelection(
                t,
                e.some(function(e) {
                  return e.treeFullIndex === t.treeFullIndex;
                })
              ),
              this.$emit("select", e, t);
          }
        }
      },
      o,
      [],
      !1,
      null,
      null,
      null
    );
    u.options.__file = "src/ElTreeTable.vue";
    var c = d(
      {
        name: "App",
        components: { ElTreeTable: u.exports },
        data: function() {
          return {
            columns: [
              { prop: "id", label: "ID", width: 65 },
              {
                prop: "title",
                label: "标题",
                "column-key": "title",
                filters: [
                  { text: "标题1-2-1", value: "标题1-2-1" },
                  { text: "标题1-2-2", value: "标题1-2-2" }
                ],
                "filter-method": this.filterHandler
              }
            ],
            customRender: {
              id: function(e) {
                return '<span style="color: red">'.concat(e.row.id, "</span>");
              }
            },
            expandUniqueValues: [],
            treeData: [
              { id: 1, title: "标题1-1" },
              {
                id: 2,
                title: "标题1-2",
                children: [
                  { id: 3, title: "标题1-2-1" },
                  {
                    id: 4,
                    title: "标题1-2-2",
                    children: [
                      { id: 5, title: "标题1-2-2-1" },
                      { id: 6, title: "标题1-2-2-2" }
                    ]
                  },
                  { id: 7, title: "标题1-2-3" },
                  {
                    id: 8,
                    title: "标题1-2-4",
                    children: [
                      { id: 9, title: "标题1-2-4-1" },
                      { id: 10, title: "标题1-2-4-2" }
                    ]
                  }
                ]
              },
              { id: 11, title: "标题1-3", children_count: 1 }
            ]
          };
        },
        methods: {
          handleSelectionChange: function(e) {
            console.log("handleSelectionChange", e),
              e &&
                e.length &&
                console.log(
                  "handleSelectionChange P",
                  this.$refs.treeTable.getParent(e[0])
                );
          },
          filterHandler: function(e, t, n) {
            return t[n.property] === e;
          },
          initData: function(e) {
            console.log("initData", e);
          },
          toggleExpand: function(e) {
            var t = this;
            console.log("getParent", this.$refs.treeTable.getParent(e)),
              !e.treeExpand ||
                (e.children && e.children.length) ||
                ((this.$refs.treeTable.loadingFullIndex = e.treeFullIndex),
                setTimeout(function() {
                  (e.children = [
                    {
                      id: 12,
                      title: "标题1-3-1",
                      children: [{ id: 13, title: "标题1-3-1-1" }]
                    }
                  ]),
                    (t.expandUniqueValues = t.$refs.treeTable
                      .getExpandRows()
                      .map(function(e) {
                        return e.treeFullIndex;
                      })),
                    (t.treeData = t.treeData.slice()),
                    (t.$refs.treeTable.loadingFullIndex = "");
                }, 1e3));
          }
        }
      },
      a,
      [],
      !1,
      null,
      null,
      null
    );
    c.options.__file = "example/components/App.vue";
    var s = c.exports;
    new r.a({
      el: "#app",
      render: function(e) {
        return e(s);
      }
    });
  }
]);
