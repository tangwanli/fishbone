<template>
  <div>
      这个是DetailTask.vue
  </div>
</template>

<script>
export default {
  name: 'DetailTask',
  data () {
    return {
      msg: '开始游戏',
      }
  },
  created() {
      console.log('dsadas',this.$route.query);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>