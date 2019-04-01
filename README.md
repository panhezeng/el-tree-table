# el-tree-table

# 注意！！！！！！！！！！！ 官方 element table 已经实现了 tree table 功能，请优先使用官方实现

## 示例

[点击预览](https://panhezeng.github.io/el-tree-table/)

示例代码目录 /example

## 说明

```vue
<script>
export default {
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
</script>
```

## 用法

### internal vue element-ui 方式

`npm i vue element-ui @panhezeng/el-tree-table -S`

#### 异步

```vue
<script>
const ElTreeTable = () => import("@panhezeng/el-tree-table");

export default {
  components: { ElTreeTable }
};
</script>
```

#### 同步

##### export default components

```vue
<script>
import ElTreeTable from "@panhezeng/el-tree-table";

export default {
  components: { ElTreeTable }
};
</script>
```

##### Vue.use

```vue
<script>
import Vue from "vue";
import ElTreeTable from "@panhezeng/el-tree-table";

Vue.use(ElTreeTable);
</script>
```

### external vue element-ui 方式

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/element-ui@latest/lib/theme-chalk/index.css"
/>
<script src="https://cdn.jsdelivr.net/npm/vue@latest/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/element-ui@latest/lib/index.js"></script>
```

`npm i @panhezeng/el-tree-table -S`

```javascript
// auto install
import "@panhezeng/el-tree-table";
```

or

```html
<!--auto install-->
<script src="https://cdn.jsdelivr.net/npm/@panhezeng/el-tree-table@latest/dist/el-tree-table.min.js"></script>
```

## 编译

```bash
# install dependencies
npm install

# 运行插件使用示例
npm run dev:example

# 编译插件
npm run build

# 发版
npm set @panhezeng:registry https://registry.npmjs.org/ && npm version patch && npm publish --access public && npm set @panhezeng:registry https://registry.npm.taobao.org/

```
