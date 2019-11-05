<template>
  <el-container id="DetailProject">
    <el-header class="projectHeader" height="50px">
      <el-row type="flex" justify="start">
        <el-col :span="21">
          <el-button-group>
            <el-button :class="btnColorChange(btn) ? 'btnActiveColor' : 'btnBaseColor'" @click="selectTaskType(btn)" type="primary" size="mini" round autofocus v-for="btn in btnValue">{{btn.btnName}}</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="3"><el-button @click="deleteProject" size="mini" type="danger" :round="true" plain>删除项目</el-button></el-col>
      </el-row>
    </el-header>

    <el-main>
      <router-view :projectInfo="projectInfo"/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'DetailProject',
  data () {
    return {
      msg: '开始游戏',
      btnValue: [{btnName: '概况', isSelect: true},{btnName: '甘特图', isSelect: false},{btnName: '任务列表', isSelect: false},{btnName: '日历', isSelect: false},{btnName: '文档', isSelect: false}], // 上面的几个按钮的名字
      projectInfo: [],
      projectId: '1',
      url: ''
    }
  },
  created() {
    let resData = JSON.parse(sessionStorage.getItem('projectResList')),
        projectList = resData.list;
    this.projectId = this.$route.params.proId;
    this.url = '/project/modify.json/' + this.$route.params.proId;
    projectList.find((value,index,arr) => { // 找到对应的任务
      if (value.project_id == this.projectId) {
        this.projectInfo = value;
        return true;
      }
    });
  },
  methods: {
    btnColorChange(btn) { // 改变btn颜色
      return btn.isSelect;
    },
    selectTaskType(btn) { // 头部按钮被点击时触发，选择任务对应的类型
      this.btnValue.forEach((value,index,arr) => {
        value.isSelect = false; // 先要把所有的按钮颜色清空
        if (value.btnName == btn.btnName) {
          value.isSelect = true;
        }
      });
      let childPath = 'projectPreview';
      if (btn.btnName == "概况") {childPath = 'projectPreview';}
      if (btn.btnName == "甘特图") {childPath = 'projectChart';}
      if (btn.btnName == "任务列表") {childPath = 'projectTaskList';}
      if (btn.btnName == "日历") {childPath = 'projectCalendar';}
      if (btn.btnName == "文档") {childPath = 'projectDoc';}
      this.$router.push('/DetailProject/' + this.projectId + '/' + childPath);
    },
    deleteProject() { // 删除项目
      let path = '/project';
      this.$router.push(path);
      this.$ajax.delete(this.url);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#DetailProject {
  margin: -20px;
}
.projectHeader {
  line-height: 50px;
  text-align: left;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: rgb(255,255,255);
}
.projectHeader .el-col {
  text-align: left;
}
.projectHeader .el-button {
  border: 1px solid rgb(238,238,238);
  transition: 1s;
}
.projectHeader .el-button:hover {
  background: rgb(241,241,241);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.btnBaseColor {
  background: rgb(255,255,255);
}
.btnActiveColor {
  background: rgb(103,167,246);
}
</style>