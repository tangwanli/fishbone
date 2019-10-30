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
                <span class="selectIt" @click="controlBoxShow('manager')">{{managerName[0]}}</span>
                <searchBox @cancelBox="cancelBox" v-if="isManagerShowBox" :tag2="managerName" aimPosition="manager" class="searchBox" @changeSearch="changeSearchInfo"></searchBox>
              </el-col>
          </el-row>
          <el-row type="flex" justify="start">
              <el-col :span="2"><i class="el-icon-user-solid"></i> 项目成员 &nbsp;&nbsp;</el-col>
              <el-col :span="22">
                  <el-tag  @click.native="controlBoxShow('partner')" class="selectIt" v-for="tagName in partners" closable size="mini" @close="closeTag2(tagName)">{{tagName}}</el-tag>
                  <searchBox @cancelBox="cancelBox" v-if="isPartnerShowBox" :tag2="partners" aimPosition="partner" class="searchBox" @changeSearch="changeSearchInfo"></searchBox>
              </el-col>
          </el-row>
          <el-row type="flex" justify="start">
              <el-col :span="2"><i class="el-icon-user-solid"></i> 抄送人 &nbsp;&nbsp;</el-col>
              <el-col :span="22">
                  <el-tag  @click.native="controlBoxShow('cc_member')" class="selectIt" v-for="tagName in ccMembers" closable size="mini" @close="closeTag(tagName)">{{tagName}}</el-tag>
                  <searchBox @cancelBox="cancelBox" v-if="isCcShowBox" :tag2="ccMembers" aimPosition="cc_member" class="searchBox" @changeSearch="changeSearchInfo"></searchBox>
              </el-col>
          </el-row>
          <el-row type="flex" justify="start">
              <el-col :span="2"><i class="el-icon-document"></i> 项目描述 &nbsp;&nbsp;</el-col>
              <el-col :span="22">没有</el-col>
          </el-row>
          <el-row type="flex" justify="start">
              <el-col>这东西是我创建的啊！！！</el-col>
          </el-row>
      </el-main>

      <el-footer>footerrrrrrrrrrrrrrrrrrrrrr</el-footer>
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
      managerName: ['未设置'],
      partners: ['未设置'],
      ccMembers: ['未设置'],
    }
  },
  props: ['projectInfo'],
  created() {
    console.log('进来了',this.projectInfo);
    this.initData();
    // this.initComment();
  },
  methods: {
    initData() { // 初始化所有数据
        this.saveTagArr(); // 这个只执行一次，即组件加载的时候，弄一个默认的
        let projectInfo = this.projectInfo;
        this.projectName = projectInfo.name;
        this.code = projectInfo.code;
        this.percent = projectInfo.percent;
        this.plan_start_date = projectInfo.plan_start_date;
        this.plan_end_date = projectInfo.plan_end_date;
        this.url = '/project/modify.json/' + this.$route.params.id;
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
      if (aimPosition == 'partner') { 
          this.partners = tagArr.length ? tagArr : ['未设置'];
          this.$ajax.post(this.url, { // 修改任务负责人
            partner: this.partners[0] == '未设置' ? [''] : this.partners
          });
      }
    },
    saveTagArr() { // 把当前任务的标签，存在数组里面
      let managerName2 = this.projectInfo.manager.nick_name;
      let partners2 = this.projectInfo.partner.map((value,index,arr) => {
        return value.nick_name;
      });;
      let ccMembers2 = this.projectInfo.cc_member.map((value,index,arr) => {
        return value.nick_name;
      });
      if (managerName2) {
        let temp = [];
        temp.push(managerName2);
        this.managerName = temp;
      }
      if (partners2) {
        let temp = [];
        temp.push(partners2);
        this.partners = temp;
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
      if (aimPosition == 'partner') { 
          this.isPartnerShowBox = true;
      }
    },
    cancelBox() {
      this.isManagerShowBox = false;
      this.isCcShowBox = false;
      this.isPartnerShowBox = false;
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
    closeTag2(tagName) { // 关闭标签，触发的事件
      let index = this.partners.indexOf(tagName);
      this.partners.splice(index,1);
      if (this.partners.length == 0) {
        this.partners.push('未设置');
      }
      this.$ajax.post(this.url, { // 修改任务负责人
        partner: this.partners[0] == '未设置' ? [''] : this.partners
      });
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
#projectPreview {
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
</style>
<style>
/* 日期选择器那里样式修改 */
#projectPreview .previewMain .el-date-editor.el-input {
  width: 15%;
  text-indent: 0;
}
</style>
