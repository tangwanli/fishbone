<template>
    <section id="addTaskBox">
      <el-dialog :visible.sync="addTaskBoxVisible" :close-on-click-modal="false" :show-close="false">
        <!-- dialog的头部 -->
        <el-row slot="title" class="dialogTitle">
          <el-col :span="5">
            <el-select v-model="typeInitValue" placeholder="普通任务" size="mini" @change="changeType">
              <el-option v-for="type in typeList" :value="type" :label="type"></el-option>
            </el-select>
          </el-col>  
        </el-row>

        <!-- dialog的内容区 -->
        <el-row class="dialogContent">
          <el-col>
            <el-input type="textarea" placeholder="请输入任务标题:" v-model="title" :autosize="{minRows: 1,maxRows: 1}" maxlength="100" show-word-limit></el-input>
          </el-col>
          <el-col>
            <el-input type="textarea" placeholder="请输入内容:" v-model="content" :autosize="{minRows: 10,maxRows: 10}" maxlength="1000" show-word-limit></el-input>
          </el-col>
        </el-row>
        <el-row class="managerBox">
          <el-col :span="24">
            负责人：
            <el-tag  @click.native="controlBoxShow('manager')" class="selectIt" v-for="tagName in managerName" closable size="mini" @close="closeManagerTag(tagName)">{{tagName}}</el-tag>
            <searchBox @cancelBox="cancelBox" v-if="isManagerShowBox" :tag2="managerName" :aimPosition="isOnlyManager ? 'manager' : 'partner'" class="searchBox" @changeSearch="changeSearchInfo"></searchBox>
          </el-col>
        </el-row>
        <el-row class="ccBox">
          <el-col :span="24">
            抄送人：
            <el-tag  @click.native="controlBoxShow('cc_member')" class="selectIt" v-for="tagName in ccMembers" closable size="mini" @close="closeCcTag(tagName)">{{tagName}}</el-tag>
            <searchBox @cancelBox="cancelBox" v-if="isCcShowBox" :tag2="ccMembers" aimPosition="cc_member" class="searchBox" @changeSearch="changeSearchInfo"></searchBox>
          </el-col>
        </el-row>
        <el-row class="baseInfoBox">
          <el-col :span="12" class="timeBox">时间：
            <el-date-picker v-model="plan_start_date" type="date" size="mini" placeholder="选择日期" :clearable="false" :editable="false"></el-date-picker>
            至
            <el-date-picker v-model="plan_end_date" type="date" size="mini" placeholder="选择日期" :clearable="false" :editable="false"></el-date-picker>
          </el-col>
          <el-col :span="6" class="priorityBox">
            优先级：
            <el-select v-model="priorityInitValue" placeholder="普通" size="mini">
              <el-option v-for="priority in priorityList" :value="priority" :label="priority"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6" class="projectBox">项目：<span class="selectIt" @click="controlBoxShow('project')">{{projectName[0]}}</span>
            <searchBox @cancelBox="cancelBox" v-if="isProShowBox" :tag2="projectName" aimPosition="project"  class="searchBox proSearchBox" @changeSearch="changeSearchInfo"></searchBox>
          </el-col>
        </el-row>

        <!-- dialog的底部-->
        <el-row slot="footer">
          <el-col>
            <el-button type="primary" @click="savaTaskAdd">保存</el-button>
            <el-button @click="closeDialog">取 消</el-button>
          </el-col>  
        </el-row>
      </el-dialog>
    </section>
</template>

<script>
import searchBox from '@/components/searchBox'

export default {
  name: 'addTaskBox',
  data () {
    return {
        msg: 'show me this',
        typeList: ['普通任务','批量任务'],
        typeInitValue: '', 
        title: '',
        content: '', // 任务的主内容
        managerName: ['未设置'], // 这三个是几个可以弹出search-box的地方的默认值
        projectName: ['未设置'],
        ccMembers: ['未设置'],
        isManagerShowBox: false, // 控制3个地方search-box隐藏和显示
        isCcShowBox: false,
        isProShowBox: false,
        isOnlyManager: true,  // 用来判断负责人处是可以选择一个负责人还是可以多选负责人
        plan_start_date: new Date(),
        plan_end_date: new Date(),
        priorityList: ['普通','重要','紧急','重要紧急'],
        priorityInitValue: '', // 任务优先值处的默认值
        dsa: 'dsa',
    }
  },
  props: ['addTaskBoxVisible'],
  created() {
    console.log('show me???????',this.addTaskBoxVisible);
  },
  methods: {
    changeType(value) { // 修改任务的类型，流程任务或者批量任务
      this.isOnlyManager = value == '普通任务' ? true : false;
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
    changeSearchInfo(aimPosition, tagArr) {  // 这个主要是通过子组件里面触发的，来改变页面上面的，负责人、抄送人、项目信息
      if (aimPosition == 'manager' || aimPosition == 'partner') { // 点开的为负责人\
          this.managerName = tagArr.length ? tagArr : ['未设置'];
      }
      if (aimPosition == 'cc_member') { // 点开的为抄送人\
          this.ccMembers = tagArr.length ? tagArr : ['未设置'];
      }
      if (aimPosition == 'project') { 
          this.projectName = tagArr.length ? tagArr : ['未设置'];
      }
      console.log(aimPosition,tagArr);
    },
    cancelBox() {
      this.isManagerShowBox = false;
      this.isCcShowBox = false;
      this.isProShowBox = false;
    },
    closeManagerTag(tagName) { // 关闭标签，触发的事件
      let index = this.managerName.indexOf(tagName);
      this.managerName.splice(index,1);
      if (this.managerName.length == 0) {
        this.managerName.push('未设置');
      }
    },
    closeCcTag(tagName) { // 关闭标签，触发的事件
      let index = this.ccMembers.indexOf(tagName);
      this.ccMembers.splice(index,1);
      if (this.ccMembers.length == 0) {
        this.ccMembers.push('未设置');
      }
    },
    formatDate(date) {
      let year = date.getFullYear(),
          month = date.getMonth() + 1,
          day = date.getDate(),
          hour = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours(),
          minute = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes(),
          second = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds();
          month = month < 10 ? ('0' + month) : month;
          day = day < 10 ? ('0' + day) : day;
      return year + '-' + month + '-' + day  + ' ' + hour + ':' + minute + ':' + second;
      // ' 00:00:00'
    },
    savaTaskAdd(){
      let manager_name = this.managerName,
          cc_member = this.ccMembers,
          project_name = this.projectName[0] == '未设置' ? '' : this.projectName[0],
          plan_end_date = this.plan_end_date,
          plan_start_date = this.plan_start_date,
          priority = this.priorityInitValue,
          content = this.content,
          title = this.title,
          type = this.typeInitValue == '普通任务' ? 'ordinary' : 'batch';
      if (new Date(plan_start_date) > new Date(plan_end_date)) {
        alert('开始时间必须在结束时间之前');
      } else {
        this.$ajax.post('task/add_task.json', {
          manager_name: manager_name,
          cc_member: cc_member,
          project_name: project_name,
          plan_end_date: this.formatDate(plan_end_date),
          plan_start_date: this.formatDate(plan_start_date),
          priority: priority,
          content: content,
          title: title,
          type: type
        }).then((res) => {
          console.log('添加成功返回');
        });
        this.closeDialog();
      }
    },
    closeDialog() { // 关闭dialog
      this.$emit("closeAddTask");
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
  left: 70%;
}
.dialogTitle {
  text-align: left;
  height: 40px;
  border-bottom: 1px solid rgb(238,238,238);
}

/* 下面为dialog内容区样式 */
.selectIt { /* 三个点了之后弹出选中框的样式 */
  font-size: 12px;
  cursor: pointer;
  transition:1s;
}
.selectIt:hover {
  text-shadow: 0 0 12px red;
}
.managerBox, .ccBox, .baseInfoBox {
  height: 30px;
  line-height: 30px;
  background: rgb(250,250,250);
}
.managerBox .el-col, .ccBox .el-col, .baseInfoBox .el-col {
  height: 30px;
  line-height: 30px;
  padding-left: 12px;
  border: 1px solid rgb(238, 238, 238);
  text-align: left;
  font-size: 12px;
  color: rgb(136, 136, 136);
}
</style>

<style>
/* 所有组件里面共用的样式。用来修改scope组件限制了作用域的组件默认样式 */
/* 最下面评论样式修改 */

/* dialog的头部样式修改 */
#addTaskBox .el-dialog .el-dialog__header {
  padding-top: 10px;
}
/* dialog的内容区样式修改 */
#addTaskBox .el-dialog .el-dialog__body {
  padding-top: 0;
}
#addTaskBox .dialogContent .el-textarea .el-textarea__inner {
  text-align: left;
}

/* 修改标签样式 */
#addTaskBox .managerBox .el-tag--mini, #addTaskBox .ccBox .el-tag--mini, #addTaskBox .projectBox .el-tag--mini { /* 这个为修改标签的样式 */
  padding-left: 10px;
}
#addTaskBox .managerBox .el-input--mini, #addTaskBox .ccBox .el-input--mini, #addTaskBox .projectBox .el-input--mini {
  left: 20px;
}
#addTaskBox  .managerBox .el-input__count .el-input__count-inner, #addTaskBox  .ccBox .el-input__count .el-input__count-inner, #addTaskBox  .projectBox .el-input__count .el-input__count-inner {
  position: relative;
  left: 0;
}

/* 日期选择器那里样式修改 */
#addTaskBox .baseInfoBox .timeBox .el-date-editor.el-input {
  width: 40%;
  text-indent: 0;
}

/* 优先级选择框修改 */
#addTaskBox .priorityBox .el-select {
  width: 50%;
}
#addTaskBox .priorityBox .el-select .el-input__suffix{
  display: none;
}
#addTaskBox .priorityBox .el-select .el-input__inner{
  padding-right: 10px;
  padding-left: 0;
  text-align: center;
}
</style>
