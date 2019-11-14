<template>
  <section id="schedule">
    <el-row>
      <el-col class="main-calendar">
        <el-calendar v-model="value">
          <el-row slot="dateCell" slot-scope="{date, data}">
            <!-- 展示最上面那行的日期样式 -->
            <el-col :span="24">
            <p :class="data.isSelected ? 'is-selected' : ''">  
              {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
            </p>
            </el-col>

            <!-- 展示对应的任务列表 -->
            <el-col :span="24" v-for="task in showCellTaskList(data)" @click.native="selectTask(task)">{{task.taskName}}</el-col>
          </el-row>
        </el-calendar>
      </el-col>

      <el-col>
        <transition name="task" mode="out-in">
          <router-view @reloadHome="reloadHome" v-if="isRouterAlive"/>
        </transition>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'schedule',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      // value: new Date(),
      value: new Date(),
      taskList: [],
      isRouterAlive: true,
    }
  },
  props: ['projectInfo'], // 这个组件里面，projectInfo唯一的作用就是读取项目id出来，然后来获取任务列表，在项目id可以获取的情况下，这个是多余的
  created() {
    console.log('进来calendar了');
    this.getTaskList(); 
  },
  methods: {
    getTaskList() { // 所有的获取任务列表的请求。这里用了一个函数形参默认值
        this.$ajax.get('task/list', {
        params: {
            start: 0,
            size: 300,
            sorters: {"column":"last_Update","direction":"desc"},
            task_type: 0,
            status: "running"
        }
        }).then((res) => {
            let resData = res.data;
            sessionStorage.setItem('taskResList',JSON.stringify(resData)); // 弄成json字符串存数据到sessionStorage里面
            this.taskList = resData.list;
        });
    },
    showCellTaskList(data) { // 展示单元格里面的所有任务
      let cellDate = new Date(data.day),
          taskArr = [];
      this.taskList.forEach((value,index,arr) => {
          let taskDate = new Date(value.endDate),
              year1 = taskDate.getFullYear(),
              month1 = taskDate.getMonth() + 1,
              day1 = taskDate.getDate(),
              year2 = cellDate.getFullYear(),
              month2 = cellDate.getMonth() + 1,
              day2 = cellDate.getDate();
          if (year1 == year2 && month1 == month2 && day1 == day2) {
            let temp = {
              taskId: value.id,
              taskName: value.name
            };
            taskArr.push(temp);
          }
      });
        return taskArr;
    },
    selectTask(task) { // 表格数据被点击，切换为详细任务信息
      this.reload();
      this.$router.push('/schedule/' + task.taskId);
    },
    reload () {
     this.isRouterAlive = false;
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
.is-selected {
    color: #1989FA;
}
.el-calendar {
  overflow: hidden;
}
.main-calendar .el-calendar .el-row .el-col:nth-of-type(1)~.el-col {
  color: red;
}
.main-calendar .el-calendar .el-row .el-col:nth-of-type(1)~.el-col:hover {
  transition: 1s;
  background: #1989FA;
}
</style>
<style>
/* #projectCalendar .el-calendar .el-calendar-table__row td .el-calendar-day{
  width: 200px;
  height: 200px;
  background: red;
} */
#schedule .el-calendar .el-calendar-table__row td .el-calendar-day {
  height: 80px;
  overflow: hidden;
}
#schedule .el-calendar .el-calendar-table__row td .el-calendar-day:hover {
  overflow: auto;
}
</style>