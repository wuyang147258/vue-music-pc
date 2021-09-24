<template>
    <div id="privateFm-container">
      <div class="item">
     <!-- 走马灯 -->
       <el-carousel :interval="4000" type="card" autoplay interval:2000 height="250px">
      <el-carousel-item v-for="item in  bannerList" :key="item">
     <h3 class="medium"><img class="bannerImg"  :src="item" alt=""></h3>
       </el-carousel-item>
      </el-carousel>
       <div class="bangdan">
        <span><h3>排行榜</h3></span>
        <div class="block" v-for="item in topList" :key="item.id" lazy @click="getSongsList(item.id)">
             <span class="songListName"><strong>{{item.name}}</strong></span>
             <el-image
             style="width: 150px; height: 150px"
             :src="item.coverImgUrl"
             :fit="fits.cover"></el-image>
            </div>
      </div>
       <div class="clear"></div>
      <div class="tuijain-item">
         <span><h3 class="h31">推荐歌单区域：</h3></span> <span><h3 class="h32">推荐mv区域</h3></span>
         <div class="clear"></div>
        <div class="tuijian-songs">  
            <div class="block" v-for="item in tuiJianSongList" :key="item.id" lazy @click="getSongsList(item.id)">
             <span class="songListName"><strong>{{item.name}}</strong></span>
             <el-image
             style="width: 150px; height: 150px"
             :src="item.picUrl"
             :fit="fits.cover"></el-image>
            </div>
        </div>
       
        <div class="tuijian-mv">
          <div class="block-mv" v-for="item in tuijianMvList" :key="item.id" lazy @click="getMvList(item.id)">
             <span class="songListName"><strong>{{item.name}}</strong></span>
             <el-image
             style="width: 150px; height: 150px"
             :src="item.picUrl"
             :fit="fits.cover"></el-image>
            </div>
        </div>
       <span><h3 class="h3vedio">推荐视频：</h3></span>
        <div class="tuijian-vedio">  
            <div class="block" v-for="item in vedioList" :key="item.urlInfo.id" lazy @click="getvedioList(item.urlInfo.id)">  
             <span class="songListName"><strong>{{item.title}}</strong></span>
             <el-image
             style="width: 150px; height: 150px"
             :src="item.creator.avatarUrl"
             :fit="fits.cover"></el-image>
            </div>
        </div>
      </div>
      <div class="clear"></div>
       
      </div>
    </div>
</template>

<script>
export default {  
    created(){
      //获取轮播图图片数据
      this.getBanner()
      //获取推荐歌单数据
      this.getTuiJianSongsList()
      //获取推荐mv数据
      this.getTuijianMV()
      //获取排行榜数据
      this.getTopList()
      //获取视频数据
      this.getVedio()

    },
    data(){
      return{
         fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        //存放获取过来的轮播图
        bannerList:[],
        //存放获取过来的推荐歌单数据
        tuiJianSongList:[],
        //存放获取过来的推荐mv数据
        tuijianMvList:[],
        //存放获取过来的排行榜数据
        topList:[],
        //存放获取过来的视频数据
        vedioList:[]

      }
    },
    methods:{
      //获取轮播图
     async getBanner(){
       const arr=[]
       const {data:res}= await this.$http.get(`/banner?type=2`)
       this.bannerList=res.banners
       for(let i=0;i<this.bannerList.length;i++){
         arr.push(this.bannerList[i].pic)
       }
       this.bannerList=arr
      },
     async getTuiJianSongsList(){
        const {data:res}=await this.$http.get(`/personalized?limit=3`)
        this.tuiJianSongList=res.result
        
      },
      getSongsList(id){
        this.$router.push(`/zhuanSongList/${id}`)
      },
      getMvList(id){
        this.$router.push(`/mvPlay/${id}`)
      },
       getvedioList(id){
        console.log(id);
         this.$router.push(`/vedio/${id}`)
      },
    async getTuijianMV(){
        const arr=[]
        const {data:res}=await this.$http.get(`/personalized/mv?limit=3`)
           this.tuijianMvList=res.result
        for(let i=0;i<this.tuijianMvList.length;i++){
          if(i<3){
            arr.push(this.tuijianMvList[i])
          }
        }
       this.tuijianMvList=arr
      },
      //获取排行榜数据
     async getTopList(){
       const arr=[]
        const {data:res}=await this.$http.get(`/toplist`)
        this.topList=res.list
        for(let i=0;i<this.topList.length;i++){
          if(i<7){
            arr.push(this.topList[i])
          }
        }
        this.topList=arr
      },
      //获取视频数据
     async getVedio(){
       const arr=[]
      const {data:res}=await  this.$http.get(`/video/timeline/recommend?offset=3`)
      
      console.log(res.datas[0].data);
      for (let i = 0; i < res.datas.length; i++) {
         if(i<3){
            this.vedioList.push(res.datas[i].data)  
         }
      }
      },
     
    }
}
</script>

<style scoped>
.bannerImg{
   width: 100%; height: auto;max-width: 100%; display: block;
}

.block{
  position: relative;
  float: left;
  margin-top: 30px;
  margin-left: 18px;
  /* margin-bottom: 20px; */
}
.block-mv{
  position: relative;
  float: left;
  margin-top: 30px;
  margin-left: 18px;
  /* margin-bottom: 20px; */
}
.tuijian-mv{
  margin-left: 700px;
  width: 1200px;
}

.el-image{
  border-radius: 20px;
}
.songListName{
  position: absolute;
   top: -40px;
  left: 10px;
  display: inline-block;
  width: 135px;
  white-space: nowrap; 
  font-size: 15px;
  overflow: hidden;
  text-overflow:ellipsis;
  color: crimson;

}
.h31{
  float: left;
}
.h32{
  float: left;
  margin-left: 550px;
}
.clear{
  clear: both;
}
.h3vedio{
  display: block;
  width: 100%;
  float: left;
}
</style>