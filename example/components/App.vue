<template>
  <div id="app">
    <el-tree-table
      ref="treeTable"
      :expand-indexes="expandIndexes"
      :tree-data="treeData"
      :columns="columns"
      :column-custom-render="columnCustomRender"
      :load-children="loadChildren"
      style="width: 100%"
      @init-data="initData"
      @toggle-expand="toggleExpand"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
    >
      <el-table-column label="slot用法" width="100">
        <template v-slot="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
    </el-tree-table>
  </div>
</template>

<script>
// import '../../dist/el-tree-table.min.js'
//  import Vue from 'vue'
import ElTreeTable from "../../dist/el-tree-table.min.js";
// import ElTreeTable from "../../src/ElTreeTable.vue";
//  const ElTreeTable = require('../../dist/el-tree-table.min.js')

//  Vue.use(ElTreeTable)

//  const ElTreeTable = () => import('../../dist/el-tree-table.min.js')

const test1 = 1;
const test2 = 2;

const TestComp = {
  template: `
            <div>
              <slot/>
            </div>
            `
};

export default {
  name: "App",
  components: { ElTreeTable },
  data() {
    return {
      columns: [
        {
          prop: "id",
          label: "ID",
          width: 65,
          sortable: "custom"
        },
        {
          prop: "title",
          label: "标题",
          "column-key": "title",
          filters: [
            { text: "标题1-2-1", value: "标题1-2-1" },
            { text: "标题1-2-2", value: "标题1-2-2" }
          ],
          "filter-method": this.filterHandler
        },
        {
          prop: "action",
          label: "操作",
          width: 150
        }
      ],
      columnCustomRender: {
        action: {
          props: {
            cellData: { invalidData: true },
            test1,
            test2,
            vm: this
          },
          component: {
            components: { TestComp },
            props: {
              cellData: {
                type: Object,
                default() {
                  return {};
                }
              },
              vm: {
                type: Object,
                default() {
                  return {};
                }
              },
              test2: Number
            },
            methods: {
              delHandler() {
                console.log(
                  this.cellData,
                  this.vm,
                  this.$attrs["test1"],
                  this.test2
                );
                this.vm.$refs.treeTable.delRow(this.cellData.row);
              },
              copyHandler() {
                this.vm.$refs.treeTable.addTreeSibling(
                  this.cellData.row,
                  [this.cellData.row],
                  0
                );
              }
            },
            template: `
                      <test-comp>
                        <el-button @click="delHandler">删除</el-button>
                        <el-button @click="copyHandler">复制</el-button>
                      </test-comp>
                      `
          }
        }
      },
      expandIndexes: ["1"],
      treeData: [
        {
          id: 1,
          title: "标题1-1",
          action: "test double cell render"
        },
        {
          id: 2,
          title: "标题1-2",
          children: [
            {
              id: 3,
              title: "标题1-2-1"
            },
            {
              id: 4,
              title: "标题1-2-2",
              children: [
                {
                  id: 5,
                  title: "标题1-2-2-1"
                },
                {
                  id: 6,
                  title: "标题1-2-2-2"
                }
              ]
            },
            {
              id: 7,
              title: "标题1-2-3"
            },
            {
              id: 8,
              title: "标题1-2-4",
              children: [
                {
                  id: 9,
                  title: "标题1-2-4-1"
                },
                {
                  id: 10,
                  title: "标题1-2-4-2"
                }
              ]
            }
          ]
        },
        {
          id: 11,
          title: "标题1-3",
          lazy: true
        }
      ],
      treeDataBackup: []
    };
  },
  methods: {
    handleSelectionChange(val) {
      console.log("handleSelectionChange", val);
      if (val && val.length) {
        console.log(
          "handleSelectionChange",
          this.$refs.treeTable.getParent(val[0])
        );
      }
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    initData(data) {
      console.log("initData", data);
    },
    async loadChildren(row) {
      console.log(row);
      const getData = () => {
        return new Promise(function(resolve) {
          setTimeout(function() {
            resolve([
              {
                id: 12,
                title: "标题1-3-1",
                children: [
                  {
                    id: 13,
                    title: "标题1-3-1-1"
                  }
                ]
              }
            ]);
          }, 1000);
        });
      };
      const children = await getData();
      return children;
    },
    toggleExpand(row) {
      console.log("getParent", this.$refs.treeTable.getParent(row));
    },
    sortChange({ column, prop, order }) {
      const treeDataSort = data => {
        if (
          Object.prototype.toString.call(data) === "[object Array]" &&
          data.length
        ) {
          data.forEach(item => {
            if (
              Object.prototype.toString.call(item.children) ===
                "[object Array]" &&
              item.children.length
            ) {
              treeDataSort(item.children);
            }
          });

          if (order === "ascending") {
            data.sort((a, b) => {
              return a[prop] - b[prop];
            });
          } else if (order === "descending") {
            data.sort((a, b) => {
              return b[prop] - a[prop];
            });
          } else {
            // 还原默认排序，这里默认排序是按id升序
            data.sort((a, b) => {
              return a["id"] - b["id"];
            });
          }
        }
      };
      treeDataSort(this.treeData);
    }
  }
};
</script>
