<template>
  <div id="userInfo">
    
     <!-- 头像区域 -->
        <div class="block"><el-avatar shape="square" :size="150" :src="this.$store.state.userInfo.avatarUrl"></el-avatar></div>
        <!-- 个人信息区域 -->
        <div class="info"><p>
          <ul>
            <li><span><strong>{{this.$store.state.userInfo.nickname}}</strong></span></li>
            <li><span>创建时间：{{this.$store.state.userInfo.createTime|dateFormat}}</span></li>
            <li><span>生日：{{this.$store.state.userInfo.birthday|dateFormat}}</span></li>
            <li><span>个性签名：{{this.$store.state.userInfo.signature}}</span></li>
            
          </ul>   
          </p>
        </div>
         <div class="clear"></div>
         <span><h2 class="shoucanggedan">{{this.$store.state.userInfo.nickname}}收藏的歌单:</h2></span>
         <!-- <div class="songListItem"><song :songListInfo="songListDetail"></song></div> -->
         <div class="musicblockitem">
            <div class="musicblock" v-for="item in userMusicList" :key="item.id" lazy @click="showMusicList(item.id)">
         <span class="songListName"><strong>{{item.name}}</strong></span>
         <el-image
         style="width: 230px; height: 200px"
        :src="item.coverImgUrl"
         :fit="fits.cover"></el-image>
        </div>
         </div>

        <div class="liubai">
      </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
    fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
     userid:'',
     userMusicList:[]
    }
  },
    created(){
    this.userid=this.$store.state.userInfo.userId
    
    this.getMyMusicList()
    },
    methods:{
     async getMyMusicList(){
      const {data:res} = await this.$http.get(`/user/playlist?uid=${this.$store.state.userID}`)
    
      if(res.code!==200){
         this.$nextTick(()=>{
           this.getMyMusicList()
       })
      }else{
        this.userMusicList=res.playlist
      
      }
     },
     //跳转我喜欢歌单详情页
     showMusicList(id){
      
       this.$router.push(`/Mysong_list_detail/${id}`).catch(err => err)
     }
    }
}
</script>

<style scoped>
.clear{clear: both;}
.block{
  float: left;
}
.info{
  
  margin-left: 20px;
  float: left;
}
.info p ul li{
  list-style: none;
  margin-bottom: 7px;
  
}
.info p ul li span strong{
  font-size: 18px;
}
.info p ul li span{
  font-size: 14px;
}
.demo-image{
  margin-top: 20px;
}

.musicblock{
  position: relative;
  float: left;
  margin-top: 30px;
  margin-left: 18px;
  
  /* margin-bottom: 20px; */
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

.liubai{
  clear: both;
  width: 100%;
  height: 100px!important;
}
.shoucanggedan{
  text-align: left;
}
</style>