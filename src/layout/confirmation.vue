<template>
  <v-layout justify-center>
    <v-dialog v-model="confirm_" persistent max-width="290">
      <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>-->
      <v-card >
        <v-container fluid fill-height >
          <v-layout mt-0 align-center column justify-center>
            <v-icon x-large class=mb-3>error_outline</v-icon>
            <h1 class="black--text display-2 font-weight-thin mb-3">DELETE</h1>
            <h4 class="black--text subheading text-uppercase" style="text-align: center;">are you sure you want to delete?</h4>
          </v-layout>
        </v-container>
        <v-layout row align-center justify-center justify-space-around class="pb-2">
          <v-btn dark color="gray darken-1" text @click="deleteNo">No</v-btn>
          <!-- <v-spacer></v-spacer> -->
          <v-btn dark color="gray darken-1" text @click="deleteYes">Yes</v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: ["confirm"],
  data() {
    return {
      confirm_: false,
      ifdel: false
    };
  },
  watch: {
    confirm_(val) {
      this.$emit("customConfirmEmit", val);
    },
    confirm(val) {
      // console.log('here?',val);
      this.confirm_ = val;
    }
  },
  methods: {
    deleteNo() {
      // this.ifdel = false ;
      this.$emit("customConfirmEmit", false); // toControlDialogue
      this.$emit("deleteDirection", false);
    },
    deleteYes() {
      // this.ifdel = true ;
      this.$emit("customConfirmEmit", false); // to control dialogue
      this.$emit("deleteDirection", true);
    }
  }
};
</script>

<style>
</style>
