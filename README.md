# el-tree-table

## 示例

[点击预览](https://panhezeng.github.io/el-tree-table/)

示例代码目录 /example

## 说明


```vue
<script>
  export default {
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
  }
</script>
```

## 用法

### internal vue element-ui 方式

`npm i vue element-ui @panhezeng/el-tree-table -S`

#### 异步
```vue
<script>
  const ElTreeTable = () => import('@panhezeng/el-tree-table')
 
   export default {
     components: {ElTreeTable}
   }
</script>
```

#### 同步

##### export default components
```vue
<script>
    import ElTreeTable from '@panhezeng/el-tree-table'

    export default {
      components: {ElTreeTable}
    }
</script>
```

##### Vue.use
```vue
<script>
    import Vue from 'vue'
    import ElTreeTable from '@panhezeng/el-tree-table'

    Vue.use(ElTreeTable)
</script>
```

### external vue element-ui 方式

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-ui@latest/lib/theme-chalk/index.css">
<script src="https://cdn.jsdelivr.net/npm/vue@latest/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/element-ui@latest/lib/index.js"></script>
```

`npm i @panhezeng/el-tree-table -S`

```javascript
// auto install
import '@panhezeng/el-tree-table'
```
or 
```html
<!--auto install-->
<script src="https://cdn.jsdelivr.net/npm/@panhezeng/el-tree-table@latest/dist/el-tree-table.min.js"></script>
```

## 编译

``` bash
# install dependencies
npm install

# 运行插件使用示例
npm run dev:example

# 编译插件
npm run build

# 发版
npm version patch && npm publish --access public

```

