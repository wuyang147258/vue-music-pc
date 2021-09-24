<template>
  <div id="songListZhuan-container">
     <Song :songListInfo="songListDetail"></Song>
  </div>
</template>

<script>
import Song from '../song-list/song.vue'
export default {
    props:{
      id:String
    },
    created(){
      this.getSongListDetail()
    },
    data(){
      return{
        //存放获取过来的歌单数据
        songListDetail:[]
      }
    },
    methods:{
   async  getSongListDetail(){
     const {data:res}= await this.$http.get(`/playlist/detail?id=${this.id}`)
     this.songListDetail=res.playlist.tracks
     
     }
    },
    components:{
      Song  
    }
}
</script>

<style>

</style>