<template>
  <el-container id="DetailTask">
    <el-header height="26px">
      <searchBox class="searchBox" :active="activeName"></searchBox>
      <el-row class="task-header" type="flex" justify="space-between">
        <el-col :span="21" class="task-title">G028 看板这里来第四个任务</el-col>
        <el-col :span="3" class="task-btn"><el-button size="mini" type="danger" :round="true" plain>删除任务</el-button><i class="el-icon-close"></i></el-col>
      </el-row>
    </el-header>

    <el-main class='task-main'>
      <div class="main-header">
        <el-row type="flex" justify="flex-start">
          <el-col :span="6">负责人：我</el-col>
          <el-col :span="18">抄送人：没有</el-col>
        </el-row>
        <el-row type="flex" justify="flex-start" class="second-row">
          <el-col>时间：2016-12-27至2016-12-27</el-col>
          <el-col>优先级：普通</el-col>
          <el-col>项目：这里来一个项目</el-col>
        </el-row>
        <el-row type="flex" justify="flex-start">
          <el-col>创建：这里就是这个创建的人</el-col>
        </el-row>
      </div>

      <div class="main-content">
        <el-row type="flex" justify="space-between">
          <el-col :span="22">这里是显示的所有内容，这个内容就有这么长。这里是显示的所有内容，这个内容就有这么长。这里是显示的所有内容，这个内容就有这么长。这里是显示的所有内容，这个内容就有这么长。这里是显示的所有内容，这个内容就有这么长。</el-col>
          <el-col :span="2"><i class="el-icon-edit-outline"></i></el-col>
        </el-row>
      </div>

      <div class="main-footer">
        <el-row>
          <el-col>执行与审核</el-col>
        </el-row>
        <el-row type="flex" justify="space-between" class="task-info">
          <el-col :span="21">
            <span class="baseColor">任务执行</span>
            <span class="baseColor">（进行中）</span>
            <br>
            <span class="baseColor">我就是这个项目经理名字</span>
            <span class="redColor">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;完成时间：10-19 16:00</span>
          </el-col>
          <el-col :span="3">
            <!-- <el-button type="primary" round size="mini">开始解决</el-button> -->
            <el-select v-model="initValue" placeholder="0%" size="mini">
              <el-option v-for="item in percentList" :value="item" :label="item"></el-option>
            </el-select>
            <!-- <el-button round size="mini" disabled>已完成</el-button> -->
          </el-col>
        </el-row>
      </div>
    </el-main>

    <el-footer height="190px">
      <el-tabs tab-position="left" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="任务进展" name="first">
          <el-timeline>
            <el-timeline-item type="danger" timestamp="2018/4/12" placement="top" size="large" icon="el-icon-info">
              <el-card>
                <p>
                  <span>王小虎 :</span>
                  <br>
                  <span>dsadsadsadsad</span>
                </p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item type="danger" timestamp="2018/4/15" placement="top" size="large" icon="el-icon-info">
              <el-card>
                <p>
                  <span>王小虎ds :</span>
                  <br>
                  <span>dsad我sadsadsad</span>
                </p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
        <el-tab-pane label="操作记录" name="second">配置管理2</el-tab-pane>
      </el-tabs>
      <el-input class="task-com" size="medium" type="text" placeholder="请大佬写下你的评论吧！" v-model="input" clearable show-word-limit maxlength="1000"></el-input>
    </el-footer>
  </el-container>
</template>

<script>
import searchBox from '@/components/searchBox'

export default {
  name: 'DetailTask',
  data () {
    return {
      percentList: ['0%','10%','20%','30%','40%','50%','60%','70%','80%','90%','100%'],
      initValue: '',
      activeName: 'first',
      input: ''
    }
  },
  created() {
      console.log('dsadas',this.$route.query);
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab, event, this.activeName);
    }
  },
  components: {
    searchBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchBox {
  position: absolute;
  left: 0;
  top: 0;
  background: red;
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
/* main */
.task-main {
  padding-top: 0;
}
.main-header .el-col {
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
.task-com input {
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

</style>