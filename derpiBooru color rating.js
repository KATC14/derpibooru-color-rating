// ==UserScript==
// @name         derpiBooru color rating
// @description  derpibooru color rating
// @include      https://derpibooru.org/*
// @include      https://twibooru.org/*
// @include      https://furbooru.org/*
// @author      - KATC14
// @require      https://raw.githubusercontent.com/KATC14/useful/master/useful_things.js
// ==/UserScript==

console.log('derpiBooru color rating, now running')

function load(){
  var flexcontainer = document.querySelector(".flex-container");
  if (flexcontainer){console.log("test", flexcontainer)} else {
    var thestart = document.querySelectorAll(".media-box");
    for (var i = 0, max = thestart.length; i < max; i++){
      var div = document.createElement("div");
      div.className = "flex-container";
      var webm = thestart[i].childNodes[1].childNodes[0].childNodes[0]
      var title = thestart[i].childNodes[1].childNodes[0].childNodes[1].title;
      if (title.includes("animated")){
        if(title.includes("animated")){                    var awtype = 'ANIM'}
        if (webm.innerHTML.toLowerCase().includes("webm")){var awtype = 'WEBM'}
        div.innerHTML += `<span class="type-badge ${awtype.toLowerCase()}">${awtype}</span>`
        webm.style.display = 'none'
      }

      //var title = thestart[i].childNodes[1].childNodes[0].childNodes[1].title;
      if (title.includes("safe")){        var rating = "SAFE"}
      if (title.includes("suggestive")){  var rating = "SUGGESTIVE"}
      if (title.includes("questionable")){var rating = "QUESTIONABLE"}
      if (title.includes("explicit")){    var rating = "EXPLICIT"}
      if(rating){div.innerHTML += `<span class="type-badge ${rating.toLowerCase()}">${rating}</span>`;}

      //var title = thestart[i].childNodes[1].childNodes[0].childNodes[1].title;
      //console.log(thestart[i].childNodes[2])
      //var hm = thestart[i].childNodes[0].childNodes[0].childNodes[2]

      //console.log(ComputedStyle(hm, ['border-top-color','border-right-color','border-left-color','border-bottom-color']))
      if (title.includes("grimdark", 1) && !title.includes("semi-grimdark")) { div.innerHTML += inline('GRIMDARK') }
      if (title.includes("grotesque")) {                                       div.innerHTML += inline('GROTESQUE') }
      if (title.includes("semi-grimdark")) {                                   div.innerHTML += inline('SEMI-GRIMDARK') }
      thestart[i].appendChild(div);
    }
  }
  var stylecode1 = `
.webm, .anim{  background: #284a81;}
.safe{         background: #3e9e49}
.suggestive{   background: linear-gradient(to right, #e4e150,#3e9e49)}
.questionable{ background: #ccc948}
.explicit{     background: #e45f5f}
.grimdark{     background: #48733d}
.grotesque{    background: #a50000}
.semi-grimdark{background: #557F55}
.flex-container{
  display: flex;
  flex-direction: column;
  align-Items: flex-start;
  position: absolute;
  top: 24px;
  left: 2px;
}
.type-badge, .webm, .anim{
  z-index: 5;
  left: 0px;
  top: 10px;
  color:#fff;
  text-align: center;
  border-radius: 5px;
  padding: 3px 5px;
  font-size: 60%;
  font-weight: 700;
  border: 1px solid #fff;
}`
  addGlobalStyle(stylecode1)
}
load()
function inline(outline){return '<span class="type-badge {}">{}</span>'.format(outline.toLowerCase(), outline);}
