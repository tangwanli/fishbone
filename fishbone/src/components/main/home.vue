<template>
  <el-row class="home">
    <!-- 任务 -->
    <el-col :span="6" class="home-task-list">
      <header>待办 [ {{taskCount}} ]</header>
      <el-menu background-color="#fff" text-color="#2c3e50" :router="true">
        <el-menu-item :index="'/home/' + item.task_id" v-for="item in taskList">
          <div class="first-line">
            <span>{{item.task_name}}</span>
            <span :class="isOverDue(item.plan_end_date) ? 'baseColor' : 'redColor'">{{item.plan_end_date}}</span>
          </div>
        </el-menu-item>
      </el-menu>
    </el-col>
    <!-- 项目 -->
    <el-col :span="6" class="home-project-list">
      <header>项目 [ {{projectList.count}} ]</header>
      <el-menu background-color="#fff" text-color="#2c3e50">
        <el-menu-item index="1" v-for="item in projectList">
          <div class="first-line">
            <span>{{item.name}}</span>
            <span>{{item.percent}}</span>
          </div>
          <div class="second-line">
            <span>{{item.manager.nick_name}}</span>
            <span :class="isOverDue(item.plan_end_date) ? 'baseColor' : 'redColor'">{{item.plan_end_date}}</span>
          </div>
        </el-menu-item>
      </el-menu>
    </el-col>
    
    <router-view/>
  </el-row>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      taskCount: 1,
      taskList: [],
      projectCount: 1,
      projectList: []
    }
  },
  created() {
    // 获取任务列表
    this.$ajax.get('http://rap2api.taobao.org/app/mock/232839/task/task_list.json', {
      params: {
        start: 0,
        limit: 30,
        sorters: {"column":"last_up_date","direction":"desc"},
        task_type: 1,
        status: "running"
      }
    }).then((res) => {
      let resData = res.data;
      this.taskCount = resData.count;
      this.taskList = resData.list;
    });
    // 获取项目列表
    this.$ajax.get('http://rap2api.taobao.org/app/mock/232839/project/project_list.json', {
      params: {
        sorters: {"column":"last_up_date","direction":"desc"},
        limit: 20,
        start: 0,
        status: 'all'
      }
    }).then((res) => {
      let resData = res.data;
      this.projectCount = resData.count;
      this.projectList = resData.list;
    });
  },
  methods: {
    isOverDue(time) {
      let state = false;
      if (new Date(time).getTime() > Date.now()) {
        state = true;
      } else {
        state = false;
      }
      return state;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home > .el-col {
  margin: 0 15px 0 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
header {
  height: 40px;
  line-height: 40px;
  text-indent: 20px;
  text-align: left;
  border-bottom: 1px solid #e9e9e9;
}
.el-menu {
  overflow: auto;
  width: 90%;
  position:relative;
  left: 0;
  right: 0;
  padding-bottom: 20px;
  margin: auto;
  border-right: none;
}
.home-task-list .el-menu {
  height: 640px;
}
.home-project-list .el-menu {
  height: 300px;
}
.el-menu-item {
  position: relative;
  height: 80px;
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e9e9e9;
}
.first-line {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.home-project-list .first-line {
  position: relative;
  top: -15px;
}
.baseColor {
  color: #909090;
}
.redColor {
  color: red;
}
.second-line {
  position: absolute;
  bottom: -10px;
  left: 10%;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: #909090;
}
.second-line span {
  font-size: 12px;
  color: #909090;
}
.el-menu-item:hover, .el-menu-item.is-active{ /* 这里这个样式，.el-menu-item.is-active，用来设置菜单被选中时候的颜色 */ 
  background-color: rgb(241,248,254) !important;
}
</style>