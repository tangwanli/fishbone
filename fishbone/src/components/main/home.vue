<template>
  <el-row>
    <el-col :span="6">
      <header>me</header>
      <el-menu default-active="1" background-color="#fff" text-color="#2c3e50">
        <el-menu-item index="1">第一个任务<span>12-27</span></el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="6">
      <header>me</header>
    </el-col>
    <el-col :span="6">
      <header>me</header>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: '开始游戏',
      }
  },
  created() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-col {
  margin: 0 15px 0 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
header {
  border-bottom: 1px solid #e9e9e9;
}
.el-menu-item {
  text-align: left;
}
</style>