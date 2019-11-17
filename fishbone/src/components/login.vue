<template>
  <section id="login">
    <el-row class="login-box">
        <el-col :span="20">
            鱼刺GOGOGOGO!!
        </el-col>
        <el-col :span="20">
            <el-input type="text" placeholder="用户名" v-model="username" clearable>
                <div slot="prepend" class="pre-label">用户名：</div>
            </el-input>
        </el-col>
        <el-col :span="20">
            <el-input type="text" placeholder="密码" v-model="password" clearable show-password>
                <div slot="prepend" class="pre-label">密码：</div>
            </el-input>
        </el-col>
        <el-col :span="20">
            <el-input type="text" placeholder="验证码" v-model="verify">
                <!-- <div slot="prepend" class="pre-label">验证码：</div> -->
                <div class="verifyBox" slot="append" @click="getVerify"><img :src="imgSrc" alt=""></div>
            </el-input>
        </el-col>
        <el-col :span="20">
            <el-button type="primary" :plain="true" size="mini" @click="login">登陆</el-button>
            <!-- <el-button type="primary" :plain="true" size="mini">注册</el-button> -->
        </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
        username: '',
        password: '',
        verify: '',
        imgSrc: ''
    }
  },
  created() {
      this.getVerify();
  },
  methods: {
      getVerify() { // 获取验证码
        this.$ajax({method:'get',url:'getCaptcha',responseType:'blob'}).then((res) => {
          const src = window.URL.createObjectURL(res.data);//这里也是关键,调用window的这个方法URL方法
          this.imgSrc = src;
          console.log(src);
        });
      },
      login() {
          this.$ajax.post('login?verifyCode=' + this.verify, {
              acco: this.username,
              password: this.password
          }).then((res) => {
              console.log(res.data);
              if (res.data.code == 0) {
                  sessionStorage.setItem('userName',res.data.list.name);
                  this.$emit('loginSuccess');
              } else {
                  alert(res.data.message);
              }
          });
        //   this.$emit('loginSuccess');
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login {
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgb(237,237,237), rgb(229,229,229));;
}
.login-box {
    position: absolute;
    left: 38%;
    top: 10%;
    width: 23.5%;
    height: 50%;
    background: rgb(255, 255, 255);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    
}
.login-box .el-col {
    margin-bottom: 20px;
    margin-left: 8%;
}
.login-box .el-col:nth-of-type(1) {
    font-size: 30px;
    text-shadow: 0 0 10px rgb(73, 168, 21);
    color: rgb(73, 168, 21);
}
.login-box .pre-label {
    width: 50px;
}
</style>
<style>
#login .login-box .el-input__inner {
    text-align: left;
    color: rgb(73, 168, 21);
    transition: 0.5s;
}
#login .login-box .el-input__inner:hover {
    box-shadow: 0 0 2px rgb(73, 168, 21);
}
#login .el-input-group__append {
    /* display: inline-block; */
    width: 130px;
    height: 80px;
    padding: 0;
    cursor: pointer;
}
</style>