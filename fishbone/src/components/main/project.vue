<template>
  <el-container id="project">
    <!-- 项目头部 -->
    <el-header class="projectHeader" height="50px">
      <el-button-group>
        <el-button :class="btnColorChange(btn) ? 'btnActiveColor' : 'btnBaseColor'" @click="selectProjectType(btn)" type="primary" size="mini" round autofocus v-for="btn in btnValue">{{btn.btnName}}</el-button>
      </el-button-group>
    </el-header>

    <!-- 项目主体区 -->
    <el-main class="main-table">
      <el-table @row-click="selectProject" :data="projectList" stripe highlight-current-row height="590"> 
          <el-table-column :fixed="true" type="index" label="序号" width="50"></el-table-column>
          <el-table-column :fixed="col.fixed" v-for="col in tableCol" :label="col.label" :prop="col.prop" :min-width="col.width"></el-table-column>
      </el-table>
      <el-pagination @current-change="changePage" :current-page="currentPage" layout="jumper,prev,pager, next,total" :total="count" :page-size="20"></el-pagination>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'project',
  data () {
    return {
      msg: '开始游戏',
      btnValue: [{btnName: '进行中', isSelect: true},{btnName: '完成', isSelect: false},{btnName: '全部', isSelect: false}], // 上面的几个按钮的名字
      status: 'running',
      sorters: {"column":"last_Update","direction":"desc"},
      currentPage: 1,
      projectList: [],
      count: 100, // 所有数据的总数
      tableCol: [{prop: 'name',label: '名称',width: '280',fixed: true},{prop: 'code',label: '编号',width: '80'},{prop: 'pm.name',label: '负责人',width: '80'},{prop: 'startDate',label: '开始',width: '100'},{prop: 'endDate',label: '结束',width: '100'},{prop: 'percent',label: '进度',width: '80'},{prop: 'type',label: '类型',width: '80'},{prop: 'last_comment',label: '最新进展',width: '800'}],
      dsada: ''
    }
  },
  created() {
    this.getProjectList();
  },
  methods: {
    getProjectList(status = this.status, sorters = this.sorters, currentPage = this.currentPage) { // 所有的获取任务列表的请求。这里用了一个函数形参默认值
      // http://192.168.43.146:8080/fish_boom/proj/listProj
      this.$ajax.get('proj/list', {
        params: {
          start: currentPage,
          size: 20,
          sorters: sorters,
          status: status
        }
      }).then((res) => {
        console.log('这里是获取项目列表的所有返回值',res);
        let resData = res.data;
        sessionStorage.setItem('projectResList',JSON.stringify(resData)); // 弄成json字符串存数据到sessionStorage里面
        this.projectList = resData.list;
        this.count = resData.total;
      });
    },
    btnColorChange(btn) { // 改变btn颜色
      return btn.isSelect;
    },
    selectProjectType(btn) { // 头部按钮被点击时触发，选择任务对应的类型
      this.btnValue.forEach((value,index,arr) => {
        value.isSelect = false; // 先要把所有的按钮颜色清空
        if (value.btnName == btn.btnName) {
          value.isSelect = true;
        }
      });
      this.currentPage = 1; // 重置分页
      if (btn.btnName == "进行中") {this.status = 'running';}
      if (btn.btnName == "完成") {this.status = 'finish';}
      if (btn.btnName == "全部") {this.status = 'all';}
      this.getProjectList();
    },
    changePage(index) { // 页码切换
      this.currentPage = index;
      this.getProjectList();
    },
    selectProject(row, column, event) { // 表格数据被点击，切换为详细项目信息
      console.log('选中项目行之后，row的值为',row);
      this.$router.push('/DetailProject/' + row.id + '/projectPreview');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#project {
  margin: -20px;
}
.projectHeader {
  line-height: 50px;
  text-align: left;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: rgb(255,255,255);
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

/* 项目表格 */
.main-table {
  width: 100%;
  height: 690px;
}
.el-table {
  width: 100%;
  overflow: auto !important;
}

.el-pagination {
  height: 30px;
  padding: 10px 0;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
<style>
#project .main-table .el-table__row td { /* 重置所有表格的cell的padding */
  padding: 0;
  cursor: pointer;
}
#project .main-table .el-table__header th { /* 重置所有表格header的cell的padding */
  padding: 0;
  background: rgb(249,249,249);
}
#project .main-table .cell { /* 重置所有表格的cell的高度*/
  height: 65px;
  line-height: 65px;
}
#project .main-table .el-table__header .cell {/* 重置所有表格header的cell的高度*/
  height: 40px;
  line-height: 40px;
}
#project .main-table .el-table__row { /* 使表格出现横向条 */
  overflow: auto;
}
</style>