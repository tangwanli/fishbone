<template>
  <section id="projectDoc">
    <el-row>
      <el-col :span="7">
        <el-upload @change="demo" :data="fileData" :with-credentials="true" :action="fileUrl" ref="upload" multiple :on-change="handleChange" :file-list="fileList" :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">点击上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'projectDoc',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      fileData: {id: ''},
      fileUrl: 'http://172.26.142.103:8080/fish_boom/doc/upload',
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
    }
  },
  created() {
    console.log('projectDoc');
    this.fileData.id = this.$route.params.proId;
    console.log(this.fileData);
    this.$ajax.get('doc/list?id=' + this.$route.params.proId, {
      }).then((res) => {
        let resData = res.data,
            temp = [];
        // resData.list.forEach((value,index,arr) => {
        //   temp
        // });
        this.fileList = resData.list;
    });
  },
  methods: {
    handleChange(file, fileList) {
      console.log('112',file, fileList);
    },
    submitUpload() {
      this.$refs.upload.submit();
      // console.log('113',this.$refs.upload.submit());
    },
    demo(a) {
      console.log('114',a,file);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#projectDoc {
  height: 650px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
#projectDoc .el-row {
  padding-top: 35px;
}
</style>