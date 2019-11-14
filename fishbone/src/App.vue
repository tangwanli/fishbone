<template>
  <el-container id="app">
    <!-- 左边侧边菜单 -->
    <leftMenu @reloadHome2="reloadHome2" @logOut="logOut" v-if="isLogin"></leftMenu>


    <!-- 主内容区 -->
    <el-main v-if="isLogin">
      <transition name="main" mode='out-in'>
        <router-view v-if="isRouterAliveTop" @reloadHome2="reloadHome2"/>
      </transition>
    </el-main> 
    <el-main v-if="isLogin ? false : true" style="padding:0;"><login @loginSuccess="loginSuccess"></login></el-main>
  </el-container>
</template>

<script>    
import leftMenu from '@/components/leftMenu'
import login from '@/components/login'

export default {
  name: 'App',
  data () {
    return {
      isLogin: '',
      isRouterAliveTop: true
    }
  },
  mounted() {
    // 暂时的获取验证码
    // this.$ajax.post('http://172.26.142.82:8080/fish_boom/login?verifyCode=6xjf2', {
    //   acco: 'Test4',
    //   password: 123
    // }).then((res) => {
    //   console.log(res.data);
    // });
    let doc = document,
        clientHeight = doc.documentElement.clientHeight;
        doc.querySelector("#app").style.height = clientHeight + 'px'; // 设置最外层元素高度

    if (sessionStorage.getItem('login') == null) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  },
  methods: {
    loginSuccess() {
      sessionStorage.setItem('login', true);
      this.isLogin = true;
    },
    logOut() {
      console.log('进入最外层的logOut');
      sessionStorage.setItem('login', false);
      this.isLogin = false;
    },
    reloadHome2 () {
      this.isRouterAliveTop = false;
      this.$nextTick(() => (this.isRouterAliveTop = true));
      console.log('reloadHome3333333333');
    }
  },
  components: {
    leftMenu,
    login
  }
}
</script>
<style>
/* 组件过渡动画 */
.main-leave {
  opacity: 1;
  transform: translateY(0);
}
.main-leave-to {
  opacity: 0;
  transform: translateY(-300px);
}
.main-leave-active {
  transition: 0.7s;
}
.main-enter {
  transform: translateY(300px);
  opacity: 0;
}
.main-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.main-enter-active {
  transition: 0.7s;
}

/* 其余 */
#app {
  height: 100%;
  background: rgb(238,238,238);
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
::-webkit-scrollbar  
{  
    width: 5px;  /*滚动条宽度*/
    height: 5px;  /*滚动条高度*/
}  
  
/*定义滚动条轨道 内阴影+圆角*/  
::-webkit-scrollbar-track  
{  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px;  /*滚动条的背景区域的圆角*/
    background-color: #fff;/*滚动条的背景颜色*/  
}  
  
/*定义滑块 内阴影+圆角*/  
::-webkit-scrollbar-thumb  
{  
    border-radius: 10px;  /*滚动条的圆角*/
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color: rgba(211,211,211,0.1);  /*滚动条的背景颜色*/
}  
</style>
  