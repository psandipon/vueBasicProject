
import { fb , fs } from "@/plugins/firebase";

const state = {
    allChats: [],
    allMsgs: [],
    allUsers: [] ,
    active: 0 ,
};
const getters = {
    getAllChats(state) {
        return state.allChats;
    },
    getAllUsers(state) {
        return state.allUsers;
    },
    getAllMsgs(state) {
        return state.allMsgs;
    },
};
// mutations
const mutations = {

};
// Actions
const actions = {

    getAllUsers({commit,state},payload){
        // console.log('in store: getAllUsers')
        return new Promise((resolve, reject) => {
            fs.collection("users")
            .get().then(data => {
                    let users = [];
                    data.docs.forEach(doc => {                        
                        users.push(doc.data());
                    });
                    state.allUsers = users;                    
                    resolve(users)
                    // console.log("in getAllUsers  -->",users)
                });
        });
    },

    setActive({commit,state}, active){
        return new Promise((resolve, reject) => {
            state.active = active ;
            resolve() ;
        })
    },

    fetchAllChats({ commit, state }, payload) {
        // console.log('in state fetchAllChats')
        return new Promise((resolve, reject) => {

            var uid = localStorage.getItem("userID");
            fs.collection("users")
                .doc(uid)
                .collection("chats")
                .onSnapshot(data => {
                    let chats = [];
                    data.docs.forEach(doc => {
                        chats.push(doc.data());
                    });
                    state.allChats = chats;
                    resolve(chats)
                });
        });
    },

    fetchMsg({ commit, state }, active) {
        // console.log('in state fetchMsg')
        return new Promise((resolve, reject) => {

           
            for (var i = 0; i < state.allChats.length; i++) {
              fs.collection("allChats")
                .doc(state.allChats[i].chatID)
                .collection("chat")
                .orderBy("date")
                .onSnapshot(quarySpanshot => {
                    // console.log("state.allMsgs",state.allMsgs)  
                    // console.log("state.allMsgs",state.allMsgs)           
                  let allmessages = [];
                  quarySpanshot.docs.forEach(doc => {
                    allmessages.push(doc.data());
                  });
                  var chat = { msg: allmessages }; 
                  if(quarySpanshot.docChanges().length == 1) {
                    state.allMsgs[state.active]=(chat); 
                  }
                  else{
                    state.allMsgs.push(chat);
                  }            
                   chat = {};
                   allmessages = [];
                //   console.log(">>>>>>..doesn't it get called ?")
                //   console.log("in fetchMsg this.allMsg --->",state.allMsgs)
                //   console.log("in fetchMsg this.active --->",state.active)
                  resolve()
                });
            }


        });
    },

    saveMsg({ commit, state }, payload) {
        // console.log('in state saveMsg')
        return new Promise((resolve, reject) => {           
            // for (var i = 0; i < state.allChats.length; i++) {
                // var index = this.active;
                // var self = this;
                // console.log("in saveMsg payload.active is -->",payload.active)
                // console.log("in saveMsg index is -->",index)
                fs.collection("allChats")
                  .doc(state.allChats[payload.active].chatID)
                  .collection("chat")
                  .add({
                    author: localStorage.getItem("userEmail"),
                    receiver: state.allChats[payload.active].email,
                    text: payload.msg,
                    date: new Date()
                    // createdAt: moment(new Date()).format("lll")
                  })
                  .then(() => {
                    // this.getChatArray(this.active+1)
                    resolve()
                  });
                // this.msg = null;
            // }


        });
    },



};

export default {
    state,
    getters,
    actions,
    mutations
};
