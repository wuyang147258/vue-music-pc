<template>
  <div id="song-container">
    <Song :songListInfo="this.$store.state.keywordMusic"></Song>
    <div class="clear"></div>
  </div>
</template>



<script>
import Song from '../song-list/song.vue'
export default {
     components:{
      Song
    }
}
</script>

<style scoped>
.clear{
  clear: both;
  height: 100px;
}
</style>