!(function (){
  function Element(name,ob){
    var root = document.createElement(name);
    for(var i in ob){
      root[i] = ob[i];
    }
    return root
  }
  window.Box = {
    alert(ob){
      var bg = Element("div",{
        className: "bg"
      })
      var popup = Element("div",{
        className: "popup"
      });
      var title = Element("div",{
        innerHTML: ob.title,
        className: "title"
      });
      var body = Element("div", {
        innerHTML: ob.body,
        className: "body"
      });
      var button = Element("div", {
        className: "button"
      });
      var bok = Element("button", {
        innerHTML: "Đóng",
        className: "body"
      });
      
      button.appendChild(bok)
      popup.appendChild(title);
      popup.appendChild(body);
      popup.appendChild(button);
      bg.appendChild(popup);
      
      bok.onclick = () => {
        bg.remove()
      }
      document.body.appendChild(bg);
    }
  }
})()