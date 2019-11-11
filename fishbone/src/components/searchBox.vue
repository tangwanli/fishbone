<template>
  <el-container id="searchBox">
    <el-header height="110px">
      <span>已选择：</span>
      <el-tag v-for="tag in tagArr" closable size="mini" @close="closeTag(tag.name)">{{tag.name}}</el-tag>
    </el-header>

    <el-main>
      <el-input @blur="searchInfo" type="text" placeholder="请输入内容" v-model="input" size="mini" maxlength="9" show-word-limit>
        <template slot="prefix">
          <i class="el-icon-search"></i>
        </template>
      </el-input>
      <el-row class="info-list">
        <el-col :class="isSelect(item.name) ? 'selectColor' : 'normalColor'" :span="24" v-for="item in infoList"  @click.native="selectList(item)">{{item.name}}</el-col>
      </el-row>
    </el-main>
<!-- 现在要做的就是判断这些的选中和添加标签了 -->
    <el-footer>
      <el-button-group>
        <el-button type="primary" size="mini" round plain @click.native="determine">确定</el-button>
        <el-button type="primary" size="mini" round plain @click.native="cancel">取消</el-button>
      </el-button-group>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'searchBox',
  data () {
    return {
        tagArr: [],
        input: '',
        infoList: []
    }
  },
  props: ['aimPosition','tag2'], // 这里这个aimPosition和tag。tag为传过来的标签数组，根据这个信息来显示选择了哪些。
  created() {   
    this.initTag();                  // aimPosition为一个定位。即，当前的已选择是选择的哪一个。
    this.initList(); // 初始化所有数据
    console.log('the create');
  },
  methods: {
    closeTag(tagName) { // 关闭标签，触发的事件
      let index1 = 0;
      this.tagArr.forEach((value,index,arr) => {
        if (value.name == tagName) {
          index1 = index;
        }
      });
      this.tagArr.splice(index1,1);
    },
    isSelect(tagName) { // 判断列表的哪个项是被选中的，改变它的样式
      let res = this.tagArr.find((value,index,arr) => {
        if (value.name == tagName) {
          return true;
        }
      });
      return res ? true : false;
    },
    selectList(item) { // 点击之后把对应的名字加入tagArr，并且改变颜色
      if (this.isSelect(item.name)) { // 不管什么情况，点击被选中了的，都会直接被取消
        this.closeTag(item.name);
      } else {
        if (this.aimPosition == 'cc_member' || this.aimPosition == 'partner' || this.tagArr.length == 0) { // cc_member和partner就可以选择多个人，其它就只能选择一个人
          this.tagArr.push(item);
        }
      }
    },
    initTag() {
      if (this.tag2[0].name != '未设置') {
        this.tagArr = JSON.parse(JSON.stringify(this.tag2));
      } else {
        this.tagArr = [];
      }
    },
    initList() {
        // 显示已选择样式
      // if (this.aimPosition == 'manager') { // 点开的为负责人\
      //   this.$ajax.get('http://rap2api.taobao.org/app/mock/232839/all/member_list.json', { 
      //   }).then((res) => {
      //     let resData = res.data;
      //     this.infoList = resData.list;
      //   });
      // }
      // http://172.26.142.82:8080/fish_boom/getCaptcha
      if (this.aimPosition == 'manager' || this.aimPosition == 'cc_member' || this.aimPosition == 'partner') { // 点开的为抄送人。这里这个partner为项目页独有的
        this.$ajax.get('user/list', {
          params: {
            size: 2000,
            start: 0
          } 
        }).then((res) => {
          let resData = res.data;
          this.infoList = resData.list;
          console.log('获取所有联系人，返回的值为', res.data);
        });
      }
      if (this.aimPosition == 'project') { // 点开的为项目\
        this.$ajax.get('proj/list', { 
          params: {
            sorters: {"column":"last_up_date","direction":"desc"},
            size: 200,
            start: 0,
            status: 'all'
          }
        }).then((res) => {
          let resData = res.data;
          this.infoList = resData.list;
          console.log('获取所有项目，返回的值为', res.data);
        });
      }
    },
    searchInfo(ev) { // 搜索事件
      if (this.input == '' || this.input == null) {
        this.initList();
      } else {
        // if (this.aimPosition == 'manager') { // 点开的为负责人
        //   this.$ajax.get('http://rap2api.taobao.org/app/mock/232839/search/member_list.json', { 
        //     params: {
        //       member_name: this.input
        //     }
        //   }).then((res) => {
        //     let resData = res.data;
        //     this.infoList = resData.list;
        //     console.log(this.infoList);
        //   });
        // }
        if (this.aimPosition == 'manager' || this.aimPosition == 'cc_member' || this.aimPosition == 'partner') { // 点开的为负责人、抄送人或者普通成员
          this.$ajax.get('user/listByName', { 
            params: {
              name: this.input
            }
          }).then((res) => {
            let resData = res.data;
            this.infoList = resData.list;
          });
        }
        if (this.aimPosition == 'project') { // 点开的为项目
          this.$ajax.get('proj/listByName', { 
            params: {
              name: this.input
            }
          }).then((res) => {
            let resData = res.data;
            this.infoList = resData.list;
          });
        }
      }
    },
    determine() {
      this.$emit("changeSearch",this.aimPosition, this.tagArr);
      console.log(this.tagArr);
      this.cancel();
    },
    cancel() {
      this.$emit("cancelBox");
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  overflow: auto;
  border-bottom: 1px dotted #e9e9e9;
  white-space: normal;
}
.el-header span:nth-of-type(1) {
  margin-left: -16px;
  font-size: 12px;
  color: rgb(103, 167, 246);
}
.el-main {
  overflow: auto;
  padding: 0;
  border-bottom: 1px dotted #e9e9e9;
}
.el-input {
  width: 80%;
}
/* 查出来的所有信息 */
.info-list {
  overflow: auto;
}
.info-list .el-col {
  height: 35px;
  line-height: 35px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  cursor: pointer;
}
.info-list .el-col:hover {
  background: rgb(234,245,255);
}
.selectColor {
  background: rgb(234,245,255);
}
.normalColor {
  background: #fff;
}
.el-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
<style>
#searchBox .el-tag .el-icon-close {
  text-indent: 0;
  font-size: 12px;
}
#searchBox .el-tag--mini {
  padding-left: 0;
}
#searchBox .el-input__inner {
  text-indent: 10px;
  text-align: left;
  font-size: 12px;
}
#searchBox .el-input__count-inner {
  position: relative;
  left: 15px;
}
</style>