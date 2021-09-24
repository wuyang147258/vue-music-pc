<template>
  <div id="mv-container">
     <el-input
    placeholder="请输入想看的视频"
    prefix-icon="el-icon-search"
    v-model="searchMv">
  </el-input>
  <div v-show="showRecommend=='false'">
       <div class="Mv">
      <span><h3>搜索到的结果：</h3></span>
      <div class="block" v-for="item in searchMvList" :key="item.vid" lazy @click="playTheMv(item.vid)">
      <span class="songListName"><strong>{{item.title}}</strong></span>
      <el-image
      style="width: 230px; height: 200px"
      :src="item.coverUrl"
      :fit="fits.cover"></el-image>
       </div>
         <div class="clear"></div>
    </div>
   
  </div>
    <div v-show="showRecommend=='true'">
      <div class="fenlei">
        <el-tag class="fenleiTag" type="danger" v-for="(item) in fenleiTag" :key="item.id" @click="openTagVedio(item.id)">{{item.name}}</el-tag>
      </div>
         <div class="block" v-for="item in fenleiTagList" :key="item.vid" lazy @click="playTheMv(item.vid)">
      <span class="songListName"><strong>{{item.title}}</strong></span>
      <el-image
      style="width: 230px; height: 200px"
      :src="item.coverUrl"
      :fit="fits.cover"></el-image>
       </div>
    <div class="clear"></div>
    <div class="recommend">
      <span><h3>推荐视频：</h3></span>
       <div class="block" v-for="item in recommendList" :key="item.vid" lazy @click="playTheMv(item.vid)">
      <span class="songListName"><strong>{{item.title}}</strong></span>
      <el-image
      style="width: 230px; height: 200px"
      :src="item.coverUrl"
      :fit="fits.cover"></el-image>
       </div>
    </div>
    </div>

  </div>
</template>

<script>
export default {
  watch:{
    searchMv:{
      handler(newVal){
        if(newVal!==''){
          this.showRecommend='false'
          this.getSearchMv()
        }else{
          this.showRecommend='true'
        }
      }
    }
  },
  created(){
    this.getNewMv()
    this.getrecommendMv()
    this.getFenLeiTah()
    this.getAllList()
  },
  data(){
    return{
     fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
     //最新mv列表
      newMvList:[],
    //推荐mv列表
      recommendMv:[],
      //搜索的mv
      searchMv:'',
      showRecommend:'true',
      //搜索到的mv
      searchMvList:[],
      //获取到的分类标签
      fenleiTag:[],
      //存放分类标签视频数据
      fenleiTagList:[],
      //存放推荐视频数据
      recommendList:[]
    }
  },
  methods:{
   async getNewMv(){
    const {data:res} =await this.$http.get('/mv/first?limit=10')
    this.newMvList=res.data
    },
    //跳转到播放mv的位置
    playTheMv(id){
      console.log(id);
        this.$router.push(`/vedio/${id}`)
    },
   async getrecommendMv(){
      const {data:res}= await this.$http.get('/top/mv?limit=10')
      this.recommendMv=res.data
   
    },
   async getSearchMv(){
     const {data:res}=await this.$http.get(`/search?keywords=${this.searchMv}&type=1014`)
     console.log(res.result.videos);
     this.searchMvList=res.result.videos
    
    },
    //获取分类标签
   async getFenLeiTah(){
     const {data:res}=await this.$http.get(`/video/category/list`)
     this.fenleiTag=res.data
    },
   async openTagVedio(id){
     this.fenleiTagList=[]
     const {data:res}=await this.$http.get(`/video/group?id=${id}`)
    
     for (let i = 0; i < res.datas.length; i++) {
        this.fenleiTagList.push(res.datas[i].data)       
     }
     
    },
    async getAllList(){
     const {data:res}=await this.$http.get('/video/timeline/recommend?')
 
       for (let i = 0; i < res.datas.length; i++) {
         if(i<5){
      this.recommendList.push(res.datas[i].data)      
         }
    
     }
     console.log(this.recommendList);
     
    }
  }
}
</script>

<style scoped>
.el-input{
  width: 200px;
  
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
.clear{
  clear:both
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
.fenleiTag{
  width: 100px;
  height: 30px;
  text-align: center;
  margin-right: 15px;
}
</style>