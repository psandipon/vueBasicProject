import Vue from "vue";
import Vuex from "vuex";

// import common from "./module/common";
import dessert from "./dessert_module/dessert";
import login from "./login_module/login";
import signup from "./login_module/signup";
import users from "./user_module/users";
import chat from "./chat/chat";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { dessert,login,signup,users,chat }
});

export default store;
