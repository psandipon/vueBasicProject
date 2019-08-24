<template>
  <v-container style=" max-width: 350px; background: #212121; padding: 5px;  " fluid grid-list-md>
    <v-card class="mx-0">
      <v-card-text>
        <div class="hide-overflow" style="position: relative;">
          <!-- <home v-if="bottomNav == 'home'"></home>
          <favorites v-if="bottomNav == 'favorites'"></favorites>
          <cart v-if="bottomNav == 'cart'"></cart> -->
          <!-- <keep-alive> -->
            <component :is="bottomNav"> </component>
          <!-- </keep-alive> -->
          <v-bottom-nav :active.sync="bottomNav" :value="true" color="transparent">
            <!-- <v-divider></v-divider> -->
            <v-badge left overlap>
              <template v-slot:badge>
                <span v-if="0!=0"></span>
              </template>
              <v-btn color="black" flat value="home">
                <span>Home</span>
                <v-icon>home</v-icon>
              </v-btn>
            </v-badge>

            <v-badge left overlap>
              <template v-slot:badge>
                <span v-if="getFavLenght!=0">{{getFavLenght}}</span>
              </template>
              <v-btn color="black" flat value="favorites">
                <span>Favorites</span>
                <v-icon>favorite</v-icon>
              </v-btn>
            </v-badge>

            <v-badge left overlap>
              <template v-slot:badge>
                <span v-if="getCartLenght!=0">{{getCartLenght}}</span>
              </template>
              <v-btn color="black" flat value="cart">
                <span>Cart</span>
                <v-icon>shopping_cart</v-icon>
              </v-btn>
            </v-badge>
          </v-bottom-nav>
        </div>
        <!-- ------- -->
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import home from "@/components/ecom/ecom_home";
import favorites from "@/components/ecom/ecom_fab";
import cart from "@/components/ecom/ecom_cart";
export default {
  data() {
    return {
      bottomNav: "home"
    };
  },
  components: {
    home,
    favorites,
    cart
  },
  created: function() {
    this.fetchAllBooks();
    this.fetchAllFavBooks();
    this.fetchAllCartBooks();
  },
  computed: {
    getFavLenght() {
      return this.$store.getters.getAllFav.length;
    },
    getCartLenght() {
      return this.$store.getters.getAllCart.length;
    }
  },
  methods: {
    fetchAllBooks() {
      this.$store.dispatch("fetchAllBooks", []).then(res => {
        // console.log(res);
      });
    },
    fetchAllFavBooks() {
      this.$store.dispatch("fetchAllFavBooks", []).then(res => {
        // console.log(res);
      });
    },
    fetchAllCartBooks() {
      this.$store.dispatch("fetchAllCartBooks", []).then(res => {
        // console.log(res);
      });
    }
  }
};
</script>
<style scoped>
.scroll::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

.scroll::-webkit-scrollbar-track {
  background: #ddd;
}
.scroll::-webkit-scrollbar-thumb {
  background: #aaa;
}

.scroll {
  overflow-y: auto;
}
</style>

