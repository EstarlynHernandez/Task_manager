document.onload=m();function m(){r(),S(),p()}function S(){document.querySelectorAll(".checked"),document.querySelectorAll(".delete");let t=document.querySelector(".shadow"),l=document.querySelector("#content"),c=document.querySelector(".create"),e=document.querySelector(".taskCreate");e.onsubmit=n=>{if(n.preventDefault(),document.querySelector("#name").value.length>3){let a={complete:!1,title:document.querySelector("#name").value,details:document.querySelector("#details").value};k(a),c.classList.add("dnone"),t.classList.add("dnone"),l.classList.remove("blur")}}}function p(){let t=document.querySelector(".create"),l=document.querySelectorAll(".closeTab"),c=document.querySelector(".createTab"),e=document.querySelector("#content"),n=document.querySelector("#openMenu"),a=document.querySelector(".shadow");n&&(n.onclick=()=>{e.classList.add("blur"),t.classList.add("dnone"),a.classList.remove("dnone")}),l.forEach(o=>{o.onclick=()=>{t.classList.add("dnone"),a.classList.add("dnone"),e.classList.remove("blur")}}),c.onclick=()=>{t.classList.remove("dnone"),a.classList.remove("dnone"),e.classList.add("blur")}}function r(){let t=localStorage.getItem("task");if(t){let l=JSON.parse(t);l.forEach(c=>{f(c,l)})}}function f(t,l){let c=document.querySelector(".tasks"),e=document.createElement("li"),n=document.createElement("img"),a=document.createElement("div"),o=document.createElement("p"),u=document.createElement("div"),s=document.createElement("div"),d=document.createElement("h3"),i=document.createElement("p");d.innerText=t.title,d.classList.add("task__title"),i.innerText=t.details,i.classList.add("task__text"),s.appendChild(d),s.appendChild(i),s.classList.add("task__info"),n.setAttribute("src","icons/circle.svg"),n.setAttribute("alt","not found"),n.classList.add("task__checked","checked"),n.onclick=()=>{y(t,l)},o.innerText="Delete",a.classList.add("close","delete"),a.appendChild(o),a.onclick=()=>{L(t,l)},e.classList.add("task"),t.complete&&(e.classList.add("task__complete"),n.setAttribute("src","icons/complete.svg")),e.appendChild(n),e.appendChild(s),e.appendChild(u),e.appendChild(a),c.appendChild(e)}function k(t){let l=document.querySelector(".tasks"),c=localStorage.getItem("task");if(c==null){let e=JSON.stringify([t]);localStorage.setItem("task",e)}else{let e=JSON.parse(c);e.push(t),localStorage.setItem("task",JSON.stringify(e))}l.innerHTML=" ",r()}function y(t,l){let c=document.querySelector(".tasks");l.filter(e=>(e===t&&(e.complete=!e.complete),e)),c.innerHTML=" ",localStorage.setItem("task",JSON.stringify(l)),r()}function L(t,l){let c=document.querySelector(".tasks"),e=l.filter(n=>n===t?null:n);c.innerHTML=" ",localStorage.setItem("task",JSON.stringify(e)),r()}
