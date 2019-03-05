<template>
  <div>
    <router-link :to="{path:'/query'}">
      <form>
        <input type="text" placeholder=" " class="search-input" v-model='str' ref="keyword">
        <button type="submit" class="search-btn" @click="search">搜索</button>
      </form>
    </router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        str: '',
        logoSrc: require('../../assets/logo_search.png'),
        keyword: ''
      };
    }
  };
</script>

<style scoped>
  .content {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 50px;
    height: 30px;
    align-self: center;
  }

  form {
    position: relative;
    width: 220px;
    margin: 0 auto;
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
</style>
