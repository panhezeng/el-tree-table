<template>
  <div id="app">
    <el-tree-table ref="treeTable" :expand-unique-values="expandUniqueValues" :tree-data="treeData" :columns="columns"
                   :custom-render="customRender" style="width: 100%" @init-data="initData" @toggle-expand="toggleExpand"
                   @selection-change="handleSelectionChange">
      <el-table-column
        label="slot用法"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
    </el-tree-table>
  </div>
</template>

<script>
// import '../../dist/el-tree-table.min.js'
//  import Vue from 'vue'
//  import ElTreeTable from '../../dist/el-tree-table.min.js'
import ElTreeTable from "../../src/ElTreeTable.vue";
//  const ElTreeTable = require('../../dist/el-tree-table.min.js')

//  Vue.use(ElTreeTable)

//  const ElTreeTable = () => import('../../dist/el-tree-table.min.js')

export default {
  name: "App",
  components: { ElTreeTable },
  data() {
    return {
      columns: [
        {
          prop: "id",
          label: "ID",
          width: 65
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
        }
      ],
      customRender: {
        id(scope) {
          return `<span style="color: red">${scope.row.id}</span>`;
        }
      },
      expandUniqueValues: [],
      treeData: [
        {
          id: 1,
          title: "标题1-1"
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
          children_count: 1
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(val) {
      console.log("handleSelectionChange", val);
      if (val && val.length) {
        console.log(
          "handleSelectionChange P",
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
    toggleExpand(row) {
      console.log("getParent", this.$refs.treeTable.getParent(row));
      // 如果是展开，并且还没孩子节点数据，则加载
      if (row.treeExpand && !(row.children && row.children.length)) {
        // 加载动画
        this.$refs.treeTable.loadingFullIndex = row.treeFullIndex;
        setTimeout(() => {
          row.children = [
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
          ];
          this.expandUniqueValues = this.$refs.treeTable
            .getExpandRows()
            .map(value => value.treeFullIndex);
          // 触发重新渲染数据
          this.treeData = this.treeData.slice();
          // 取消加载动画
          this.$refs.treeTable.loadingFullIndex = "";
        }, 1000);
      }
    }
  }
};
</script>
