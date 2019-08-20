<template>
  <div>
    <v-dialog
      content-class="vdialognew"
      v-model="chatDialog"
      max-width="25rem"
      transition="slide-y-reverse-transition"
    >
      <v-card>
        <v-layout row>
          <v-card-title class="title">Chat Box</v-card-title>
          <v-spacer></v-spacer>
          <v-card-title class="caption pa-0">Add New person</v-card-title>
          <v-btn fab depressed small @click="ps=!ps">
            <v-icon>add</v-icon>
          </v-btn>
        </v-layout>
      </v-card>

      <v-tabs v-model="active" color="gray" dark slider-color="rgb(159, 159, 159)">
        <v-tab
          v-for="n in allChatIDs.length"
          :key="n"
          ripple
        >{{allChatIDs[n-1].email.split("@")[0]}}</v-tab>
        <!-- <v-tabs-items @change="showActive('in tab items')"> -->
        <v-tabs-items>
          <v-tab-item v-for="n in allChatIDs.length" :key="n">
            <v-card class="pt-3 pl-3 pr-3 ma-0 scroll" height="350" v-chat-scroll>
              <div v-for="(m,i) in  getChatArray(n)" v-bind:key="'key'.toString()+i">
                <v-layout column>
                  <v-layout column style="overflow: auto">
                    <caption :class="getCssClass(m)">{{m.text}}</caption>
                    <p :class="getAuthorCssClass(m)">by {{m.author}}</p>
                  </v-layout>
                </v-layout>
              </div>
              <v-divider class="mt-2 mb-2"></v-divider>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>

      <v-card class="pt-3 pl-3 pr-3 ma-0">
        <v-layout column class="ma-0">
          <v-flex xs12 sm12 md12>
            <v-layout row align-center justify-center>
              <v-icon large color="black">face</v-icon>
              <p class="subtitle-2" style="margin-bottom: 0px; padding-left:.5rem;">Type below.</p>
              <v-spacer></v-spacer>
              <v-btn class="mr-0" flat round small @click="saveMsg()">
                <p class="subtitle-2 pr-1 mb-0">send</p>
                <v-icon>send</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>

          <v-flex xs12 sm12 md12>
            <v-textarea
              @keyup.enter="saveMsg()"
              v-model="msg"
              color="black"
              class="ma-0 mt-2"
              counter
              flat
              full-width
              box
              solo
              rows="1"
            ></v-textarea>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>

    <!-- person selection dialog -->
    <v-dialog
      v-model="ps"
      max-width="25rem"
      content-class="vdialognew"
      transition="slide-y-reverse-transition"
    >
      <v-card>
        <v-layout column>
          <v-layout column>
            <v-layout row>
              <v-card-title class="title text-uppercase font-weight-light">Choose a person</v-card-title>
              <v-spacer></v-spacer>
              <v-btn small flat fab @click="ps=!ps">
                <v-icon>close</v-icon>
              </v-btn>
            </v-layout>
            <v-text-field
              v-model="search"
              prepend-inner-icon="search"
              label="Search"
              class="mt-0"
              hide-details
              solo-inverted
              clearable
              color="black"
              single-line
            ></v-text-field>
          </v-layout>

          <v-divider></v-divider>
          <v-layout align-center>
            <v-card class="scroll" height="550">
              <v-layout row wrap>
                <!-- {{getAllUsers}} -->
                <v-data-table
                  :headers="headers"
                  :items="addableUsers"
                  :search="search"
                  class="elevation-1"
                  hide-actions
                >
                  <template v-slot:items="props">
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.email }}</td>
                    <td class="text-xs-center">
                      <v-btn fab flat small class="pt-2 pb-3 ma-0 mr-0">
                        <v-icon>add</v-icon>
                      </v-btn>
                    </td>
                    <!-- <td class="text-xs-right">{{ props.item.email }}</td>                   -->
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
            </v-card>
          </v-layout>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { fs } from "@/plugins/firebase";
import moment from "moment";

export default {
  name: "privatechat",
  props: ["dialog", "user"],
  data() {
    return {
      ps: false,
      active: 0,
      offsetTop: 0,
      msg: "",
      allMsg: [],
      chatDialog: false,
      allChatIDs: [],
      search: "",
      addableUsers: [] ,
      headers: [
        { text: "Name", align: "center", sortable: false, value: "name" },
        { text: "Email", align: "center", sortable: false, value: "email" },
        { text: "Add", align: "center", sortable: false, value: "add" }
      ]
    };
  },
  computed: {
    getAllChats() {
      this.allChatIDs = this.$store.getters.getAllChats;
      return allChatIDs;
    },
    getAllMsgs() {
      return this.$store.getters.getAllMsgs;
    },
    getAllUsers() {
      var allUsers = this.$store.getters.getAllUsers;
      return allUsers;
      // while (this.allChatIDs.email == ){

      // }
      // return allUsers.filter((user)=>{
      //   console.log("++ this.allChatIDs.email",this.allChatIDs)
      //        console.log("++ user.email",user.email)
      //    for(var i = 0 ; i < this.allChatIDs.lenght ; i++) {
      //      console.log("++ this.allChatIDs.email",this.allChatIDs.email)
      //        console.log("++ user.email",user.email)
      //      if (this.allChatIDs.email.match(user.email)){
      //         return false ;
      //      }
      //    }
      //    return true ;
      //   // console.log("user ->",user)
      // });
      // return allUsers ;
    }
  },
  methods: {
    getChatArray(n) {
      // console.log("in getchatarray ", this.allMsg);
      // console.log("in getchatarray n=", n);
      if (typeof this.$store.getters.getAllMsgs[n - 1] !== "undefined") {
        return this.$store.getters.getAllMsgs[n - 1].msg;
      }
    },
    initialize() {
      this.$store.dispatch("fetchAllChats", []).then(chatIDs => {
        this.allChatIDs = this.$store.getters.getAllChats;
        this.$store.dispatch("getAllUsers", []).then(users => {
          this.addableUsers = users.filter(user => {
            for (var i = 0; i < chatIDs.length; i++) {
              console.log(i);
              if (chatIDs[i].email.match(user.email)) {
                console.log("in if");
                return false;
              }
            }
            return true;
          });

        });

        this.$store.dispatch("fetchMsg", this.active).then(() => {
          this.allMsg = this.$store.getters.getAllMsgs;
          // console.log(this.getAllMsgs)
        });
      });
    },
    saveMsg() {
      //  console.log("in saveMSG then 1-->",this.allMsg)
      this.$store
        .dispatch("saveMsg", { active: this.active, msg: this.msg })
        .then(() => {
          this.msg = null;
          // console.log("in saveMSG then 2 -->",this.allMsg)
        });
    },

    // CSS class
    getCssClass(m) {
      var cl =
        m.author == localStorage.getItem("userEmail")
          ? "sendchat"
          : "recievedchat";
      return cl;
    },
    getAuthorCssClass(m) {
      var cl =
        m.author == localStorage.getItem("userEmail")
          ? "sendauthordecor"
          : "recievedauthordecor";
      return cl;
    }
  },

  created: function() {
    this.initialize();
  },
  watch: {
    active(val) {
      this.$store.dispatch("setActive", val).then(() => {
        // console.log(" active dispatched, active current val is =", val);
      });
    },
    chatDialog(val) {
      this.$emit("changedChatDialog", val);
    },
    dialog(val) {
      this.chatDialog = val;
    }
  }
};
</script>

<style scoped>
::v-deep .vdialognew {
  margin-right: 1%;
  margin-bottom: 0%;
  position: absolute;
  bottom: 0;
  right: 0;
}

::v-deep .scroll::-webkit-scrollbar {
  width: 3px;
}

::v-deep .scroll::-webkit-scrollbar-track {
  background: #ddd;
}

::v-deep .scroll::-webkit-scrollbar-thumb {
  background: #aaa;
}

.scroll {
  overflow-y: auto;
}

.sendchat {
  border-style: solid;
  background-color: gray;
  color: white;
  font-weight: bold;
  margin-right: 1.3em;
  margin-left: 2em;
  padding: 3%;
  text-align: justify;
  position: relative;
  border-radius: 1rem;
}

.sendchat::after {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 19px solid transparent;
  border-left-color: gray;
  border-right: 0;
  border-bottom: 0;
  margin-top: -9.5px;
  margin-right: -19px;
}

.recievedchat {
  border-style: solid;
  background-color: rgb(59, 59, 59);
  color: white;
  font-weight: bold;
  margin-right: 2em;
  margin-left: 1.1em;
  padding: 3%;
  text-align: justify;
  position: relative;
  border-radius: 1rem;
}

.recievedchat:after {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 20px solid transparent;
  border-right-color: rgb(59, 59, 59);
  border-left: 0;
  border-top: 0;
  margin-top: -10px;
  margin-left: -20px;
}

.sendauthordecor {
  color: black;
  font-weight: normal;
  font-style: italic;
  margin-left: 10%;
  margin-right: 0.5rem;
  float: right;
  position: relative;
  margin-bottom: 0px;
  text-align: right;
  font-size: 0.8rem;
}

.recievedauthordecor {
  color: black;
  font-weight: normal;
  font-style: italic;
  margin-left: 0.5rem;
  margin-right: 10%;
  margin-bottom: 0px;
  text-align: left;
  font-size: 0.8rem;
}
</style>
