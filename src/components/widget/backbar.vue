<template>
  <div class="header">
    <div class="left-btn" @click="back">
      <span :class="leftIcon"></span>
      <!--<span class="iconfont icon-fenlei"></span>-->
    </div>
    <div class="title">{{title}}</div>

    <div @click="rightClick">
      <img v-if="isCollected" class="right-btn icon" :src="collectIcon"/>
      <img v-else class="right-btn icon" :src="unCollectIcon"/>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'backbar',
    props: {
      title: {
        type: String
      },
      isCollected: {
        type: Boolean
      },
      leftIcon: {
        type: String,
        default: 'iconfont icon-fanhui'
      }
    },
    data() {
      return {
        collectIcon: require('../../assets/menu_collect_true.png'),
        unCollectIcon: require('../../assets/menu_collect_false.png')
      };
    },
    methods: {
      // 后退
      back() {
        // go(-1): 返回上一页，原页面表单中的内容会丢失；
        // window.history.go(-1);
        // back(-1): 返回上一页，原页表表单中的内容会保留，一般还是back(-1)
        window.history.back();
        return false; // 兼容性处理
      },
      rightClick() {
        this.$emit('rightClick');
      }
    }
  };
</script>

<style scoped lang="stylus">
  .header {
    align-items: center;
    display: -ms-flexbox;
    display: flex;
    -ms-flex: 1;
    flex: 1;
    justify-content: center;
    /* padding: 15px; */
    background-color: #fff;
    height 8vh;
  }

  .title {
    width 80%
    text-align center
  }

  .icon {
    width: 15px
    height: 15px
  }
</style>
