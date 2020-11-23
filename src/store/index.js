import { createStore } from 'vuex'

export default createStore({
  state: {
    list: [
      'C语言', 'C++', 'Java', 'Python', 'Go', 'PHP'// 进行显示的数据
    ]
  },
  mutations: {
    addListItem (state, param) {
      state.list.push(param)
    },
    delListItem (state, param) {
      state.list.splice(param, 1)
    },
    updateListItem (state, param) {
      console.log(param.id + '：' + param.name)
      state.list[param.id] = param.name
    }
  },
  actions: {
    add (context, param) {
      context.commit('addListItem', param)
    },
    del (context, param) {
      context.commit('delListItem', param)
    },
    update (context, param) {
      context.commit('updateListItem', param)
    }
  },
  modules: {
  }
})
