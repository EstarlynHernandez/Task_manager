document.onload=i();function i(){u(),d(),r(".task"),r(".groupItem")}function u(){let e=document.querySelectorAll(".checked"),n=document.querySelectorAll(".delete"),l=document.querySelector("#type"),c=document.querySelector("#count"),o=document.querySelectorAll(".taskExtra");e.forEach(t=>{t.onclick=s=>{t.parentElement.parentElement.classList.toggle("task__complete"),t.children[0].submit()}}),n.forEach(t=>{t.onclick=s=>{t.parentElement.classList.toggle("deleting"),t.children[0].submit()}}),l.onchange=()=>{c&&c.classList.add("dnone"),l.value!="normal"&&(c=document.querySelector("#"+l.value),c.classList.remove("dnone"))},o.forEach(t=>{t.childElementCount>0&&!t.parentElement.parentElement.classList.contains("task__complete")&&(t.onclick=()=>{m(t)})})}function r(e){let n=document.querySelectorAll(e),l,c,o;n.forEach(t=>{t.addEventListener("touchstart",s=>{c=!0,l=s.touches[0].screenX}),t.addEventListener("touchmove",s=>{c&&(o=s.touches[0].screenX-l,o>-120&&o<5&&(t.style="left:"+o+"px"))}),t.addEventListener("touchend",()=>{c=!1,o<-30?t.style="left: -80px":t.style="left: 0px"})})}function d(){let e=document.querySelector(".create"),n=document.querySelectorAll(".closeTab"),l=document.querySelector(".createTab"),c=document.querySelector("#content"),o=document.querySelector("#openMenu"),t=document.querySelector("#menu"),s=document.querySelector(".shadow");o&&(o.onclick=()=>{t.classList.remove("dnone"),c.classList.add("blur"),e.classList.add("dnone"),s.classList.remove("dnone")}),n.forEach(a=>{a.onclick=()=>{t.classList.add("dnone"),e.classList.add("dnone"),s.classList.add("dnone"),c.classList.remove("blur")}}),l.onclick=()=>{e.classList.remove("dnone"),s.classList.remove("dnone"),c.classList.add("blur")}}function m(e){let n=e.querySelector(".value"),l=e.querySelector(".value-2");e.classList.contains("count")?f(parseInt(n.innerText),parseInt(l.innerText),n)&&e.parentElement.querySelector(".checked form").submit():e.classList.contains("time")&&L(n,l)}function f(e,n,l){return!(e<n&&(l.innerText=e+1,e+1<n))}function L(e,n){if(e.classList.contains("isOn"))e.classList.remove("isOn");else if(e.classList.add("isOn"),e.innerText>0||n.innerText>0){let l=setInterval(()=>{e.classList.contains("isOn")||clearInterval(l),n.innerText>0?n.innerText-=1:e.innerText>0?(e.innerText-=1,n.innerText=59):(e.parentElement.parentElement.parentElement.querySelector(".checked form").submit(),clearInterval(l))},1e3)}return!1}
