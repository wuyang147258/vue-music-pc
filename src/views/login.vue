<template>
  <div id="login-container">
    <div class="container" id="container" ref="containerRef">
      <div class="form-container sign-up-container">
        <form action="#">
          <h1>注册帐户</h1>
          <div class="social-container">
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span>使用手机号码进行注册</span>
          <input type="text" placeholder="昵称"   v-model="registerInfo.nickname"/>
          <input type="mobile" placeholder="手机号码" @blur="testThePhone" v-model="registerInfo.phone"/>
           <input type="text" placeholder="验证码" @blur="blurCaptcha" v-model="registerInfo.captcha"/> <el-button type="info" size="mini" @click="sendCapycha(registerInfo.phone)" class="sendRegisterCapycha">点击获取验证码</el-button>
          <input type="password" placeholder="密码"  v-model="registerInfo.password" /> 
          <button @click="register">Sign Up</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form action="#">
          <h1>登 录</h1>
          <div class="social-container">
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span>或使用账户</span>
          <input type="mobile" placeholder="手机号码" @blur="testIsPhone" v-model="loginInfo.phone">
          <input type="password" placeholder="密码" v-show="!isShow" @blur="testIsPassWord" v-model="loginInfo.password"/>
          <input type="test" placeholder="验证码" @blur="testIsCaptcha" v-show="isShow" v-model="loginInfo.captcha"/>
           <el-button size="mini" round @click="chooseWay" v-show="isShow" >使用密码登录</el-button>
            <el-button size="mini" round @click="chooseWay" v-show="!isShow">使用验证码登录</el-button>
          <el-button type="info" @click="sendCapycha(loginInfo.phone)" v-show="isShow" class="sendLoginCapycha" size="mini">点击获取验证码</el-button>
          <a href="#">忘记密码?</a>
          <button @click="login">登 录</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>欢迎 回来!</h1>
            <p>欢迎来到网易云</p>
            <button class="ghost" id="signIn" @click="tabLoginUser">登 录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>欢迎来到网易云</p>
            <button class="ghost" id="signUp" @click="tabRegisterUser">注 册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import '../assets/css/style.css'

export default {
  data(){
    return{
      //存储用户注册输入的信息
      registerInfo:{
        nickname:'',
        password:'',
        captcha:'',
        phone:''
      },
      loginInfo:{
        phone:'',
        captcha:'',
        password:''
      },
      isShow:false,
      
      //存储登录token
      token:''
    }
  }
  ,
  methods:{
    //样式的js
    tabRegisterUser(){
      this.$refs.containerRef.classList.add('right-panel-active');
    },
    tabLoginUser(){
      this.$refs.containerRef.classList.remove('right-panel-active');
    },
    //发送验证码
   async sendCapycha(phone){
    //  console.log(this.registerInfo.phone);
     const {data:res} =await this.$http.get(`/captcha/sent?phone=${phone}`)
   
     if(res.code==200) {
       this.$message.success('发送验证码成功')
       }
    
    },
    //失去焦点的时候检测手机号是否已经被注册
   async testThePhone(){
     if(this.registerInfo.phone==''){
       this.$message.error('请输入正确的手机号')
     }else{
      console.log(this.registerInfo.phone);
       const {data:res}= await this.$http.get(`/cellphone/existence/check?phone=${this.registerInfo.phone}`)
    
       if(res.nickname!==''){
         this.$message.error('此手机号已经注册请直接登录')
       }
     }
     
    },
    //失去焦点的时候验证验证码
     async blurCaptcha(){
       const {data:res}=await this.$http.get(`/captcha/verify?phone=${this.registerInfo.phone}&captcha=${this.registerInfo.captcha}`)
     
       if(res.data.status==='503'){
         this.$message.error('验证码输入错误')
       }else{
         this.$message.success('验证码正确')
       }
    },
    //发送注册请求
    async register(){
      const {data:res}=await this.$http.get(`/register/cellphone?phone=${this.registerInfo.phone}&password=${this.registerInfo.phone}&captcha=${this.registerInfo.captcha}&nickname=${this.registerInfo.nickname}`)
      console.log(res);
   },
    //登录功能
    //检测是否输入手机号
    testIsPhone(){
      if(this.loginInfo.phone==''){
        this.$message.error('请输入手机号')
      }
    },
    
    //选择登录的方式
    chooseWay(){
      this.isShow=!this.isShow
    },
    //检测是否输入密码
    testIsPassWord(){
      if(this.loginInfo.password==''){
        this.$message.error('请输入密码')
      }
    },
    //检测是否输入验证码
    testIsCaptcha(){
      if(this.loginInfo.captcha==''){
        this.$message.error('请输入验证码')
      }
    },
    //提交登录信息
     async login(){
       //判断登录方式
      if(this.loginInfo.captcha===''){
        //密码登录方式
      const {data:res}= await this.$http.get(`/login/cellphone?phone=${this.loginInfo.phone}&password=${this.loginInfo.password}`)
     
      if(res.loginType!==1){
        this.$message.error('账号或者密码输入错误')
      }else{
        //  账号密码输入成功,获取登录状态
        console.log(res.token);
        this.token=res.token
          //将登录成功的token保存到客户端的sessionStorage中
       window.sessionStorage.setItem("token",this.token);
       
        this.$message.success('登录成功,欢迎享受音乐')
         //通过编程式导航到首页
         this.$router.push('/home').catch(err => err)
      // }
      }
      }else{
        //使用验证码登录
        const {data:res} =await this.$http.get(`/login/cellphone?phone=${this.loginInfo.phone}&captcha=${this.loginInfo.captcha}`)
        if(res.loginType!==1){
          this.$message.error('账号或者验证码输入错误')
        }else{
        
           console.log(res);
            this.token=res.token
            //将登录成功的token保存到客户端的sessionStorage中
        window.sessionStorage.setItem("token",this.token);
        this.$message.success('登录成功,欢迎享受音乐')
      
         //通过编程式导航到首页
         this.$router.push('/home').catch(err => err)
      // }
        }
      }
     }
      
  }
}
</script>

<style scoped>
#login-container{
  margin-top: 100px;
  margin-left: 330px;
}
.sendLoginCapycha{
  margin-top: 10px;
  border-radius: 20px;
}
.sendRegisterCapycha{
  border-radius: 20px;
}
</style>