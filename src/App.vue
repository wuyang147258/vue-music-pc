<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  methods:{
    test(){
      this.$message.success('测试')
    }
  }
}
</script>

<style>

</style>
