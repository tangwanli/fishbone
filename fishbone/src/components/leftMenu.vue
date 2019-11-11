<template>
    <el-aside class="left-side" width="13.41%">
      <!-- 菜单部分 -->
      <el-main>
        <el-row type="flex" justify="start" align="middle">
          <el-col :span="10"><div><i class="el-icon-fork-spoon"></i></div></el-col>
        </el-row>
        <el-menu class="main-menu" default-active="/home" background-color="rgb(244,244,244)" text-color="#2c3e50" :router="true">
          <el-menu-item index="/home"><i class="el-icon-s-home"></i>首页</el-menu-item>
          <el-menu-item index="/task"><i class="el-icon-s-order"></i>任务<i @click="controlAddTask" class="el-icon-plus el-icon--right add-btn"></i></el-menu-item>
          <el-menu-item index="/project"><i class="el-icon-s-cooperation"></i>项目<i @click="controlAddProject" class="el-icon-plus el-icon--right add-btn"></i></el-menu-item>
          <el-menu-item index="/schedule"><i class="el-icon-date"></i>日程</el-menu-item>
          <el-menu-item index="/register"><i class="el-icon-coordinate"></i>注册</el-menu-item>
        </el-menu>
        <section v-if="addTaskBoxVisible">
          <addTaskBox @reloadHome="reloadHome" :addTaskBoxVisible="addTaskBoxVisible" @closeAddTask="closeAddTask"></addTaskBox>
        </section>
        <section v-if="addProjectBoxVisible">
          <addProjectBox @reloadHome="reloadHome" :addProjectBoxVisible="addProjectBoxVisible" @closeAddProject="closeAddProject"></addProjectBox>
        </section>
        <el-divider class="menu-divider"></el-divider>
      </el-main>


      <el-footer>
        <el-row>
          <el-col :span="12"><el-avatar>{{userName}}</el-avatar></el-col>
          <el-col :span="12"><i @click="logout" class="el-icon-switch-button logout"></i></el-col>
        </el-row>
      </el-footer>
    </el-aside>
</template>

<script>
import addTaskBox from '@/components/addTaskBox'
import addProjectBox from '@/components/addProjectBox'

export default {
  name: 'leftMenu',
  data () {
    return {
      addTaskBoxVisible: false,
      addProjectBoxVisible: false,
      userName: ''
    }
  },
  created() {
    let username = sessionStorage.getItem('userName'),
        len = username.length - 1;
        this.userName = username.charAt(len);
  },
  methods: {
    controlAddTask() {
      this.addTaskBoxVisible = true;
      console.log(this.addTaskBoxVisible);
    },
    closeAddTask() { // 关闭添加任务的dialog
      this.addTaskBoxVisible = false;
    },
    controlAddProject() {
      this.addProjectBoxVisible = true;
      console.log(this.addProjectBoxVisible);
    },
    closeAddProject() { // 关闭添加项目的dialog
      this.addProjectBoxVisible = false;
    },
    logout() { // 注销
      console.log('进入logout');
      this.$emit('logOut');
    },
    reloadHome () {
     this.$emit('reloadHome2');
     console.log('进入reload2');
   }
  },
  components: {
    addTaskBox,
    addProjectBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left-side .el-main, .left-side .el-footer {
    padding: 0;
}
.el-aside {
  position: relative;
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


.el-menu-item:hover, .el-menu-item.is-active { /* 这里这个样式，.el-menu-item.is-active，用来设置菜单被选中时候的颜色 */ 
  background-color: #fff !important;
}
.el-menu-item {
    position: relative;
    height: 40px;
    line-height: 40px;
    text-align: left;
    transition: 1s;
}
.add-btn {       /* 两个加号按钮 */
  position: absolute;
  right: 0;
  line-height: 40px;
  font-size: 16px;
  transition: 1s;
}
.add-btn:hover {
  transform: rotate(-90deg) scale(1.2);
  color: red;
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
.logout {
  width: 30px;
  height: 30px;
  line-height: 30px;
  margin: 13px 0 0 20px;
  font-size: 14px;
  text-align: center;
  background: rgb(103,202,255);
  border-radius: 50%;
  cursor: pointer;
  transition: 1s;
}
.logout:hover {
  color: red;
  box-shadow: 0 2px 12px 0 red;
}
</style>