<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>



export default {
  name: "App",
  components: {
    
    
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
