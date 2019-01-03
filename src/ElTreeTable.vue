<template>
  <el-table ref="treeTable" class="el-tree-table" :row-style="getRowStyle"
            :data="data"
            @select="handleSelect"
            v-bind="$attrs"
            v-on="$listeners">
    <el-table-column
      type="selection"
      :width="columnSelectionWidth" v-if="columnSelectionWidth"/>
    <el-table-column :width="columnExpandWidth" column-key="columnExpand" v-if="columnExpand">
      <template slot-scope="scope">
        <div :style="`margin-left: ${scope.row.treeLevel * columnExpandIndent}px;`">
          <span v-if="loadingIcon(scope.row)"><i class="el-icon-loading"/></span>
          <span @click="toggleExpand(scope.row,scope.$index)" v-else-if="scope.row.treeHasChildren">
            <i v-if="scope.row.treeExpand" :class="expandIcon"/>
            <i v-else :class="collapseIcon"/>
          </span>
          <span v-else><i :class="leafIcon"/></span>
        </div>
      </template>
    </el-table-column>
    <template v-if="columns.length">
      <el-table-column v-for="column in columns" :key="column.prop"
                       v-bind="column"/>
    </template>
    <slot/>


  </el-table>
</template>
<script>
import { Table, TableColumn } from "element-ui";

// 展开操作列的初始宽度
const columnExpandWidthInit = 55;

export default {
  name: "ElTreeTable",
  components: { "el-table": Table, "el-table-column": TableColumn },
  inheritAttrs: false,
  props: {
    // 获取树形数据的子节点的key
    treeChildrenKey: { type: String, default: "children" },
    // 孩子数据数量的key，是否显示展开按钮，通过treeChildrenKey和treeChildrenCountKey一起判断，
    // 如果通过treeChildrenKey获得的数组为空，而通过treeChildrenCountKey获得为数量大于0，则也会显示展开按钮，结合toggle-expand事件可实现懒加载
    // 懒加载获得的子节点数据后，更新treeData前，通过getExpandRows可以获得所有已展开的数据，结合expandUniqueValues，实现更新treeData后还原展开状态
    treeChildrenCountKey: { type: String, default: "children_count" },
    // 树形数据结构，用来转换成表格数据
    treeData: {},
    // 表格数据结构，如果传了这个，就不用treeData了
    // tableData的row数据对象必须有row.treeFullIndex，row.treeLevel, row.treeHasChildren属性，而且值必须正确有效
    tableData: {},
    // 是否展开所有
    expandAll: {
      type: Boolean,
      default: false
    },
    // 默认需要展开的行，数组值是每行的uniqueValue
    expandUniqueValues: {
      type: Array,
      default() {
        return [];
      }
    },
    // 勾选列宽，为0，则不显示
    columnSelectionWidth: {
      type: Number,
      default: 55
    },
    // 勾选取消行的父子关联效果
    selectionRelate: {
      type: Boolean,
      default: true
    },
    // 展开操作按钮列
    columnExpand: {
      type: Boolean,
      default: true
    },
    // 展开操作缩进像素
    columnExpandIndent: {
      type: Number,
      default: 20
    },
    // 要渲染的列数据，每个对象一一对应el-table的Table-column Attributes，没有则不渲染，开发者可以通过slot，自己实现
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    expandIcon: {
      type: String,
      default: "el-icon-caret-bottom"
    },
    collapseIcon: {
      type: String,
      default: "el-icon-caret-right"
    },
    leafIcon: {
      type: String,
      default: "el-icon-minus"
    }
  },
  data() {
    return {
      // 表格渲染数据
      data: [],
      // 展开列的宽度
      columnExpandWidth: columnExpandWidthInit,
      // 加载中节点的唯一索引
      loadingFullIndex: ""
    };
  },
  watch: {
    treeData: {
      handler() {
        this.initData();
      },
      immediate: true
    },
    tableData: {
      handler() {
        this.initData();
      },
      immediate: true
    }
  },
  methods: {
    // 是否显示加载中Icon
    loadingIcon(row) {
      return (
        this.loadingFullIndex && this.loadingFullIndex === row.treeFullIndex
      );
    },
    // 是否展开
    expand(row) {
      return (
        this.expandAll ||
        this.expandUniqueValues.indexOf(row.treeFullIndex) !== -1
      );
    },
    // 获得所有展开的行
    getExpandRows() {
      if (
        Object.prototype.toString.call(this.data) === "[object Array]" &&
        this.data.length
      ) {
        return this.data.filter(row => row.treeExpand);
      }
      return [];
    },
    // 初始化数据完成
    initData() {
      if (
        Object.prototype.toString.call(this.treeData) === "[object Array]" &&
        this.treeData.length
      ) {
        this.data = this.treeToTableData(this.treeData, true);
      } else if (
        Object.prototype.toString.call(this.tableData) === "[object Array]" &&
        this.tableData.length
      ) {
        this.data = this.tableData;
      }
      this.$emit("init-data", this.data);
    },
    /**
     * 把树形嵌套数据结构转换为表格并列数据结构，并且增加属性标识每条数据对象之间的树形关系
     * @param from
     * @param show 是否显示
     * @param to
     * @param fullIndex 当前节点的完整索引，包括祖先节点的索引
     * @param level 当前递归的层级
     * @param maxLevelShow 显示的最大层级
     * @param 父级数据
     * @return {Array}
     */
    treeToTableData(
      from,
      show,
      to = [],
      fullIndex = "",
      level = 0,
      maxLevelShow = 0
    ) {
      if (
        Object.prototype.toString.call(from) === "[object Array]" &&
        from.length
      ) {
        for (let i = 0, len = from.length; i < len; i++) {
          const row = from[i];
          to.push(row);
          this.$set(row, "rowIndex", to.length);
          const treeExpand = this.expand(row);
          // 第一层初始化
          if (level === 0) {
            fullIndex = "";
          } else {
            // 如果是第二层以后非第一个元素，则需要去掉前一个兄弟元素
            if (i) {
              const fullIndexArray = String(fullIndex).split("-");
              fullIndexArray.pop();
              fullIndex = fullIndexArray.join("-") + "-";
            }
          }
          // 节点的唯一标识
          fullIndex = `${fullIndex}${i}`;
          this.$set(row, "treeFullIndex", fullIndex);
          this.$set(row, "treeLevel", level);
          this.$set(row, "treeExpand", treeExpand);
          this.$set(row, "rowShow", show);
          this.$set(
            row,
            "treeHasChildren",
            Boolean(row[this.treeChildrenCountKey])
          );
          // 获得显示行的最大层级
          if (level > maxLevelShow && show) {
            maxLevelShow = level;
            this.columnExpandWidth =
              columnExpandWidthInit + maxLevelShow * this.columnExpandIndent;
          }
          const children = row[this.treeChildrenKey];
          if (
            Object.prototype.toString.call(children) === "[object Array]" &&
            children.length
          ) {
            this.$set(row, "treeHasChildren", true);
            this.treeToTableData(
              children,
              treeExpand,
              to,
              `${fullIndex}-`,
              level + 1,
              maxLevelShow
            );
          }
        }
      }
      return to;
    },
    // 每行的样式
    getRowStyle({ row }) {
      return row.rowShow === false ? "display:none;" : "";
    },
    // 切换展开和收起行
    toggleExpand: function(clickRow) {
      this.$set(clickRow, "treeExpand", !clickRow.treeExpand);
      let maxLevelShow = clickRow.treeLevel;
      let continueTest = null;
      // 必须从上到下遍历，不然通过正则匹配处理子节点row的逻辑无法实现
      for (let i = 0, len = this.data.length; i < len; i++) {
        const row = this.data[i];
        // 如果遍历的行不是点击的行，则继续
        if (row.treeFullIndex !== clickRow.treeFullIndex) {
          // 如果有跳过检查，并且遍历的行满足条件，则执行跳过
          // 否则如果遍历的行是当前点击行的子节点
          if (continueTest && continueTest.test(row.treeFullIndex)) {
            continue;
          } else if (
            new RegExp(`^${clickRow.treeFullIndex}`).test(row.treeFullIndex)
          ) {
            this.$set(row, "rowShow", clickRow.treeExpand);

            continueTest = null;
            // 如果当前点击是展开，并且下一行有子节点，而且是不展开，则它后面的子节点都跳过
            if (clickRow.treeExpand && row.treeHasChildren && !row.treeExpand) {
              continueTest = new RegExp(`^${row.treeFullIndex}`);
            }
          }
          // 获得显示行的最大层级
          if (row.treeLevel > maxLevelShow && row.rowShow) {
            maxLevelShow = row.treeLevel;
          }
        }
      }

      this.columnExpandWidth =
        columnExpandWidthInit + maxLevelShow * this.columnExpandIndent;

      this.$emit("toggle-expand", clickRow);
    },
    // 切换勾选取消行
    toggleRowSelection(clickRow, selected) {
      // 必须从上到下遍历，不然通过正则匹配处理子节点row的逻辑无法实现
      for (let i = clickRow.rowIndex, len = this.data.length; i < len; i++) {
        const row = this.data[i];
        if (new RegExp(`^${clickRow.treeFullIndex}`).test(row.treeFullIndex)) {
          this.$refs.treeTable.toggleRowSelection(row, selected);
        } else {
          break;
        }
      }
    },
    // 监听勾选取消事件
    handleSelect(selection, clickRow) {
      if (this.selectionRelate) {
        // 如果为真则是勾选
        // 否则是取消勾选
        this.toggleRowSelection(
          clickRow,
          selection.some(row => row.treeFullIndex === clickRow.treeFullIndex)
        );
      }
      this.$emit("select", selection, clickRow);
    }
  }
};
</script>
