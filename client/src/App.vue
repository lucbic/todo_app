<template>
  <div>
    <todo-list v-bind:todos="todos"></todo-list>
    <create-todo></create-todo>
    <div class='ui basic content center aligned segment' id='error'>
      <p v-show="status"> {{ status }} </p>
    </div>
  </div>
</template>

<script>
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';

export default {
  components: {
    TodoList,
    CreateTodo,
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    status() {
      return this.$store.state.status;
    },
  },
  created() {
    this.$store.commit('GET_TODOS');
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#error {
  color: red;
}
</style>
