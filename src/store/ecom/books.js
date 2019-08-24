
import { fb, fs } from "@/plugins/firebase";

const state = {
  allBooks: [],
  allFav: [],
  allCart: [],
};
const getters = {
  getAllBooks(state) {
    return state.allBooks;
  },
  getAllFav(state) {
    return state.allFav;
  },
  getAllCart(state) {
    return state.allCart;
  },
};
// mutations
const mutations = {

};
// Actions
const actions = {

  fetchAllBooks({ commit, state }, payload) {
    // console.log('in store: getAllUsers')
    return new Promise((resolve, reject) => {
      fs.collection("books")
        .onSnapshot(data => {
          let books = [];
          data.docs.forEach(doc => {
            books.push(doc.data());
          });
          state.allBooks = books;
          resolve(books)
          // console.log("in getAllUsers  -->",users)
        });
    });
  },

  fetchAllFavBooks({ commit, state }, payload) {
    // console.log('in store: getAllUsers')
    return new Promise((resolve, reject) => {
      var uid = localStorage.getItem("userID");
      fs.collection("users").doc(uid).collection("fav")
        .onSnapshot(data => {
          let favBooks = [];
          data.docs.forEach(doc => {
            // console.log(doc.id)
            favBooks.push(doc);
          });
          state.allFav = favBooks;
          resolve(favBooks)
          // console.log("in getAllUsers  -->",users)
        });
    });
  },

  fetchAllCartBooks({ commit, state }, payload) {
    // console.log('in store: getAllUsers')
    return new Promise((resolve, reject) => {
      var uid = localStorage.getItem("userID");
      fs.collection("users").doc(uid).collection("cart")
        .onSnapshot(data => {
          let cartBooks = [];
          data.docs.forEach(doc => {
            cartBooks.push(doc);
          });
          state.allCart = cartBooks;
          resolve(cartBooks)
          // console.log("in getAllUsers  -->",users)
        });
    });
  },

  deleteFavBook({ commit, state }, book) {
    console.log('in store: getAllUsers')
    return new Promise((resolve, reject) => {
      var uid = localStorage.getItem("userID");
      fs.collection("users").doc(uid).collection("fav").doc(book.id).delete().then(function () {
        //update local array
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    });
  },

  deleteCartBook({ commit, state }, book) {
    console.log('in store: getAllUsers')
    return new Promise((resolve, reject) => {
      var uid = localStorage.getItem("userID");
      fs.collection("users").doc(uid).collection("cart").doc(book.id).delete().then(function () {
        //update local array
        console.log("deleteCartBook Document successfully deleted!");
      }).catch(function (error) {
        console.error(" deleteCartBook Error removing document: ", error);
      });
    });
  },


  addFavBooks({ commit, state }, book) {
    // console.log('in state saveMsg')
    return new Promise((resolve, reject) => {

      var uid = localStorage.getItem("userID");
      fs.collection("users").doc(uid).collection("fav").add(book)
        .then(() => {
          resolve('success')
        })
        .catch(() => {
          reject('failed')
        });
    });
  },

  addCartBook({ commit, state }, book) {
    // console.log('in state saveMsg')
    return new Promise((resolve, reject) => {

      var uid = localStorage.getItem("userID");
      fs.collection("users").doc(uid).collection("cart").add(book)
        .then(() => {
          //update local array
          resolve('success')
        })
        .catch(() => {
          reject('failed')
        });
    });
  },


};

export default {
  state,
  getters,
  actions,
  mutations
};
