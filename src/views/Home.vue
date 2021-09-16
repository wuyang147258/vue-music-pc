<template>
  <div id="home-container">
    <el-container class="home-container">
    <el-aside width="200px" >
       <el-menu
      background-color="#F56C6C"
      text-color="white"
      active-text-color="red"
     >
    <span class="asideHeader">网易云音乐</span>
     <!-- 一级菜单 -->
     
      <el-submenu index="1">
        <template slot="title">
          <div>歌单</div>
        </template>
      <!-- 二级菜单 -->
      <el-menu-item v-for="(item,index) in classifyMusic" :key="index">{{item.name}}</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <div>歌手</div>
        </template>
      </el-submenu>
  
     
       <el-submenu index="3">
        <template slot="title">
          <div>我的音乐</div>
        </template>
      </el-submenu>
       <el-submenu index="4">
        <template slot="title">
          <div>MV</div>
        </template>
      </el-submenu>
       <el-submenu index="5">
        <template slot="title">
          <div>私人Fm</div>
        </template>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-container>
    <el-header> 
    <div class="imgLogo"><img src='../assets/logo.png' alt=""></div>
    <div class="exitLogin"><el-button type="danger" round @click="exitLogin">退出登录</el-button></div>
    </el-header>
    <el-main><router-view></router-view></el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</el-container>

  </div>
</template>

<script>

export default {
  
    created(){
      //在创建的时候获取歌单分类
      this.getClassifyMusic()
    },
    data(){
      return{
        //存储歌单分类数据
        classifyMusic:[]
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
        console.log(this.classifyMusic);
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
        this.$router.push('/login').catch(err => err)
        }
        

      }
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
  background-color: rgb(236, 172, 172);
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
  font-size: 30px;
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
.exitLogin{
  float:right;
  line-height: 60px;
}
</style>