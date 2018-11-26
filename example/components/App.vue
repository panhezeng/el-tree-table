<template>
  <div id="app">
    <el-tree-table :tree-data="treeData" :columns="columns" style="width: 100%"/>
  </div>
</template>

<script>

  // import '../../dist/el-tree-table.min.js'
  //  import Vue from 'vue'
   import ElTreeTable from '../../dist/el-tree-table.min.js'
  //  import ElTreeTable from '../../src/ElTreeTable.vue'
  //  const ElTreeTable = require('../../dist/el-tree-table.min.js')

  //  Vue.use(ElTreeTable)

  //  const ElTreeTable = () => import('../../dist/el-tree-table.min.js')

  export default {
    name: 'App',
   components: {ElTreeTable},
    data() {
      return {
        columns: [
          {
            prop: 'id',
            label: 'ID',
            width: 65
          },
          {
            prop: 'title',
            label: '标题',
          }
        ],
        treeData: [
          {
            id: 1,
            title: '标题1-1',
          },
          {
            id: 2,
            title: '标题1-2',
            children: [
              {
                id: 3,
                title: '标题1-2-1',
              },
              {
                id: 4,
                title: '标题1-2-2',
                children: [
                  {
                    id: 5,
                    title: '标题1-2-2-1',
                  },
                  {
                    id: 6,
                    title: '标题1-2-2-2',
                  },
                ]
              },
              {
                id: 7,
                title: '标题1-2-3',
              },
              {
                id: 8,
                title: '标题1-2-4',
                children: [
                  {
                    id: 9,
                    title: '标题1-2-4-1',
                  },
                  {
                    id: 10,
                    title: '标题1-2-4-2',
                  },
                ]
              }
            ]
          }
        ]
      }
    },
    methods: {}
  }
</script>

