<template>
  <el-container class="DetailTask">
    <el-header>
      <el-row class="task-header">
        <el-col>G028 看板这里来第四个任务</el-col>
        <el-col><el-button size="mini" type="danger" :round="true">删除任务</el-button></el-col>
      </el-row>
    </el-header>
    <el-main>main</el-main>
    <el-footer>footer</el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'DetailTask',
  data () {
    return {
      msg: '开始游戏',
    }
  },
  created() {
      console.log('dsadas',this.$route.query);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.DetailTask {
  position: absolute;
  top: 0;
  right: -20px;
  width: 69.96%;
  height: 100%;
  border: 1px solid red;
  background: red;
}

</style>