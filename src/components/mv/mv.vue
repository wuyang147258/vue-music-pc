<template>
  <div id="mv-container">
     <el-input
    placeholder="请输入想看的mv"
    prefix-icon="el-icon-search"
    v-model="searchMv">
  </el-input>
  <div v-show="showRecommend=='false'">
       <div class="Mv">
      <span><h3>搜索到的结果：</h3></span>
      <div class="block" v-for="item in searchMvList" :key="item.id" lazy @click="playTheMv(item.id)">
      <span class="songListName"><strong>{{item.name}}</strong></span>
      <el-image
      style="width: 230px; height: 200px"
      :src="item.cover"
      :fit="fits.cover"></el-image>
       </div>
         <div class="clear"></div>
    </div>
   
  </div>
    <div v-show="showRecommend=='true'">
       <div class="Mv">
      <span><h3>最新MV：</h3></span>
      <div class="block" v-for="item in newMvList" :key="item.id" lazy @click="playTheMv(item.id)">
      <span class="songListName"><strong>{{item.name}}</strong></span>
      <el-image
      style="width: 230px; height: 200px"
      :src="item.cover"
      :fit="fits.cover"></el-image>
       </div>
    </div>
    <div class="clear"></div>
    <div class="Mv">
      <span><h3>排行MV：</h3></span>
      <div class="block" v-for="item in recommendMv" :key="item.id" lazy @click="playTheMv(item.id)">
      <span class="songListName"><strong>{{item.name}}</strong></span>
      <el-image
      style="width: 230px; height: 200px"
      :src="item.cover"
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
      searchMvList:[]
    }
  },
  methods:{
   async getNewMv(){
    const {data:res} =await this.$http.get('/mv/first?limit=10')
    this.newMvList=res.data
    },
    //跳转到播放mv的位置
    playTheMv(id){
        this.$router.push(`/mvPlay/${id}`)
    },
   async getrecommendMv(){
      const {data:res}= await this.$http.get('/top/mv?limit=10')
      this.recommendMv=res.data
   
    },
   async getSearchMv(){
     const {data:res}=await this.$http.get(`/search?keywords=${this.searchMv}&type=1004`)
     this.searchMvList=res.result.mvs
    
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
</style>