export const ElTreeTable = require('./ElTreeTable.vue').default

let Vue

function install (_Vue) {

  if (Vue) {
    console.warn('[ElTreeTable] already installed. Vue.use(ElTreeTable) should be called only once.')
    return
  }

  Vue = _Vue

  Vue.component(ElTreeTable.name, ElTreeTable)
}

/* istanbul ignore next */
ElTreeTable.install = install

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}


