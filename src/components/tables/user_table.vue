<template>
  <div> 
    <confirmation :confirm="confirm" @customConfirmEmit="changeConfirm"> </confirmation>
   
    <v-layout column>
      <v-card  flat dark class="mx-0">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">User Data</v-card-text>
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

          <userForm :index="index" :item="user" :dialog="dialog" @updateformuserdialog="updatedialog"></userForm>
        </v-layout>
      </v-card>
      <v-layout column>
        <v-data-table :headers="headers" :items="getUsers" :search="search" class="elevation-1">
          <template v-slot:items="props">
            <td class="text-xs-center">{{ props.item.user_id }}</td>
            <td class="text-xs-center">{{ props.item.user_name }}</td>
            <td class="text-xs-center">{{ props.item.email }}</td>
            <td class="text-xs-center">{{ props.item.date }}</td>
            <!-- <td class="text-xs-center">{{ props.item.created_at }}</td>
            <td class="text-xs-center">{{ props.item.updated_at }}</td> -->
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
import userForm from "@/components/forms/userForm";
import confirmation from "@/layout/confirmation";
export default {
  components: {
    userForm,confirmation
  },
  data() {
    return {
      index: -1,
      dialog: false,
      search: "",
      confirm:false ,
      user: {},
      headers: [
        {
          text: "ID",
          align: "center",
          value: "user_id"
        },
        {
          text: "Name",
          align: "center",
          value: "user_name"
        },
        { text: "Email", align: "center", sortable: false, value: "email" },
        { text: "Date", align: "center", value: "date" },
        // { text: "Created At", align: "center", value: "created_at" },
        // { text: "Updated At", align: "center", value: "updated_at" },
        { text: "Edit", sortable: false, align: "center", value: "iron" },
        { text: "Delete", sortable: false, align: "center", value: "iron" }
      ]
    };
  },
  created: function () {
    this.$store.dispatch('fetchUsersAction')
  },
  computed: {
    getUsers() {
      return this.$store.getters.getUsers;
    },
    getUser() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    changeConfirm(val){
      this.confirm = val
    },
    updatedialog(val){
      this.dialog = val
    },
    addNewItem() {
      this.index = -1;
      this.user = Object.assign({}, this.$store.getters.getUser);
      this.dialog = !this.dialog;
    },
    editItem(item) {
      this.index = this.$store.getters.getUsers.indexOf(item);
      this.user = Object.assign({}, item);
      this.dialog = !this.dialog;
    },
    deleteItem(item) {
      this.$store.dispatch("deleteUserAction", item)
      .then(()=>{
        this.$store.dispatch('fetchUsersAction')
        this.$toasted.show(""+this.$store.getters.getMessage, {
          theme: "outline",
          position: "bottom-center",
          duration: 2000,
          icon: "delete",
          fitToScreen: true
        });
      })
      .catch((e)=>{
        console.log("in user_table:",e);
      });
     
    }
  }
};
</script>
<style scoped>
</style>
