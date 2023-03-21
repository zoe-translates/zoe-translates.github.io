"use strict";(()=>{var y={noResults:"No results found."},f={indexURI:"/searchindex.json",lunrLanguages:["en","ru"],maxHitsPerResult:5,maxResults:25};var X=new RegExp(/[\u0300-\u036f]/g);function P(t){return t.normalize("NFD").replace(X,"")}function Y(t){function e(n){let o=n.toString();return n.update(()=>P(o))}lunr.Pipeline.registerFunction(e,"normalizeDiac"),t.pipeline.before(lunr.stemmer,e)}var R,S;async function Z(){try{let t=await fetch(f.indexURI);if(!t.ok)return;R=await t.json(),S=lunr(function(){if(Array.isArray(f.lunrLanguages)){let e=new Set;f.lunrLanguages.forEach(o=>e.add(o)),e.add("en");let n=lunr.multiLanguage(...e);this.use(n)}this.use(Y),this.field("author"),this.field("title"),this.field("content"),this.ref("revid"),this.metadataWhitelist=["position"],this.k1(1.05),this.b(.6),R.forEach(e=>this.add(e))}),document.dispatchEvent(new CustomEvent("indexed"))}catch(t){console.log(t)}}Z();var tt=document.getElementById("search-display-tpl").content.querySelector("article"),k=document.createElement("mark");k.className="search-hit";var m=document.getElementById("search-output-region"),F=document.getElementById("search-input-container"),M=document.getElementById("search-error-container"),q=document.getElementById("search-error-content"),H=document.getElementById("search-results"),D=document.getElementById("results-count"),_=document.getElementById("search-results-body"),l=document.getElementById("search"),U,w=!1;function Q(t){m.ariaBusy="true",m.setAttribute("aria-busy","true");let e=et(t);if(U=t,!e.length){w=!0,z(y.noResults),J(),m.ariaBusy="false",m.setAttribute("aria-busy","false");return}w=!1,W(),it(t,e),m.ariaBusy="false",m.setAttribute("aria-busy","false")}function et(t){let e=rt(t);if(!e)return[];let n;try{n=nt(e)}catch(o){if(o instanceof lunr.QueryParseError)return[];throw o}return n}function nt(t){return typeof S=="undefined"?[]:S.search(t)}var j=new RegExp("\\p{sc=Han}","u");function ot(t){return j.test(t)?!0:t.startsWith("+")||t.startsWith("-")?t.length>2:t.length>1}function rt(t){let e=t.split(" ").filter(ot);return e.every(n=>n.startsWith("-"))?"":e.join(" ")}function st(){l.removeAttribute("readonly");let t=document.getElementById("search-act");t&&t.removeAttribute("disabled"),l.removeAttribute("placeholder"),l.focus()}function z(t){F.classList.add("form-item-error"),q.textContent=t,M.classList.remove("hide-element")}function W(){F.classList.remove("form-item-error"),M.classList.add("hide-element"),q.textContent=""}function $(){H.classList.remove("hide-element")}function J(){H.classList.add("hide-element")}function it(t,e){ct(),ut(t,e),$()}function ct(){_.textContent="",D.textContent=""}function b(t,e,n){let o=[];n?K(o,e,n):o.push(e),t.append(...o)}var v=new DocumentFragment;function ut(t,e){let n;f.maxResults<=0?n=e.length:n=Math.min(e.length,f.maxResults);for(let o=0;o<n;o++){let s=e[o],r=R[s.ref],i=lt(s.matchData.metadata),c=tt.cloneNode(!0),u=c.querySelector("a");b(u,r.title,i.title),u.href=new URL(r.href,location.origin).href;let h=c.querySelector(".tm-date");h.textContent=r.date;let p=c.querySelector(".tm-author");b(p,r.author,i.author);let d=c.querySelector(".post-content"),a;if(i.content)a=mt(r.content,i.content);else{let x=C(r.content,100,0,-1);a=[r.content.slice(0,x)],r.content.length>x&&a.push(E(" \u2026"))}d.append(...a),c.dataset.score=s.score.toFixed(2),c.normalize(),v.appendChild(c)}D.textContent=e.length.toString(),_.textContent="",_.appendChild(v)}function lt(t){let e={};for(let[,n]of Object.entries(t))for(let[o,{position:s}]of Object.entries(n)){e[o]||(e[o]=[]);for(let[r,i]of s)e[o].push([r,r+i])}for(let[n,o]of Object.entries(e))o.sort((s,r)=>s[0]-r[0]),e[n]=at(o);return e}function at(t){if(!t.length)return t;let e=[],n=0,o=t[0][1];e[0]=t[0];for(let[s,r]of t.slice(1))s>o?(e.push([s,r]),o=r,n++):r>o&&(e[n][1]=r,o=r);return e}function ft(t){let e=k.cloneNode(!1);return e.textContent=t,e}var G=document.createElement("span");G.className="ell";function E(t){let e=G.cloneNode(!1);return e.textContent=t,e}function K(t,e,n,o=0){let s=0;for(let[r,i]of n)r-=o,i-=o,t.push(e.slice(s,r)),t.push(ft(e.slice(r,i))),s=i;t.push(e.slice(s))}function ht(t,e,n){if(!e.length)return[];let o=t.length,s=f.maxHitsPerResult<=0?e.length:f.maxHitsPerResult,[r,i]=e[0],c=[{context:O(r-n,i+n,o),mark:[[r,i]]}],u=c[0],h,p;for(let[d,a]of e.slice(1,s))[h,p]=O(d-n,a+n,o),[r,i]=u.context,h<=i?(u.context[1]=p,u.mark.push([d,a])):(u={},u.context=[h,p],u.mark=[[d,a]],c.push(u));return c.forEach(d=>{dt(d,t)}),c}var g=new RegExp("[\\p{L}\\p{gc=Mark}\\p{gc=Connector_Punctuation}\\p{Join_Control}]","u");function C(t,e,n,o=1){if(e===0&&o>0||e===t.length&&o<0||j.test(t[e]))return e;if(o>0){if(g.test(t[e])&&!g.test(t[e-1]))return e}else if(o<0&&g.test(t[e-1])&&!g.test(t[e]))return e;let s,r=!0,i=!1;for(s=e;o*(s-n)<0;s+=o){if(r){if(g.test(t[s]))continue;r=!1,i=!0}if(i){if(!g.test(t[s]))continue;break}}return s+(o<0)}function dt(t,e){let n=t.context[0];t.context[0]=C(e,n,t.mark[0][0]),n=t.context[1],t.context[1]=C(e,n,t.mark.at(-1)[1],-1)}function O(t,e,n){return[Math.max(0,t),Math.min(e,n)]}function mt(t,e,n=45){let o=[],s=ht(t,e,n);o.push(E(s[0].context[0]>0?"\u2026 [":"["));let r=s.length-1;for(let i=0;i<=r;i++){let c=s[i],u=c.context[0],h=t.slice(...c.context);K(o,h,c.mark,u),i!=r&&o.push(E("] \u2026 ["))}return o.push(E(s.at(-1).context[1]<t.length?"] \u2026":"]")),o}function L(t){return P(t).split(/\s/).filter(e=>!!e).join(" ").toLowerCase()}var A=document.title;function N(t){document.title=t.length?A.replace(/^.+ -/,`${JSON.stringify(t)} at`):A}function gt(t){let e=t.state?t.state:"";V(L(e)),l.value=e,N(e)}function B(t,e){window.history.pushState(t,"",t?`${location.pathname}?${e}`:`${location.pathname}`),N(t)}var I=new Proxy(new URLSearchParams(location.search),{get:(t,e)=>t.get(e),set:(t,e,n)=>(t.set(e,n),e==="q"&&B(n,t),!0),deleteProperty:(t,e)=>(t.delete(e),e==="q"&&B("",t),!0)});function V(t){if(!t){W(),J();return}if(t===U){w?z(y.noResults):$();return}Q(t)}function pt(t){t.preventDefault();let e=L(l.value);V(e),l.value?I.q=l.value:delete I.q}document.addEventListener("indexed",()=>{let t=document.getElementById("search-form");if(t===null||l===null)return;let e=I.q;if(e){let n=L(e);n&&Q(n),l.value=e,window.history.replaceState(e,"",""),N(e)}t.addEventListener("submit",pt),st(),window.addEventListener("popstate",gt)});})();
