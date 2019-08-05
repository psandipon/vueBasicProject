import Axios from "axios";
import {fb} from "@/plugins/firebase";

import {
  SET_LOGGED_IN,
  UNSET_LOGGED_IN,
  SET_AUTH_USER,
} from "../mutation-types";

import { loginUrl } from "../api";
/*import {
  failedMsg, loadMsg, saveMsg, updateMsg, deleteMsg
}from '../erpUtil'*/

// initial state

const state = {
  
};
const getters = {
  
};
// mutations
const mutations = {
  

};
// Actions
const actions = {
 
  createNewUser({commit},  newUser ) {
    console.log('in createNewUser',newUser)

    return new Promise((resolve, reject) => {
      fb
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(
        function(user) {
          console.log("user: "+ user)
          console.log("auth user: "+ newUser)
          // alert("connected Here ??/");
          resolve("New User Creater");
        },
      )
      .catch(
          function(err) {
            //alert(err.message);
            console.log(err);
            reject(err.message);
          }
      );
      console.log("inside provime")
    });


  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
