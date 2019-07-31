<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute dark temporary>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <!-- <v-list-tile-title > -->
            <v-layout>
              <v-icon large>cake</v-icon>
              <span class="title pt-3 pl-2">Desserts</span>
              <!-- <span class="font-weight-light subheading">all crazy nutrition facts </span> -->
            </v-layout>
            <!-- </v-list-tile-title> -->
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense class="pt-0">
        <v-list-tile v-for="item in items" :key="item.title" @click=goTo(item)>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  props: ["drawer"],
  data() {
    return {
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ],
      right: null
    };
  },
  methods: {
    goTo(item){
       (item.title == "Home") ? this.goHome() :  this.goAbout() ;
    },
    goHome() {
      this.$router.push("/home");
    },
    goAbout() {
      this.$router.push("/about");
    },
  },
  watch: {
    drawer(val) {
      this.$emit("update:drawer", val);
    }
  }
};
</script>