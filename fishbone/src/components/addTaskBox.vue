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
            <el-input type="textarea" placeholder="请输入内容:" v-model="content" :autosize="{maxRows: 7}" maxlength="1000" show-word-limit></el-input>
          </el-col>
        </el-row>
        <el-row class="managerBox">
          <el-col>2</el-col>
        </el-row>
        <el-row class="ccBox">
          <el-col>3</el-col>
        </el-row>
        <el-row class="baseInfoBox">
          <el-col>3</el-col>
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
        dsa: ''
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
</style>

<style>
/* 所有组件里面共用的样式。用来修改scope组件限制了作用域的组件默认样式 */
/* 最下面评论样式修改 */

/* dialog的内容区input样式修改 */
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
