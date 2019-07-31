<template>
  <div>
    <navDrawer :drawer.sync="drawer"></navDrawer>
    <v-toolbar>
      <v-toolbar-side-icon @click="drawerToggle"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>
          <v-icon large>cake</v-icon>Desserts
        </span>
        <span class="font-weight-light subheading">all crazy nutrition facts</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="goHome()" class="grey darken-3 white--text">Home</v-btn>
      <v-btn @click="goAbout()" class="grey darken-3 white--text">About</v-btn>
      <v-divider class="mx-4" vertical ></v-divider>
      <v-btn @click="signOut()" class="grey darken-3 white--text">
        <span> <v-icon class=mr-2> exit_to_app </v-icon></span>
        Sign Out</v-btn>
    </v-toolbar>
    
    <v-content>
      <router-view></router-view>
    </v-content>

  </div>
</template>

<script>
import navDrawer from "./navDrawer";
export default {
  data() {
    return {
      drawer: false
    };
  },
  components: {
    navDrawer
  },
  methods: {
    goHome() {
      this.$router.push("/home");
    },
    goAbout() {
      this.$router.push("/about");
    },
    drawerToggle() {
      this.drawer = !this.drawer;
      console.log(this.drawer);
    },
    signOut(){
      this.$store.dispatch("logout")
      this.$router.push("/");
    }
  }
};
</script>
