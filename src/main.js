import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store/";
import VueLocalStorage from "vue-localstorage";
import VueSessionStorage from "vue-sessionstorage";
import VueNoty from 'vuejs-noty';
import Toasted from 'vue-toasted';
import {fb,fs} from "@/plugins/firebase";
import VueChatScroll from "vue-chat-scroll";
// import { Scroll } from 'vuetify/lib/directives'

Vue.use(VueChatScroll)
Vue.use(Toasted)
Vue.use(fb)
Vue.use(fs)
Vue.use(VueNoty, { timeout: 2000, })
Vue.use(VueSessionStorage);
Vue.use(VueLocalStorage);
Vue.config.productionTip = false;

// Vue.use(Scroll)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
