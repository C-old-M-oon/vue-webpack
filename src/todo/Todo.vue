<template>
  <div id="todo">
    <input type="text" class="add-input" autofocus="autofocus" placeholder="接下来做什么？" @keyup.enter="addTodo"/>
    <Item v-for='item in filterTodos' :key='item.id' :todo="item" @del='deletoTodo'>
      
    </Item>
    <Tabs :filter="filter" :todos="todos" @toggle='toggleState' @clearAll='clearALL'></Tabs>
  </div>
</template>

<script>
  import Item from './item.vue'
  import Tabs from './tabs.vue'
  let id = 0;
  export default {
    data() {
      return {
        todos:[],
        filter: 'all'
      }
    },
    methods: {
      addTodo(e) {
        this.todos.unshift({
          id: id++,
          content: e.target.value.trim(),
          completed: false
        })
        e.target.value = "";
      },
      deletoTodo(id) {
        this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
      },
      toggleState(state) {
        this.filter = state;
      },
      clearALL() {
        this.todos = this.todos.filter(todo => !todo.completed)
      }
    },
    computed: {
      filterTodos() {
        if (this.filter === 'all') {
          return this.todos
        }
        const copleted = this.filter === "completed";
        return this.todos.filter(todo => todo.completed === copleted)
      }
    },
    components: {
      Item, Tabs
    }
  }
</script>

<style lang='stylus' scoped>
  #todo{
    width: 600px;
    margin: 0 auto;
    box-shadow: 0 0 5px #666;
  }
  .add-input{
    position: relative;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4rem;
    border: 0;
    outline: none;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, .6);
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 60px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0,0,0,.6);
  }
</style>