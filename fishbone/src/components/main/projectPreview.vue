<template>
  <el-container id="projectPreview">
      <el-header class="previewHeader" height="25px"><span></span>{{projectName}}  &nbsp;&nbsp;({{code}})</el-header>
      <!-- 主内容区 -->
      <el-main class="previewMain">
          <el-row type="flex" justify="start">
              <el-col :span="5"><i class="el-icon-time"></i> 项目进度 &nbsp;&nbsp;<span>已完成 <span>{{percent}}</span></span></el-col>
              <el-col :span="19"><i class="el-icon-date"></i> 起止时间 
                <el-date-picker v-model="plan_start_date" @change="changeStartDate" type="date" size="mini" placeholder="选择日期" :clearable="false" :editable="false"></el-date-picker>
                至
                <el-date-picker v-model="plan_end_date" @change="changeEndDate" type="date" size="mini" placeholder="选择日期" :clearable="false" :editable="false"></el-date-picker>
              </el-col>
          </el-row>
          <el-row type="flex" justify="start">
              <el-col :span="2"><i class="el-icon-s-custom"></i> 项目经理 &nbsp;&nbsp;</el-col>
              <el-col :span="22">
                <span class="selectIt" @click="controlBoxShow('manager')">{{managerName[0].name}}</span>
                <searchBox @cancelBox="cancelBox" v-if="isManagerShowBox" :tag2="managerName" aimPosition="manager" class="searchBox" @changeSearch="changeSearchInfo"></searchBox>
              </el-col>
          </el-row>
          <el-row type="flex" justify="start">
              <el-col :span="2"><i class="el-icon-user-solid"></i> 项目成员 &nbsp;&nbsp;</el-col>
              <el-col :span="22">
                  <el-tag  @click.native="controlBoxShow('partner')" class="selectIt" v-for="tag in partners" closable size="mini" @close="closeTag2(tag.name)">{{tag.name}}</el-tag>
                  <searchBox @cancelBox="cancelBox" v-if="isPartnerShowBox" :tag2="partners" aimPosition="partner" class="searchBox" @changeSearch="changeSearchInfo"></searchBox>
              </el-col>
          </el-row>
          <el-row type="flex" justify="start">
              <el-col :span="2"><i class="el-icon-user-solid"></i> 抄送人 &nbsp;&nbsp;</el-col>
              <el-col :span="22">
                  <el-tag  @click.native="controlBoxShow('cc_member')" class="selectIt" v-for="tag in ccMembers" closable size="mini" @close="closeCcTag(tag.name)">{{tag.name}}</el-tag>
                  <searchBox @cancelBox="cancelBox" v-if="isCcShowBox" :tag2="ccMembers" aimPosition="cc_member" class="searchBox" @changeSearch="changeSearchInfo"></searchBox>
              </el-col>
          </el-row>
          <el-row type="flex" justify="start">
              <el-col :span="2"><i class="el-icon-finished"></i> 优先级 &nbsp;&nbsp;</el-col>
              <el-col :span="2">
                <el-select v-model="priorityInitValue" placeholder="普通" size="mini" @change="changePriority">
                    <el-option v-for="priority in priorityList" :value="priority" :label="priority"></el-option>
                </el-select>
              </el-col>
          </el-row>
          <el-row type="flex" justify="start">
              <el-col :span="24" class="creatorBox">
                  创建人：{{creator}} {{creatDate}}
              </el-col>
          </el-row>
          <el-row class="projectContent" type="flex" justify="start">
              <el-col :span="4"><i class="el-icon-document"></i> 项目描述 &nbsp;&nbsp;<i class="el-icon-edit-outline" @click="isDisableModifyContent = (isDisableModifyContent ? false : true)"></i></el-col>
              <el-col :span="15" class="contentBox"><el-input type="textarea" @blur="changeContent" placeholder="请输入内容:" v-model="content" :autosize="{maxRows: 7}" maxlength="1000" show-word-limit :disabled="isDisableModifyContent"></el-input></el-col>
          </el-row>
      </el-main>

    <el-footer class="previewFooter"  height="190px">
      <el-tabs tab-position="left" v-model="activeName">
        <el-tab-pane label="项目进展" name="first">
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
        <el-tab-pane label="操作记录" name="second">这个操作记录已经合在上面项目记录里面了！！！！大佬们看着玩吧！！！！</el-tab-pane>
      </el-tabs>
      <el-input @blur="subComment" class="project-com" size="medium" type="text" placeholder="请大佬写下你的评论吧！" v-model="commentContent" clearable show-word-limit maxlength="1000"></el-input>
    </el-footer>
  </el-container>
</template>

<script>
import searchBox from '@/components/searchBox'
export default {
  name: 'projectPreview',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      projectName: 'dsa',
      code: '1',
      percent: '0%',
      plan_start_date: '',
      plan_end_date: '',
      priorityList: ['普通','重要','紧急','重要紧急'],
      url: '',
      isManagerShowBox: false,
      isCcShowBox: false,
      isPartnerShowBox: false,
      managerName: [{name:'未设置',id:'12'}], // 这三个是几个可以弹出search-box的地方的默认值
      partners: [{name:'未设置',id:'1221'}],
      ccMembers: [{name:'未设置',id:'12'},{name:'未设置2',id:'123'}],
      isDisableModifyContent: true, // 主内容区是否可修改
      content: '',
      priorityInitValue: '',
      priorityList: ['低','普通','高','非常重要'],
      creator: '',
      creatDate: '',
      activeName: 'first', // 这个是任务最下面标签的默认选中
      projectId: '',
      commentArr: [],
      commentContent: '',
    }
  },
  props: ['projectInfo'],
  created() {
    console.log('进来项目概况了',this.projectInfo);
    this.initData();
    this.initComment();
  },
  methods: {
    initData() { // 初始化所有数据
    console.log(this.projectInfo);
        this.saveTagArr(); // 这个只执行一次，即组件加载的时候，弄一个默认的
        let projectInfo = this.projectInfo;
        this.projectName = projectInfo.name;
        this.code = projectInfo.code;
        this.percent = projectInfo.percent;
        this.plan_start_date = projectInfo.startDate;
        this.plan_end_date = projectInfo.endDate;
        this.content = projectInfo.content;
        this.priorityInitValue = projectInfo.priority;
        this.creator = projectInfo.creator;
        this.creatDate = projectInfo.creatDate;
        this.projectId = this.$route.params.proId;
        this.url = '/proj/update/' + this.$route.params.proId;
        console.log('数据初始化完了');
    },
    initComment() { // 初始化评论
      this.$ajax.get('opera/listById', {
        params: {
          id: this.projectId,
          type: 'project'
        }
      }).then((res) => {
        let resData = res.data;
        this.commentArr = resData.list.map((value,index,arr) => {
          let temp = {
            nick_name: value.creator,
            content: value.content,
            comment_times: value.creatTime
          };
          return temp;
        });
        console.log('初始化评论的结果', this.commentArr);
      });
    },
    changeStartDate(date) { // 修改任务的开始日期
      if (new Date(date).getTime() < new Date(this.plan_end_date).getTime()) {
        let resDate = this.formatDate(new Date(date));
        this.$ajax.put(this.url, { // 修改任务负责人
          startDate: resDate
        }).then(() => {this.initComment();});
      } else {
        this.plan_start_date = this.projectInfo.startDate;
        alert('开始时间必须小于结束时间');
      }
    },
    changeEndDate(date) { // 修改任务的结束日期
        let resDate = this.formatDate(new Date(date));
        this.$ajax.put(this.url, {
            endDate: resDate
        }).then(() => {this.initComment();});
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
    changeSearchInfo(aimPosition, tagArr) {  // 这个主要是通过子组件里面触发的，来改变页面上面的，负责人、抄送人、项目信息
      if (aimPosition == 'manager') { // 点开的为负责人
          this.managerName = tagArr.length ? tagArr : [{name:'未设置',id:'12'}];
          this.$ajax.put(this.url, { // 修改任务负责人
            pm: this.managerName[0].name == '未设置' ? [] : this.managerName[0]
          }).then(() => {this.initComment();});
      }
      if (aimPosition == 'cc_member') { // 点开的为抄送人
          this.ccMembers = tagArr.length ? tagArr : [{name:'未设置',id:'12'}];
          this.$ajax.put(this.url, { // 修改任务负责人
            cc: this.ccMembers[0].name == '未设置' ? [] : this.ccMembers
          }).then(() => {this.initComment();});
      }
      if (aimPosition == 'partner') { 
          this.partners = tagArr.length ? tagArr : [{name:'未设置',id:'1221'}];
          this.$ajax.put(this.url, { // 修改任务负责人
            partner: this.partners[0].name == '未设置' ? [] : this.partners
          }).then(() => {this.initComment();});
      }
    },
    saveTagArr() { // 把当前任务的标签，存在数组里面
      if (this.projectInfo.pm != {}) {
        let temp = [];
        temp.push(this.projectInfo.pm)
        console.log('这里这个值来看一下',temp);
        this.managerName = temp;
        console.log('这里这个值来看一下',this.projectInfo.pm);
      }
      if (this.projectInfo.partner.length != 0) {
        this.partners = this.projectInfo.partner;
      }
      if (this.projectInfo.cc.length != 0) {
        this.ccMembers = this.projectInfo.cc;
      }
    },
    controlBoxShow(aimPosition) {
      if (aimPosition == 'manager') { // 点开的为负责人\
          this.isManagerShowBox = true;
      }
      if (aimPosition == 'cc_member') { // 点开的为抄送人\
          this.isCcShowBox = true;
      }
      if (aimPosition == 'partner') { 
          this.isPartnerShowBox = true;
      }
    },
    cancelBox() {
      this.isManagerShowBox = false;
      this.isCcShowBox = false;
      this.isPartnerShowBox = false;
    },
    closeCcTag(tagName) { // 关闭标签，触发的事件
      let index1 = 0;
      this.ccMembers.forEach((value,index,arr) => {
        if (value.name == tagName) {
          index1 = index;
        }
      });
      this.ccMembers.splice(index1,1);
      if (this.ccMembers.length == 0) {
        this.ccMembers.push({name:'未设置',id:'12'});
      }
      this.$ajax.put(this.url, { // 修改任务负责人
            cc: this.ccMembers[0].name == '未设置' ? [] : this.ccMembers
      }).then(() => {this.initComment();});
    },
    closeTag2(tagName) { // 关闭标签，触发的事件
      let index1 = 0;
      this.partners.forEach((value,index,arr) => {
        if (value.name == tagName) {
          index1 = index;
        }
      });
      this.partners.splice(index1,1);
      if (this.partners.length == 0) {
        this.partners.push({name:'未设置',id:'12'});
      }
      this.$ajax.put(this.url, { // 修改任务负责人
            partner: this.partners[0].name == '未设置' ? [] : this.partners
      }).then(() => {this.initComment();});
    },
    changeContent() { // 修改项目描述
      this.$ajax.put(this.url, {
        content: this.content
      }).then(() => {this.initComment();});
      this.isDisableModifyContent = true;
    },
    changePriority(value) { // 修改任务优先级
      this.$ajax.put(this.url, {
        priority: value
      }).then(() => {this.initComment();});
    },
    subComment() { // 提交评论
      if (this.commentContent != '') {
        let temp = {
            nick_name: sessionStorage.getItem('userName'),       
            content: this.commentContent,
            comment_times: this.formatDate(new Date())
        };
        this.commentArr.push(temp);
        this.$ajax.post('opera/add', {
            subject_id: this.projectId,
            content: this.commentContent,
            type: 'project'
        }).then(() => {this.initComment();});
        this.commentContent = '';
      }
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
/* .proSearchBox {
  left: -90%;
} */
#projectPreview {
    height: 650px;
    padding: 10px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
/* 头部样式 */
.previewHeader {
    line-height: 25px;
    padding: 0;
    margin-bottom: 10px;
    text-align: left;
    font-size: 18px;
    font-weight: 400;
}
.previewHeader span {
    display: inline-block;
    width: 3px;
    height: 15px;
    margin-right: 8px;
    background: rgb(103, 167, 246);
}

/* 内容区样式 */
.previewMain {
    height: 455px;
    padding-top: 0;
    padding-bottom: 0;
}
.previewMain .el-col {
    height: 36px;
    line-height: 36px;
    margin-bottom: 11px;
    text-align: left;
    font-size: 14px;
    font-weight: 400;
    color: rgb(102, 102, 102);
}
.previewMain .el-col:nth-of-type(1) > span {
    color: rgb(51, 51, 51);
}
.previewMain .el-col:nth-of-type(1) > span > span {
    font-size: 16px;
    color: rgb(51, 51, 51);
}
.previewMain .el-col i {
    font-size: 20px;
    font-weight: 400;
    vertical-align: middle;
}
.selectIt { /* 三个点了之后弹出选中框的样式 */
  cursor: pointer;
  transition:1s;
}
.selectIt:hover {
  text-shadow: 0 0 12px red;
}
.projectContent {
    flex-flow: column;
}
#projectPreview .creatorBox {
    font-size: 13px;
    color: #a9a9a9;
}

/* 页面最下面部分 */
.previewFooter {
    border-top: 1px dotted rgb(213, 213, 213);
}
.el-tabs {
  height: 150px;
  overflow: auto;
  margin-bottom: 10px;
}
</style>
<style>
/* 日期选择器那里样式修改 */
#projectPreview .previewMain .el-date-editor.el-input {
  width: 15%;
  text-indent: 0;
}


/* 下面为从DetailTask里面拿过来的样式 */
/* 所有组件里面共用的样式。用来修改scope组件限制了作用域的组件默认样式 */
/* 最下面评论样式修改 */
#projectPreview .project-com input {
  font-size: 14px;
  text-align: left;
}
#projectPreview #tab-first, #projectPreview #tab-second {
  padding-left: 0;
}
#projectPreview .el-tabs .el-timeline-item__timestamp {
  text-align: left;
}
#projectPreview .el-tabs .el-card__body {
  padding: 10px;
  text-align: left;
}
#projectPreview .el-tabs .el-card__body p {
  text-align: left;
  font-size: 13px;
  color: #666;
}
#projectPreview .el-tabs .el-card__body p span:nth-of-type(1) {
  display: inline-block;
  margin-bottom: 10px;
   -webkit-text-stroke: 0.5px red;
}


/* 抄送人标签样式修改 */
/* #projectPreview .previewMain .el-tag .el-icon-close {
  text-indent: 0;
  font-size: 12px;
} */
#projectPreview .previewMain .el-tag--mini { /* 这个为修改标签的样式 */
  padding-left: 10px;
}
#projectPreview .previewMain .el-input--mini {
  left: 20px;
}
#projectPreview .previewMain .el-input__count-inner {
  position: relative;
  left: -15px;
}

/* 优先级选择框修改 */
/* #projectPreview .previewMain .el-select .el-input__suffix{
  display: none;
}
#projectPreview .previewMain .el-select .el-input__inner{
  padding-right: 10px;
  padding-left: 0;
  text-align: center;
} */

/* 主内容区，输入框样式修改 */
#projectPreview .previewMain .el-textarea__inner {
  text-align: left;
  height: 100%;
}
</style>
