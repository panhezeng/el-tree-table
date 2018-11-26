<template>
  <el-table ref="treeTable" class="el-tree-table" :data="data" :row-style="getRowStyle"
            v-bind="$attrs"
            v-on="$listeners">
    <el-table-column
      type="selection"
      :width="columnSelectionWidth" v-if="columnSelectionWidth"/>
    <el-table-column :width="columnExpandWidth" v-if="columnExpand">
      <template slot-scope="scope">
        <div :style="`margin-left: ${scope.row.treeLevel * columnExpandIndent}px;`">
          <span @click="toggleExpand(scope.row,scope.$index)" v-if="scope.row.treeHasChildren">
            <i v-if="scope.row.treeExpand" class="el-icon-caret-bottom"/>
            <i v-else class="el-icon-caret-right"/>
          </span>
          <span v-else><i class="el-icon-minus"/></span>
        </div>
      </template>
    </el-table-column>
    <template v-if="columns.length">
      <el-table-column v-for="column in columns" :key="column.prop"
                       :prop="column.prop"
                       :label="column.label"
                       :width="column.width"/>
    </template>
    <slot/>
  </el-table>
</template>
<script>
  import {Table, TableColumn} from "element-ui";

  // 展开操作列的初始宽度
  const columnExpandWidthInit = 55;

  export default {
    name: "ElTreeTable",
    components: {"el-table": Table, "el-table-column": TableColumn},
    inheritAttrs: false,
    props: {
      // 数据的唯一标识key
      uniqueKey: {type: String, default: "id"},
      treeChildrenKey: {type: String, default: "children"},
      // 树形数据结构，用来转换成表格数据
      treeData: {},
      // 表格数据结构，如果传了这个，就不用treeData了
      tableData: {},
      // 是否展开所有
      expandAll: {
        type: Boolean,
        default: false,
      },
      // 勾选列宽，为0，则不显示
      columnSelectionWidth: {
        type: Number,
        default: 55
      },
      // 展开操作列
      columnExpand: {
        type: Boolean,
        default: true
      },
      // 展开操作缩进像素
      columnExpandIndent: {
        type: Number,
        default: 20
      },
      // 要渲染的列数据，没有则不渲染，使用者可以通过slot，自己实现
      columns: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        data: [],
        columnExpandWidth: columnExpandWidthInit
      };
    },
    watch: {
      treeData: {
        handler() {
          this.initData();
        },
        immediate: true,
      },
      tableData: {
        handler() {
          this.initData();
        },
        immediate: true,
      },
    },
    methods: {
      initData() {
        if (Object.prototype.toString.call(this.treeData) === "[object Array]" && this.treeData.length) {
          const data = []
          this.treeToTableData(JSON.parse(JSON.stringify(this.treeData)), data)
          this.data = data;
        } else if (Object.prototype.toString.call(this.tableData) === "[object Array]" && this.tableData.length) {
          this.data = JSON.parse(JSON.stringify(this.tableData));
        }
      },
      /**
       * 把树形嵌套数据结构转换为表格并列数据结构，并且增加属性标识每条数据对象之间的树形关系
       * @param from
       * @param to
       * @param fullIndex 当前节点的完整索引，包括祖先节点的索引
       * @param level 当前递归的层级
       * @return {Array}
       */
      treeToTableData(from, to, fullIndex = "", level = 0) {

        if (
          Object.prototype.toString.call(from) === "[object Array]" &&
          from.length
        ) {
          for (let i = 0, len = from.length; i < len; i++) {
            const node = from[i];
            // 表格一行的数据
            const row = JSON.parse(JSON.stringify(node));
            to.push(row);
            // 第一层初始化
            if (level === 0) {
              fullIndex = "";
              row.rowShow = true;
            } else {
              // 如果是第二层以后非第一个元素，则需要去掉前一个兄弟元素
              if (i) {
                const fullIndexArray = String(fullIndex).split("-");
                fullIndexArray.pop();
                fullIndex = fullIndexArray.join("-") + "-";
              }
              row.rowShow = this.expandAll;
            }
            // 节点的唯一标识
            fullIndex = `${fullIndex}${i}`;
            row.treeIndex = fullIndex;
            row.treeLevel = level;
            row.treeExpand = this.expandAll;
            row.treeHasChildren = false;
            const children = node[this.treeChildrenKey];
            if (
              Object.prototype.toString.call(children) === "[object Array]" &&
              children.length
            ) {
              row.treeHasChildren = true;
              delete row[this.treeChildrenKey];
              this.treeToTableData(
                children,
                to,
                `${fullIndex}-`,
                level + 1,
              );
            }
          }
        }
      },
      getRowStyle({row}) {
        return row.rowShow === false ? 'display:none;' : ''
      },
      toggleExpand: function (clickRow) {
        clickRow.treeExpand = !clickRow.treeExpand;
        let maxLevelShow = clickRow.treeLevel;
        let continueTest = null;
        // 必须从上到下遍历，不然正则匹配跳过子节点逻辑无法实现
        for (let i = 0, len = this.data.length; i < len; i++) {
          const row = this.data[i];
          // 如果遍历的行不是点击的行，则继续
          if (row[this.uniqueKey] !== clickRow[this.uniqueKey]) {
            // 如果有跳过检查，并且遍历的行满足条件，则执行跳过
            // 否则如果遍历的行是当前点击行的子节点
            if (continueTest && continueTest.test(row.treeIndex)) {
              continue;
            } else if (new RegExp(`^${clickRow.treeIndex}`).test(row.treeIndex)) {
              row.rowShow = clickRow.treeExpand;

              continueTest = null;
              // 如果当前点击是展开，并且下一行有子节点，而且是不展开，则它后面的子节点都跳过
              if (clickRow.treeExpand && row.treeHasChildren && !row.treeExpand) {
                continueTest = new RegExp(`^${row.treeIndex}`)
              }

            }
            // 获得显示行的最大层级
            if (row.rowShow && row.treeLevel > maxLevelShow) {
              maxLevelShow = row.treeLevel;
            }
          }
        }

        this.columnExpandWidth = columnExpandWidthInit + (maxLevelShow * this.columnExpandIndent)
      },
    }
  };
</script>

