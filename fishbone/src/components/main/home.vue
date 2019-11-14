<template>
  <el-row class="home">
    <!-- 任务 -->
    <el-col :span="6" class="home-task-list">
      <header>任务 [ {{taskCount}} ]</header>
      <el-menu background-color="#fff" text-color="#2c3e50" :router="true">
        <el-menu-item @click="reload" :index="'/home/' + item.id" v-for="item in taskList">
          <div class="first-line">
            <span>{{item.name}}</span>
            <span :class="isOverDue(item.endDate) ? 'baseColor' : 'redColor'">{{item.endDate}}</span>
          </div>
        </el-menu-item>
      </el-menu>
    </el-col>
    <!-- 项目 -->
    <el-col :span="6" class="home-project-list">
      <header>项目 [ {{projectCount}} ]</header>
      <el-menu background-color="#fff" text-color="#2c3e50" :router="true">
        <el-menu-item  :index="'/DetailProject/' + item.id + '/projectPreview'" v-for="item in projectList">
          <div class="first-line">
            <span>{{item.name}}</span>
            <span>{{item.percent}}</span>
          </div>
          <div class="second-line">
            <span class="baseColor">{{item.pm.name}}</span>
            <span :class="isOverDue(item.endDate) ? 'baseColor' : 'redColor'">{{item.endDate}}</span>
          </div>
        </el-menu-item>
      </el-menu>
    </el-col>
    <!-- 动态 -->
    <el-col :span="6" class="home-project-list">
      <header>动态 [ {{dynamicCount}} ]</header>
      <el-menu background-color="#fff" text-color="#2c3e50" :router="true" style="height: 640px">
        <el-menu-item  :index="dynamicRout(item)" v-for="item in dynamicList">
          <div class="first-line">
            <span>{{item.type}}: {{item.subject_name}}</span>
            <span>{{item.creatTime}}</span>
          </div>
          <div class="second-line">
            <span class="baseColor">{{item.creator}}: {{item.content}}</span>
            <span></span>
          </div>
        </el-menu-item>
      </el-menu>
    </el-col>
    
    <transition name="task" mode="out-in">
      <router-view @reloadHome="reloadHome" v-if="isRouterAlive"/>
    </transition>
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
      projectList: [],
      dynamicCount: 1,
      dynamicList: [],
      isRouterAlive: true,
      isRouterAlive2: true
    }
  },
  created() {
    // 获取任务列表
    // http://172.26.142.82:8080/fish_boom/getCaptcha
    this.$ajax.get('task/list', {
      params: {
        start: 1,
        size: 30,
        sorters: {"column":"last_Update","direction":"desc"},
        task_type: 0,
        status: "all"
      }
    }).then((res) => {
      let resData = res.data;
      sessionStorage.setItem('taskResList',JSON.stringify(resData)); // 弄成json字符串存数据到sessionStorage里面
      this.taskCount = resData.count;
      this.taskList = resData.list;
    });
    // 获取项目列表
    this.$ajax.get('proj/list', {
      params: {
        sorters: {"column":"last_Update","direction":"desc"},
        size: 20,
        start: 1,
        status: 'all'
      }
    }).then((res) => {
      let resData = res.data;
      sessionStorage.setItem('projectResList',JSON.stringify(resData));
      this.projectCount = resData.count;
      this.projectList = resData.list;
    });
    // 获取动态
    this.$ajax.get('opera/list', {
    }).then((res) => {
      let resData = res.data;
      this.dynamicCount = resData.count;
      this.dynamicList = resData.list;
    });
  },
  methods: {
    isOverDue(time) { // 判断任务时间是否过期
      let state = false;
      if (new Date(time).getTime() > Date.now()) {
        state = true;
      } else {
        state = false;
      }
      return state;
    },
    dynamicRout(item) { // 判断对应的动态是任务的还是项目的
      let rout = (item.pid == null) ? ('/home/' + item.tid) : ('/DetailProject/' + item.pid + '/projectPreview');
      return rout;
    },
    reload () {
      console.log(this.isRouterAlive);
     this.isRouterAlive = false;
     console.log(this.isRouterAlive);
     this.$nextTick(() => (this.isRouterAlive = true));
   },
   reloadHome () {
     this.$emit('reloadHome2');
     console.log('进入reload2');
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 组件过渡动画 */
.task-leave {
  opacity: 1;
  transform: translateX(0px);
}
.task-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.task-leave-active {
  transition: 0.7s;
}
.task-enter {
  transform: translateX(100%);
  opacity: 0;
}
.task-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.task-enter-active {
  transition: 0.7s;
}

/* 其余 */
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
  height: 500px;
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
}
.el-menu-item:hover, .el-menu-item.is-active{ /* 这里这个样式，.el-menu-item.is-active，用来设置菜单被选中时候的颜色 */ 
  background-color: rgb(241,248,254) !important;
}
.baseColor {
  color: #909090;
}
.redColor {
  color: red;
}
</style>