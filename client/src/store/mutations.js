/* eslint-disable */
import axios from 'axios';

const url = 'http://localhost:9393';

export const STORAGE_KEY = 'todos-vuejs';

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear();
}

export const state = {
  todos:
    axios.get(`${url}/todos`)
    .then((response) => {
      this.todos = response.data;
    })
    .catch((error) => {
      this.status = `an error ocurred: ${error}`;
    })
};

export const mutations = {
  addTodo(state, { todo }) {
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

  deleteTodo(state, { todo }) {
    axios.delete(`${url}/todo/${todo.id}`)
    .then(() => {
      const todoIndex = this.todos.indexOf(todo);
      this.todos.splice(todoIndex, 1);
    })
    .catch((error) => {
      this.status = `an error ocurred: ${error}`;
    });
  },

  toggleTodo(state, { todo }) {
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

  editTodo(state, { todo, value }) {
    axios.patch(`${url}/todo/${todo.id}`, todo)
    .then(() => {
      //
    })
    .catch((error) => {
      this.status = `an error ocurred: ${error}`;
    });
  },

};
