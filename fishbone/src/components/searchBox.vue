<template>
  <div>
      the content is this {{active}}
  </div>
</template>

<script>
export default {
  name: 'searchBox',
  data () {
    return {
        msg: 'dsa'
    }
  },
  props: ['active'],
  created() {
      
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>