<template>
  <div class="option-wrap">

    <!-- 左侧导航栏 -->
    <div class="option-left">
      <a v-for="(item,index) in categories" :key="item.id" @click="goto(index)"
         :class="{selected: index === nowIndex}">{{item.cName}}
      </a>
    </div>

    <!-- 右侧数据 -->
    <div class="option-right">
      <div class="option-style">
        <div class="option-line">
          <div class="option-circle"></div>
        </div>
        <div class="option-title"><span>{{categories[nowIndex].cName}}</span></div>
        <div class="option-line">
          <div class="option-circle2"></div>
        </div>
      </div>

      <!-- 子列表 -->
      <div class="op-content">
        <div class="content-list">
          <a v-for="(item,index) in categories[nowIndex].child" :key="item.id"
             @click="gotoSubCategory(index)">
            {{item.cName}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        categories: [], // 分类列表
        nowIndex: 0 // 当前索引值
      };
    },
    methods: {
      // 左侧导航栏切换
      goto(index) {
        this.nowIndex = index;
      },
      // 跳转到指定的菜谱分类页面
      gotoSubCategory(index) {
        let subCategory = this.getSubCategory()[index];
        console.log(subCategory);
        this.$router.push({
          name: 'menuList',
          query: {
            id: subCategory.id,
            name: subCategory.cName
          }
        });
      },
      // 获取子分类数据
      getSubCategory() {
        return this.categories[this.nowIndex].child;
      },
      // 获取菜谱类别的数据
      getCategory() {
        let url = '/meishi/?c=category&a=standcategory'; // api
        this.$http.get(url)
          .then((res) => {
            this.categories = res.data.data;
            console.log(this.categories);
          });
      }
    },
    // 组件创建时候调用
    created() {
      this.getCategory();
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .option-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 0.66vh;
  }

  .option-wrap {
    display: flex;
    flex-direction: row;
    flex: 1;
  }

  .option-left {
    display: flex;
    flex-direction: column;
    flex: 1;
    background: rgba(204, 204, 204, 0.35);
  }

  .option-right {
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    flex: 3;
    padding-left: 2.36vw;
    padding-right: 2.36vw;
    margin-bottom: 1.36vh;
  }

  .option-left a {
    display: flex;
    line-height: 3vh;
    flex: 1;
    justify-content: center;
    align-items: center;
    color: black;
  }

  .selected {
    color: red;
    border-left: 2px solid red;
    background-color: #fff;
  }

  .option-style {
    display: flex;
    flex-direction: row;
    margin-top: 2.36vh;
  }

  .option-title {
    display: flex;
    flex-direction: column;
    flex: 1;
    color: red;

  }

  .option-title span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .option-line {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #ccc;
    height: 1px;
    margin-top: 1.36vh;
    position: relative;
  }

  .option-circle {
    position: absolute;
    width: 4px;
    height: 4px;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    background-color: red;
    bottom: -1px;
    right: 3px;
  }

  .option-circle2 {
    position: absolute;
    width: 4px;
    height: 4px;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    background-color: red;
    bottom: -1px;
    left: 3px;
  }

  .op-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 1.36vh;
  }

  .content-list {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 4vh;
    margin-top: 1.36vh;
    margin-bottom: 0.36vh;
    flex-wrap: wrap;
    align-items: center;
  }

  .content-list a {
    /*flex: 0 0 25%;*/
    text-align: center;
    border: 1px solid grey;
    border-radius: 20px;
    margin: 5px 5px 0 0;
    font-size: 8pt;
    width: 25%;
    padding: 5px;
  }

  ::-webkit-scrollbar {
    width: 0;
  }
</style>
