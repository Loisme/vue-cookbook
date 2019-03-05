<template>
  <div class="whole">
    <div class="page-header">
      <div class="page-logo">
        <img :src="searchLogo">
      </div>
      <search-bar></search-bar>
    </div>
    <div class="page">
      <!-- 加载动画 -->
      <loading :show="loadingShow"></loading>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <div class="page-foot">
      <v-tabs></v-tabs>
    </div>
  </div>
</template>

<script>
  import loading from './components/widget/loading.vue';
  import vTabs from './components/widget/tabs.vue';
  import searchBar from './components/widget/searchbar';
  import {mapState} from 'vuex';

  export default {
    name: 'app',
    components: {
      loading,
      vTabs,
      searchBar
    },
    created() {
      console.log('isKeep:' + this.$route.meta.keepAlive);
    },
    // 数据
    data() {
      return {
        logoSrc: require('./assets/logo_home.png'),
        firstShow: true,
        show: false,
        searchLogo: require('./assets/logo_search.png')
      };
    },
    // 计算属性
    computed: {
      ...mapState([
        'loadingShow'
      ])
    },
    // 方法
    methods: {
      // 是否显示加载view
      isShow() {
        this.show = !this.show;
      }
    }
  };
</script>

<style>
  .logo {
    width: 100px;
    height: 50px;
    align-self: center;
  }

  .whole {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .page-header {
    display: flex;
    flex-direction: row;
    height: 8vh;
    background-color: orangered;
    justify-content: center;
    align-items: center;

  }

  .page-foot {
    display: flex;
    flex-direction: row;
  }

  .content {
    height: 100%;
    width: 100%;
    display: flex;
  }

  #app {
    color: #2c3e50;
    width: 100%;
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: row;
    flex: 1;
  }

  #app .show {
    transform: translateX(250px);
  }

  .page {
    overflow-y: scroll;
    height: 86vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .page::-webkit-scrollbar {
    width: 0 !important
  }

  .router-container {
    background-color: #f9f9f9;
    padding-bottom: 50px;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
  }

  .page-logo {
    height: 6vh;
    width: 24%;
  }

  .page-logo img {
    width: 70px;
  }
</style>
