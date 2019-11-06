<template>
    <section id="addProjectBox">
      <el-dialog :visible.sync="addProjectBoxVisible" :close-on-click-modal="false" :show-close="false">
          <!-- 外层dialog -->
        <!-- dialog的头部 -->
        <el-row slot="title" class="dialogTitle">
          <el-col :span="5">
            新建项目
          </el-col>  
        </el-row>
        <el-row class="projectkindBox">
            <el-col @click.native="showInner" class="waterfall">瀑布式协作项目</el-col>
        </el-row>

        <!-- 内层dialog -->
        <el-dialog :visible.sync="innerVisible" append-to-body center id="inner-dialog" :close-on-click-modal="false" :show-close="false">
            <!-- 内部dialog的头部 -->
            <el-row slot="title" class="dialogTitle">
                <el-col :span="5">
                    新建项目
                </el-col>  
            </el-row>

            <!-- 内部dialog的内容区 -->
            <el-row class="dialogContent">
                <el-col>
                    <el-input type="textarea" placeholder="请输入项目名字:" v-model="title" :autosize="{minRows: 1,maxRows: 1}" maxlength="100" show-word-limit></el-input>
                </el-col>
                <el-col>
                    <el-input type="textarea" placeholder="请输入项目简介:" v-model="content" :autosize="{minRows: 10,maxRows: 10}" maxlength="500" show-word-limit></el-input>
                </el-col>
            </el-row>
            <el-row class="managerBox">
                <el-col :span="24">
                    项目经理：
                    <el-tag  @click.native="controlBoxShow('manager')" class="selectIt" v-for="tagName in managerName" closable size="mini" @close="closeManagerTag(tagName)">{{tagName}}</el-tag>
                    <searchBox @cancelBox="cancelBox" v-if="isManagerShowBox" :tag2="managerName" aimPosition="manager" class="searchBox" @changeSearch="changeSearchInfo"></searchBox>
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
                <el-col :span="12" class="priorityBox">
                    优先级：
                    <el-select v-model="priorityInitValue" placeholder="普通" size="mini">
                    <el-option v-for="priority in priorityList" :value="priority" :label="priority"></el-option>
                    </el-select>
                </el-col>
            </el-row>

            <!-- 内部dialog的底部-->
            <el-row slot="footer">
                <el-col>
                    <el-button type="primary" @click="savaProjectAdd">保存</el-button>
                    <el-button @click="closeDialog">取 消</el-button>
                </el-col>  
            </el-row>
        </el-dialog>

      </el-dialog>
    </section>
</template>

<script>
import searchBox from '@/components/searchBox'

export default {
  name: 'addProjectBox',
  data () {
    return {
        msg: 'show me this',
        innerVisible: false,
        typeList: ['普通任务','批量任务'],
        typeInitValue: '', 
        title: '', // 这里这个title为项目名字
        content: '', // 项目的主内容
        managerName: ['未设置'], // 这三个是几个可以弹出search-box的地方的默认值
        ccMembers: ['未设置'],
        isManagerShowBox: false, // 控制3个地方search-box隐藏和显示
        isCcShowBox: false,
        plan_start_date: new Date(),
        plan_end_date: new Date(),
        priorityList: ['低','普通','高','非常重要'],
        priorityInitValue: '', // 项目优先值处的默认值
        dsa: 'dsa',
    }
  },
  props: ['addProjectBoxVisible'],
  created() {
    console.log('show me???????',this.addTaskBoxVisible);
  },
  methods: {
    showInner() { // 显示内层dialog
        this.innerVisible = true;
        console.log('??????????????????????????');
    },
    controlBoxShow(aimPosition) {
      if (aimPosition == 'manager') { // 点开的为负责人\
          this.isManagerShowBox = true;
      }
      if (aimPosition == 'cc_member') { // 点开的为抄送人\
          this.isCcShowBox = true;
      }
    },
    changeSearchInfo(aimPosition, tagArr) {  // 这个主要是通过子组件里面触发的，来改变页面上面的，负责人、抄送人、项目信息
      if (aimPosition == 'manager') { // 点开的为负责人\
          this.managerName = tagArr.length ? tagArr : ['未设置'];
      }
      if (aimPosition == 'cc_member') { // 点开的为抄送人\
          this.ccMembers = tagArr.length ? tagArr : ['未设置'];
      }
      console.log(aimPosition,tagArr);
    },
    cancelBox() {
      this.isManagerShowBox = false;
      this.isCcShowBox = false;
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
          hour = date.getHours(),
          minute = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes(),
          second = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds();
          month = month < 10 ? ('0' + month) : month;
          day = day < 10 ? ('0' + day) : day;
      return year + '-' + month + '-' + day  + ' ' + hour + ':' + minute + ':' + second;
      // ' 00:00:00'
    },
    savaProjectAdd(){
      let manager_name = this.managerName[0] == '未设置' ? '' : this.projectName[0],
          cc_member = this.ccMembers,
          plan_end_date = this.plan_end_date,
          plan_start_date = this.plan_start_date,
          priority = this.priorityInitValue,
          content = this.content,
          title = this.title;
      if (new Date(plan_start_date) > new Date(plan_end_date)) {
        alert('开始时间必须在结束时间之前');
      } else {
        if (manager_name == '') {
            alert('请添加项目经理，不然谁管啊！！！！！');
        } else {
            this.$ajax.post('project/create.json', {
                manager_name: manager_name,
                cc_member: cc_member,
                plan_end_date: this.formatDate(plan_end_date),
                plan_start_date: this.formatDate(plan_start_date),
                priority: priority,
                content: content,
                title: title
            }).then((res) => {
              console.log('添加成功返回');
            });
            this.closeDialog();
        }
      }
    },
    closeDialog() { // 关闭dialog
      this.$emit("closeAddProject");
    }
  },
  components: {
    searchBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 外层dialog样式 */
.dialogTitle {
  text-align: left;
  height: 40px;
  border-bottom: 1px solid rgb(238,238,238);
}
.dialogTitle .el-col {
    font-size: 16px;
    color: rgb(44, 62, 80);
}
.projectkindBox .el-col {
    width: 40%;
    height: 100px;
    line-height: 100px;
    border: 1px solid #eee;
    text-align: center;
    cursor: pointer;
    transition: 1s;
}
.projectkindBox .el-col:hover {
    background: rgb(247, 248, 249);
}


/* 内层dialog样式 */
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
/* 外层dialog样式修改 */
/* dialog的头部样式修改 */
#addProjectBox .el-dialog .el-dialog__header {
  padding-top: 10px;
}
/* dialog的内容区样式修改 */
#addProjectBox .el-dialog .el-dialog__body {
  padding-top: 0;
}
#addProjectBox .dialogContent .el-textarea .el-textarea__inner {
  text-align: left;
}

/* 内层dialog样式修改 */
#inner-dialog .el-dialog__header {
  padding-top: 10px;
}
/* dialog的内容区样式修改 */
#inner-dialog .el-dialog__body {
  padding-top: 0;
}
#inner-dialog .el-textarea .el-textarea__inner {
  text-align: left;
}

/* 修改标签样式 */
#inner-dialog .managerBox .el-tag--mini, #inner-dialog .ccBox .el-tag--mini { /* 这个为修改标签的样式 */
  padding-left: 10px;
}
#inner-dialog .managerBox .el-input--mini, #inner-dialog .ccBox .el-input--mini {
  left: 20px;
}
#inner-dialog  .managerBox .el-input__count .el-input__count-inner, #inner-dialog  .ccBox .el-input__count .el-input__count-inner {
  position: relative;
  left: 0;
}

/* 日期选择器那里样式修改 */
#inner-dialog .baseInfoBox .timeBox .el-date-editor.el-input {
  width: 40%;
  text-indent: 0;
}

/* 优先级选择框修改 */
#inner-dialog .priorityBox .el-select {
  width: 50%;
}
#inner-dialog .priorityBox .el-select .el-input__suffix{
  display: none;
}
#inner-dialog .priorityBox .el-select .el-input__inner{
  padding-right: 10px;
  padding-left: 0;
  text-align: center;
}
</style>
