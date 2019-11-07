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

      <el-col><router-view v-if="isRouterAlive"/></el-col>
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
      value: '2019-5',
      taskList: [],
      isRouterAlive: true,
    }
  },
  props: ['projectInfo'], // 这个组件里面，projectInfo唯一的作用就是读取项目id出来，然后来获取任务列表，在项目id可以获取的情况下，这个是多余的
  created() {
    console.log('进来projectCalendar了');
    this.getTaskList(); 
  },
  methods: {
    getTaskList() { // 所有的获取任务列表的请求。这里用了一个函数形参默认值
      this.url = 'http://rap2api.taobao.org/app/mock/232839/task/task_list.json' + this.$route.params.proId;
    //   this.$ajax.get('http://rap2api.taobao.org/app/mock/232839/task/task_list.json', { // 这里是应该用this.url的
    //   }).then((res) => {
    //     let resData = res.data;
    //     sessionStorage.setItem('taskResList',JSON.stringify(resData)); // 弄成json字符串存数据到sessionStorage里面
    //     this.taskList = resData.list;
    //   });
        this.$ajax.get('http://172.26.142.82:8080/fish_boom/task/list', {
        params: {
            start: 0,
            size: 30,
            sorters: {"column":"last_up_date","direction":"desc"},
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
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.is-selected {
    color: #1989FA;
}
.el-calendar {
  overflow: hidden;
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
#projectCalendar .el-calendar .el-calendar-table__row td .el-calendar-day {
  height: 80px;
  overflow: hidden;
}
#projectCalendar .el-calendar .el-calendar-table__row td .el-calendar-day:hover {
  overflow: auto;
}
</style>