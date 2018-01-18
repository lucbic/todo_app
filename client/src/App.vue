<template>
  <div>
    <todo-list v-bind:todos="todos"></todo-list>
    <create-todo v-on:create-todo="addTodo"></create-todo>
    <p v-show="!status"> {{ status }} </p>
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
  },
  // data function avails data to the template
  data() {
    return {
      status: '',
    };
  },
  methods: {
    addTodo(todo) {
      if (todo.title.trim() && todo.project.trim()) {
        this.$store.commit('addTodo', { todo });
      } else {
        this.status = 'Blank title or project';
      }
    },
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
</style>
