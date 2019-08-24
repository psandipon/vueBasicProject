<template>

                <div  id="scrolling-techniques" class="scroll">
            <v-container style="height: 500px; padding: 0px; " fluid grid-list-md>
              <v-layout row wrap class>
                <v-flex
                  v-for="(book) in getAllCart"
                  :key="book.data().Image"
                  v-bind="{ [`xs${6}`]: true }"
                >
                  <v-card class="ma-1" elevation="5"  >
                    <v-img :src="book.data().Image" height="150" ></v-img>
                    <v-card-text class="pt-4" style="position: relative;">
                      <v-btn absolute color="black" class="white--text" fab  small right top @click="deleteCartBook(book)">
                        <v-icon>close</v-icon>
                      </v-btn>                     
                      <div class="font-weight-light  mb-2 black--text ">{{book.data().Title}}</div>
                       <v-layout row>  
                        <div class=" font-weight-bold ml-1 black--text ">Price:</div>                 
                        <div class=" font-weight-bold mx-1 black--text ">{{book.data().Price_discounted}}</div>
                        <div class="font-weight-light mb-2 gray--text " style="text-decoration: line-through">{{book.data().Price_original}}</div>
                      </v-layout> 
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </div>
    
</template>

<script>
// import dessertTable from "@/components/tables/dessert_table";

export default {
  data() {
    return {
    };
  },
  components: {
    
  },
  created: function() {
      
  },
   computed: {
    getAllCart() {     
      return this.$store.getters.getAllCart;
    },
   },
   methods: {
      deleteCartBook(book) {      
      this.$store.dispatch("deleteCartBook", book).then(res => {
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
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

