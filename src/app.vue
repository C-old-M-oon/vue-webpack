<template>
  <div id="app">
    <div id="cover"></div>
    <Vheader></Vheader>
    <Vfooter></Vfooter>
    <Todo></Todo>
  </div>
</template>

<script>
  import Vheader from './todo/Vheader.vue'
  import Vfooter from './todo/Vfooter.vue'
  import Todo from './todo/Todo.vue'
  export default {
    data() {
      return {
        text: '开始开发咯哦当当当'
      }
    },
    components: {
      Vheader, Vfooter, Todo
    }
  }
</script>

<style lang="stylus" scoped>
  #app{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    #cover{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: #999;
      opacity: .9;
      z-index: -1;
    }
  }
</style>