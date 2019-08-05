<template>
  <div>
      <v-card class="pa-4 ma-3">
        <p class="display-2">Chat</p>

        <v-flex xs7 offset-xs5 offset-md5 offset-lg5>
            <div v-for="m in allMsg" v-bind:key="m.msg" >
                <v-card color="blue white--text ma-2" >
                    <v-layout row>
                    <v-icon color="black" class="pl-2">face</v-icon>
                    <v-card-title> {{m.msg}} </v-card-title>
                    </v-layout>
                </v-card>
                    <p class="pl-3">by {{m.author}}  </p>
            </div>
        </v-flex>

        <v-layout row-wrap class="ma-2">
            <v-text-field @keyup.enter="saveMsg" v-model="msg" color="black" class="ma-0">
            <v-icon slot="prepend" color="black">face</v-icon>
            </v-text-field>
            <v-btn @click="saveMsg">
                <v-icon>send</v-icon>
            </v-btn>
        </v-layout>
      </v-card>
  </div>
</template>

<script>
import {fs} from '@/plugins/firebase'
export default {
    name:'privatechat',
    data(){
        return{
            msg: "",
            allMsg: [],
        }
    },
    methods:{
        saveMsg(){
            
             fs.collection('chat').add({
                 author:this.$store.getters.getAuthUser.email,
                 msg:this.msg,
                 createdAt: new Date(),
             })
             this.msg = null ;

        },
        fetchMsg(){
            //console.log("before:",this.allMsg)
            console.log("in MSG methode",)
            fs.collection('chat').orderBy('createdAt').onSnapshot((quarySpanshot)=>{
                   // console.log('quarySpanshot:',quarySpanshot)
                    let allmessages=[];
                    quarySpanshot.docs.forEach(element => {
                      //  console.log("am i here ?? in then")
                        allmessages.push(element.data())
                    });
                    this.allMsg = allmessages ;
                    this.allMsg.forEach(ele=>{
                        // console.log("---->",ele)
                    })
                    
                }
            )
            // .catch(function(error) {
            //     //console.log("Error getting document:", error);
            // });
            
        }
    },
    created: function (){
        this.fetchMsg() ;
    },

};
</script>

<style scoped>
</style>
