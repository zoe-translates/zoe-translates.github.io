"use strict";(()=>{var y={noResults:"No results found."},a={indexURI:"/searchindex.json",lunrLanguages:["en","ru"],maxHitsPerResult:5,maxResults:25};var R,P,X=fetch(a.indexURI,{mode:"same-origin"});document.getElementById("search-app").classList.remove("hide-element");var Y=new RegExp(/[\u0300-\u036f]/g);function q(t){return t.normalize("NFD").replace(Y,"")}var Z=document.getElementById("search-display-tpl").content.querySelector("article"),v=document.createElement("mark");v.className="search-hit";var E=document.getElementById("search-output-region"),F=document.getElementById("search-input-container"),M=document.getElementById("search-error-container"),Q=document.getElementById("search-error-content"),H=document.getElementById("search-results"),D=document.getElementById("results-count"),S=document.getElementById("search-results-body"),d=document.getElementById("search"),U,I=!1;function $(t){rt();let e=tt(t);if(U=t,!e.length){I=!0,N(y.noResults),G(),b();return}I=!1,W(),S.textContent="",D.textContent="",ct(t,e),z(),b()}function tt(t){let e=nt(t);if(!e)return[];try{return P.search(e)}catch(n){if(n instanceof lunr.QueryParseError)return[];throw n}}var j=new RegExp("\\p{sc=Han}","u");function et(t){return j.test(t)?!0:t.startsWith("+")||t.startsWith("-")?t.length>2:t.length>1}function nt(t){let e=t.split(" ").filter(et);return e.every(n=>n.startsWith("-"))?"":e.join(" ")}function ot(){d.removeAttribute("readonly");let t=document.getElementById("search-act");t&&t.removeAttribute("disabled"),d.removeAttribute("placeholder"),d.focus()}function N(t){F.classList.add("form-item-error"),Q.textContent=t,M.classList.remove("hide-element")}function W(){M.classList.add("hide-element"),F.classList.remove("form-item-error"),Q.textContent=""}function rt(){E.ariaBusy="true",E.setAttribute("aria-busy","true")}function b(){E.ariaBusy="false",E.setAttribute("aria-busy","false")}function z(){H.classList.remove("hide-element")}function G(){H.classList.add("hide-element")}function st(t){let e=v.cloneNode(!1);return e.textContent=t,e}var J=document.createElement("span");J.className="ell";function p(t){let e=J.cloneNode(!1);return e.textContent=t,e}function x(t,e,n){let o=[];n?K(o,e,n):o.push(e),t.append(...o)}var O=new DocumentFragment;function ct(t,e){let n;a.maxResults<=0?n=e.length:n=Math.min(e.length,a.maxResults);for(let o=0;o<n;o++){let r=e[o],s=R[r.ref],c=it(r.matchData.metadata),i=Z.cloneNode(!0),l=i.querySelector("a");x(l,s.title,c.title),l.href=new URL(s.r,location.origin).href;let h=i.querySelector(".tm-date");h.textContent=s.d;let g=i.querySelector(".tm-author");x(g,s.author,c.author);let f=i.querySelector(".post-content"),u;if(c.content)u=ht(s.content,c.content);else{let w=C(s.content,100,0,-1);u=[s.content.slice(0,w)],s.content.length>w&&u.push(p(" \u2026"))}f.append(...u),i.dataset.score=r.score.toFixed(2),i.normalize(),O.appendChild(i)}D.textContent=e.length.toString(),S.textContent="",S.appendChild(O)}function it(t){let e={};for(let[,n]of Object.entries(t))for(let[o,{position:r}]of Object.entries(n)){e[o]||(e[o]=[]);for(let[s,c]of r)e[o].push([s,s+c])}for(let[n,o]of Object.entries(e))o.sort((r,s)=>r[0]-s[0]),e[n]=lt(o);return e}function lt(t){if(!t.length)return t;let e=[],n=0,o=t[0][1];e[0]=t[0];for(let[r,s]of t.slice(1))r>o?(e.push([r,s]),o=s,n++):s>o&&(e[n][1]=s,o=s);return e}function K(t,e,n,o=0){let r=0;for(let[s,c]of n)s-=o,c-=o,t.push(e.slice(r,s)),t.push(st(e.slice(s,c))),r=c;t.push(e.slice(r))}function ut(t,e,n){if(!e.length)return[];let o=t.length,r=a.maxHitsPerResult<=0?e.length:a.maxHitsPerResult,[s,c]=e[0],i=[{context:k(s-n,c+n,o),mark:[[s,c]]}],l=i[0],h,g;for(let[f,u]of e.slice(1,r))[h,g]=k(f-n,u+n,o),[s,c]=l.context,h<=c?(l.context[1]=g,l.mark.push([f,u])):(l={},l.context=[h,g],l.mark=[[f,u]],i.push(l));return i.forEach(f=>{at(f,t)}),i}var m=new RegExp("[\\p{L}\\p{gc=Mark}\\p{gc=Connector_Punctuation}\\p{Join_Control}]","u");function C(t,e,n,o=1){if(e===0&&o>0||e===t.length&&o<0||j.test(t[e]))return e;if(o>0){if(m.test(t[e])&&!m.test(t[e-1]))return e}else if(o<0&&m.test(t[e-1])&&!m.test(t[e]))return e;let r,s=!0,c=!1;for(r=e;o*(r-n)<0;r+=o){if(s){if(m.test(t[r]))continue;s=!1,c=!0}if(c){if(!m.test(t[r]))continue;break}}return r+(o<0)}function at(t,e){let n=t.context[0];t.context[0]=C(e,n,t.mark[0][0]),n=t.context[1],t.context[1]=C(e,n,t.mark.at(-1)[1],-1)}function k(t,e,n){return[Math.max(0,t),Math.min(e,n)]}function ht(t,e,n=45){let o=[],r=ut(t,e,n);o.push(p(r[0].context[0]>0?"\u2026 [":"["));let s=r.length-1;for(let c=0;c<=s;c++){let i=r[c],l=i.context[0],h=t.slice(...i.context);K(o,h,i.mark,l),c!=s&&o.push(p("] \u2026 ["))}return o.push(p(r.at(-1).context[1]<t.length?"] \u2026":"]")),o}function L(t){return q(t).split(/\s/).filter(Boolean).join(" ").toLowerCase()}var A=document.title;function T(t){document.title=t.length?A.replace(/^.+ -/,`( ${t} ) at`):A}function ft(t){let e=t.state?t.state:"";V(L(e)),d.value=e,T(e)}var _=function(){let t=new URLSearchParams(location.search),e=t.get("Q");return e!==null&&(t.has("q")||t.set("q",e),t.delete("Q")),{get q(){return t.get("q")},set q(n){n?t.set("q",n):t.delete("q"),history.pushState(n,"",`${this}`),T(n)},toString:()=>{let n=`${t}`;return`${location.pathname}${n&&`?${n}`}`}}}();function V(t){if(!t){W(),G();return}if(t===U){I?N(y.noResults):z();return}$(t)}function dt(t){t.preventDefault();let e=L(d.value);V(e),_.q=d.value}function mt(){let t=_.q;if(t){let e=L(t);e&&$(e),d.value=t,history.replaceState(t,"",`${_}`),T(t)}}X.then(t=>t.ok?t.json():Promise.reject("Fetch response not ok")).then(t=>{R=t;function e(n){function o(r){return r.update(()=>q(r.toString()))}lunr.Pipeline.registerFunction(o,"processDiac"),n.pipeline.before(lunr.stemmer,o)}P=lunr(function(){if(Array.isArray(a.lunrLanguages)){let n=new Set;a.lunrLanguages.forEach(r=>n.add(r)),n.add("en");let o=lunr.multiLanguage(...n);this.use(o)}this.use(e),this.field("author"),this.field("title"),this.field("content"),this.ref("i"),this.metadataWhitelist=["position"],this.k1(1.05),this.b(.6),R.forEach(n=>this.add(n))}),mt(),window.addEventListener("popstate",ft),document.getElementById("search-form").addEventListener("submit",dt),ot()}).catch(t=>{N("Error: Failed to load search data. Try reloading page?"),console.error(t)});})();
