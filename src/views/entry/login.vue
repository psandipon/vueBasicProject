<template>
  <v-app id="inspire">
    <v-content>
      <snackbar :snackbar.sync="snackbar" :text="text" :color="color"> </snackbar>
      <!-- {{this.$store.getters.getLoggedIn}} -->
      <v-container style="background: #424242"  fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card flat  class="elevation-12">
              <v-img
                src="https://picsum.photos/620/300?random"
                gradient="to bottom, rgba(100,115,201,.1), rgba(0,0,0,.99)"
              >
                <v-container fluid fill-height>
                  <v-layout mt-5 align-center column justify-center>
                    <v-avatar size="80">
                      <v-icon x-large color="white"> face </v-icon>
                    </v-avatar>
                    <h1 class="white--text display-2 font-weight-thin mb-3">Login</h1>
                    <h4 class="white--text subheading">you must login</h4>
                  </v-layout>
                </v-container>
              </v-img>
              
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="user.email"
                    label="Email"
                    name="email"
                    prepend-icon="person"
                    type="text"
                    color="black"
                  ></v-text-field>
                  <v-text-field
                    v-model="user.password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    color="black"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-layout column>
                <v-btn @click="login()"  class="mx-5" color="black white--text">Login</v-btn>
                 <loader   :loader.sync="loader"> </loader>
                <v-btn @click="goSignUp()" small  flat color="black white--text">New user ? Please SignUp</v-btn>
                </v-layout>
              </v-card-actions>
            </v-card>
            
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "@/plugins/firebase";
import snackbar from "@/layout/snackbar"
import loader from "@/layout/loader"

export default {
  props: {
    source: String
  },
  components:{snackbar,loader},
  data() {
    return {
      snackbar: false,
      loader: false ,
      text: "snackbar text",
      color:"",
      user: {
        password: "",
        email: "",
      }
    };
  },
  methods: {
    login() {
      var self = this
      console.log("login method called")
      self.loader = true
      this.$store.dispatch("authenticateUser", this.user)
      .then(
        function(result) {  
            self.snackbar =  true ;
            self.loader = false ;
            self.text = result.toUpperCase() + ". You have been successfully logged in." ;
            self.color= "success"
            setTimeout(function(){ self.$router.push("/desserts"); }, 2000);
          },
        function(error) { 
          self.snackbar =  true ;
          self.loader = false ;
          self.text = error ;
          self.color= "error" ;
          self.unsetSnackbar(self);
          }
      );
      
    },
    goSignUp(){
      this.$router.push("/signup");
    },
  }
};
</script>


