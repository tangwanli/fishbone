<template>
  <el-container id="DetailTask">
    <el-header height="26px">
      <el-row class="task-header" type="flex" justify="space-between">
        <el-col :span="21" class="task-title">{{taskInfo.code}} {{taskInfo.task_name}}</el-col>
        <el-col :span="3" class="task-btn"><el-button @click="deleteTask" size="mini" type="danger" :round="true" plain>删除任务</el-button><i @click="closeTask" class="el-icon-close"></i></el-col>
      </el-row>
    </el-header>

    <!-- 整个任务的主内容区 -->
    <el-main class='task-main'>
      <div class="main-header">
        <el-row type="flex" justify="flex-start">
          <el-col :span="6">
            负责人：<span class="selectIt" @click="controlBoxShow('manager')">{{managerName[0]}}</span>
            <!-- 注，这里删了个 :active="activeName"，不知道这个是干嘛的，所以删了 -->
            <searchBox @cancelBox="cancelBox" v-if="isManagerShowBox" :tag2="managerName" aimPosition="manager" class="searchBox" @changeSearch="changeSearchInfo"></searchBox>
          </el-col>
          <el-col :span="18">抄送人：
            <el-tag  @click.native="controlBoxShow('cc_member')" class="selectIt" v-for="tagName in ccMembers" closable size="mini" @close="closeTag(tagName)">{{tagName}}</el-tag>
            <searchBox @cancelBox="cancelBox" v-if="isCcShowBox" :tag2="ccMembers" aimPosition="cc_member" class="searchBox" @changeSearch="changeSearchInfo"></searchBox>
          </el-col>
        </el-row>
        <el-row type="flex" justify="flex-start" class="second-row">
          <el-col :span="12" class="taskDate">时间：
            <el-date-picker v-model="plan_start_date" @change="changeStartDate" type="date" size="mini" placeholder="选择日期" :clearable="false" :editable="false"></el-date-picker>
            至
            <el-date-picker v-model="plan_end_date" @change="changeEndDate" type="date" size="mini" placeholder="选择日期" :clearable="false" :editable="false"></el-date-picker>
          </el-col>
          <el-col :span="6">
            优先级：
            <el-select v-model="priorityInitValue" placeholder="普通" size="mini" @change="changePriority">
              <el-option v-for="priority in priorityList" :value="priority" :label="priority"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">项目：<span class="selectIt" @click="controlBoxShow('project')">{{projectName[0]}}</span>
            <searchBox @cancelBox="cancelBox" v-if="isProShowBox" :tag2="projectName" aimPosition="project"  class="searchBox proSearchBox" @changeSearch="changeSearchInfo"></searchBox>
          </el-col>
        </el-row>
        <el-row type="flex" justify="flex-start">
          <el-col>创建：{{taskInfo.creator.nick_name}}</el-col>
        </el-row>
      </div>

      <div class="main-content">
        <el-row type="flex" justify="space-between">
          <el-col :span="22">
            <el-input type="textarea" @blur="changeContent" placeholder="请输入内容:" v-model="content" :autosize="{maxRows: 7}" maxlength="1000" show-word-limit :disabled="isDisableModifyContent"></el-input>
          </el-col>
          <el-col :span="2"><i class="el-icon-edit-outline" @click="isDisableModifyContent = (isDisableModifyContent ? false : true)"></i></el-col>
        </el-row>
      </div>

      <div class="main-footer">
        <el-row>
          <el-col>执行与审核</el-col>
        </el-row>
        <el-row type="flex" justify="space-between" class="task-info">
          <el-col :span="21">
            <span class="baseColor">任务执行</span>
            <span class="baseColor">（{{taskStatus}}）</span>
            <br>
            <span :class="taskStatus == 'finish' ? 'redColor' : 'baseColor'">{{managerName[0]}}</span>
            <span :class="taskStatus == 'finish' ? 'redColor' : 'baseColor'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{plan_end_date}}</span>
          </el-col>
          <el-col :span="3">
            <el-button @click="changeTaskStatus" v-if="taskStatus == 'waitting'" type="primary" round size="mini">开始解决</el-button>
            <el-select @change="changeTaskProgress" v-if="taskStatus == 'running'" v-model="taskProgressInitValue" placeholder="0%" size="mini">
              <el-option v-for="percent in percentList" :value="percent" :label="percent"></el-option>
            </el-select>
            <el-button v-if="taskStatus == 'finish'" round size="mini" disabled>已完成</el-button>
          </el-col>
        </el-row>
      </div>
    </el-main>

    <!-- 整个任务的footer -->
    <el-footer height="190px">
      <el-tabs tab-position="left" v-model="activeName">
        <el-tab-pane label="任务进展" name="first">
          <el-timeline>
            <el-timeline-item v-for="comment in commentArr" type="danger" :timestamp="comment.comment_times" placement="top" size="large" icon="el-icon-info">
              <el-card>
                <p>
                  <span>{{comment.nick_name}} :</span>
                  <br>
                  <span>{{comment.content}}</span>
                </p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
        <el-tab-pane label="操作记录" name="second">这个操作记录已经合在上面任务记录里面了！！！！大佬们看着玩吧！！！！</el-tab-pane>
      </el-tabs>
      <el-input @blur="subComment" class="task-com" size="medium" type="text" placeholder="请大佬写下你的评论吧！" v-model="commentContent" clearable show-word-limit maxlength="1000"></el-input>
    </el-footer>
  </el-container>
</template>

<script>
import searchBox from '@/components/searchBox'

export default {
  name: 'DetailTask',
  data () {
    return {
      url: '',
      managerName: ['未设置'], // 这三个是几个可以弹出search-box的地方的默认值
      projectName: ['未设置'],
      ccMembers: ['未设置'],
      isManagerShowBox: false, // 控制3个地方serch-box隐藏和显示
      isCcShowBox: false,
      isProShowBox: false,
      plan_start_date: '',
      plan_end_date: '',
      priorityList: ['普通','重要','紧急','重要紧急'],
      priorityInitValue: '', // 任务优先值处的默认值
      content: '',
      isDisableModifyContent: true, // 主内容区是否可修改
      taskStatus: 'running',
      percentList: ['0%','10%','20%','30%','40%','50%','60%','70%','80%','90%','100%'],
      taskProgressInitValue: '', // 任务进度处的默认值
      activeName: 'first', // 这个是任务最下面标签的默认选中
      commentArr: [],
      commentContent: '',
      taskInfo: {},
      task_id: '',
    }
  },
  // beforeRouteUpdate(to, from, next) {  // 在路由进入这个组件之前调用。拦截所有非直接路径(比如已经打开了一个组件，再通过路由再打开这个组件)进来的请求，先跳转到直接路径，再进入
  //   console.log('go', to, from,this.$route.path);
  // },
  created() {
    let resData = JSON.parse(sessionStorage.getItem('taskResList')),
        taskCount = resData.count,
        taskList = resData.list,
        taskId = this.$route.params.id;
    taskList.find((value,index,arr) => { // 找到对应的任务
      if (value.task_id == taskId) {
        this.taskInfo = value;
        this.initData();
        this.initComment();
        return true;
      }
    });
  },
  methods: {
    initData() {
      this.saveTagArr(); // 这个只执行一次，即组件加载的时候，弄一个默认的
      this.plan_start_date = this.taskInfo.plan_start_date;
      this.plan_end_date = this.taskInfo.plan_end_date;
      this.priorityInitValue = this.taskInfo.priority;
      this.content = this.taskInfo.content;
      // this.taskStatus = this.taskInfo.status;
      this.taskStatus = 'waitting';
      this.task_id = this.taskInfo.task_id;
      this.url = '/task/modify.json/' + this.task_id;
    },
    initComment() { // 初始化评论
      this.$ajax.get('http://rap2api.taobao.org/app/mock/232839/comment/list.json', {
        params: {
          subject_id: this.task_id,
          type: 'task'
        }
      }).then((res) => {
        let resData = res.data;
        this.commentArr = resData.comment.map((value,index,arr) => {
          let temp = {
            nick_name: value.creator.nick_name,
            content: value.content,
            comment_times: value.comment_times
          };
          return temp;
        });
      });
    },
    changeSearchInfo(aimPosition, tagArr) {  // 这个主要是通过子组件里面触发的，来改变页面上面的，负责人、抄送人、项目信息
      if (aimPosition == 'manager') { // 点开的为负责人\
          this.managerName = tagArr.length ? tagArr : ['未设置'];
          this.$ajax.post(this.url, { // 修改任务负责人
            manager_name: this.managerName[0] == '未设置' ? '' : this.managerName[0]
          });
      }
      if (aimPosition == 'cc_member') { // 点开的为抄送人\
          this.ccMembers = tagArr.length ? tagArr : ['未设置'];
          this.$ajax.post(this.url, { // 修改任务负责人
            cc_member: this.ccMembers[0] == '未设置' ? [''] : this.ccMembers
          });
      }
      if (aimPosition == 'project') { 
          this.projectName = tagArr.length ? tagArr : ['未设置'];
          this.$ajax.post(this.url, { // 修改任务负责人
            project_name: this.projectName[0] == '未设置' ? '' : this.projectName[0]
          });
      }
    },
    saveTagArr() { // 把当前任务的标签，存在数组里面
      let managerName2 = this.taskInfo.manager.nick_name;
      let projectName2 = this.taskInfo.project.project_name;
      let ccMembers2 = this.taskInfo.cc_member.map((value,index,arr) => {
        return value.nick_name;
      });
      if (managerName2) {
        let temp = [];
        temp.push(managerName2);
        this.managerName = temp;
      }
      if (projectName2) {
        let temp = [];
        temp.push(projectName2);
        this.projectName = temp;
      }
      if (ccMembers2) {
        this.ccMembers = ccMembers2;
      }
    },
    controlBoxShow(aimPosition) {
      if (aimPosition == 'manager') { // 点开的为负责人\
          this.isManagerShowBox = true;
      }
      if (aimPosition == 'cc_member') { // 点开的为抄送人\
          this.isCcShowBox = true;
      }
      if (aimPosition == 'project') { 
          this.isProShowBox = true;
      }
    },
    cancelBox() {
      this.isManagerShowBox = false;
      this.isCcShowBox = false;
      this.isProShowBox = false;
    },
    closeTag(tagName) { // 关闭标签，触发的事件
      let index = this.ccMembers.indexOf(tagName);
      this.ccMembers.splice(index,1);
      if (this.ccMembers.length == 0) {
        this.ccMembers.push('未设置');
      }
      this.$ajax.post(this.url, { // 修改任务负责人
        cc_member: this.ccMembers[0] == '未设置' ? [''] : this.ccMembers
      });
    },
    changeStartDate(date) { // 修改任务的开始日期
      let resDate = this.formatDate(new Date(date));
      this.$ajax.post(this.url, { // 修改任务负责人
        plan_start_date: resDate
      });
    },
    changeEndDate(date) { // 修改任务的结束日期
      let resDate = this.formatDate(new Date(date));
      this.$ajax.post(this.url, {
        plan_end_date: resDate
      });
    },
    formatDate(date) {
      let year = date.getFullYear(),
          month = date.getMonth() + 1,
          day = date.getDate(),
          hour = date.getHours(),
          minute = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes(),
          second = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds();
      return year + '-' + month + '-' + day  + ' ' + hour + ':' + minute + ':' + second;
      // ' 00:00:00'
    },
    changePriority(value) { // 修改任务优先级
      this.$ajax.post(this.url, {
        priority: value
      });
    },
    changeContent() { // 修改任务内容
      this.$ajax.post(this.url, {
        content: this.content
      });
      this.isDisableModifyContent = true;
    },
    changeTaskStatus() { // 改变任务的状态，从开始准备到进行中
      this.taskStatus = 'running';
      this.$ajax.post(this.url, {
        status: 'running'
      });
    },
    changeTaskProgress(value) { // 改变任务进度
      if (value == '100%') {
        this.taskStatus = 'finish';
        this.$ajax.post(this.url, {
          progress_percent: value,
          status: 'finish'
        });
      } else {
        this.$ajax.post(this.url, {
          progress_percent: value
        });
      }
    },
    subComment() { // 提交评论
      let temp = {
          nick_name: 'this is the username',       
          content: this.commentContent,
          comment_times: this.formatDate(new Date())
      };
      this.commentArr.push(temp);
      this.$ajax.post(this.url, {
          content: this.commentContent,
          type: 'task'
      });
      this.commentContent = '';
    },
    closeTask() { // 关闭任务
      let path = this.$route.path.replace('/' + this.$route.params.id, '');
      this.$router.push(path);
    },
    deleteTask() { // 删除任务
      this.closeTask();
      this.$ajax.delete(this.url);
    }

  },
  components: {
    searchBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 设置searchBox的样式，主要是进行定位操作 */
.searchBox {
  position: absolute;
  top: 3px;
  left: 66px;
  width: 260px;
  height: 410px;
  z-index: 999;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: rgb(255,255,255);
}
.proSearchBox {
  left: -90%;
}
#DetailTask {
  position: absolute;
  top: 0;
  right: -20px;   
  width: 69.96%;
  height: 100%;
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background: #fff;
}
/* header */
.el-header {
  margin-bottom: 10px;
  white-space: nowrap;
}
.task-title {
  font-size: 18px;
  text-align: left;
  color: #333;
}
.task-btn {
  position: relative;
  /* width: 90px; */
}
.task-header i {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  background: rgb(103, 167, 246);
  cursor: pointer;
  transition: 1s ease-in;
}
.task-header i:hover {
  transform: rotate(540deg);
  box-shadow: 0 0 3px red;
  color: red;
}
/* 主内容区 */
.task-main {
  padding-top: 0;
}
/* 主内容区的头部 */
.main-header .el-col {
  position: relative;
  height: 34px;
  line-height: 34px;
  border: 1px solid rgb(213, 213, 213);
  font-size: 12px;
  text-indent: 18px;
  white-space: nowrap;
  text-align: left;
  color: #666;
  background:rgb(250, 250, 250);
}
.selectIt { /* 三个点了之后弹出选中框的样式 */
  font-size: 12px;
  cursor: pointer;
  transition:1s;
}
.selectIt:hover {
  text-shadow: 0 0 12px red;
}
/* 控制框样式 */
.main-header .el-row:nth-of-type(2) .el-col {
  border-top: none;
  border-bottom: none;
}
.main-header .el-row:nth-of-type(1) .el-col:nth-of-type(1) {
  border-right: none;
}
.main-header .el-row:nth-of-type(2) .el-col:nth-of-type(1) {
  border-right: none;
}
.main-header .el-row:nth-of-type(2) .el-col:nth-of-type(2) {
  border-right: none;
}
.main-header .el-select {
  width: 50%;
  text-indent: 0;
}
/* 主内容区的内容 */
.main-content {
  height: 185px;
  padding:15px 10px 10px 20px;
  border: 1px solid rgb(213, 213, 213);
  border-top: none;
}
.main-content .el-col:nth-of-type(2) {
  text-align: right;
}
.main-content .el-col:nth-of-type(1) {
  text-align: left;
}
.main-content i {
  border-radius: 4px;
  font-size: 20px;
  cursor: pointer;
  transition: 1s linear;
}
.main-content i:hover {
  box-shadow: 0 2px 12px 0 gray;
  transform: scale(0.8);
}
/* 主内容区下面部分样式 */
.main-footer .el-row:nth-of-type(1) .el-col {
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  border: 1px solid rgb(213, 213, 213);
  border-top: none;
  border-bottom: none;
  text-align: left;
  font-size: 15px;
  background:#fafafa;
}
.task-info {
  padding: 18px 17px;
  border: 1px solid rgb(213, 213, 213);
}
.task-info .el-col:nth-of-type(1) {
  text-align: left;
  font-size: 13px;
  color: red;
}
.task-info .el-col:nth-of-type(1) span:nth-of-type(1), .task-info .el-col:nth-of-type(1) span:nth-of-type(2){
  font-size: 13px;
}
.task-info .el-col:nth-of-type(1) span:nth-of-type(3), .task-info .el-col:nth-of-type(1) span:nth-of-type(4){
  display: inline-block;
  margin-top: 6px;
  font-size: 12px;
}
.baseColor {
  color: #67a7f6!important;
}
.redColor {
  color: red;
}

.el-tabs {
  height: 150px;
  overflow: auto;
  margin-bottom: 10px;
}
</style>

<style>
/* 所有组件里面共用的样式。用来修改scope组件限制了作用域的组件默认样式 */
/* 最下面评论样式修改 */
#DetailTask .task-com input {
  font-size: 14px;
  text-align: left;
}
#DetailTask #tab-first, #DetailTask #tab-second {
  padding-left: 0;
}
#DetailTask .el-tabs .el-timeline-item__timestamp {
  text-align: left;
}
#DetailTask .el-tabs .el-card__body {
  padding: 10px;
  text-align: left;
}
#DetailTask .el-tabs .el-card__body p {
  text-align: left;
  font-size: 13px;
  color: #666;
}
#DetailTask .el-tabs .el-card__body p span:nth-of-type(1) {
  display: inline-block;
  margin-bottom: 10px;
   -webkit-text-stroke: 0.5px red;
}


/* 抄送人标签样式修改 */
#DetailTask .main-header .el-tag .el-icon-close {
  text-indent: 0;
  font-size: 12px;
}
#DetailTask .main-header .el-tag--mini {
  padding-left: 0;
}
#DetailTask .main-header .el-input__inner {
  text-indent: 10px;
  text-align: left;
  font-size: 12px;
}
#DetailTask .main-header .el-input__count-inner {
  position: relative;
  left: 15px;
}

/* 日期选择器那里样式修改 */
#DetailTask .taskDate .el-date-editor.el-input {
  width: 40%;
  text-indent: 0;
}

/* 优先级选择框修改 */
#DetailTask .main-header .el-select .el-input__suffix{
  display: none;
}
#DetailTask .main-header .el-select .el-input__inner{
  padding-right: 10px;
  padding-left: 0;
  text-align: center;
}

/* 主内容区，输入框样式修改 */
#DetailTask .main-content .el-textarea__inner {
  text-align: left;
  height: 100%;
}
</style>