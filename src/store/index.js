import Vue from "vue";
import Vuex from "vuex";

// import common from "./module/common";
import data from "./module/data";
import login from "./module/login";
import signup from "./module/signup";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { data,login,signup }
});

export default store;
