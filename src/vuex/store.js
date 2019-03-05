import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex); // 使用vuex

// 创建一个对象来保存应用启动时的初始状态
const state = {
  'loadingShow': false, // 是否显示加载动画
  'hotSearchList': [] // 热门搜索列表
};

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  // 更新数据加载状态
  UPDATE_LOADING(state, data) {
    state.loadingShow = data;
  },
  // 更新热门搜索列表
  UPDATE_HOT_SEARCH_LIST(state, hotList) {
    state.hotSearchList = hotList;
  }
};

// store中设置初始状态以及变更函数
export default new Vuex.Store({
  state,
  mutations
});
