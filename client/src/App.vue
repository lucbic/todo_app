<template>
  <div>
    <todo-list v-bind:todos="todos"></todo-list>
    <create-todo v-on:create-todo="addTodo"></create-todo>
  </div>
</template>

<script>
import axios from 'axios';
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';

const url = 'http://localhost:9393';

export default {
  components: {
    TodoList,
    CreateTodo,
  },
  // data function avails data to the template
  data() {
    return {
      todos: this.getTodo(),
      status: '',
    };
  },
  methods: {
    addTodo(todo) {
      axios.post(`${url}/todo`, {
        title: todo.title,
        project: todo.project,
        done: todo.done,
      })
      .then((response) => {
        this.todos.push({
          id: response.data.id,
          title: response.data.title,
          project: response.data.project,
          done: response.data.done,
        });
      })
      .catch((error) => {
        this.status = `an error ocurred: ${error}`;
      });
    },
    getTodo() {
      axios.get(`${url}/todos`)
      .then((response) => {
        this.todos = response.data;
      })
      .catch((error) => {
        this.status = `an error ocurred: ${error}`;
      });
    },
  },
};

// this.getTodo();
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
