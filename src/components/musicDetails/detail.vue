<template>
   <div id="detail-container">
     <div class="item">
      <div class="bg" :style="{ 'background-image' : 'url('+imgurl+')' }"></div>
       <div class="img-left">
             <img class="needlecImg" src='../../assets/needle.png' alt="">
            <img class="discImg" src='../../assets/disc.png' alt="">
            <img class="picImg" :src="imgurl" alt="">
            <i v-if="this.$store.state.isPlay" class="pause el-icon-video-pause" ></i>
            <i v-else class="play el-icon-video-play"></i>
            <i class="left el-icon-d-arrow-left" @click="toLeft"></i>
            <i class="right el-icon-d-arrow-right" @click="toRight"></i>
        </div>
        <div class="item-right">
          <div class="nickname"><h3>{{songdetail.name}}</h3></div>
          	<div class="detail-lyric">
					<div class="detail-lyric-wrap" :style="{transform:'translateY('+-(lyricIndex-1)*55+'px)'}">
						<div class="detail-lyric-item" :class="{active:lyricIndex==index}" v-for="(item,index) in songLyric" :key="index">{{item.lyric}}</div>	
					</div>
				</div>
        </div>
        </div>
        <div class="clear"></div>
      <div class="recommd">
        <span><h2>精彩评论：</h2></span>
   <div class="comment-item"  v-for="(item,index) in commentList" :key="index">
     <div class="touxiang"><img :src="item.user.avatarUrl" alt=""></div>
     <div class="nickname">{{item.user.nickname}}</div>
     <div class="conmment">{{item.content}}</div>
     <div class="time">{{item.time|dateFormat}}</div>
   </div>
      </div>
    </div>
</template>

<script>

export default {

  watch:{
    "$store.state.nowMusicId":{
      handler(newVal,oldVal){
       if(newVal==false){    
       }else{
         this.getMusicDetail()
         this.getMusicComment()
       }     
      },
       deep:true,
       immediate:true
    },
   "$store.state.endmusic":{
     handler(newVal,oldVal){
       if(newVal==true&&this.$store.state.nowMusicId==false){
          this.getMusicDetailNext()
         this.getNextMusicComment()
       }
     },
      deep:true,
      immediate:true
   },
   "$store.state.isPlay":{
     handler(newVal,oldVal){
      //  if(oldVal==true){
      //    if(this.$store.state.currentTime!==''){
      //       this.listenLyricIndex()
      //    }
         
      //  }
       if(newVal==true){
         if(this.$store.state.currentTime!==''){
            this.listenLyricIndex()
         } 
       }
     },
     deep:true,
     immediate:true
   }
  },
  data(){
    return{
     nextTheMuicId:'',
     //当前点击的歌曲数据
     songdetail:{},
     //图片预加载
    imgurl:'',
     //歌词数据
     songLyric:[],
     lyricIndex:'',
     //评论数据
     commentList:[]
    }
  },
  created(){
    this.getMusicDetailNext()
  
 
  },
  methods:{
   async getMusicDetail(){
     const {data:res}=await this.$http.get(`/song/detail?ids=${this.$store.state.nowMusicId}`)
     this.songdetail=res.songs[0]
     
     this.imgurl=res.songs[0].al.picUrl
     //获取歌词
       const {data:ly}=  await this.$http.get(`/lyric?id=${this.$store.state.nowMusicId}`)
       this.proLyric(ly.lrc.lyric)
    },
   async getMusicDetailNext(){
     for (var i = 0; i < this.$store.state.musicListID.length; i++) {
       if(this.$store.state.musicListID[i]==this.$store.state.nextId){
         this.nextTheMuicId=this.$store.state.musicListID[i-1]
       } 
     }
       const {data:res}=await this.$http.get(`/song/detail?ids=${this.nextTheMuicId}`)
       this.songdetail=res.songs[0]
       this.imgurl=res.songs[0].al.picUrl
      //获取歌词
      //获取歌词
       const {data:ly}=  await this.$http.get(`/lyric?id=${this.nextTheMuicId}`)
       this.proLyric(ly.lrc.lyric)
   },
    //处理歌词方法
   	formatTimeToSec(value){
					let arr = value.split(':');
					return (Number(arr[0]*60) +  Number(arr[1])).toFixed(1);
			},
   //处理歌词方法
   proLyric(lyric){
     //利用正则处理歌词
						// console.log(lyric)
						let re=/\[([^\]]+)\]([^\[]+)/g
						var result=[];
						lyric.replace(re,($0,$1,$2)=>{
							result.push({"time":this.formatTimeToSec($1),"lyric":$2})
						})
						this.songLyric=result
   },
   //实现歌词滚动
   //实现歌词滚动
			listenLyricIndex(){
				//清除之前存在的计时器
				clearInterval(this.timer)
				this.timer=setInterval(()=>{
					for(var i=0;i<this.songLyric.length;i++){
						if(this.$store.state.currentTime>this.songLyric[this.songLyric.length-1].time){
							this.lyricIndex=this.songLyric.length-1
							break;
						}				
						if(this.$store.state.currentTime>this.songLyric[i].time && this.$store.state.currentTime<this.songLyric[i+1].time){
							this.lyricIndex=i
						}			
					}	
				},500)
			},
			//关闭定时器
			cancelLyriIdex(){
				clearInterval(this.timer)
			},
      //获取当前歌曲评论
    async getMusicComment(){
 
     const {data:res}= await this.$http.get(`/comment/music?id=${this.$store.state.nowMusicId}&limit=50`)
    
     this.commentList=res.comments
    },
      //获取下一首歌评论
     async getNextMusicComment(){
        const {data:res}= await this.$http.get(`/comment/music?id=${this.nextTheMuicId}&limit=50`)
       
        this.commentList=res.comments
      },
      //向左切换
      toLeft(){
        if(this.$store.state.nowMusicId==this.$store.state.musicListID[0]){
          this.$message.error('到头了!!!')
        }else{
          this.$store.commit('INIt_CLICKLEFT',true)
        for (let i = 0; i < this.$store.state.musicListID.length; i++) {
            if(this.$store.state.nowMusicId!==false){
              
              if(this.$store.state.nowMusicId==this.$store.state.musicListID[i]){
                this.$store.commit('INIT_nowMusicId',this.$store.state.musicListID[i-1])
              }
            }else{
             
              if(this.$store.state.nextId==this.$store.state.musicListID[i]){
               
                this.$store.commit('INIT_nowMusicId',this.$store.state.musicListID[i-1])
              }
            }
          
        }
        }
        
      },
      toRight(){ 
        if(this.$store.state.nowMusicId==this.$store.state.musicListID[this.$store.state.musicListID.length-1]){
          this.$message.error('此歌单播放完了哦！')
        }else{
          this.$store.commit('INIT_CLICKRIGHT',true)
            for (let i = 0; i < this.$store.state.musicListID.length; i++) { 
              if(this.$store.state.nowMusicId==this.$store.state.musicListID[i]){   
               
               this.$store.commit('INIT_nowMusicId',this.$store.state.musicListID[i+1])
               break; 
              }
                    
        }
      }
        }    
       
  }
}
</script>

<style scoped>
.item{
  position: relative;
  margin-top: 20px;
}
.bg{
  margin-left: 20px;
  width: 1200px;
  height: 550px;
  border: 1px solid black;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  filter: blur(7px);
 
}
.picImg{
  position: absolute;
  top: 100px;
  width: 300px;
  height: 300px;
  left: 150px;
  border-radius: 50%;
  animation: 10s linear move infinite;

}
@keyframes move{
	from{transform: rotate(0deg);}
	to{transform: rotate(360deg);}
}

.discImg{
  position: absolute;
  top: 2px;
  left: 52px;
 
}
.needlecImg{
  position: absolute;
  top: 2px;
  left: 325px;
  z-index: 99;
}
.clear{
  clear: both;
  height: 100px;
}

.nickname h3{
  display: inline-block;
 
  color: white;
  width: 200px;
   white-space: nowrap; 

  overflow: hidden;
  text-overflow:ellipsis;
}
.pause{
  position: absolute;
  top: 210px;
  left: 270px;
  font-size: 50px!important;
  color: white;
}
.play{
  position: absolute;
  top: 210px;
  left: 270px;
  font-size: 50px!important;
  color: white;
}
.item-right{
  position: absolute;
  top: 0;
  left: 730px;
  text-align: center;
}
.detail-lyric{
  
  font-size: 14px; 
  line-height: 82px;
  height: 450px; 
  text-align: center;
  overflow: hidden;
  color: rgb(252, 185, 205);}
.detail-lyric-wrap{
  transition: .5s;
  }
.detail-lyric-item{
  height: 55px;
  }
.detail-lyric-item.active{
  color: rgb(255, 0, 0);
  font-size: bold;
  }
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
.left{
  position: absolute;
  left: 75px;
  top: 220px;
  font-size: 35px;
  color: white;
}
.right{
   position: absolute;
  left: 490px;
  top: 220px;
  font-size: 35px;
  color: white;
  z-index: 99;
}
</style>