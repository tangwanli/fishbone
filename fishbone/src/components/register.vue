<template>
  <section id="register">
    <el-row>
      <el-col :span="7">
        <el-upload @change="demo" action="https://jsonplaceholder.typicode.com/posts/" ref="upload" multiple :on-change="handleChange" :file-list="fileList" :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">点击上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
        </el-upload>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      fileList: [],
    }
  },
  created() {
    console.log('register');
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
#register {
  height: 650px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
#register .el-row {
  padding-top: 35px;
}
</style>