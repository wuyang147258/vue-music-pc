<template>
  <div id="song-container">
   <!-- <div v-for="(item,index) in songListInfo" :key="index">{{item.name}}</div> -->
    <!-- 表单区域 -->

  <el-table
    :data="songListInfo"
    stripe
    @row-click="playMusicLine"
    >
    <el-table-column
      label="#"
      type="index"
      width="180">
    </el-table-column>
    <el-table-column
      label="音乐名称"
      prop="name"
      width="550">
    </el-table-column>
      <el-table-column
      label="作者"
      prop="al.name"
      width="250">
    </el-table-column>
     <el-table-column
      label="播放"
      width="180">
    <template slot-scope="scope">
      <div class="palyMusic" @click="playMusic(scope.row.id)"><i class="el-icon-video-play"></i>&nbsp;&nbsp;<span>播放</span></div>
    </template>
    </el-table-column>
  </el-table>
  
  </div>
</template>

<script>
export default {
  props:{
    //传过来的歌曲数据
    songListInfo:{
      default() {
        return [];
      }
    }
  },
  data(){
    return{
      //正在播放音乐的url
     musicUrl:'',
     //控制是否播放音乐
     isPlay:'',
     allid:[]
    }
  },
  methods:{
   async playMusic(id){
      // this.allid= 
      this.songListInfo.forEach((item,index)=>{
        this.allid.push(item.id)
      })
      this.$store.commit('INIT_nowMusicId',id)
      //传入歌单所有id
       this.$store.commit('INIT_musicListID',this.allid)
      //传入歌单当前播放音乐的id
      this.$store.commit('NEXT_ID',id)
  
      const {data:res}=  await this.$http.get(`/check/music?id=${id}`)
      if(res.message!=='ok'){
        this.$message.error('音乐无版权')
      }else{
       const {data:res}=await this.$http.get(`/song/url?id=${id}`)
       this.musicUrl =res.data[0].url
       this.isPlay=true
       
       this.$store.commit('INIT_MUSICURL',this.musicUrl)
       this.$store.commit('INIt_ISPLAY',this.isPlay)
      //  audio.src= this.musicUrl
      //  audio.play();
      }
   },
   playMusicLine(row){
     
      this.playMusic(row.id)
   }
  }
}
</script>

<style scoped>
.cell  {
  margin-left: 20px!important;
}
.palyMusic{
  cursor: pointer;
}
</style>