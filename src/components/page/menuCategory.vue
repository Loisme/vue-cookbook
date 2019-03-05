<template>
  <div>
    <!-- 顶部bar -->
    <div class="header">
      <div class="iconfont icon-fanhui" @click="back"></div>
      <div class="title">{{categoryName}}</div>
    </div>

    <!-- 加载更多 -->
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
  </div>

</template>

<script>
  import menuRow from '../widget/menuRow.vue';
  import vBackBar from '../widget/backbar.vue';

  export default {
    data() {
      return {
        categoryId: '',
        categoryName: '',
        menuList: [], // 列表数据
        busy: false, // 数据是否正在加载
        noMore: false, // 没有更多数据
        page: 0 // 起始页面
      };
    },
    components: {
      menuRow,
      vBackBar
    },
    created() { // 组件创建的时候调用
      this.categoryId = this.$route.query.id; // 从url路径参数中获取id
      this.categoryName = this.$route.query.name; // 从url路径参数中获取name
      this.loadData(); // 加载数据
    },
    methods: {
      loadData() { // 加载数据
        let api = `/meishi/?a=caipuofstandcate&c=caipu&cateid=${this.categoryId}&page=${this.page}`;
        console.log(api);
        this.$http.get(api) // get请求数据
          .then((response) => { // 响应处理
            let data = response.data.data; // 获取数据列表
            this.menuList = this.menuList.concat(data); // 设置数据
            console.log(data);

            // 没有更多数据的处理
            if (data.length <= 0) {
              this.noMore = true;
            }
          });
      },
      loadMore() { // 加载更多数据
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
      },
      back() { // 返回上一页
        window.history.back();
        return false;
      }
    }
  };
</script>

<style scoped>
  .header {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: white;
    height: 8vh;
    width: 100vw;
  }

  .title {
    width: 90%;
    text-align: center;
  }

  .page {
    overflow-y: scroll;
    height: 92vh;
    width: 100%;
    display: flex;
    background-color: #fafafa;
    flex-direction: column;
  }
</style>
