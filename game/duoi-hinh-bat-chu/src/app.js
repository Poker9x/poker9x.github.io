var is = false;

function Game(prop){
  var dt = randArr(prop.attrs.dt);
  var round = 0;
  function next(n){
    var text = removeAccents(dt[n].text.replaceAll(/\s/g,''));
    var ch = rand(text)
    var img = dt[n].link;
    var kq = text.split("");
    var dp = text.split("");
    var state = createState(kq);
    var sid = 0;
    var coin = 100;
    
    return { text,ch,img,kq,dp,state,sid,coin }
  }
  var state = next(round);
  var st = {
    id: 0,
    data: []
  }
  
  return {
    view: () => (
      m("div.game",[
        m("div.bar",[
          m("button.back",{
            onclick: () => is = false
          },"Back"),
          m("button.round",round),
          m("button.coin",localStorage.login || state.coin)
        ]),
        m("div.main",[
          m("div.img",m("img",{ src: state.img})),
          m("div.table",state.state.map((k,v) => {
            return m("button.o",{
              onclick: e => {
                var kt = e.target.innerHTML;
                if((state.sid > 0 && kt != "") && (state.sid - 1 == v)){
              
                  state.state[state.sid - 1] = "";
                  state.sid--;
                  var poker = st.data.filter(vl => vl.tt == v)[0];
                  var vt = st.data.indexOf(poker);
           
                  state.ch[poker.id] = poker.text;
                  st.id--;
                  st.data.pop();
                  
                }
              }
            },k)
          }))
        ]),
        m("div.sel",state.ch.map((k,v) => {
          return m("button.o",{
            onclick: e => {
              var kt = e.target.innerHTML;
              if(state.sid < state.kq.length){
                state.state[state.sid] = k;
                state.ch[v] = "";
                if(k != "") state.sid++;
                st.data.push({
                  tt: st.id,
                  id: v,
                  text: kt
                });
                st.id++;
              }
            }
          },k)
        })),
        m("div.check",m("button",{
          onclick: () => {
            var st = "";
            for(var i of state.state){
              st += i;
            }
            if(localStorage.login < 20){
              alert("Coin Của Bạn Đã Hết =))");
            } else {
            if(st == state.text){
              alert(dt[round].text+" Chính Xác");
              round++;
              localStorage.login = localStorage.login ? Number(localStorage.login) + 50 : state.coin + 50;
              state = next(round);
            } else {
              alert("Sai Rồi !. Thử Lại Đê !!. Bạn Bị Trừ 50 Coin");
              localStorage.login = localStorage.login - 20;
            }
            }
          }
        },"Kiểm Tra"))
      ])
    )
  }
}

function Home(){
  
  return {
    view: () => (
      m("div.mb",
      m("div.home",[
        m("div.logo","Đuổi Hình Bắt Chữ"),
        m("ul.menu",[
          m("li",{
            onclick: () => is = true
          },"Bắt Đầu"),
          m("li",{
            onclick: () => Box.alert({
              title: "Hướng Dẫn",
              body: "Nhìn Vào Hình Ảnh Và Đoán Từ Của Nó Dựa Vào Các Chữ Được Đảo Lộn Ở Bên Dưới",
            })
          },"Hướng Dẫn"),
          m("li",{
            onclick: () => Box.alert({
              title: "Thông Tin",
              body: '<ul><li>Tác Giả : Poker</li><li>Liên Hệ : http://fb.com/poker.0910</li><li>Phiên Bản : 1.0.0</li><ul>',
            })
          },"Thông Tin"),
          m("li","Thoát"),
        ])
      ]))
    )
  }
}


function App(){
  var url = "http://poker.hamchoi.net/api/dhbc/";
  
  var dt = {};
  fetch(url).then(res => res.json())
  .then(data => {
    dt = data
  });
  return {
    view: () => (
      m("div.app",is ? m(Game,{dt:dt}) : m(Home))
    )
  }
}

m.mount(document.body,App);


function removeAccents(str) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ", "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ"    
  ];
  for (var i=0; i<AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}

function rand(text){
  var abc = "ABCDEGHIKLMNOPQRTSUXY";
  var num = 14 - text.length;
  var rt = "";
  for(var i in abc){
    if(text.indexOf(abc[i]) < 0){
      rt += abc[i];
    }
  }
  var rds = Math.floor(Math.random() * Number(rt.length - num)) + 0;
  var newStr = rt.slice(rds,rds + num)+text;
  var arr = [];
  for(var i = newStr.length - 1;i >= 0;i--){
    var rd = Math.floor(Math.random() * (i + 1));
    var tmp = newStr[rd];
    newStr[rd] = newStr[i];
    newStr[i] = tmp;
    arr.push(newStr[i]);
  }
  return arr;
}
function createState(arr){
  var s = [];
  for(var i in arr){
    s.push("");
  }
  return s;
}
function randArr(arr){
  var ar = []
  for(var i = arr.length - 1;i > 0;i--){
    var rd = Math.floor(Math.random() * (i + 1));
    var tmp = arr[rd];
    arr[rd] = arr[i];
    arr[i] = tmp;
    ar.push(arr[i]);
  }
  return arr;
}

