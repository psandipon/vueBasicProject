<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm12 md12>
        <v-card color="black ">
          <v-img
            src="https://picsum.photos/620/300?random"
            gradient="to top, rgba(100,115,201,.1), rgba(0,0,0,.99)"
          >
           <v-container fluid fill-height>
            <v-layout mt-5 align-center column justify-center>
              <h1 class="white--text display-2 font-weight-thin mb-3">About Page</h1>
              <h4 class="white--text subheading">This is the about page</h4>
            </v-layout>
           </v-container>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import form from "../components/form";
export default {
  components: {}
};
</script>
