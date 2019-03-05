<template>
  <div class="page"
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="busy"
       infinite-scroll-distance="5">

    <!-- 列表数据 -->
    <div class="container">
      <div class="item"
           v-show="menuList.length > 0"
           v-for="item in menuList">
        <menuRow :menuArr="item"></menuRow>
      </div>
    </div>
  </div>

</template>

<script>
  import menuRow from '../widget/menuRow.vue';

  export default {
    data() {
      return {
        keyword: '', // 关键字
        menuList: [], // 列表数据
        busy: false, // 数据是否正在加载
        noMore: false, // 没有更多数据
        page: 0 // 起始页面
      };
    },
    components: {
      menuRow
    },
    created() {
      this.keyword = this.$route.params.keyword; // 获取关键字
      this.loadData();
    },
    methods: {
      loadData() { // 加载数据
        let api = `/meishi/?a=caipu&c=search&keywords=${this.keyword}&page=${this.page}`;
        this.$http.get(api) // get请求数据
          .then((response) => { // 响应处理
            let data = response.data.data; // 获取数据列表
            this.menuList = this.menuList.concat(data); // 设置数据
            console.log(response);
            console.log(data);

            // 没有更多数据的处理
            if (data.length <= 0) {
              this.noMore = true;
            }
          })
          .catch((error) => {
            console.warn(error);
          });
      },
      loadMore() { // 加载更多
        // 数据全部加载完成的话,不再进行加载
        if (this.noMore) {
          return;
        }

        this.busy = true; // 开启无限滚动
        this.$store.commit('UPDATE_LOADING', true); // 开启加载动画
        // 定时器处理(显示加载动画)
        setTimeout(() => {
          this.busy = false; // 关闭无限滚动
          this.$nextTick(() => { // 关闭加载动画(dom渲染完后执行)
            this.$store.commit('UPDATE_LOADING', false); // 关闭加载动画
            this.page++; // 页面+1
            this.loadData(); // 加载数据
          });
        }, 1000);
      }
    }
  };
</script>

<style scoped>

  .page {
    overflow-y: scroll;
    height: 92vh;
    width: 100%;
    display: flex;
    background-color: #fafafa;
    flex-direction: column;
  }
</style>
