var app = new Vue({
  el : "#app",
  data : {
    data : null,
    pdata : null,
    p : "https://poker9x.github.io/box-music/",
    au : new Audio(),
    load : true,
    index : "home",
    ran : true,
    re : true,
    title : "Bài Hát Mới"
    
  },
  methods : {
    formatTime(s) {
      given_seconds = s;
    
      dateObj = new Date(given_seconds * 1000);
      hours = dateObj.getUTCHours();
      minutes = dateObj.getUTCMinutes();
      seconds = dateObj.getSeconds();
    
      timeString =
        "" + minutes.toString().padStart(2, '0') +
        ':' + seconds.toString().padStart(2, '0');
    
      return timeString;
    },
    indexPt(arr, ob) {
      for (var i in arr) {
        if (arr[i].uid == ob.uid) {
          return i
        }
      }
    },
    loadPlay(id,n){
      this.index = "play"
      this.load = true
      
      var state = {name: location.href, page: document.title};
        window.history.pushState(state, "play box","play");
       
      app.$http.get("https://pokerboy.000webhostapp.com/api/mp3/api.php?u=play&id="+id).then(e => {
       
        app.load = false
        var js = e.body;
        app.pdata = js;
        app.au.src = js.link["128"]
        if(n != 0){
          this.au.play();
        }
         
      });
    },
    open(e){
      this.loadPlay(e.target.id,0)
    },
    play(e){
      var el = e.target;
      var total = document.querySelector("#total");
      var cur = document.querySelector("#cur");
      var range = document.querySelector(".slide")
      var banner = document.querySelector(".banner img");
      banner.style.animation = "rotation 7s infinite linear"
     
      
      total.innerHTML = this.formatTime(this.au.duration)
      if(el.src == this.p+"play.svg"){
          el.src = this.p+"pau.svg";
          this.au.play();
          
        } else {
          el.src = this.p+"play.svg";
          this.au.pause();
          
        }
        
        this.au.ontimeupdate = function() {
          
          var pt = app.au.currentTime / app.au.duration * 100;
          range.value = pt;
          cur.innerHTML = app.formatTime(app.au.currentTime);
          if(app.au.currentTime >= app.au.duration){
            if(app.ran == false){
              app.random()
            } else if(app.re == false){
              app.next();
            }
          }
        }
        range.onchange = function() {
          var seekto = app.au.duration * (this.value / 100);
          app.au.currentTime = seekto;
          var pt = app.au.currentTime / app.au.duration * 100;
          range.value = pt;
        }
        
      },
      next(){
        var id = Number(this.indexPt(app.data,app.pdata))+1;
        var uid = this.data[id].uid;
        app.au.pause();
        this.loadPlay(uid,1)
      },
      prev() {
        var id = Number(this.indexPt(app.data, app.pdata)) - 1;
        var uid = this.data[id].uid;
        app.au.pause();
        this.loadPlay(uid, 1)
      },
      random(){
        var id = Math.floor(Math.random() * 101);
        var uid = this.data[id].uid;
        app.au.pause();
        this.loadPlay(uid, 1)
      },
      rand(e){
        if(this.ran){
          this.ran = false
        } else {
          this.ran = true
        }
        this.re = true
      },
      ref(e){
        if (this.re) {
          this.re = false
        } else {
          this.re = true
        }
        this.ran = true
      }
      
  }
})


app.$http.get("https://pokerboy.000webhostapp.com/api/mp3/api.php?u=home").then(e => {
 app.load = false
  var js = e.body;
  app.data = js;
  
});

window.onpopstate = function(event) {
  app.index = "home"
};
document.querySelector(".tit").onclick = function(){
  app.load = true
  app.$http.get("https://pokerboy.000webhostapp.com/api/mp3/api.php?u=home").then(e => {
    app.load = false
    var js = e.body;
    app.data = js;
  });
}
function search(e){
  var t = e;
  app.load = true
  app.$http.get("https://pokerboy.000webhostapp.com/api/mp3/api.php?u=search&id="+e.value).then(e => {
    app.load = false
    var js = e.body.zingmp3;
    app.data = js;
    app.title = "Tìm Kiếm : "+t.value
  });
}

document.querySelector(".search").onclick = function(){
  var inp = document.querySelector(".inp");
  if(inp.style.display == "block"){
    inp.style.display = "none"
  } else {
    inp.style.display = "block"
  }
}
