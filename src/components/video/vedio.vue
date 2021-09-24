<template>
  <div id="mvPlay-container">

    <el-button class="back" type="danger" round @click="back">back</el-button>
   <div class="mv-item">
      <div class="video-play">
      <video id="video" autoplay="true" ref="mvRef" controls></video>
    </div>
    <div class="mv-sim">
      <span><h2>相似的视频：</h2></span>
      <div class="block" v-for="item in simMvList" :key="item.vid" lazy @click="playTheMv(item.vid)">
       <span class="songListName"><strong>{{item.title}}</strong></span>
      <el-image
      style="width: 230px; height: 200px"
      :src="item.coverUrl"
      :fit="fits.cover"></el-image>
      </div>
    </div>
   </div>
   <div class="clear"></div>
   <span><h2>精彩评论：</h2></span>
   <div class="comment-item"  v-for="(item,index) in commentList" :key="index">
     <div class="touxiang"><img :src="item.user.avatarUrl" alt=""></div>
     <div class="nickname">{{item.user.nickname}}</div>
     <div class="conmment">{{item.content}}</div>
     <div class="time">{{item.time|dateFormat}}</div>
   </div>
  </div>
</template>

<script>
export default {
    props:{
      id:String
    },
     data(){
      return{
         fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        //存储获取到的mv信息
        theMvInfo:[],
        //存储到的相似mv信息
        simMvList:[],
        //存储到的mv评论信息
        commentList:[],
        //是否正在播放mv
        isplayMv:false,
       
      }
    },
    created(){
      console.log(this.id);
      this.getTheMv()
      this.getSimMv()
      this.getComment()
    },
   
    methods:{
     async getTheMv(){
       const {data:res}=await this.$http.get(`/video/url?id=${this.id}`)
      //  this.vedioUrl=res.urls[0].url
       this.$refs.mvRef.src=res.urls[0].url
       
      },
     async getSimMv(){
        const {data:res}=await this.$http.get(`/related/allvideo?id=${this.id}`)
       
        this.simMvList=res.data
      },
       playTheMv(id){
        
        this.$router.push(`/vedio/${id}`)
    },
     async getComment(){
      const {data:res}=await this.$http.get(`/comment/video?id=${this.id}&limit=50`)
  
      this.commentList=res.comments
      },
      back(){
         this.$router.go(-1)
      },
     
    }
}
</script>

<style scoped>
h2{
  text-align: left;
}
#video{
  width: 1200px;
  height: 500px;
 margin-top: 20px;
  margin-left: 30px;
}
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
.clear{clear: both;
height: 100px;}
.comment-item{
  position: relative;
  width: 100%;
  height: 80px;
  line-height: 100px;
  border-bottom: 1px dashed  rgb(201, 197, 197);
}
.touxiang{
  margin-top: -10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.touxiang img{
  margin-top: 25px;
  width: 100%;
  height: 100%;
   border-radius: 50%;
}
.nickname{
  position: absolute;
  width: 150px;
  top: 0;
  left:60px;
  font-size: 14px;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow:ellipsis;
}
.conmment{
  position: absolute;
  top: 0;
  left: 250px;
   width: 1000px;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow:ellipsis;
}
.time{
  position: absolute;
  top: 20px;
  left: 1000px;
  font-size: 14px;
}
</style>