<template>
  <el-table ref="treeTable" class="el-tree-table" :row-style="getRowStyle"
            :data="data"
            @select="handleSelect"
            @selection-change="handleSelectionChange"
            v-bind="$attrs"
            v-on="$listeners">
    <el-table-column
      type="selection"
      :width="columnSelectionWidth" v-if="columnSelectionWidth"/>
    <el-table-column :width="columnExpandWidth" v-if="columnExpand">
      <template slot-scope="scope">
        <div :style="`margin-left: ${scope.row.treeLevel * columnExpandIndent}px;`">
          <span @click="toggleExpand(scope.row,scope.$index)" v-if="scope.row.treeHasChildren">
            <i v-if="scope.row.treeExpand" :class="expandIcon"/>
            <i v-else :class="collapseIcon"/>
          </span>
          <span v-else><i :class="leafIcon"/></span>
        </div>
      </template>
    </el-table-column>
    <template v-if="columns.length">
      <el-table-column v-for="column in columns" :key="column.prop"
                       :filtered-value="column.filteredValue"
                       :filter-method="column.filterMethod"
                       :filter-multiple="column.filterMultiple"
                       :filters="column.filters"
                       :column-key="column.prop"
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
      // 获取树形数据的子节点的key
      treeChildrenKey: {type: String, default: "children"},
      // 树形数据结构，用来转换成表格数据
      treeData: {},
      // 表格数据结构，如果传了这个，就不用treeData了
      // tableData的row数据对象必须有row.treeFullIndex，row.treeLevel, row.treeHasChildren属性，而且值必须正确有效
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
      // 要渲染的列数据，没有则不渲染，开发者可以通过slot，自己实现
      columns: {
        type: Array,
        default() {
          return []
        }
      },
      expandIcon: {
        type: String,
        default: 'el-icon-caret-bottom'
      },
      collapseIcon: {
        type: String,
        default: 'el-icon-caret-right'
      },
      leafIcon: {
        type: String,
        default: 'el-icon-minus'
      }
    },
    data() {
      return {
        data: [],
        columnExpandWidth: columnExpandWidthInit,
        multipleSelection: []
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
          this.data = this.treeToTableData(JSON.parse(JSON.stringify(this.treeData)))
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
      treeToTableData(from, to = [], fullIndex = "", level = 0) {
        if (
          Object.prototype.toString.call(from) === "[object Array]" &&
          from.length
        ) {
          for (let i = 0, len = from.length; i < len; i++) {
            const node = from[i];
            // 表格一行的数据
            const row = JSON.parse(JSON.stringify(node));
            row.rowIndex = to.length;
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
            row.treeFullIndex = fullIndex;
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
        return to
      },
      getRowStyle({row}) {
        return row.rowShow === false ? 'display:none;' : ''
      },
      toggleExpand: function (clickRow) {
        clickRow.treeExpand = !clickRow.treeExpand;
        let maxLevelShow = clickRow.treeLevel;
        let continueTest = null;
        // 必须从上到下遍历，不然通过正则匹配处理子节点row的逻辑无法实现
        for (let i = 0, len = this.data.length; i < len; i++) {
          const row = this.data[i];
          // 如果遍历的行不是点击的行，则继续
          if (row[this.uniqueKey] !== clickRow[this.uniqueKey]) {
            // 如果有跳过检查，并且遍历的行满足条件，则执行跳过
            // 否则如果遍历的行是当前点击行的子节点
            if (continueTest && continueTest.test(row.treeFullIndex)) {
              continue;
            } else if (new RegExp(`^${clickRow.treeFullIndex}`).test(row.treeFullIndex)) {
              row.rowShow = clickRow.treeExpand;

              continueTest = null;
              // 如果当前点击是展开，并且下一行有子节点，而且是不展开，则它后面的子节点都跳过
              if (clickRow.treeExpand && row.treeHasChildren && !row.treeExpand) {
                continueTest = new RegExp(`^${row.treeFullIndex}`)
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
      toggleRowSelection(clickRow, selected) {
        // 必须从上到下遍历，不然通过正则匹配处理子节点row的逻辑无法实现
        for (let i = clickRow.rowIndex + 1, len = this.data.length; i < len; i++) {
          const row = this.data[i];
          if (new RegExp(`^${clickRow.treeFullIndex}`).test(row.treeFullIndex)) {
            this.$refs.treeTable.toggleRowSelection(row, selected);
          } else {
            break;
          }
        }
      },
      handleSelect(selection, clickRow) {
        // 如果为真则是勾选
        // 否则是取消勾选
        this.toggleRowSelection(clickRow, selection.some(row => row[this.uniqueKey] === clickRow[this.uniqueKey]))
        this.$emit('select', selection, clickRow)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.$emit('selection-change', val)
      }
    }
  };
</script>

