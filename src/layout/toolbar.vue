<template>
  <div>
    <navDrawer :drawer="drawer" @changedrawer="changedrawer"></navDrawer>
    <!-- <navDrawer :nabBar="drawer"></navDrawer> -->
    <v-toolbar>
      <v-toolbar-side-icon @click="drawerTrue"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>
          <v-icon large>person</v-icon> {{User.name}}
        </span>
        <span class="font-weight-light subheading">wellcome {{User.name}}. This is a demo project</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="goDesserts()" class="grey darken-3 white--text">desserts</v-btn>
      <v-btn @click="goEcommerce()" class="grey darken-3 white--text">ecommerce</v-btn>
      <!-- <v-btn @click="goUsers()" class="grey darken-3 white--text">users</v-btn> -->
      <v-btn @click="goAbout()" class="grey darken-3 white--text">About</v-btn>
      <v-divider class="mx-4" vertical></v-divider>
      <v-btn @click="signOut()" class="grey darken-3 white--text">
        <span>
          <v-icon class="mr-2">exit_to_app</v-icon>
        </span>
        Sign Out
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-btn fab dark fixed right bottom @click="dialog=!dialog">
      <v-icon>chat</v-icon>
    </v-btn>
    <chat :dialog="dialog" :userName="User" @changedChatDialog="chatDialog"></chat>
  </div>
</template>

<script>
import navDrawer from "./navDrawer";
import chat from "@/components/chat/chat.vue";
import { fs } from "@/plugins/firebase";
export default {
  data() {
    return {
      drawer: false,
      dialog: false,
      User:{},
    };
  },
  mounted(){
    this.getUserData() ;
  },
  components: {
    navDrawer,
    chat
  },
  methods: {
    changedrawer(val) {
      this.drawer = val;
    },
    chatDialog(val) {
      this.dialog = val;
    },
    goUsers() {
      this.$router.push("/users");
    },
    goEcommerce() {
      this.$router.push("/ecommerce");
    },
    goDesserts() {
      this.$router.push("/desserts");
    },
    goAbout() {
      this.$router.push("/about");
    },
    drawerTrue() {
      this.drawer = true;
    },
    drawerToggle() {
      this.drawer = !this.drawer;
    },
    signOut() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
    getUserData() {
      var self = this
      var uid = localStorage.getItem("userID")
      fs.collection("users").doc(uid).get().then((doc)=>{
        self.User = doc.data() ;
        // console.log("in toolbar ==>",doc.data())
      });
    }
  }
};
</script>
