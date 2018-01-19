/* eslint-disable */
import axios from 'axios';

const url = 'http://localhost:9393';

export const state = {
  todos: [],
  status: '',
};

export const mutations = {
  GET_TODOS(state) {
    axios.get(`${url}/todos`)
    .then((response) => {
      state.todos = response.data;
    })
    .catch((error) => {
      state.status = `Could not retrieve data from server. ${error}`;
    });
  },
  ADD_TODO(state, payload) {
    axios.post(`${url}/todo`, {
      title: payload.title,
      project: payload.project,
      done: payload.done,
    })
    .then((response) => {
      state.todos.push({
        id: response.data.id,
        title: response.data.title,
        project: response.data.project,
        done: response.data.done,
      });
      state.status = '';
    })
    .catch((error) => {
      state.status = `Could not create task. ${error}`;
    });
  },

  DELETE_TODO(state, payload) {
    axios.delete(`${url}/todo/${payload.id}`)
    .then(() => {
      const todoIndex = state.todos.indexOf(payload);
      state.todos.splice(todoIndex, 1);
      state.status = '';
    })
    .catch((error) => {
      state.status = `Could not delete task. ${error}`;
    });
  },

  TOGGLE_TODO(state, payload) {
    const todoToggle = payload;
    todoToggle.done = !payload.done;
    axios.patch(`${url}/todo/${payload.id}`, todoToggle)
    .then(() => {
      state.status = '';
    })
    .catch((error) => {
      state.status = `Could not toggle task. ${error}`;
    });
  },

  EDIT_TODO(state, payload) {
    axios.patch(`${url}/todo/${payload.id}`, payload)
    .then(() => {
      state.status = '';
    })
    .catch((error) => {
      state.status = `Could not edit task. ${error}`;
    });
  },

  CHANGE_STATUS(state, message) {
    state.status = message;
  },

};
