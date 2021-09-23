<template>
    <div id="privateFm-container">
      <div class="item">
        {{this.$store.state.musicListID}}........{{this.$store.state.nowMusicId}}....{{this.$store.state.nextId}}
      </div>
    </div>
</template>

<script>
export default {  
        created(){
          this.getFmMusicList()
        },
        methods:{
        async  getFmMusicList(){
          const {data:res}=await this.$http.get(`/personal_fm`)
          console.log(res.data);
          }
        }
}
</script>

<style scoped>
.item{
  margin-left: 20px;
  width: 1200px;
  height: 550px;
  border: 1px solid black;
}
</style>