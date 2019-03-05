<template>
  <div>
    <menu-array :menu-list="collectionList"/>
  </div>
</template>

<script>
  import menuArray from './menuList';
  import {getCollectionList} from '../../common/js/localStorage';

  export default {
    props: {
      menuList: {
        type: Object
      }
    },
    components: {
      menuArray
    },
    data() {
      return {
        // collectionList: this.$store.state.collectionList,
        collectionList: getCollectionList()
      };
    }
  };
</script>
