<template>
  <div>
    <v-dialog
      content-class="vdialognew"
      v-model="chatDialog"
      max-width="25rem"
      transition="slide-y-reverse-transition"
    >
      <!-- <v-flex d-flex  overflow-hidden style="overflow-y: scroll;"> -->
        <v-card class="pt-3 pl-3 pr-3 ma-0">
          <div class="msg_history">
            <div v-for="(m,i) in allMsg" v-bind:key="m.createdAt.toString()+i">
              <v-layout column>
                <v-layout column style="overflow: auto">
                  <caption :class="getCssClass(m)">{{m.msg}}</caption>
                  <p :class="getAuthorCssClass(m)">by {{m.author.split("@")[0]}}</p>
                </v-layout>
              </v-layout>
            </div>
          </div>
          <v-divider class="mt-2 mb-2"></v-divider>
        </v-card>
      <!-- </v-flex> -->
      <v-card class="pt-3 pl-3 pr-3 ma-0">
        <v-layout column class="ma-0">
          <v-flex xs12 sm12 md12>
            <v-layout row align-center justify-center>
              <v-icon large color="black">face</v-icon>
              <p
                class="subtitle-2"
                style="margin-bottom: 0px; padding-left:.5rem;"
              >Welcome to your chat box.</p>
              <v-spacer></v-spacer>
              <v-btn flat fab small @click="saveMsg">
                <v-icon>send</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-textarea
              @keyup.enter="saveMsg"
              v-model="msg"
              color="black"
              class="ma-0"
              counter
              flat
              full-width
              box
              row-height="12"
              solo
            ></v-textarea>
          </v-flex>
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
  props: ["dialog"],
  data() {
    return {
      msg: "",
      allMsg: [],
      chatDialog: false,
      windowSize: {
        x: 0,
        y: 0
      }
    };
  },
  mounted() {
    this.onResize();
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    getCssClass(m) {
      var cl =
        m.author == localStorage.getItem("userEmail")
          ? "sendchat"
          : "recievedchat";
      // console.log(cl);
      return cl;
    },
    getAuthorCssClass(m) {
      var cl =
        m.author == localStorage.getItem("userEmail")
          ? "sendauthordecor"
          : "recievedauthordecor";
      // console.log(cl);
      return cl;
    },
    saveMsg() {
      fs.collection("chat")
        .add({
          author: localStorage.getItem("userEmail"),
          msg: this.msg,
          createdAt: moment(new Date()).format("lll")
        })
        .then(() => {
          this.scrollToBottom();
        });
      this.msg = null;
    },
    fetchMsg() {
      //  .log("before:",this.allMsg)
      // console.log("in MSG methode");
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
    },
    scrollToBottom() {
      let box = document.querySelector(".msg_history");
      box.scrollTop = box.scrollHeight;
    }
  },
  created: function() {
    this.fetchMsg();
  },
  watch: {
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
