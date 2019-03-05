<template>
  <div class="menuDetail " v-show="show">
    <!-- 头部 -->
    <div class="menu-header">
      <v-back-bar :title="title" :isCollected="isCollected" @rightClick="toggleCollectedState"/>
    </div>

    <div class="menu-content">
      <div class="wrap headerClear"></div>
      <!-- 图片 -->
      <div class="wrap detailPic">
        <img :src="img" alt=""/>
      </div>

      <!-- 菜式信息 -->
      <div class="wrap proMsg">
        <div class="row tit">{{title}}</div>
        <div class="row">{{healthStr}}</div>
        <span class="stuff">用料</span>
        <div class="item item-stuff"
             v-show="buredens.length > 0"
             v-for="(item,index) in buredens" :class="{first:index === 0}">
          <span class="row row-stuff row-name">{{item.burdensName}}</span>
          <span class="row row-stuff row-bur">{{item.burdensContent}}</span>
        </div>
        <div class="row">{{detail.imtro}}</div>
      </div>

      <!-- 步骤内容数据 -->
      <div class="wrap greenColor grayBg explain">步骤</div>
      <div class="wrap content " v-for="item in steps">
        <div class="row stepsRow">
          <div class="stepsPic">
            <img :src="item.imgUrl" alt=""/>
          </div>
          <p style="margin-bottom: 1.2rem;">{{getStepInfo(item)}}</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import vBackBar from '../widget/backbar.vue';
  import * as storage from '../../common/js/localStorage';

  export default {
    name: 'menuDetail',
    props: {
      id: {
        type: String
      },
      info: {
        type: Object
      }
    },
    data() {
      return {
        title: '',
        healthStr: '',
        detail: {},
        steps: [],
        show: false,
        img: {},
        isCollected: false
      };
    },
    components: {
      vBackBar
    },
    created() {
      const id = this.$route.query.id; // 获取菜式id
      const menuItem = this.$route.query.info; // 菜式内容数据
      this.isCollected = storage.hasCollected(menuItem.id); // 是否已收藏
      this.loadData(id);
    },
    methods: {
      // 切换菜式收藏的状态
      toggleCollectedState() {
        const menuItem = this.$route.query.info; // 获取菜谱数据
        console.log(menuItem);
        // 判断是否已经收藏了改菜式
        if (storage.hasCollected(menuItem.id)) { // 根据id进行判断
          this.isCollected = false; // 状态置为未收藏
          storage.deleteFromCollectionList(menuItem); // 移除收藏记录
          console.log('delete');
        } else { // 未收藏的情况
          this.isCollected = true; // 状态置为已收藏
          storage.addIntoCollectionList(menuItem); // 记录收藏数据
          console.log('add');
        }
      },
      loadData(id) { // 加载数据
        let api = `/meishi/?a=info&c=caipu&code=${id}`; // api
        this.$http.get(api) // get获取
          .then((response) => { // 获取数据成功
            console.log(response);
            if (response.status === 200) { // 200表示成功获取数据
              let data = response.data.data; // json数据
              this.title = data.caipuName; // 菜式名
              this.img = data.imgUrl; // 图片url
              this.healthStr = data.healthStr; // 材料功效
              this.steps = data.makes; // 菜式步骤
              this.buredens = data.buredens; // 所需材料
              this.show = true; // 拿到数据才显示
            }
          })
          .catch((error) => {
            console.warn(error);
          });
      },
      // 根据步骤信息拼接字符
      getStepInfo(item) {
        return `步骤:${item.isIndex} ${item.info}`;
      }
    }
  };
</script>


<style scoped>
  .proMsg {
    padding: 0.1rem;
    line-height: 0.24rem;
  }

  .explain {
    height: 0.3rem;
    line-height: 0.3rem;
    padding: 0 0.1rem;
  }

  .menuDetail {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 100%;
  }
  .menuDetail img{
    width: 100%;
    height: 38vh;
  }
  .menuDetail .content .row {
    position: relative;
    margin-bottom: 0.1rem;
    min-height: 0.2rem;
  }

  .menuDetail .content span {
    position: absolute;
    color: #3c4a55;
    left: 0;
  }

  .menuDetail img {
    width: 100%;
  }

  .swiperBox {
    height: 1.5rem;
  }
  .header{
    align-items: center;
    display: -ms-flexbox;
    display: flex;
    -ms-flex: 1;
    flex: 1;
    justify-content: center;
    /* padding: 15px; */
    background-color: #fff;
  }

  .menu-header {
    display: flex;
    flex-direction: row;
    height: 8vh;
  }

  .menu-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 0px;
  }

  .proMsg {
    line-height: 2.24rem;
  }

  .row {
    padding-left: 0.6rem;
    padding-right: 0.6rem;
  }

  .tit {
    font-size: 1.6rem;
    font-weight: bold;
  }

  .stuff {
    padding-left: 0.6rem;
    font-weight: bold;
    margin-bottom: 1.6rem;
    margin-top: 1.6rem;
    display: block;
  }

  .item {
    border-bottom: 1px dashed #c0c0c0;
    background-color: inherit;

  }

  .first {
    border-top: none;
    padding-top: 8px;
  }

  .item-stuff {
    display: flex;
    flex-direction: row;
    flex: 1;
    margin-left: 7.36vw;
    margin-right: 7.36vw;
  }

  .row-stuff {
    flex-direction: row;
    display: flex;
    flex: 1;
  }

  .content {
    display: inline-block;
  }

  .explain {
    height: 2.4rem;
    line-height: 2.4rem;
    /* padding: 0 0.1rem; */
    padding-left: 1rem;
    font-weight: bold;
  }
  .stepsPic{
    margin-bottom: 0.6rem;
  }
  .title{
    width: 80%;
  }
  .stepsPic img{
    border-radius: 10px;
  }
  .row-bur{
      justify-content: flex-end;
    padding-right: 0px;
  }
  .row-name{
    padding-left: 0px;
  }
</style>
