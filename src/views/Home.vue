<template>
  <div id="home-container">
    <el-container class="home-container">
    <el-aside style="width:15%" >
      <el-scrollbar style="width:100% height:100%" >
         <el-menu
      background-color="#F56C6C"
      text-color="white"
      active-text-color="red"
     >
    <span class="asideHeader">网易云音乐</span>
     <!-- 一级菜单 -->
      <el-submenu index="5">
        <template slot="title">
          <div @click="openStartInterFace">home</div>
        </template>
      </el-submenu>
      <el-submenu index="1">
        <template slot="title">
          <div>热门歌单</div>
        </template>
      <!-- 二级菜单 -->
      <el-menu-item v-for="(item,index) in classifyMusic" :key="index" @click="openSongList(item.name)">{{item.name}}</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <div  @click="opensinger">歌手</div>
        </template>
      </el-submenu>
       
       <el-submenu index="4">
        <template slot="title">
          <div @click="openMv">MV</div>
        </template>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <div @click="openVedio">视频</div>
        </template>
      </el-submenu>
    </el-menu>
      </el-scrollbar>
      
    </el-aside>
    <el-container>
    <el-header class="header"> 
     
      <!-- 头像区域 -->
      <div class="userImg" @click="showUserInfo">
         <el-avatar :src="this.$store.state.userInfo.avatarUrl"  ></el-avatar>
      </div>
    
    <div class="imgLogo"><img src='../assets/logo.png'></div>
     <div class="search"> <Search></Search></div>
    <div class="exitLogin"><el-button type="danger" round @click="exitLogin">退出登录</el-button></div>
    </el-header>
    <el-main><router-view :key="$route.fullPath"></router-view></el-main>
    <el-footer><div class="sanjiao" @click="openDetails"></div><span class="musicName">{{nowMusicName}}</span><audio @timeupdate="getCurrentTime" @play="onPlay" @pause="onPause" @ended="nextMusic" :src="this.$store.state.musicUrl" autoplay volume controls class="audioMusic" ref="audioMusicRef"></audio></el-footer>
  </el-container>
</el-container>

  </div>
</template>

<script>
import Search from '../components/search/search.vue'
export default {
    watch:{
      "$store.state.clickLeft":{
          handler(newVal){
            
            if(newVal==true){
             
              this.toLeft()
            }
          },
           deep:true,
      immediate:true
      },
       "$store.state.clickRight":{
          handler(newVal){
            
            if(newVal==true){
             
              this.toRight()
            }
          },
           deep:true,
      immediate:true
      },
    },
    created(){
      //在创建的时候获取歌单分类
      this.getClassifyMusic()
      this.getLoginState()
       
    },
    data(){
      return{
        //存储歌单分类数据
        classifyMusic:[],
        //下一首播放音乐的url
        nextUrl:'',
       //存储获取到的用户信息
      loginUser:{},
      nowMusicName:'',
      currentTime:'',
      //向左切换
      toLeftUrl:'',
      //向右切换
      toRightUrl:''
      }
    },
    methods:{
      //获取歌单分类的方法
     async getClassifyMusic(){
      const {data:res} =await this.$http.get('/playlist/hot') 
      if(res.code!==200){
        this.$message.error('获取歌单分类错误')
      }else{
        this.classifyMusic=res.tags  
      }
      },
      //退出登录
     async exitLogin(){
        const {data:res}= await this.$http.get('/logout')
        if(res.code!==200){
          this.$message.error('退出失败')
        }else{
          //刷新登录状态
        this.$message.success('退出成功')
         window.sessionStorage.clear()
        this.$router.push('/login').catch(err => err)
        }
      },
      openSongList(name){
          if(name=="另类/独立"){
            name="另类"
          }
          this.$router.push(`/song_list/${name}`).catch(err => err)
      },
      //监听音乐播放结束
    async nextMusic(){
        const {data:res}=await this.$http.get(`/song/url?id=${this.$store.state.nextId}`)
        this.nextUrl=res.data[0].url
        this.$refs.audioMusicRef.src=this.nextUrl
        this.$store.commit('INIT_nowMusicId',false)
        const {data:name}=await this.$http.get(`/song/detail?ids=${this.$store.state.nextId}`)
        this.nowMusicName=name.songs[0].name
        this.$store.commit('NEXT_ID',this.$store.state.nextId)
        this.$store.commit('INIt_ENDMUSIC',true)
      },
      showUserInfo(){
        //编程式导航
         this.$router.push(`/userInfo/`).catch(err => err)
      },
      async getLoginState(){
         const {data:login}= await this.$http.get(`/login/status`)
         if(login.data.code==200){
         this.loginUser=login.data.profile
         //将获取到的信息传入vuex中
        this.$store.commit('INIT_userInfo',this.loginUser)
        this.$store.commit('INIT_userID',this.loginUser.userId)
         }
      },
      async onPlay(){
        setInterval(()=>{
           this.$store.commit('INIt_ENDMUSIC',false)
        },3000)
        this.$store.commit('INIt_ISPLAY',true)
      
        if( this.$store.state.isPlay==true){
        }
        if(this.$refs.audioMusicRef.currentTime=='0'&&this.$store.state.nowMusicId!==false){
           const {data:res}=await this.$http.get(`/song/detail?ids=${this.$store.state.nowMusicId}`)
             this.$store.commit('INIt_ENDMUSIC',false)
             this.nowMusicName=res.songs[0].name
        }
      },
      onPause(){
          this.$store.commit('INIt_ISPLAY',false)
           if( this.$store.state.isPlay==true){
        }
      },
     async toLeft(){
       
        const {data:res}=await this.$http.get(`/song/url?id=${this.$store.state.nowMusicId}`)
        this.toLeftUrl=res.data[0].url
        this.$refs.audioMusicRef.src=this.toLeftUrl
        this.$store.commit('INIt_CLICKLEFT',false)
      },
      async toRight(){
       
        const {data:res}=await this.$http.get(`/song/url?id=${this.$store.state.nowMusicId}`)
        this.toRightUrl=res.data[0].url
        this.$refs.audioMusicRef.src=this.toRightUrl
        this.$store.commit('INIT_CLICKRIGHT',false)
      },
      getCurrentTime(){
       this.currentTime=this.$refs.audioMusicRef.currentTime
      //将播放进度传入vuex
       this.$store.commit('INIT_CURRENTTIME',this.currentTime)
      
      },
      opensinger(){
         this.$router.push(`/singer/`).catch(err => err)
      },
      openMv(){
       this.$router.push('/mv/').catch(err=>err)
     },
      openStartInterFace(){
       this.$router.push('/StartInterface/').catch(err=>err)
     },
     openDetails(){
       if(this.$store.state.nowMusicId!==''||this.$store.state.nextId!==''){
        this.$router.push('/musicDetail/').catch(err=>err)
       }
     
     },
     openVedio(){
       this.$router.push('/vedioFace/').catch(err=>err)
     }

    },
    components:{
      Search
    }
    
}
</script>

<style scoped>

.home-container{
  width: 1535px!important;
  height: 100%;
}
.el-header{
  background-color: #f35757;
}

.el-aside{
  height: 670px;
  background-color: #F56C6C;
}
.el-main{
  width: 100%;
   height: 20px;
  line-height: 50px;
   overflow-y: scroll;
  background-color: rgb(240, 233, 233);
}
.el-menu{height: 100%; color: white;}
.el-submenu{
  padding-left: 20px;
}
.el-menu-item{
  font-size: 15px;
  color: white!important;
}

.asideHeader{
  margin-top: 20px;
  display: block;
  width: 100%;
  text-align: center;
  font-size: 28px;

}
.imgLogo{
  width: 60px;
  height: 60px;
  float: left;
  
}
.imgLogo img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.header{
  position: relative;
}
.exitLogin{
  position: absolute;
  right: 30px;
  line-height: 60px;
}
.audioMusic{
  margin-top: 6px;
  width: 1500px;
  
}
.userImg{
 position: absolute;
 top: 10px;
  right: 60px;
  margin-right: 100px;
 line-height: 60px;
}
.search{
  float: left;
  margin-left: 100px;
  position: absolute;
  z-index:5555;
}
.el-footer{
  background-color: black;
}
.sanjiao{
 margin-top: -20px;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: black;
}
</style>