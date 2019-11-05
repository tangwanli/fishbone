<template>
    <section id="addTaskBox">
      <el-dialog :visible.sync="addTaskBoxVisible" :close-on-click-modal="false">
        <!-- dialog的头部 -->
        <el-row slot="title" class="dialogTitle">
          <el-col :span="5">
            <el-select v-model="typeInitValue" placeholder="普通任务" size="mini">
              <el-option v-for="type in typeList" :value="type" :label="type"></el-option>
            </el-select>
          </el-col>  
        </el-row>

        <!-- dialog的内容区 -->
        <el-row class="dialogContent">
          <el-col>
            <el-input type="textarea" placeholder="请输入内容:" v-model="content" :autosize="{minRows: 7,maxRows: 7}" maxlength="1000" show-word-limit></el-input>
          </el-col>
        </el-row>
        <el-row class="managerBox">
          <el-col>
            负责人：
            <el-tag  @click.native="controlBoxShow('manager')" class="selectIt" v-for="tagName in managerName" closable size="mini" @close="closeManagerTag(tagName)">{{tagName}}</el-tag>
            <searchBox @cancelBox="cancelBox" v-if="isManagerShowBox" :tag2="ccMembers" aimPosition="cc_member" class="searchBox" @changeSearch="changeSearchInfo"></searchBox>
          </el-col>
        </el-row>
        <el-row class="ccBox">
          <el-col>
            负责人：<span class="selectIt" @click="controlBoxShow('manager')">{{managerName[0]}}</span>
            <!-- 注，这里删了个 :active="activeName"，不知道这个是干嘛的，所以删了 -->
            <searchBox @cancelBox="cancelBox" v-if="isManagerShowBox" :tag2="managerName" aimPosition="manager" class="searchBox" @changeSearch="changeSearchInfo"></searchBox>
          </el-col>
          <el-col>
            抄送人：
            <el-tag  @click.native="controlBoxShow('cc_member')" class="selectIt" v-for="tagName in ccMembers" closable size="mini" @close="closeCcTag(tagName)">{{tagName}}</el-tag>
            <searchBox @cancelBox="cancelBox" v-if="isCcShowBox" :tag2="ccMembers" aimPosition="cc_member" class="searchBox" @changeSearch="changeSearchInfo"></searchBox>
          </el-col>
        </el-row>
        <el-row class="baseInfoBox">
          <el-col>开始日期</el-col>
          <el-col>结束日期</el-col>
          <el-col>优先级</el-col>
          <el-col :span="6">项目：<span class="selectIt" @click="controlBoxShow('project')">{{projectName[0]}}</span>
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
export default {
  name: 'addTaskBox',
  data () {
    return {
        msg: 'show me this',
        typeList: ['普通任务','批量任务'],
        typeInitValue: '', 
        content: '', // 任务的主内容
        managerName: ['未设置'], // 这三个是几个可以弹出search-box的地方的默认值
        projectName: ['未设置'],
        ccMembers: ['未设置'],
        isManagerShowBox: false, // 控制3个地方search-box隐藏和显示
        isCcShowBox: false,
        isProShowBox: false,
    }
  },
  props: ['addTaskBoxVisible'],
  created() {
    console.log('show me???????',this.addTaskBoxVisible);
  },
  methods: {
    savaTaskAdd(){
      this.closeDialog();
    },
    closeDialog() { // 关闭dialog
      this.$emit("closeAddTask");
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
    closeCcTag(tagName) { // 关闭标签，触发的事件
      let index = this.ccMembers.indexOf(tagName);
      this.ccMembers.splice(index,1);
      if (this.ccMembers.length == 0) {
        this.ccMembers.push('未设置');
      }
    },
    closeManagerTag(tagName) { // 关闭标签，触发的事件
      let index = this.managerName.indexOf(tagName);
      this.managerName.splice(index,1);
      if (this.managerName.length == 0) {
        this.managerName.push('未设置');
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
#addTaskBox .dialogTitle .el-select .el-input__inner{
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
