<template>
  <div>
   
    <v-layout row justify-center>
      <v-dialog v-model="formdialog" persistent max-width="600px">
        <v-card>
          <v-card dark>
            <v-card-title>
                <span class="headline text-uppercase">{{getTitle()}}</span>
                <v-spacer></v-spacer>
                <v-btn fab class="ma-0 pa-0 elevation-5" small color="white black--text " @click="formdialog = false">
                  <v-icon medium >close</v-icon> 
                </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field color="black" v-model="item.name" label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field color="black" v-model="item.calories" label="calories"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field color="black" v-model="item.fat"  label="fat"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field color="black" v-model="item.carbs"  label="carbs"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field color="black" v-model="item.protein" label="protein"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field color="black" v-model="item.iron" label="iron"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider> </v-divider>
          <v-card-actions>
            <v-layout justify-center>
            <v-btn v-if="ifSave()" color="grey darken-3 white--text" @click="save(item)">Save</v-btn>
             <v-btn color="grey darken-3 white--text" @click="reset()">Reset</v-btn>
            <v-btn v-if="!ifSave()" color="grey darken-3 white--text" @click="edit(item)">Edit</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
export default {
  props: ["index", "dialog", "item"],

  data() {
    return {
       formdialog: false
    };
  },
  methods: {
    getTitle() {
      return (this.index==-1)? "add new item" : "edit this item";
    },
    reset(){
      this.item = Object.assign({},this.$store.getters.getDessert) ;
    },
    edit(item){
      this.$store.dispatch("editItemAction", [item, this.index]);
      this.$emit("update:dialog", false);
      // this.dialog = false 
    },
    save(item){
      var nItem = Object.assign({},item)
      nItem.id = this.$store.getters.getDesserts.length +1 ;
      this.$store.dispatch("saveItemAction", nItem);
      this.$emit("update:dialog", false);
    },
    ifSave(){
      return  (this.index==-1)? true : false ; 
    }
  },
  watch: {
    dialog(val) {
      // this.$emit("update:dialog", val);
      this.formdialog =  this.dialog
    },
    formdialog(val){
      this.$emit("updateformdialog",val)
    }
  }
};
</script>