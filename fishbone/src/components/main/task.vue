<template>
  <el-container id="task">
    <!-- 任务头部 -->
    <el-header class="taskHeader" height="50px">
      <el-button-group>
        <el-button type="primary" size="mini" round autofocus v-for="btn in btnValue">{{btn.btnName}}</el-button>
      </el-button-group>
    </el-header>

    <!-- 任务主体区 -->
    <el-main>
      <el-row class="taskMain">
        <!-- 整个任务列表 -->
        <el-col :span="6" class="task-task-list">
          <!-- 整个任务列表的头部 -->
          <el-row>
            <el-col :span="12">
              <el-select size="mini" v-model="value" placeholder="请选择">
                <el-option v-for="value in options" :value="value"></el-option>
              </el-select>
            </el-col>
            <el-col :span="12">
              <el-select size="mini" v-model="value" placeholder="请选择">
                <el-option v-for="value in options" :value="value"></el-option>
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
      dsa: 'dsa',
      taskList: [],
      isRouterAlive: true
      }
  },
  created() {
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
      sessionStorage.setItem('taskResList',JSON.stringify(resData)); // 弄成json字符串存数据到sessionStorage里面
      this.taskCount = resData.count;
      this.taskList = resData.list;
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
    },
    reload () {
      console.log(this.isRouterAlive);
     this.isRouterAlive = false;
     console.log(this.isRouterAlive);
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
  border: 1px solid red;
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