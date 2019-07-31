<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import login from "./views/login";


export default {
  name: "App",
  components: {
    login,
    
  },
  data() {
    return {
      //
    };
  },
  methods:{
    goHome(){
      this.$router.push('/home')
    },
    goAbout(){
      this.$router.push('/about')
    },
  }
};
</script>
