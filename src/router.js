import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import ToolBar from './layout/toolbar.vue';
import About from './views/About.vue';
import login from './views/login.vue';
import signup from './views/signup.vue';

Vue.use(Router);

const router = new Router({
  mode: "history",
  //base: process.env.BASE_URL,
  routes: [
    {
      path: '/', component: login, name: 'login'
    },
    {
      path: '/signup', component: signup, name: 'signup'
    },
    {
      path: '/home',
      component: ToolBar,
      children: [
        {
          path: '/', component: Home,
        },
      ],
      meta: {
        loggedIn: true
      }
    },
    {
      path: '/about',
      component: ToolBar,
      children: [{ path: '/', component: About },
      ],
      meta: {
        loggedIn: true
      }
    },
  ]
});



export default router
