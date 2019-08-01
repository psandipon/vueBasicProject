import Axios from "axios";

import {
    SET_USER,
    SET_USERS,
    UNSET_USER,
    UNSET_USERS,
} from "../mutation-types";

import { Users_FetchUrl } from "@/store/api";
/*import {
  failedMsg, loadMsg, saveMsg, updateMsg, deleteMsg
}from '../erpUtil'*/

// initial state

const state = {
  user: {
    user_id: 0,
    user_name: "",
    email: "",
    password: "",
    date: "" ,
    user_type: "",
    created_at: "",
    updated_at:""
  },
  users: []
};
const getters = {
  getUser(state) {
    return state.user;
  },
  getUsers(state) {
    return state.users;
  },
};
// mutations
const mutations = {
  [SET_USER](state, user) {
    state.user = user
  },
  [SET_USERS](state, users) {
    state.users = users; 
  },
  [UNSET_USER](state) {
    state.user = {
        user_id: 0,
        user_name: "",
        email: "",
        password: "",
        date: "" ,
        user_type: "",
        created_at: "",
        updated_at:""
      }
  },
  [UNSET_USERS](state) {
    state.message = [];
  },

};
// Actions
const actions = {
  fetchUsersAction({ commit }) {
    return new Promise((resolve, reject) => {
      Axios.get(Users_FetchUrl)
        .then(function(response) {
          
          if (response.data.status == "success") {
            commit("SET_USERS", response.data.data);
            
            resolve();
          } else {
            //toastMessage('negative', failedMsg)
            // commit("SET_MESSAGE", response.data.msg);
            reject();
          }
        })
        .catch(function(error) {
          console.log(error);
          //toastMessage('negative', failedMsg)
        //   commit("UNSET_LOGGED_IN");
          reject();
        });
    });
  },
//   deleteUserAction({ commit, state}, item) {
//     console.log('in deleteUserAction')
//     state.users.splice(state.users.indexOf(item), 1)
//     commit('SET_USERS', item)
//   },
};

export default {
  state,
  getters,
  actions,
  mutations
};
