<template>
  <div id="scrolling-techniques" class="scroll">
    <v-container style="height: 500px; padding: 0px; " fluid grid-list-md>
      <v-layout row wrap class>
        <v-flex v-for="book in getAllBooks" :key="book.Title" v-bind="{ [`xs${book.Flex}`]: true }">
          <v-card class="ma-1" elevation="5">
            <v-img :src="book.Image" height="200"></v-img>
            <v-card-text class="pt-4" style="position: relative;">
              <v-btn
                absolute
                color="black"
                class="white--text"
                fab
                small
                right
                top
                @click="addFavBooks(book)"
              >
                <v-icon>favorite</v-icon>
              </v-btn>
              <div class="font-weight-light mb-2 black--text">{{book.Title}}</div>
              <v-layout row>
                <div class="font-weight-bold ml-1 black--text">Price:</div>
                <div class="font-weight-bold mx-1 black--text">{{book.Price_discounted}}</div>
                <div
                  class="font-weight-light mb-2 gray--text"
                  style="text-decoration: line-through"
                >{{book.Price_original}}</div>
              </v-layout>
              <v-divider class="pb-1"></v-divider>
              <v-btn flat block class="black--text ma-0" small round @click="addCartBook(book)">
                <v-icon class="mr-1">shopping_cart</v-icon>
                <div class="font-weight-light caption title ma-0">Add to cart</div>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-bottom-sheet v-model="sheet">      
      <v-list>
        <v-subheader>Open in</v-subheader>
        <v-list-tile v-for="tile in tiles" :key="tile.title" @click="sheet = false">
          <v-list-tile-avatar>
            <v-avatar size="32px" tile>
              <img
                :src="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`"
                :alt="tile.title"
              />
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>

<script>
// import dessertTable from "@/components/tables/dessert_table";

export default {
  data() {
    return {
      sheet: true,
      tiles: [
        { img: 'keep.png', title: 'Keep' },
        { img: 'inbox.png', title: 'Inbox' },
        { img: 'hangouts.png', title: 'Hangouts' },
        { img: 'messenger.png', title: 'Messenger' },
        { img: 'google.png', title: 'Google+' }
      ]
    };
  },
  components: {
    
  },
  created: function() {},
  computed: {
    getAllBooks() {
      return this.$store.getters.getAllBooks;
    }
  },
  methods: {
    addFavBooks(book) {
      this.$store
        .dispatch("addFavBooks", book)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addCartBook(book) {
      this.$store
        .dispatch("addCartBook", book)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
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

