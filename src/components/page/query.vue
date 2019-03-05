<template>
  <div class="query-whole">
    <!-- 搜索栏 -->
    <div class="query-header">
      <form>
        <input type="text" placeholder="搜索菜谱" class="search-input" v-model='keyword'>
        <button type="submit" class="search-btn" @click="search(keyword)">搜索</button>
      </form>
      <button v-show="keyword.length > 0" @click="clearSearch()" class="btn-del">x</button>
      <div class="cancel-btn" @click="back">取消</div>
    </div>

    <div v-if="isShowSearchList">
      <!-- 热门搜索 -->
      <div class="hot-search">
        <div class="search-top">
          <div class="search-icon"></div>
          <span>热门搜索</span>
        </div>
        <div class="search-content">
          <a v-for="word in hotList" @click="search(word)">
            {{word}}
          </a>
        </div>
      </div>

      <!-- 历史搜索 -->
      <div class="hot-search" v-if="historyList.length > 0">
        <div class="search-top">
          <div class="search-icon"></div>
          <span>历史搜索</span>
          <a @click="removeSearchHistory()"><img :src="imga" style="width: 14px"></a>
        </div>
        <div class="search-content">
          <a v-for="word in historyList" @click="search(word)">
            {{word}}
          </a>
        </div>
      </div>
    </div>

    <div v-else>
      <!-- 菜谱列表 -->
      <router-view v-if="isRouterAlive"></router-view>
    </div>
  </div>

</template>

<script>
  import * as searchUtil from '../../common/js/localStorage';
  import searchList from '../list/searchList.vue';

  export default {
    components: {
      searchList
    },
    data() {
      return {
        keyword: '',
        isRouterAlive: true,
        isShowSearchList: true,
        hotList: [],
        historyList: searchUtil.getSearchHistoryList(),
        imga: require('../../assets/delete.png')
      };
    },
    created() {
      this.getHotList();
    },
    methods: {
      obtainMenuList(keyword) { // 根据关键字获取菜式列表
        if (keyword.trim().length > 0) {
          // 重新渲染数据
          this.isRouterAlive = false;
          this.$nextTick(() => (this.isRouterAlive = true));
          // 使用replace,防止添加新的路由记录
          this.$router.replace({name: 'searchList', params: {keyword: keyword}});
        }
      },
      getHotList() {
        this.hotList = this.$store.state.hotSearchList; // 直接从缓存中获取数据
      },
      search(keyword) { // 根据关键字搜索菜谱
        if (keyword.trim().length > 0) { // 关键字不为空的时候才处理
          this.keyword = keyword; // 设置输入框的关键字
          this.isShowSearchList = false; // 不显示搜索关键字列表
          searchUtil.addIntoSearchHistoryList(keyword); // 将该关键字加入历史列表
          this.obtainMenuList(keyword); // 获取菜式列表
        }
      },
      clearSearch() { // 清除搜索
        this.keyword = ''; // 搜索字符置空
        this.isShowSearchList = true; // 显示搜索关键字列表
      },
      removeSearchHistory() { // 删除历史搜索
        this.historyList = []; // 置空
        searchUtil.deleteSearchHistory(); // 清除本地历史搜索的缓存记录
      },
      back() { // 后退
        window.history.back();
        return false; // 兼容性处理
      }
    }
  };
</script>


<style scoped>
  #app {
    display: flex;
    flex-direction: row;
    flex: 1;
  }

  .query-whole {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .query-header {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    height: 8vh;
    background-color: orangered;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
  }

  form {
    position: relative;
    width: 220px;
    margin-right: 5vw;
  }

  input, button {
    border: none;
    outline: none;
  }

  input {
    width: 72%;
    height: 26px;
    padding-left: 16px;
  }

  button {
    height: 28px;
    width: 60px;
    cursor: pointer;
    position: absolute;
    padding: 0px;
  }

  .search-input {
    border: 1px solid #D32F2F;
    border-radius: 20px;
  }

  .search-btn {
    top: 0;
    right: 0;
    color: white;
    background-color: #D32F2F;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .query-header a {
    color: #ffffff;
  }

  .query-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .query-content::-webkit-scrollbar {
    width: 0 !important
  }

  .hot-search {
    display: flex;
    flex-direction: column;
    margin-bottom: 6.36vh;
  }

  .search-top {
    padding-left: 3.36vw;
    padding-top: 1.36vh;
    width: 100%;
  }

  .search-icon {
    width: 3px;
    height: 2vh;
    border-radius: 2px;
    background-color: red;
    display: inline-block;
  }

  .search-top span {
    font-weight: bold;
    font-size: 14px;
  }

  .search-content {
    display: flex;
    flex-direction: row;
    padding-right: 2.36vw;
    padding-left: 2.36vw;
    flex-wrap: wrap;

  }

  .search-content a {
    text-align: center;
    border: 1px solid grey;
    border-radius: 20px;
    margin: 5px 5px 1.36vh 0;
    font-size: 8pt;
    width: 20%;
    padding: 5px;
  }

  .search-delete {
    background: url("../../assets/delete.png") no-repeat;
    background-size: 4%;
    background-position-x: 90%;
    background-position-y: 1.36vh;
  }

  .search-top a {
    display: inline-block;
    margin-left: 68%;
  }

  .cancel-btn {
    color: white;
  }
  .dt {
    display: none !important;
  }
  .btn-del{
    background-color: transparent;
    width: 10px;
    color: #c0c0c0;
  }/*
  .btn-del:focus{
    background-color: transparent;
    width: 10px;
    color: #c0c0c0;
  }*/
</style>
