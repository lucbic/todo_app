<template>
  <div>
    <div class='ui basic content segment'>
      <div class='ui centered card'>
        <div class='content'>
          <p>Tarefas Concluídas: {{todos.filter(todo => {return todo.done === true}).length}}</p>
          <p>Tarefas Pendentes: {{todos.filter(todo => {return todo.done === false}).length}}</p>
        </div>
      </div>
    </div>
     <!-- // we are now passing the data to the todo component to render the todo list -->
    <todo v-on:delete-todo="deleteTodo" v-on:toggle-todo="toggleTodo" v-on:edit-todo="editTodo" v-for="todo in todos" v-bind:todo="todo" :key="todo.id">></todo>
  </div>
</template>

<script type = "text/javascript" >
import axios from 'axios';
import Todo from './Todo';

const url = 'http://localhost:9393';

export default {
  props: ['todos'],
  components: {
    Todo,
  },
  methods: {
    deleteTodo(todo) {
      axios.delete(`${url}/todo/${todo.id}`)
      .then((response) => {
        if (response.data.success === 'ok') {
          const todoIndex = this.todos.indexOf(todo);
          this.todos.splice(todoIndex, 1);
        }
      })
      .catch((error) => {
        this.status = `an error ocurred: ${error}`;
      });
    },
    toggleTodo(todo) {
      const todoToggle = todo;
      todoToggle.done = !todo.done;
      axios.patch(`${url}/todo/${todo.id}`, todoToggle)
      .then(() => {
        //
      })
      .catch((error) => {
        this.status = `an error ocurred: ${error}`;
      });
    },
    editTodo(todo) {
      axios.patch(`${url}/todo/${todo.id}`, todo)
      .then(() => {
        //
      })
      .catch((error) => {
        this.status = `an error ocurred: ${error}`;
      });
    },
  },
};
</script>
