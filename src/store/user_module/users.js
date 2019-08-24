import Axios from "axios";

import {
    SET_USER,
    SET_USERS,
    UNSET_USER,
    UNSET_USERS,
    SET_MESSAGE,
  UNSET_MESSAGE,
} from "../mutation-types";

import { Users_FetchUrl,Userinfo_DeleteUrl } from "@/store/api";
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
  users: [] ,
  message:""
};
const getters = {
  getUser(state) {
    return state.user;
  },
  getUsers(state) {
    return state.users;
  },
  getMessage(state) {
    return state.message;
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
  [SET_MESSAGE](state, Msg) {
    state.message = Msg;
  },
  [UNSET_MESSAGE](state) {
    state.message = "";
  }

};
// Actions
const actions = {
  fetchUsersAction({ commit }) {
    return new Promise((resolve, reject) => {
      Axios.get(Users_FetchUrl)
        .then(function(response) {
          if (response.data.status == "success") {
            // console.log("my response: ",response);
              commit("SET_USERS", response.data.data);
              resolve();
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
  editUserAction({ commit, state }, schema ) {
    
    const url = `${Users_FetchUrl}/${schema.user_id}`;
    var param = new URLSearchParams();
    param.append("user_name", schema.user_name );
    param.append("email", schema.email );
    param.append("password", schema.password );
    param.append("date", schema.date );
    param.append("user_type", schema.user_type );
    return new Promise(function(resolve, reject) {
     Axios.put(url, param)
      .then(function(response) {
        if (response.data.status == "success") {
          // commit('SET_USERS', item)
          commit("SET_MESSAGE", response.data.message);
          state.users.splice(schema.user_id, 1, schema)
          resolve();
        } else {
          commit("SET_MESSAGE", response.data.message);
          reject();
        }
      })
      .catch(function(error) {
        // console.log(error);
        reject();
      });
    });
  },
  addUserAction({ commit, state }, schema ) {
    const url = `${Users_FetchUrl}`;
    var param = new URLSearchParams();
    param.append("user_name", schema.user_name );
    param.append("email", schema.email );
    param.append("password", schema.password );
    param.append("date", schema.date );
    param.append("user_type", schema.user_type );
    return new Promise(function(resolve, reject) {
     Axios.post(url, param)
      .then(function(response) {
        if (response.data.status == "success") {
          // commit('SET_USERS', item)
          commit("SET_MESSAGE", response.data.message);
          // commit("SET_USERS", );
          // state.users.splice(schema.user_id, 1, schema)
          resolve();
        } else {
          commit("SET_MESSAGE", response.data.message);
          reject();
        }
      })
      .catch(function(error) {
        commit("SET_MESSAGE", response.data.message);
        // console.log(error);
        reject();
      });
    });
  },
  deleteUserAction({ commit, state}, schema) {
    const url = `${Users_FetchUrl}/${schema.user_id}`;
    var param = new URLSearchParams();
    // param.append("id", schema.user_id );
    return new Promise(function(resolve, reject) {
     Axios.delete(url)
      .then(function(response) {
        if (response.data.status == "success") {
          // commit('SET_USERS', item)
          // console.log("in user_js then if:");
          commit("SET_MESSAGE", response.data.message);
          // commit("SET_USERS", );
          // state.users.splice(schema.user_id, 1, schema)
          
          resolve();
        } else {
          // console.log("in user_js then elase:",response.data.status);
          commit("SET_MESSAGE", response.data.message);
          
          reject();
        }
      })
      .catch(function(error) {
        // console.log("in user_js catch:",error);
        commit("SET_MESSAGE", response.data.message);
        
        reject(error);
      });
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
