<template>
    <el-aside class="left-side" width="13.41%">
      <!-- 菜单部分 -->
      <el-main>
        <el-row type="flex" justify="start" align="middle">
          <el-col :span="10"><div><i class="el-icon-fork-spoon"></i></div></el-col>
        </el-row>
        <el-menu class="main-menu" default-active="/home" background-color="rgb(244,244,244)" text-color="#2c3e50" :router="true">
          <el-menu-item index="/home"><i class="el-icon-s-home"></i>首页</el-menu-item>
          <el-menu-item index="/task"><i class="el-icon-s-order"></i>任务</el-menu-item>
          <el-menu-item index="/project"><i class="el-icon-s-cooperation"></i>项目</el-menu-item>
          <el-menu-item index="4"><i class="el-icon-date"></i>日程</el-menu-item>
        </el-menu>
        <el-divider class="menu-divider"></el-divider>
      </el-main>


      <el-footer>
        <el-avatar>我</el-avatar>
      </el-footer>
    </el-aside>
</template>

<script>
export default {
  name: 'leftMenu',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left-side .el-main, .left-side .el-footer {
    padding: 0;
}
.el-aside {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background-color: rgb(244,244,244);
}

.el-row {
    height: 42px;
}
.el-icon-fork-spoon {
    font-size: 30px;
    color: red;
}


.el-menu-item:hover, .el-menu-item.is-active{ /* 这里这个样式，.el-menu-item.is-active，用来设置菜单被选中时候的颜色 */ 
  background-color: #fff !important;
}
.el-menu-item {
    height: 40px;
    line-height: 40px;
    text-align: left;
}
/* 下面几个为字体图标样式 */
.el-icon-s-home {
  color: rgb(0,176,255);
}
.el-icon-s-order {
  color: rgb(106,200,90);
}
.el-icon-s-cooperation {
  color: rgb(255,89,85);
}
.el-icon-date {
  color: rgb(110,225,223);
}
.el-menu-item [class^=el-icon-] {
  margin-right: 15px;
  margin-top: -3px;
  font-size: 21px;
}
.menu-divider {
    width: 89.32%;
    height: 0;
    margin: 0 0 0 10.67%;
    border-top: 1.5px solid #e9e9e9;
    border-bottom: 1.5px solid #fff;
}

.el-footer {
  width: 13.41%;
  position: fixed;
  bottom: 0;
  text-align: left;
  border-top: 1px solid #e9e9e9;
}
.el-avatar {
  width: 30px;
  height: 30px;
  line-height: 30px;
  margin: 13px 0 0 20px;
  font-size: 14px;
  text-align: center;
  background: rgb(103,202,255);
}
</style>