import Vue from "vue";
import Router from "vue-router";
import desserts from "./views/pages/desserts.vue";
import users from "./views/pages/users.vue";
import ToolBar from './layout/toolbar.vue';
import about from './views/pages/about.vue';
import login from './views/entry/login.vue';
import signup from './views/entry/signup.vue';
import { fb } from "@/plugins/firebase";

Vue.use(Router);

const router = new Router({
  mode: "history",
  
  routes: [
    {
      path: '/', component: login, name: 'login'
    },
    {
      path: '/signup', component: signup, name: 'signup'
    },
    {
      path: '/',
      component: ToolBar,
      children: [
        { 
          path: 'desserts', component: desserts, meta: {loggedIn: true}
        },
        { 
          path: 'users', component: users, meta: {loggedIn: true}
        },
        { 
          path: 'about', component: about, meta: {loggedIn: true}
        },
      ],
    },
    
  ]
});

router.beforeEach((to, from, next) => {
  
  if (to.matched.some(record => record.meta.loggedIn)) {

    fb.auth().onAuthStateChanged(user =>{
      if(user){
        next()
        console.log("user logged in:", user);
      }else {
        console.log("user loogged out");
        next({
          path: '/',
          query: { redirect: to.fullPath }
        })
       
      }
    })
    // if ((localStorage.getItem("loggedIn")).length == 5) {
    //   next({
    //     path: '/',
    //     query: { redirect: to.fullPath }
    //   })
    // } else {
    //   next()
    // }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
