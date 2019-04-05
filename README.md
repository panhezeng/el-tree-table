# el-tree-table

# 注意！！！！！！！！！！！ 官方 element table 已经实现了 tree table 功能，请优先使用官方实现，虽然官方此功能还挺简陋。

本组件支持自定义获取树形数据的子节点的 key，懒加载的 treeChildrenLazyKey，是否全部展开，展开指定节点，操作 icon，是否关联勾选等，具体看示例及其源码

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
  }
};
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

### 懒加载

```vue
<el-tree-table :load-children="loadChildren" />
```

```vue
<script>
export default {
  methods: {
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
    }
  }
};
</script>
```

### 删除行

会一并删除子孙行，如果希望子孙行进一级，可以先获得删除行的原数据的子数组，用 addTreeSibling 添加，然后在删除

```javascript
this.$refs.treeTable.delRow(row);
```

获得删除行的原数据的子数组

```javascript
const srcNode = this.getSrcNode(row);
const srcNodeChildren = srcNode[this.treeChildrenKey];
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
