<template>
  <div id="search-container">  
     <el-input
    type='text'
    v-model="inputSearchKeyWord"
    placeholder="请输入搜索内容"
    clearable
    @focus="showitem" 
  
    >
     <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
    </el-input>
     <div class="input-item" v-show="isShowItem=='true'" >
     <div class="hotWord" v-if="isSearchShowItem=='false'"><el-tag  size="medium " v-for="(item,index) in hotWord" :key="index" @click="showHotItem(item.first)">{{item.first}}</el-tag></div>
    <div class="hotWord" v-if="isSearchShowItem"><el-tag size="medium" v-for="(item,index) in suggestWord" :key="index" @click="showHotItem(item.name)">{{item.name}}</el-tag></div>
     <div class="close" @click="closeitem"><i class="el-icon-close"></i></div>
     </div>
      
    
  </div>
</template>

<script>
export default {
  watch:{
    inputSearchKeyWord:{
      handler(newVal,oldVal){
        console.log(newVal);
        if(newVal==''){
          this.isSearchShowItem=false
          console.log(this.isSearchShowItem);
        }else{
           this.searchSuggest()
           this.isSearchShowItem=true
        }
      }
    }
  },
  created(){
  
  },
    data(){
      return{
        isShowItem:'false',
        isSearchShowItem:'false',
        //存储获取过来的热词
        hotWord:[],
        //存储获取过来的关键词歌曲信息
        getKeyWordMusic:[],
        //输入的搜索信息
        inputSearchKeyWord:'',
        //建议搜索信息
        suggestWord:[]
      }
    },
    methods:{
      showitem(){
        this.isShowItem='true'
        this.getHotSearch()
      },
      closeitem(){
        this.isShowItem='false'
        this.isSearchShowItem='false'
        this.inputSearchKeyWord=''
        this.suggestWord=[]
      },
  
     async getHotSearch(){
      const {data:res}= await this.$http.get('/search/hot')
      if(res.code!==200){
        this.$message.error('获取热词出错')
      }
      else{
        this.hotWord=res.result.hots
        console.log(this.hotWord);
      }
      },
      showHotItem(keyWord){
        this.showKeyMusicItem(keyWord)
      },
     async showKeyMusicItem(keyWord){
       const {data:res}=await this.$http.get(`/search?keywords=${keyWord}`)
       if(res.code!==200){
         this.$message.error('获取歌曲错误')
       }else{
        this.getKeyWordMusic=res.result.songs
        this.$store.commit('INIT_keywordMusic',this.getKeyWordMusic)
        this.$router.push({path:`/searchMusic/`}).catch(err => err)
       }
      },
      search(){
        this.showKeyMusicItem(this.inputSearchKeyWord)
      },
     async searchSuggest(){
       const {data:res}=await this.$http.get(`/search/suggest?keywords=${this.inputSearchKeyWord}`)
        this.suggestWord=res.result.songs
        console.log(this.suggestWord);
      }
    }
}
</script>

<style scoped>
#search-container{
  position: relative;
 
}
.el-input{
  width: 300px;
  
}
.input-item{
  position: absolute;
  top: 48px;
  width: 300px;
  height: 150px;
  background: rgb(235, 126, 126);
  border-radius:0 0 10px 10px;
}
.hotWord{
  margin-left: 10px;
}
.el-tag{
  cursor: pointer;
  float: left;
  margin-top: 5px;
  margin-right: 10px;
  width: 80px;
  white-space: nowrap; 
  
  overflow: hidden;
  text-overflow:ellipsis;
}
.close{
  cursor: pointer;
  margin-top: 130px;
  margin-left: 280px;
}

</style>