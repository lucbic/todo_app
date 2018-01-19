<template>
  <div class='ui centered card'>
    <!-- // Todo shown when we are not in editing mode. -->
    <div class='content' v-show="!isEditing">
        <div class='header'>
          {{ todo.title }}
        </div>
        <div class='meta'>
          {{ todo.project }}
        </div>
        <div class='extra content'>
          <span class='right floated edit icon' v-on:click="showForm">
            <i class='edit icon'></i>
          </span>
          <!-- /* add the trash icon in below the edit icon in the template */ -->
          <span class='right floated trash icon' v-on:click="deleteTodo(todo)">
            <i class='trash icon'></i>
          </span>
        </div>
    </div>
    <!-- // form is visible when we are in editing mode -->
    <div class="content" v-show="isEditing">
      <div class='ui form'>
        <div class='field'>
          <label>Título</label>
          <input type='text' v-model="todo.title" >
        </div>
        <div class='field'>
          <label>Projeto</label>
          <input type='text' v-model="todo.project" >
        </div>
        <div class='ui two button attached buttons'>
          <button class='ui basic blue button' v-on:click="hideForm(todo)">
            Fechar X
          </button>
        </div>
      </div>
    </div>
    <div class='ui bottom attached green basic button' v-show="todo.done" v-on:click="toggleTodo(todo)">
        Feito
    </div>
    <div class='ui bottom attached red basic button' v-show="!todo.done" v-on:click="toggleTodo(todo)">
        Pendente
    </div>
</div>
</template>

<script type="text/javascript">
  export default {
    props: ['todo'],
    data() {
      return {
        isEditing: false,
      };
    },
    methods: {
      showForm() {
        this.isEditing = true;
      },
      hideForm(payload) {
        this.$store.commit('EDIT_TODO', payload);
        this.isEditing = false;
      },
      deleteTodo(payload) {
        this.$store.commit('DELETE_TODO', payload);
      },
      toggleTodo(payload) {
        this.$store.commit('TOGGLE_TODO', payload);
      },
    },
  };
</script>
