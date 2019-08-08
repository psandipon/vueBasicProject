<template>
  <div>
    <confirmation
      :confirm="confirm"
      @customConfirmEmit="changeConfirm"
      @deleteDirection="deleteDirection"
    ></confirmation>
    <v-layout column>
      <v-card flat dark class="mx-0">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Dessert Data</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-text-field
            v-model="search"
            prepend-inner-icon="search"
            label="Search"
            class="mt-0"
            hide-details
            solo
            flat
            color="white"
            single-line
          ></v-text-field>
          <v-spacer />
          <v-card flat>
            <v-card-actions>
              <v-btn
                color="white text-uppercase black--text"
                dark
                @click="addNewItem()"
              >add new items</v-btn>
            </v-card-actions>
          </v-card>

          <myForm :index="index" :item="dessert" :dialog="dialog" @updateformdialog="updatedialog"></myForm>
        </v-layout>
      </v-card>
      <v-layout column>
        <v-data-table :headers="headers" :items="getDesserts" :search="search" class="elevation-1">
          <template v-slot:items="props">
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.id }}</td>
            <td class="text-xs-center">{{ props.item.calories }}</td>
            <td class="text-xs-center">{{ props.item.fat }}</td>
            <td class="text-xs-center">{{ props.item.carbs }}</td>
            <td class="text-xs-center">{{ props.item.protein }}</td>
            <td class="text-xs-center">{{ props.item.iron }}</td>
            <td>
              <v-layout justify-center>
                <v-icon @click="editItem(props.item)">edit</v-icon>
              </v-layout>
            </td>
            <td>
              <v-layout justify-center>
                <v-icon @click="deleteItem(props.item)">delete</v-icon>
              </v-layout>
            </td>
          </template>
          <template v-slot:no-results>
            <v-alert
              :value="true"
              color="error"
              icon="warning"
            >Your search for "{{ search }}" found no results.</v-alert>
          </template>
        </v-data-table>
      </v-layout>
    </v-layout>
  </div>
</template>
<script>
import myForm from "../forms/myForm";
import confirmation from "@/layout/confirmation";
export default {
  components: {
    myForm,
    confirmation
  },
  data() {
    return {
      index: -1,
      dialog: false,
      search: "",
      confirm: false,
      dessert: {},
      // deleteDirection: false ,
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "center",
          sortable: false,
          value: "name"
        },
        {
          text: "ID)",
          align: "center",

          value: "id"
        },
        { text: "Calories", align: "center", value: "calories" },
        { text: "Fat (g)", align: "center", value: "fat" },
        { text: "Carbs (g)", align: "center", value: "carbs" },
        { text: "Protein (g)", align: "center", value: "protein" },
        { text: "Iron (%)", align: "center", value: "iron" },
        { text: "Edit", sortable: false, align: "center", value: "iron" },
        { text: "Delete", sortable: false, align: "center", value: "iron" }
      ]
    };
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;
      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    },
    getDesserts() {
      return this.$store.getters.getDesserts;
    },
    getDessert() {
      return this.$store.getters.getDessert;
    }
  },
  methods: {
    changeConfirm(val) {
      this.confirm = val;
    },
    updatedialog(val) {
      this.dialog = val;
    },
    addNewItem() {
      this.index = -1;
      this.dessert = Object.assign({}, this.$store.getters.getDessert);
      this.dialog = !this.dialog;
    },
    editItem(item) {
      this.index = this.$store.getters.getDesserts.indexOf(item);
      // console.log("1", this.index) ;
      this.dessert = Object.assign({}, item);
      // console.log(this.dessert);
      this.dialog = !this.dialog;

      // const clone = Object.assign({}, this.getDessert);
    },
    deleteItem(item) {
      this.confirm = true;
      this.dessert = item ;
    },
    deleteDirection(val) {
      // console.log("i am in deleteDirection", val);
      if (val) {
        this.$store.dispatch("deleteItemAction", this.dessert).then(() => {
          this.$toasted.show("Item Deleted", {
            theme: "outline",
            position: "bottom-center",
            duration: 2000,
            icon: "delete",
            fitToScreen: true
          });
        });
      }
    }
  }
};
</script>
<style scoped>
</style>
