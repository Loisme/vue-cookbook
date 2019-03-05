// require.ensure 是 Webpack 的特殊语法，用来设置 组件到底路径
/**
 * 1.定义路由，每个路由应该映射一个组件
 * path : 浏览器的显示的路径
 * name ： 路由的名字
 * component : 路由的组件路径
 */

const routers = [
  { // 根路由
    path: '/',
    name: 'index',
    component: require('./App.vue'),
    children: [ // 内部子路由
      { // 首页
        path: '/home',
        name: 'home',
        component: require('./components/page/home.vue')
      },
      { // 热门
        path: '/recommend',
        name: 'recommend',
        component: require('./components/page/recommend.vue')
      },
      { // 分类
        path: '/category',
        name: 'category',
        component: require('./components/page/category.vue')
      },
      { // 我的
        path: '/my',
        name: 'my',
        component: require('./components/page/my.vue'),
        // redirect: '/history',  // 默认页面
        children: [ // 内部子路由
          { // 历史
            path: '/history',
            name: 'history',
            component: require('./components/list/history')
          }, { // 收藏
            path: '/collection',
            name: 'collection',
            component: require('./components/list/collection')
          }
        ]
      }
    ]
  },

  { // 菜单列表
    path: '/menuList',
    name: 'menuList',
    component(resolve) {
      require.ensure(['./components/page/menuCategory.vue'], () => {
        resolve(require('./components/page/menuCategory.vue'));
      });
    }
  }, { // 菜式详情信息
    path: '/menuDetail',
    name: 'menuDetail',
    component(resolve) {
      require.ensure(['./components/page/menuDetail.vue'], () => {
        resolve(require('./components/page/menuDetail.vue'));
      });
    }
  },
  { // 搜索
    path: '/query',
    name: 'query',
    component: require('./components/page/query'),
    children: [{ // 内部子路由
      path: 'searchList/:keyword',
      name: 'searchList',
      component: require('./components/list/searchList')
    }
    ]
  }, {// 欢迎页面
    path: '/wecome',
    name: 'wecome',
    component(resolve) {
      require.ensure(['./components/page/wecome.vue'], () => {
        resolve(require('./components/page/wecome.vue'));
      });
    }
  }
];

export default routers;
