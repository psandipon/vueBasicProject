<template>
  <v-app id="inspire">
    <v-content>
      <snackbar :snackbar.sync="snackbar" :text="text" :color="color"> </snackbar>
      
      <v-container style="background: #757575" fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            
            <v-card flat class="elevation-12">
              <v-img
                src="https://picsum.photos/620/300?random"
                gradient="to bottom, rgba(100,115,201,.1), rgba(0,0,0,.99)"
              >
                <v-container fluid fill-height>
                  <v-layout mt-5 align-center column justify-center>
                    <v-avatar size="80">
                      <v-icon x-large color="white"> assignment_ind </v-icon>
                    </v-avatar>
                   
                    <h1 class="white--text display-2 font-weight-thin mb-3">Signup</h1>
                    <h4 class="white--text subheading">you must signup</h4>
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
                <v-btn @click="signUp()" round class="mx-5" color="black white--text">sign up</v-btn>
                 <loader  :loader.sync="loader"> </loader>
                 <v-btn @click="goLogIn()" small  flat color="black white--text">Alredy a user ? Please LogIn</v-btn>
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
import firebase from "firebase";
import snackbar from "../layout/snackbar"
import loader from "../layout/loader"

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
    signUp() {
      var self = this
      // console.log("login method called")
      self.loader = true
      this.$store.dispatch("createNewUser", this.user )
      .then(
        function(result) { 
          // console.log( "getter >", this.$store.getters.getLoggedIn) ; 
            self.snackbar =  true ;
            self.loader = false ;
            self.text = result+" Now you will be redirected to the login page" ;
            self.color= "success"
            // setSnackbar();
            setTimeout(function(){ self.$router.push("/"); }, 3000);
            
          },
        function(error) { 
          // console.log( "getter >", this.$store.getters.getLoggedIn) ; 
          self.snackbar =  true ;
          self.loader = false ;
          self.text = error ;
          self.color= "error" ;
          
          }
      );
      
    },
    goLogIn(){
      this.$router.push("/");
    },

  }
};
</script>