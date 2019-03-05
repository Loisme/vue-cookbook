<template>
  <div class="container">
    <div class="item"
         v-show="menuList.length > 0"
         v-for="item in menuList">
      <menuRow :menuArr="item"></menuRow>
    </div>
  </div>
</template>

<script>
  import menuRow from '../widget/menuRow.vue';

  export default {
    props: {
      menuList: {
        type: Object
      }
    },
    components: {
      menuRow
    }
  };
</script>

<style>

</style>
