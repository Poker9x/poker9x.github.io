/*
- App Chat With Vuejs And FireBase
- Code By : Poker
- Time : 10/8/2020
*/
var firebaseConfig = {
  apiKey: "AIzaSyA_PMLX5H5AA-M19VZqHhBZu4agBrfXkAU",
  authDomain: "poker-1581918749748.firebaseapp.com",
  databaseURL: "https://poker-1581918749748.firebaseio.com",
  projectId: "poker-1581918749748",
  storageBucket: "poker-1581918749748.appspot.com",
  messagingSenderId: "141138005125",
  appId: "1:141138005125:web:dd4eb20c9ac36612946dec",
  measurementId: "G-X4H5BZ45KZ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

var app = new Vue({
  el : "#app",
  data : {
    data : null,
    name : "",
    nd : "",
    page : 3
  },
  methods : {
    pg(arr) {
      if (arr.length > 10) {
       return arr.slice(0, 10)
      }
      return arr;
    },
    pre(){
      
    },
    next(){
      
    },
    chat(){
    
      var d = new Date();
      var gdata = this.data;
      gdata.unshift({
        name : this.name,
        time : d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear(),
        nd : this.nd
      });
      
      db.collection("chat").doc("list").set({chat: this.pg(gdata)})
        .then(function() {
          
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
          this.nd = "";
      this.data = this.pg(this.data)
    },
    
  }
})
function gett(c){
var docRef = db.collection("chat").doc("list");
docRef.get().then(function(doc) {
  if (doc.exists) {
     c(doc.data().chat);
    
  } else {
    console.log("No such document!");
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
});
}
gett(function(c){
  app.data = c
 
})
