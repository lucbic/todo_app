<template>
  <div>
    <todo-list v-bind:todos="todos"></todo-list>
    <create-todo v-on:create-todo="addTodo"></create-todo>
  </div>
</template>

<script>
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';

const url = 'https://localhost:9393/';

export default {
  components: {
    TodoList,
    CreateTodo,
  },
  // data function avails data to the template
  data() {
    return {
      todos: [],
    };
  },
  methods: {
    addTodo(todo) {
      this.todos.push({
        title: todo.title,
        project: todo.project,
        done: todo.done,
      });
    },
    getTodos() {
      axios.post(url + '/todos')
           .then(function(response) {
             this.todos << response.data;
           });
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
