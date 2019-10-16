<template>
  <el-container id="app">
    <!-- 左边侧边菜单 -->
    <leftMenu></leftMenu>


    <!-- 主内容区 -->
    <el-main><router-view/></el-main> 
  </el-container>
</template>

<script>    
import leftMenu from '@/components/leftMenu'

export default {
  name: 'App',
  data () {
    return {}
  },
  mounted() {
    let doc = document,
        clientHeight = doc.documentElement.clientHeight;
        doc.querySelector("#app").style.height = clientHeight + 'px'; // 设置最外层元素高度
  },
  components: {
    leftMenu
  }
}
</script>

<style>
#app {
  height: 100%;
  /* font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px; */
  background: rgb(238,238,238);
}
</style>
  