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
  background: rgb(238,238,238);
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
::-webkit-scrollbar  
{  
    width: 10px;  /*滚动条宽度*/
    height: 10px;  /*滚动条高度*/
}  
  
/*定义滚动条轨道 内阴影+圆角*/  
::-webkit-scrollbar-track  
{  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px;  /*滚动条的背景区域的圆角*/
    background-color: #fff;/*滚动条的背景颜色*/  
}  
  
/*定义滑块 内阴影+圆角*/  
::-webkit-scrollbar-thumb  
{  
    border-radius: 10px;  /*滚动条的圆角*/
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color: gray;  /*滚动条的背景颜色*/
}  
</style>
  