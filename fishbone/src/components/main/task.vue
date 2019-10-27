<template>
  <el-container id="task">
    <!-- 任务头部 -->
    <el-header class="taskHeader" height="50px">
      <el-button-group>
        <el-button :class="btnColorChange(btn) ? 'btnActiveColor' : 'btnBaseColor'" @click="selectTaskType(btn)" type="primary" size="mini" round autofocus v-for="btn in btnValue">{{btn.btnName}}</el-button>
      </el-button-group>
    </el-header>

    <!-- 任务主体区 -->
    <el-main>
      <el-row class="taskMain">
        <!-- 整个任务列表 -->
        <el-col :span="6" class="task-task-list">
          <!-- 整个任务列表的头部 -->
          <el-row type="flex" justify="space-between">
            <el-col :span="8">
              <el-select size="mini" @change="changeTaskStatus" v-model="taskStatus" placeholder="请选择">
                <el-option v-for="status in taskStatusArr" :value="status"></el-option>
              </el-select>
            </el-col>
            <el-col :span="11">
              <el-select size="mini" @change="changeTaskSorters" v-model="taskSorters" placeholder="请选择">
                <el-option v-for="sorters in taskSortersArr" :value="sorters"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <!-- 整个任务列表的列表部分 -->
          <el-menu background-color="#fff" text-color="#2c3e50" :router="true">
            <el-menu-item @click="reload" :index="'/task/' + item.task_id" v-for="item in taskList">
              <div class="first-line">
                <span>{{item.task_name}}</span>
                <span :class="isOverDue(item.plan_end_date) ? 'baseColor' : 'redColor'">{{item.plan_end_date}}</span>
              </div>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="18"><router-view v-if="isRouterAlive"/></el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'task',
  data () {
    return {
      msg: '开始游戏',
      btnValue: [{btnName: '我负责', isSelect: true},{btnName: '我创建', isSelect: false},{btnName: '抄送我的', isSelect: false},{btnName: '全部', isSelect: false}], // 上面的几个按钮的名字
      taskStatusArr: ['进行中','完成','全部'],
      taskStatus: '进行中',
      taskSortersArr: ['按最后更新时间','按到期时间','按分级'],
      taskSorters: '按最后更新时间',
      task_type: 1, // 当前任务的类型
      status: 'running', // 当前任务状态
      sorters: {"column":"last_up_date","direction":"desc"}, // 当前任务的排序方式
      taskList: [],
      isRouterAlive: true
    }
  },
  created() {
    this.getTaskList();
  },
  methods: {
    getTaskList(task_type = this.task_type, status = this.status, sorters = this.sorters) { // 所有的获取任务列表的请求。这里用了一个函数形参默认值
      this.$ajax.get('http://rap2api.taobao.org/app/mock/232839/task/task_list.json', {
        params: {
          start: 0,
          limit: 30,
          sorters: sorters,
          task_type: task_type,
          status: status
        }
      }).then((res) => {
        let resData = res.data;
        sessionStorage.setItem('taskResList',JSON.stringify(resData)); // 弄成json字符串存数据到sessionStorage里面
        this.taskCount = resData.count;
        this.taskList = resData.list;
      });
    },
    isOverDue(time) {
      let state = false;
      if (new Date(time).getTime() > Date.now()) {
        state = true;
      } else {
        state = false;
      }
      return state;
    },
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
      this.taskStatus = '进行中'; // 重置样式
      this.taskSorters = '按最后更新时间';
      if (btn.btnName == "我负责") {this.task_type = 1;}
      if (btn.btnName == "我创建") {this.task_type = 2;}
      if (btn.btnName == "抄送我的") {this.task_type = 3;}
      if (btn.btnName == "全部") {this.task_type = 0;}
      this.status = 'running'; // 点了头部按钮之后，需要把任务的状态重置和任务排序方式清空
      this.sorters = {"column":"last_up_date","direction":"desc"};
      this.getTaskList();
    },
    changeTaskStatus(taskStatus) { // 修改任务状态
      if (taskStatus == '进行中') {this.status = 'running'}
      if (taskStatus == '完成') {this.status = 'finish'}
      if (taskStatus == '全部') {this.status = 'all'}
      this.getTaskList();
    },
    changeTaskSorters(taskSorters) { // 修改任务状态
      if (taskSorters == '按最后更新时间') {this.sorters = {"column":"last_up_date","direction":"desc"}}
      if (taskSorters == '按到期时间') {this.sorters = {"column":"plan_end_date","direction":"desc"}}
      if (taskSorters == '按分级') {this.sorters = {"column":"priority","direction":"desc"}}
      this.getTaskList();
    },
    reload () {
     this.isRouterAlive = false;
     this.$nextTick(() => (this.isRouterAlive = true));
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#task {
  margin: -20px;
}
.taskHeader {
  line-height: 50px;
  text-align: left;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: rgb(255,255,255);
}
.taskHeader .el-button {
  border: 1px solid rgb(238,238,238);
  transition: 1s;
}
.taskHeader .el-button:hover {
  background: rgb(241,241,241);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.btnBaseColor {
  background: rgb(255,255,255);
}
.btnActiveColor {
  background: rgb(103,167,246);
}

/* 任务列表 */
.taskMain {
  background: rgb(255,255,255);
}
.task-task-list > .el-row {
  height: 28px;
  padding: 5px;
  margin: 10px;
}
/* 下面一些为从home.vue拿过来的样式 */
.el-menu {
  overflow: auto;
  width: 90%;
  position:relative;
  left: 0;
  right: 0;
  padding-bottom: 20px;
  margin: auto;
  border: 1px solid #e9e9e9;
}
.task-task-list .el-menu {
  height: 640px;
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
.el-menu-item:hover, .el-menu-item.is-active{ /* 这里这个样式，.el-menu-item.is-active，用来设置菜单被选中时候的颜色 */ 
  background-color: rgb(241,248,254) !important;
}
.baseColor {
  color: #909090;
}
.redColor {
  color: red;
}
/* 上面这些为从home.vue拿过来的样式 */
</style>