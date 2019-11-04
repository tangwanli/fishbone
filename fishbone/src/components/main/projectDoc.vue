<template>
  <section id="projectDoc">
    <el-upload @change="demo" action="https://jsonplaceholder.typicode.com/posts/" ref="upload" multiple :on-change="handleChange" :file-list="fileList" :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">点击上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </section>
</template>

<script>
export default {
  name: 'projectDoc',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
    }
  },
  created() {
    console.log('projectDoc');
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
.upload-btn {
  display: block;
}
</style>