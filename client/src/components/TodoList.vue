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
    <todo v-for="todo in todos" v-bind:todo="todo" :key="todo.id">></todo>
  </div>
</template>

<script type = "text/javascript" >
import Todo from './Todo';

export default {
  props: ['todos'],
  components: {
    Todo,
  },
};
</script>
