<template>
  <div>
    <!-- 菜谱分类 -->
    <div class="category">
      <div class="col-md-4  " v-for="item in categories" :key="item.id">
        <div class="classItem " @click="gotoCategory(item)" :data-name="item.cName">
          <div class="classPic">
            <img class="imgPic" :src="item.imgUrl">
          </div>
          <p> {{ item.cName }}</p>
        </div>
      </div>
    </div>

    <!-- 热门菜谱 -->
    <div class="titleItem">
      - 热门菜谱 -
      <span class="icon more smallFonts "></span>
    </div>

    <!-- 加载更多 -->
    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="busy"
         infinite-scroll-distance="10">

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

  export default {
    data() {
      return {
        swiperArr: [], // 轮播图
        categories: [], // 分类列表
        menuList: [], // 右列数据
        busy: false, // 数据是否正在加载
        noMore: false, // 没有更多数据
        page: 0 // 起始页面
      };
    },
    components: {
      menuRow
    },
    created() {
      this.getCategory();
    },
    methods: {
      // 跳转到指定的菜谱分类
      gotoCategory(categoryInfo) {
        this.$router.push({
          name: 'menuList',
          query: {
            id: categoryInfo.id,
            name: categoryInfo.cName
          }
        });
      },
      // 获取分类列表
      getCategory() {
        let url = '/meishi/?c=home&a=home'; // api
        this.$http.get(url)
          .then((res) => { // 请求成功处理
            this.categories = res.data.data.hotCategory;
            console.log(this.categories);
          });
      },
      loadData() { // 加载热门菜谱数据
        let api = `/meishi/?a=caipuofstandcate&c=caipu&cateid=3&page=${this.page}`;
        this.$http.get(api, {params: {key: this.key}}) // get请求数据
          .then((response) => { // 响应处理
            let data = response.data.data; // 获取数据列表
            this.menuList = this.menuList.concat(data); // 将数据添加到数组中
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
        }, 1000); // 延时1秒
      }
    }
  };
</script>

<style>

  /*  .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #fafafa;
    }*/

  .item {
    margin: 8px;
    background-color: rgba(250, 250, 250, 0.80);
  }

  .col-md-4 {
    width: 25%;
    display: block;
    position: relative;
    margin-top: 1.36vh;
  }

  .category {
    display: flex;
    flex-wrap: wrap;
  }

  .classPic {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .classItem p{
    font-size: 12px;
    display: block;
    text-align: center;
  }
  .titleItem {
    margin: 10px;
    text-align: center;
  }
  .imgPic{
    width: 70%;
  }
</style>
