<template>
<!-- v-for="item in SongListSong" :key="item.id" -->
  <div id="song-list-container">
     <!-- 面包屑组件 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item >首页</el-breadcrumb-item>
    <el-breadcrumb-item>歌单</el-breadcrumb-item>
    <el-breadcrumb-item >{{queryInfo.query}}</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="demo-image">
  <div class="block" v-for="item in SongListSong" :key="item.id" lazy @click="getSongListDetail(item.id)">
    <span class="songListName"><strong>{{item.name}}</strong></span>
    <el-image
      style="width: 230px; height: 200px"
      :src="item.coverImgUrl"
      :fit="fits.cover"></el-image>
  </div>
  <div class="clear"></div>
</div>
<!-- 分页 -->
<div class="pagination">
     <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="queryInfo.pageSize"
              :current-page="queryInfo.pagenum"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
</div>
<!-- <div >{{item.coverImgUrl}}</div> -->
  </div>
</template>

<script>
export default {
  
  props:{
    "name":String
  },
  data(){
    return{
      SongListSong:[],
      //存储歌单名称
      //存储歌单id
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      //获取歌单信息
      queryInfo:{
        query:this.name,
        pagenum:1,
        limit:10,
        pageSize:10,
        offset:0
      },
      total:0
    }
  },
    created(){
      this.getSongListSong()
    },
    methods:{
     async getSongListSong(){
        if(this.queryInfo.query==="另类"){
          this.queryInfo.query="另类/独立"
        }
      
        // this.queryInfo.limit=this.queryInfo.pagenum*10
        this.queryInfo.offset=(this.queryInfo.pagenum - 1) * 50
       
        const {data:res}= await this.$http.get(`/top/playlist?limit=${this.queryInfo.limit}&cat=${this.queryInfo.query}&offset=${this.queryInfo.offset}`)
        this.SongListSong=res.playlists
        this.total=res.total/10
        
       
      },
      //获取每个歌单中的歌曲
     getSongListDetail(id){
        this.$router.push(`/song_list_detail/${id}`).catch(err => err)
       
      },
     
      handleCurrentChange(newPage){
        this.queryInfo.pagenum=newPage;
        this.getSongListSong() 
      }
    
    
    }
}
</script>

<style scoped>

.block{
  position: relative;
  float: left;
  margin-top: 30px;
  margin-left: 18px;
  /* margin-bottom: 20px; */
}
.el-image{
  border-radius: 20px;
}
.clear{
  clear:both
}
.pagination{
  margin-top: 30px;
  margin-left: 400px;
}
.songListName{
 
  position: absolute;
   top: -40px;
  left: 50px;
  display: inline-block;
  width: 135px;
  white-space: nowrap; 
  font-size: 15px;
  overflow: hidden;
  text-overflow:ellipsis;
  color: crimson;

}
.demo-image{
  margin-top: 20px;
}
</style>