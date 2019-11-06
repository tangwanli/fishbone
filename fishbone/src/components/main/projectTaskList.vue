<template>
  <section id="projectTaskList">
    <el-row>
      <el-col class="main-task-table">
        <el-table @row-click="selectTask" :data="projectTaskList" border highlight-current-row height="650"> 
          <el-table-column :fixed="true" type="index" label="序号" width="50"></el-table-column>
          <el-table-column :fixed="col.fixed" v-for="col in tableCol" :label="col.label" :prop="col.prop" :min-width="col.width" sortable="true"></el-table-column>
        </el-table>
      </el-col>

      <el-col><router-view v-if="isRouterAlive"/></el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'projectTaskList',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      projectTaskList: [], // 核心还是这个变量，来显示所以的数据
      url: '',
      tableCol: [{prop: 'task_name',label: '任务名',width: '280',fixed: true},{prop: 'code',label: '编号',width: '80'},{prop: 'manager.nick_name',label: '负责人',width: '80'},{prop: 'plan_start_date',label: '开始',width: '100'},{prop: 'plan_end_date',label: '结束',width: '100'},{prop: 'priority',label: '优先级',width: '80'},{prop: 'progress_percent',label: '进度',width: '80'},{prop: 'content',label: '内容简介',width: '800'}],
      isRouterAlive: true,
    }
  },
  props: ['projectInfo'], // 这个组件里面，projectInfo唯一的作用就是读取项目id出来，然后来获取任务列表，在项目id可以获取的情况下，这个是多余的
  created() {
    console.log('进来projectTaskList了');
    this.getProjectTaskList(); 
  },
  methods: {
    getProjectTaskList() { // 所有的获取任务列表的请求。这里用了一个函数形参默认值
      this.url = 'http://rap2api.taobao.org/app/mock/232839/task/task_list.json' + this.$route.params.proId;
      this.$ajax.get('http://rap2api.taobao.org/app/mock/232839/task/task_list.json', { // 这里是应该用this.url的
      }).then((res) => {
        let resData = res.data;
        sessionStorage.setItem('taskResList',JSON.stringify(resData)); // 弄成json字符串存数据到sessionStorage里面
        this.projectTaskList = resData.list;
        console.log(this.projectTaskList,this.$route.params.proId);
      });
    },
    selectTask(row, column, event) { // 表格数据被点击，切换为详细任务信息
      this.reload();
      this.$router.push('/DetailProject/' + this.$route.params.proId + '/projectTaskList/' + row.task_id);
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
#projectTaskList {
  position: relative;
}
/* 项目表格 */
.main-task-table {
  width: 100%;
  height: 650px;
}
.el-table {
  width: 100%;
}
</style>
<style>
#projectTaskList .main-task-table .el-table__row td { /* 重置所有表格的cell的padding */
  padding: 0;
  cursor: pointer;
}
#projectTaskList .main-task-table .el-table__header th { /* 重置所有表格header的cell的padding */
  padding: 0;
  background: rgb(249,249,249);
}
#projectTaskList .main-task-table .cell { /* 重置所有表格的cell的高度*/
  height: 30px;
  line-height: 30px;
}
#projectTaskList .main-task-table .el-table__header .cell {/* 重置所有表格header的cell的高度*/
  height: 42px;
  line-height: 42px;
}
#projectTaskList .main-task-table .el-table__row { /* 使表格出现横向条 */
  overflow: auto;
}
</style>