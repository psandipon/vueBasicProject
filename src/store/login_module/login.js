import Axios from "axios";
import firebase from "firebase";

import {
  SET_LOGGED_IN,
  UNSET_LOGGED_IN,
  SET_AUTH_USER,
  UNSET_AUTH_USER
} from "../mutation-types";

import { loginUrl } from "../api";
/*import {
  failedMsg, loadMsg, saveMsg, updateMsg, deleteMsg
}from '../erpUtil'*/

// initial state

const state = {
  loggedIn: localStorage.getItem("loggedIn") || false,
  otp_status: false,
  authUser: {
    user_id: "",
    password: "",
    email: "",
  }
};
const getters = {
  getLoggedIn(state) {
    return state.loggedIn;
  },
  getAuthUser(state) {
    return state.authUser;
  },
};
// mutations
const mutations = {
  [SET_LOGGED_IN](state) {
    state.loggedIn = true;
  },
  [UNSET_LOGGED_IN](state) {
    state.loggedIn = false;
  },
  [SET_AUTH_USER](state, authuser) {
    state.authUser = authuser;
  },
  [UNSET_AUTH_USER](state) {
    state.authUser =  {
      user_id: "",
      password: "",
      email: "",
    };
  },

};
// Actions
const actions = {
 
  authenticateUser({ commit },  authUser ) {
    console.log('in authenticateUser')
    return new Promise((resolve, reject) => {
      firebase
      .auth()
      .signInWithEmailAndPassword(authUser.email, authUser.password)
      .then(
        function(user) {
          console.log("---->",user.user.uid) ;
          commit("SET_LOGGED_IN");
          commit("SET_AUTH_USER", 
            {
              user_id: user.user.uid,
              password: authUser.email,
              email: authUser.password,
            }
          );
          localStorage.setItem("loggedIn", true) ;
          resolve("connected");
        },
      )
      .catch(
          function(err) {
            reject(err.message);
          }
      );
      
    });
  },
  logout({commit,state}){
    return new Promise ((resolve)=>{
      commit("UNSET_LOGGED_IN");
      commit("UNSET_AUTH_USER");
      localStorage.setItem("loggedIn", false) ;
      resolve() ;
    })
    
    
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
