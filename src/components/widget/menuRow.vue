<template>
  <div>
    <!-- 详情页链接 -->
    <router-link :to="{path:'/menuDetail',query: {id: menuArr.caipuCode, info: menuArr} }"
                 @click.native="addIntoHistory(menuArr)">

      <div class="menuRow">
        <img class="img-card" :src="menuArr.imgUrl"/>
        <div class="content">
          <div class="name">{{menuArr.caipuName}}</div>
          <div class="desc">{{ menuArr.healthStr}}</div>
          <div class="browse-info">
            <div class="view-count">{{ menuArr.viewCount }}人浏览</div>
            <div class="favorite-count">{{ menuArr.favoriteCount }}人收藏</div>
          </div>
        </div>
      </div>

    </router-link>
  </div>
</template>

<script>
  import {addIntoHistoryList} from '../../common/js/localStorage';

  export default {
    name: 'menuRow',
    props: {
      menuArr: {
        type: Object
      }
    },
    methods: {
      getImageUrl: function (imageId) {
        return `http://pic.ecook.cn/web/${imageId}.jpg!m4`;
      },
      addIntoHistory (menuArr) { // 添加浏览记录
        addIntoHistoryList(menuArr);
      }
    }
  };
</script>

<style scoped>

  .menuRow {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    border-radius: 5px;
    box-shadow: 5px 5px 5px #dddddd;
    border: 1px solid #dddddd;
  }

  .img-card {
    max-width: 30%;
    max-height: 100%;
    border-radius: 5px 0 0 5px;
  }

  .content {
    display: flex;
    flex-direction: column;
    flex: 4;
    display: -webkit-flex;
    flex-direction: column;
    /*justify-content: space-around;*/
    width: 100%;
    padding: 0 10px;
    overflow: hidden;
    font-size: 10pt;
    color: #6d6d72;
  }

  .name {
    flex: 1;
    align-self: flex-start;
    padding-top: 5px;
    font-size: 12pt
  }

  .desc {
    flex: 2;
    padding-top: 10px;
    padding-bottom: 10px;
    color: gray;
    font-size: 10pt;
    overflow: hidden;
    text-overflow: ellipsis;
    /*white-space: nowrap;*/
  }

  .browse-info {
    flex: 1;
    display: flex;
    display: -webkit-flex;
    margin-right: 20px;
    padding-bottom: 5px;
    color: gray;
  }

  .view-count {
    flex: 1;
    -webkit-flex: 1;
    text-align: left;
  }

  .favorite-count {
    flex: 1;
    -webkit-flex: 1;
    text-align: right;
  }
</style>
