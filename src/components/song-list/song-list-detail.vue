<template>
  <div id="songList-container">
    <!-- <div v-for="item in songListDetail" :key="item.id">{{item.id}}--{{item.name}}</div> -->
    <!-- <div>{{songListDetailInfo.name}}</div> -->
    <!-- 头部介绍歌单的基本信息 -->
    <div class="songListHeader">
      <div class="imges-left">
        <!-- 左侧图片区域 -->
         <div class="block"  >
            <el-image
             style="width: 230px; height: 200px"
            :src="songListDetailInfo.coverImgUrl"
            :fit="fits.cover"></el-image>
         </div>
        
      </div>
      <div class="info-right">
 
        <!-- 右侧信息展示区 -->
       <p> 
        <ul>
          <li> <span class="theSongListName"><h2>{{songListDetailInfo.name}}</h2></span></li>
          <li> <span>{{songListDetailInfo.createTime|dateFormat}}&nbsp;&nbsp;创建</span></li>
          <li> <span>标签：</span><span  class="threeLineSpan" v-for="(item,index) in songListDetailInfo.tags" :key="index">{{item}},</span></li>
          <li><span>播放：{{songListDetailInfo.playCount|formatCount}}</span></li>
          <li><span class="theSongListBrief">简介：{{songListDetailInfo.description}}</span></li>
        </ul>
        
        </p>
      </div>
    </div>
    <div class="clear"></div>
    <div class="songListItem"><song :songListInfo="songListDetail"></song></div>
  </div>
</template>

<script>
//引入组件
import Song from '../song-list/song.vue'
export default {
  props:{
    "id":String
  },
  created(){
    //调用查找歌曲的接口方法
    this.getSongListDetail()
  },
  data(){
    return{
       fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      //根据id查询
      querInfo:{
        query:this.id
      },
      //存储歌单的信息
      songListDetailInfo:[],
      //存储获取到的歌曲
      songListDetail:[]
    }
  },
  methods:{
   async getSongListDetail(){
    
        const {data:res}=await this.$http.get(`/playlist/detail?id=${this.querInfo.query}`)
         if(res.code!==200){
           this.$message.error('获取歌曲错误')
         }else{
           this.$message.success('成功获取歌曲')
           this.songListDetail=res.playlist.tracks
           this.songListDetailInfo=res.playlist
        
         }
         
         
    }
  },
  //注册组件
  components:{
    Song
  }
}
</script>

<style scoped>
.info-right ul li {
  list-style: none;
  margin-bottom: 5px;
}
.clear{
  clear: both;
}
.imges-left{
  width: 150px;
  height: 150px;
  float: left;

}
.imges-left image{
  width: 150px;
  height: 150px;
}
.el-image{
  border-radius: 10px;
}
.info-right{
  width: 300px;
  float:right;
  margin-right: 730px;
  margin-top: -20px;
}
.oneLine h2{
  display: inline-block;
  margin-right: 100px;
}
.info-right  span{
  font-size: 14px;
}
.info-right div{
  display: inline-block;
}
.threeLineSpan{
  color: rgb(12, 183, 240);
}
.songListItem{
  margin-top: 40px;
}
.theSongListName{
  width: 135px;
  white-space: nowrap; 
  font-size: 15px;
  overflow: hidden;
  text-overflow:ellipsis;
}
.theSongListBrief{
   overflow: hidden;
	 text-overflow: ellipsis;
	 display: -webkit-box;
	 -webkit-line-clamp: 3;/*想省略几行就写几*/
	 -webkit-box-orient: vertical;

}
</style>