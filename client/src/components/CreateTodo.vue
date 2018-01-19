<template>
  <div class='ui basic content center aligned segment'>
    <button class='ui basic button icon' v-on:click="openForm" v-show="!isCreating">
      <i class='plus icon'></i>
    </button>
    <div class='ui centered card' v-show="isCreating">
      <div class='content'>
        <div class='ui form'>
          <div class='field'>
            <label>Título</label>
            <input v-model="titleText" type='text' ref='title' defaultValue="">
          </div>
          <div class='field'>
            <label>Projeto</label>
            <input v-model="projectText" type='text' ref='project' defaultValue="">
          </div>
          <div class='ui two attached buttons'>
            <button class='ui basic blue button' v-on:click="sendForm">
              Criar
            </button>
            <button class='ui basic red button' v-on:click="closeForm">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleText: '',
      projectText: '',
      isCreating: false,
    };
  },
  methods: {
    openForm() {
      this.isCreating = true;
      this.titleText = '';
      this.projectText = '';
    },
    closeForm() {
      this.isCreating = false;
      this.titleText = '';
      this.projectText = '';
      this.$store.commit('CHANGE_STATUS', '');
    },
    sendForm() {
      if (this.titleText.length > 0 && this.projectText.length > 0) {
        const title = this.titleText;
        const project = this.projectText;
        const payload = { title, project, done: false };
        this.$store.commit('ADD_TODO', { payload });
        this.isCreating = false;
      } else {
        this.$store.commit('CHANGE_STATUS', 'Blank title or project');
      }
    },
  },
};
</script>
