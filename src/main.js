import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store/";
import VueLocalStorage from "vue-localstorage";
import VueSessionStorage from "vue-sessionstorage";
import VueNoty from 'vuejs-noty';
import Toasted from 'vue-toasted';
import firebase from 'firebase' ;

var firebaseConfig = {
  apiKey: "AIzaSyC_g8hoMiUfGzmdIh1M01xqcGcBFzA-laU",
  authDomain: "test-e9de6.firebaseapp.com",
  databaseURL: "https://test-e9de6.firebaseio.com",
  projectId: "test-e9de6",
  storageBucket: "",
  messagingSenderId: "482350029084",
  appId: "1:482350029084:web:dfdf686d27b33c83"
};
firebase.initializeApp(firebaseConfig);

Vue.use(Toasted)
Vue.use(VueNoty,{timeout: 2000,})
Vue.use(VueSessionStorage);
Vue.use(VueLocalStorage);

Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
  
  console.log("local> ",localStorage.getItem("loggedIn"))
  console.log("store> ",store.getters.getLoggedIn)

  // console.log(this.$store.getters.getLoggedIn)
  // console.log(">", localStorage.getItem("loggedIn"))

  if (to.matched.some(record => record.meta.loggedIn)) {
    console.log('1');
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log("localStorage> ",localStorage.getItem("loggedIn"))


    


    if ((localStorage.getItem("loggedIn")).length==5) {
      console.log("inside-if-localStorage> ",localStorage.getItem("loggedIn"))
      console.log('2');
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      console.log("inside-else-localStorage> ",localStorage.getItem("loggedIn"))
      console.log('3');
      next()
    }
  } else {
    console.log('4');
    next() // make sure to always call next()!
  }
})


new Vue({
  
  router,
  store,
  render: h => h(App)
}).$mount("#app");
