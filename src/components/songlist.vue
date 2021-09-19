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
        <el-button class="back" type="danger" round @click="back">back</el-button>
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
    <div class="songListItem">
   <!-- <div v-for="(item,index) in songListInfo" :key="index">{{item.name}}</div> -->
    <!-- 表单区域 -->
  <el-table
    :data="songListDetail"
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
  </div>
</template>

<script>
//引入组件

export default {
    //传输过来的id
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
      songListDetail:[],
        //正在播放音乐的url
     musicUrl:'',
     //控制是否播放音乐
     isPlay:'',
     allid:[]
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
    },
    //下半部歌曲区域
      async playMusic(id){
      // this.allid= 
      this.songListDetail.forEach((item,index)=>{
        this.allid.push(item.id)
      })
      this.$store.commit('INIT_nowMusicId',id)
      //传入歌单所有音乐id
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
   },
   back(){
     //跳转回上一级
     //编程式导航
       this.$router.go(-1)
   }
  },
  
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
  margin-right: 700px;
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
  margin-top: 80px;
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
.cell  {
  margin-left: 20px!important;
}
.palyMusic{
  cursor: pointer;
}

.back{
  float: left;
 margin-top: -220px;
 margin-left: 1150px;
}
</style>