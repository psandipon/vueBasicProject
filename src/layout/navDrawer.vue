<template>
  <div>
    <v-navigation-drawer v-model="mydrawer" absolute dark temporary>
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
      mydrawer: false,
      items: [
        { title: "Desserts", icon: "dashboard" },
        { title: "User", icon: "face" },
        { title: "About", icon: "question_answer" }
      ],
      right: null,
      navBarModel:true 
    };
  },

  methods: {
    goTo(item){
      console.log("->>>>..",item);
      switch((item.title)) {
          case "Desserts":
            this.goDesserts()
            break;
          case "User":
            this.goUsers()
            break;
          case "About":
            this.goAbout()
            break;
          default:
            this.goAbout()
        }

    },
    goDesserts() {
      this.$router.push("/desserts");
    },
    goUsers() {
      this.$router.push("/users");
    },
    goAbout() {
      this.$router.push("/about");
    },
  },

  watch: {
    mydrawer(val){
      this.$emit("changedrawer",val)
    },
    drawer(val) {
      this.mydrawer = val
    }
  }
};
</script>