<template>
  <div>
    <v-dialog content-class="vdialognew" v-model="dialog" max-width="30%" origin="bottom right" transition="slide-y-reverse-transition">
      <v-card class="pa-3 ma-0">
        <!-- <p class="display-2">Chat</p> -->

        <!-- <v-flex  class="offset-xs2"> -->
          <div v-for="(m,i) in allMsg" v-bind:key="m.createdAt.toString()" >
              
            <v-layout row>
              <v-layout row :class="getCssClass(m)">
                  <v-btn fab small color="white"> 
                      <v-icon  color="black" class="">face</v-icon>
                    </v-btn>
                <v-card-title>{{m.msg}}</v-card-title>
                <v-spacer></v-spacer>
                <v-card-title class="authordecor">by {{m.author.split("@")[0]}}</v-card-title>
              </v-layout>
            </v-layout>

          </div>
        <!-- </v-flex> -->
        <v-divider class="mt-2 mb-2"></v-divider>
        
        <v-layout row-wrap class="ma-0">
          <v-text-field @keyup.enter="saveMsg" v-model="msg" color="black" class="ma-0" placeholder="type here">
            <v-icon slot="prepend" color="black">face</v-icon>
          </v-text-field>
          <v-btn small fab @click="saveMsg">
            <v-icon>send</v-icon>
          </v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { fs } from "@/plugins/firebase";
export default {
  name: "privatechat",
  props: ["dialog"],
  data() {
    return {
      msg: "",
      allMsg: []
    };
  },
  methods: {
    getCssClass(m) {
        var cl= ( m.author == localStorage.getItem("userEmail") ) ? "sendchat" : "recievedchat" ;
        console.log(cl)
        return cl 
    },  
    saveMsg() {
      fs.collection("chat").add({
        author: localStorage.getItem("userEmail"),
        msg: this.msg,
        createdAt: new Date()
      });
      this.msg = null;
    },
    fetchMsg() {
      //console.log("before:",this.allMsg)
      console.log("in MSG methode");
      fs.collection("chat")
        .orderBy("createdAt")
        .onSnapshot(quarySpanshot => {
          // console.log('quarySpanshot:',quarySpanshot)
          let allmessages = [];
          quarySpanshot.docs.forEach(element => {
            //  console.log("am i here ?? in then")
            allmessages.push(element.data());
          });
          this.allMsg = allmessages;
          this.allMsg.forEach(ele => {
            // console.log("---->",ele)
          });
        });
      // .catch(function(error) {
      //     //console.log("Error getting document:", error);
      // });
    }
  },
  created: function() {
    this.fetchMsg();
  },
  watch: {
    dialog(val) {
      this.$emit("update:dialog", val);
    }
  }
};
</script>

<style scoped>
::v-deep .vdialognew {
  margin: 1%;
  position: absolute;
  bottom: 0;
  right: 0;
}

.sendchat {
  border-style: solid;
  background-color: gray;
  border-radius: 50px;
  color: white;
  font-weight: bold;
  margin-left: 10%;
}
.recievedchat {
  border-style: solid;
  background-color: rgb(59, 59, 59);
  border-radius: 50px;
  color: white;
  font-weight: bold;
  margin-right: 10%;
}

.authordecor{
    color: black;
    font-weight: normal;
    font-style: italic;
}


</style>
