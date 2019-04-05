<template>
  <el-table
    ref="treeTable"
    class="el-tree-table"
    :row-style="getRowStyle"
    :cell-style="getRowStyle"
    :lazy="false"
    :data="data"
    v-bind="$attrs"
    @select="handleSelect"
    v-on="$listeners"
  >
    <slot name="start" />
    <el-table-column
      type="selection"
      :width="columnSelectionWidth"
      v-if="columnSelectionWidth"
    />
    <el-table-column
      :width="columnExpandWidth"
      column-key="columnExpand"
      v-if="columnExpand"
    >
      <template v-slot="scope">
        <div
          :style="`margin-left: ${scope.row.treeLevel * columnExpandIndent}px;`"
        >
          <span v-if="scope.row.treeChildrenLoading"
            ><i class="el-icon-loading"
          /></span>
          <span
            @click="toggleExpand(scope.row, scope.$index)"
            v-else-if="scope.row.treeHasChildren"
          >
            <i
              v-if="scope.row.treeExpand"
              :class="expandIcon"
              style="cursor: pointer;"
            />
            <i v-else :class="collapseIcon" style="cursor: pointer;" />
          </span>
          <span v-else><i :class="leafIcon"/></span>
        </div>
      </template>
    </el-table-column>
    <slot />
    <template v-if="columns.length">
      <template v-for="column in columns">
        <el-table-column :key="column.prop" v-bind="column">
          <template v-slot="scope">
            <template v-if="scope.row[column.prop]">{{
              scope.row[column.prop]
            }}</template>
            <component
              v-if="
                columnCustomRender[column.prop] &&
                  columnCustomRender[column.prop].component
              "
              :is="columnCustomRender[column.prop].component"
              v-bind="
                Object.assign({}, columnCustomRender[column.prop].props, {
                  cellData: scope
                })
              "
            />
          </template>
        </el-table-column>
      </template>
    </template>
    <slot name="end" />
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
    // 孩子数据数量的key，是否显示展开按钮，通过treeChildrenKey和treeChildrenLazyKey一起判断，
    // 如果通过treeChildrenKey获得的数组为空，而通过treeChildrenLazyKey获得值为真，则也会显示展开按钮，结合toggle-expand事件可实现懒加载
    // 懒加载获得的子节点数据后，更新treeData前，通过getExpandRows可以获得所有已展开的数据，结合expandIndexes，实现更新treeData后还原展开状态
    treeChildrenLazyKey: { type: String, default: "lazy" },
    // 树形数据结构，用来转换成表格数据
    treeData: {
      type: Array,
      default() {
        return [];
      }
    },
    // 是否展开所有
    expandAll: {
      type: Boolean,
      default: false
    },
    // 默认需要展开的行，数组值是每行的treeFullIndex
    expandIndexes: {
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
    // 要渲染的列数据，每个对象一一对应el-table的Table-column Attributes，没有则不渲染，开发者可以通过slot自己实现，有三个slot <slot name="start"/> <slot/> <slot name="end"/>
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    // 在某种复杂场景中，父组件通过slot传入el-table-column，会出现异常，类似Duplicate keys el-table_1_column_1的Vue warn，并且样式错乱，所有再提供columnCustomRender属性实现动态组件渲染
    // 对象的key为column.prop，value是对象 { props(传递给动态组件的数据，cellData属性已占用，外部传入也会覆盖为表格当前格所在行列的数据对象), component(vue组件对象) }
    columnCustomRender: {
      type: Object,
      default() {
        return {};
      }
    },
    // 展开 icon class
    expandIcon: {
      type: String,
      default: "el-icon-caret-bottom"
    },
    // 收起 icon class
    collapseIcon: {
      type: String,
      default: "el-icon-caret-right"
    },
    // 叶子节点 icon class
    leafIcon: {
      type: String,
      default: "el-icon-minus"
    },
    // 加载子节点数组回调函数，参数是当前row数据，必须支持 async await，返回值是数组
    loadChildren: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      // key是treeData转换为tableData的treeFullIndex，值是treeFullIndex对应的treeData原对象，用于通过转换后的数据的treeFullIndex，查找到转换前的对应数据
      mapData: {},
      // 表格渲染数据
      data: [],
      // 最大显示层级
      maxLevelShow: 0,
      // 展开列的宽度
      columnExpandWidth: columnExpandWidthInit,
      click: "click"
    };
  },
  watch: {
    treeData: {
      async handler() {
        this.mapData = [];
        this.data = [];
        this.maxLevelShow = 0;
        if (this.treeData.length) {
          const result = await this.treeToTableData(this.treeData, true);
          this.maxLevelShow = result.maxLevelShow;
          this.data = result.rows;
        }
        this.$emit("init-data", this.data);
      },
      immediate: true
    }
  },
  methods: {
    // 每行的样式
    getRowStyle({ row }) {
      return row.rowShow === false ? { display: "none" } : null;
    },
    // 是否显示加载中Icon
    setTreeChildrenLoading(row, show = true) {
      this.$set(row, "treeChildrenLoading", show);
    },
    // 是否展开
    expand(row) {
      return (
        this.expandAll || this.expandIndexes.indexOf(row.treeFullIndex) !== -1
      );
    },
    getRowIndex(row) {
      return this.data.findIndex(
        iterateRow =>
          String(iterateRow.treeFullIndex) === String(row.treeFullIndex)
      );
    },
    // 获得父级行
    getParent(row) {
      const treeFullIndex = String(row.treeFullIndex);
      const parentFullIndex = treeFullIndex.replace(/-?\d$/, "");
      if (parentFullIndex) {
        return this.data.find(
          iterateRow => String(iterateRow.treeFullIndex) === parentFullIndex
        );
      } else {
        return null;
      }
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
    // 获得行对应的原节点数据
    getSrcNode(row) {
      return this.mapData[String(row.treeFullIndex)];
    },
    /**
     * 把树形嵌套数据结构转换为表格并列数据结构，并且增加属性标识每条数据对象之间的树形关系
     * @param src
     * @param show 是否显示此行
     * @param result rows 转换后的行数据， maxLevelShow 显示的最大层级
     * @param fullIndex 当前节点的完整索引，包括祖先节点的索引
     * @param level 当前递归的层级
     * @return {Object}
     */
    async treeToTableData(
      src,
      show,
      result = { rows: [], maxLevelShow: 0 },
      fullIndex = "",
      level = 0
    ) {
      if (
        Object.prototype.toString.call(src) === "[object Array]" &&
        src.length
      ) {
        for (let i = 0, len = src.length; i < len; i++) {
          const srcNode = src[i];
          delete srcNode.tableRowData;
          // 克隆，不改变原数据
          const row = JSON.parse(JSON.stringify(srcNode));
          srcNode.tableRowData = row;
          delete row[this.treeChildrenKey];
          result.rows.push(row);
          this.$set(row, "rowIndex", result.rows.length);

          // 第一层级根节点的初始化
          if (level === 0) {
            fullIndex = "";
          } else {
            // 如果是子节点的非第一个元素，则需要去掉前一个兄弟元素的索引
            if (i) {
              // const fullIndexArray = String(fullIndex).split("-");
              // fullIndexArray.pop();
              // fullIndex = fullIndexArray.join("-") + "-";
              fullIndex = String(fullIndex).replace(/\d$/, "");
            }
          }
          // 节点的唯一标识
          fullIndex = `${fullIndex}${i}`;
          this.$set(row, "treeFullIndex", String(fullIndex));
          this.$set(row, "treeLevel", level);
          this.$set(row, "rowShow", show);
          const treeExpand = this.expand(row);
          this.$set(row, "treeExpand", treeExpand);
          this.$set(
            row,
            "treeHasChildren",
            Boolean(srcNode[this.treeChildrenLazyKey])
          );
          // 获得显示行的最大层级
          if (level > result.maxLevelShow && show) {
            result.maxLevelShow = level;
            this.columnExpandWidth =
              columnExpandWidthInit +
              result.maxLevelShow * this.columnExpandIndent;
          }

          // 建立转换后和转换前数据的关系，用于通过转换后的数据的treeFullIndex，查找到转换前的对应数据
          this.mapData[String(fullIndex)] = srcNode;

          let children = srcNode[this.treeChildrenKey];
          if (
            Object.prototype.toString.call(children) !== "[object Array]" &&
            row.treeHasChildren &&
            treeExpand &&
            this.loadChildren
          ) {
            try {
              children = await this.loadChildren(row);
            } catch (e) {
              children = null;
            }
          }
          if (
            Object.prototype.toString.call(children) === "[object Array]" &&
            children.length
          ) {
            this.$set(row, "treeHasChildren", true);
            try {
              await this.treeToTableData(
                children,
                treeExpand,
                result,
                `${fullIndex}-`,
                level + 1
              );
            } catch (e) {
              continue;
            }
          } else if (treeExpand) {
            this.$set(row, "treeHasChildren", false);
            this.$set(row, "treeExpand", false);
          }
        }
      }
      return result;
    },
    delRow(delRow) {
      const delRowTreeFullIndex = String(delRow.treeFullIndex);
      const index = this.getRowIndex(delRow);
      let count = 1;
      // 如果删除行有子孙行，则一起删除
      if (delRow.treeHasChildren) {
        for (let i = index + 1, len = this.data.length; i < len; i++) {
          const row = this.data[i];
          if (parseInt(row.treeLevel) <= parseInt(delRow.treeLevel)) {
            break;
          }
          count++;
        }
      }

      // 如果删除行的父级只有此行，删除后改变父级状态，并且清理原数据
      const parentRow = this.getParent(delRow);
      if (parentRow) {
        const parentRowSrcNode = this.getSrcNode(parentRow);
        const srcNodeChildren = parentRowSrcNode[this.treeChildrenKey];
        let treeHasChildren = srcNodeChildren.length > 1;
        if (treeHasChildren) {
          const delSrcNodeIndex = srcNodeChildren.findIndex(
            srcNode =>
              String(srcNode.tableRowData.treeFullIndex) === delRowTreeFullIndex
          );
          srcNodeChildren.splice(delSrcNodeIndex, 1);
          treeHasChildren = srcNodeChildren.length > 0;
        }
        if (!treeHasChildren) delete parentRowSrcNode[this.treeChildrenKey];
        this.$set(parentRow, "treeHasChildren", treeHasChildren);

        delete this.mapData[delRowTreeFullIndex];

        this.data.splice(index, count);
      } else {
        // 修改treeData，触发 treeData watch
        this.treeData.splice(
          this.treeData.findIndex(
            srcNode =>
              String(srcNode.tableRowData.treeFullIndex) === delRowTreeFullIndex
          ),
          1
        );
      }
    },
    /**
     * 会先清空原所有子孙节点
     * @param parentRow 父行
     * @param children 子数组
     */
    async addTreeChildren(parentRow, children) {
      if (
        Object.prototype.toString.call(parentRow) === "[object Object]" &&
        Object.prototype.toString.call(children) === "[object Array]"
      ) {
        delete parentRow[this.treeChildrenLazyKey];
        const srcNode = this.getSrcNode(parentRow);
        delete srcNode[this.treeChildrenLazyKey];
        const oldChildren = srcNode[this.treeChildrenKey];
        if (Object.prototype.toString.call(oldChildren) === "[object Array]") {
          for (let i = oldChildren.length; i--; ) {
            this.delRow(oldChildren[i].tableRowData);
          }
        }
        srcNode[this.treeChildrenKey] = children;
        this.$set(parentRow, "treeHasChildren", true);
        const result = await this.treeToTableData(
          children,
          true,
          { rows: [], maxLevelShow: this.maxLevelShow },
          `${parentRow.treeFullIndex}-`,
          parseInt(parentRow.treeLevel) + 1
        );
        this.maxLevelShow = result.maxLevelShow;
        const index = this.getRowIndex(parentRow);
        this.data.splice(index + 1, 0, ...result.rows);
        this.setTreeChildrenLoading(parentRow, false);
      }
    },
    /**
     *
     * @param row 当前行
     * @param sibling 兄弟数组
     * @param index 插入索引位置，加在最后
     */
    addTreeSibling(row, sibling, index) {
      const parentRow = this.getParent(row);
      if (parentRow) {
        const parentRowSrcNode = this.getSrcNode(parentRow);
        const srcNodeChildren = parentRowSrcNode[this.treeChildrenKey].slice();
        if (Object.prototype.toString.call(index) !== "[object Number]") {
          index = srcNodeChildren.length;
        }
        srcNodeChildren.splice(index, 0, ...sibling);
        this.addTreeChildren(parentRow, srcNodeChildren);
      } else {
        // 修改treeData，触发 treeData watch
        if (Object.prototype.toString.call(index) !== "[object Number]") {
          index = this.treeData.length;
        }
        this.treeData.splice(index, 0, ...sibling);
      }
    },
    // 切换展开和收起行
    async toggleExpand(clickRow) {
      this.$set(clickRow, "treeExpand", !clickRow.treeExpand);
      if (clickRow.treeExpand && clickRow[this.treeChildrenLazyKey]) {
        if (this.loadChildren) {
          this.setTreeChildrenLoading(clickRow);
          const children = await this.loadChildren(clickRow);
          this.addTreeChildren(clickRow, children);
        }
      } else {
        const toggleExpandRecursive = data => {
          if (Object.prototype.toString.call(data) === "[object Array]") {
            data.forEach(node => {
              const row = node.tableRowData;
              this.$set(row, "rowShow", clickRow.treeExpand);
              // 获得显示行的最大层级
              if (
                clickRow.treeExpand &&
                parseInt(row.treeLevel) > parseInt(this.maxLevelShow) &&
                row.rowShow
              ) {
                this.maxLevelShow = row.treeLevel;
              }
              // 如果是点击收起，则所有子孙行都隐藏
              // 或者是点击展开，并且子孙行也是展开，则都显示
              if (
                !clickRow.treeExpand ||
                (clickRow.treeExpand && row.treeExpand)
              ) {
                toggleExpandRecursive(node[this.treeChildrenKey]);
              }
            });
          }
        };
        const srcNode = this.getSrcNode(clickRow);
        toggleExpandRecursive(srcNode[this.treeChildrenKey]);

        // 如果是收起，并且显示最大级大于等于点击行，并且没有其他兄弟行展开，则显示最大级减1
        if (
          !clickRow.treeExpand &&
          parseInt(this.maxLevelShow) >= parseInt(clickRow.treeLevel)
        ) {
          let srcNodeChildren = this.treeData;
          const parentRow = this.getParent(clickRow);
          if (parentRow) {
            const parentRowSrcNode = this.getSrcNode(parentRow);
            srcNodeChildren = parentRowSrcNode[this.treeChildrenKey];
          }

          if (!srcNodeChildren.some(node => node.tableRowData.treeExpand)) {
            this.maxLevelShow = parseInt(clickRow.treeLevel) - 1;
            if (this.maxLevelShow < 0) this.maxLevelShow = 0;
          }
        }

        // this.maxLevelShow = clickRow.treeLevel;
        // let continueTest = null;
        // // 必须从上到下遍历，不然通过正则匹配处理子节点row的逻辑无法实现
        // for (let i = 0, len = this.data.length; i < len; i++) {
        //   const row = this.data[i];
        //   // 如果遍历的行不是点击的行，则继续
        //   if (row.treeFullIndex !== clickRow.treeFullIndex) {
        //     // 如果有跳过检查，并且遍历的行满足条件，则执行跳过
        //     // 否则如果遍历的行是当前点击行的子节点
        //     if (continueTest && continueTest.test(row.treeFullIndex)) {
        //       continue;
        //     } else if (
        //       new RegExp(`^${clickRow.treeFullIndex}`).test(row.treeFullIndex)
        //     ) {
        //       this.$set(row, "rowShow", clickRow.treeExpand);
        //
        //       continueTest = null;
        //       // 如果当前点击是展开，并且下一行有子节点，而且是不展开，则它后面的子节点都跳过
        //       if (
        //         clickRow.treeExpand &&
        //         row.treeHasChildren &&
        //         !row.treeExpand
        //       ) {
        //         continueTest = new RegExp(`^${row.treeFullIndex}`);
        //       }
        //     }
        //     // 获得显示行的最大层级
        //     if (row.treeLevel > this.maxLevelShow && row.rowShow) {
        //       this.maxLevelShow = row.treeLevel;
        //     }
        //   }
        // }

        this.columnExpandWidth =
          columnExpandWidthInit + this.maxLevelShow * this.columnExpandIndent;
      }
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
