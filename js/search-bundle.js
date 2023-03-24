"use strict";(()=>{var E={noResults:"No results found."},a={indexURI:"/searchindex.json",lunrLanguages:["en","ru"],maxHitsPerResult:5,maxResults:25};var R,S,X=fetch(a.indexURI),Y=new RegExp(/[\u0300-\u036f]/g);function k(e){return e.normalize("NFD").replace(Y,"")}function Z(e){function t(o){let n=o.toString();return o.update(()=>k(n))}lunr.Pipeline.registerFunction(t,"normalizeDiac"),e.pipeline.before(lunr.stemmer,t)}var ee=document.getElementById("search-display-tpl").content.querySelector("article"),F=document.createElement("mark");F.className="search-hit";var m=document.getElementById("search-output-region"),q=document.getElementById("search-input-container"),M=document.getElementById("search-error-container"),H=document.getElementById("search-error-content"),U=document.getElementById("search-results"),D=document.getElementById("results-count"),_=document.getElementById("search-results-body"),f=document.getElementById("search"),Q,I=!1;function j(e){m.ariaBusy="true",m.setAttribute("aria-busy","true");let t=te(e);if(Q=e,!t.length){I=!0,L(E.noResults),J(),m.ariaBusy="false",m.setAttribute("aria-busy","false");return}I=!1,W(),ie(e,t),m.ariaBusy="false",m.setAttribute("aria-busy","false")}function te(e){let t=re(e);if(!t)return[];let o;try{o=ne(t)}catch(n){if(n instanceof lunr.QueryParseError)return[];throw n}return o}function ne(e){return typeof S=="undefined"?[]:S.search(e)}var z=new RegExp("\\p{sc=Han}","u");function oe(e){return z.test(e)?!0:e.startsWith("+")||e.startsWith("-")?e.length>2:e.length>1}function re(e){let t=e.split(" ").filter(oe);return t.every(o=>o.startsWith("-"))?"":t.join(" ")}function se(){f.removeAttribute("readonly");let e=document.getElementById("search-act");e&&e.removeAttribute("disabled"),f.removeAttribute("placeholder"),f.focus()}function L(e){q.classList.add("form-item-error"),H.textContent=e,M.classList.remove("hide-element")}function W(){q.classList.remove("form-item-error"),M.classList.add("hide-element"),H.textContent=""}function $(){U.classList.remove("hide-element")}function J(){U.classList.add("hide-element")}function ie(e,t){ce(),ue(e,t),$()}function ce(){_.textContent="",D.textContent=""}function O(e,t,o){let n=[];o?K(n,t,o):n.push(t),e.append(...n)}var A=new DocumentFragment;function ue(e,t){let o;a.maxResults<=0?o=t.length:o=Math.min(t.length,a.maxResults);for(let n=0;n<o;n++){let s=t[n],r=R[s.ref],i=le(s.matchData.metadata),c=ee.cloneNode(!0),u=c.querySelector("a");O(u,r.title,i.title),u.href=new URL(r.href,location.origin).href;let h=c.querySelector(".tm-date");h.textContent=r.date;let p=c.querySelector(".tm-author");O(p,r.author,i.author);let d=c.querySelector(".post-content"),l;if(i.content)l=me(r.content,i.content);else{let b=C(r.content,100,0,-1);l=[r.content.slice(0,b)],r.content.length>b&&l.push(y(" \u2026"))}d.append(...l),c.dataset.score=s.score.toFixed(2),c.normalize(),A.appendChild(c)}D.textContent=t.length.toString(),_.textContent="",_.appendChild(A)}function le(e){let t={};for(let[,o]of Object.entries(e))for(let[n,{position:s}]of Object.entries(o)){t[n]||(t[n]=[]);for(let[r,i]of s)t[n].push([r,r+i])}for(let[o,n]of Object.entries(t))n.sort((s,r)=>s[0]-r[0]),t[o]=ae(n);return t}function ae(e){if(!e.length)return e;let t=[],o=0,n=e[0][1];t[0]=e[0];for(let[s,r]of e.slice(1))s>n?(t.push([s,r]),n=r,o++):r>n&&(t[o][1]=r,n=r);return t}function fe(e){let t=F.cloneNode(!1);return t.textContent=e,t}var G=document.createElement("span");G.className="ell";function y(e){let t=G.cloneNode(!1);return t.textContent=e,t}function K(e,t,o,n=0){let s=0;for(let[r,i]of o)r-=n,i-=n,e.push(t.slice(s,r)),e.push(fe(t.slice(r,i))),s=i;e.push(t.slice(s))}function he(e,t,o){if(!t.length)return[];let n=e.length,s=a.maxHitsPerResult<=0?t.length:a.maxHitsPerResult,[r,i]=t[0],c=[{context:v(r-o,i+o,n),mark:[[r,i]]}],u=c[0],h,p;for(let[d,l]of t.slice(1,s))[h,p]=v(d-o,l+o,n),[r,i]=u.context,h<=i?(u.context[1]=p,u.mark.push([d,l])):(u={},u.context=[h,p],u.mark=[[d,l]],c.push(u));return c.forEach(d=>{de(d,e)}),c}var g=new RegExp("[\\p{L}\\p{gc=Mark}\\p{gc=Connector_Punctuation}\\p{Join_Control}]","u");function C(e,t,o,n=1){if(t===0&&n>0||t===e.length&&n<0||z.test(e[t]))return t;if(n>0){if(g.test(e[t])&&!g.test(e[t-1]))return t}else if(n<0&&g.test(e[t-1])&&!g.test(e[t]))return t;let s,r=!0,i=!1;for(s=t;n*(s-o)<0;s+=n){if(r){if(g.test(e[s]))continue;r=!1,i=!0}if(i){if(!g.test(e[s]))continue;break}}return s+(n<0)}function de(e,t){let o=e.context[0];e.context[0]=C(t,o,e.mark[0][0]),o=e.context[1],e.context[1]=C(t,o,e.mark.at(-1)[1],-1)}function v(e,t,o){return[Math.max(0,e),Math.min(t,o)]}function me(e,t,o=45){let n=[],s=he(e,t,o);n.push(y(s[0].context[0]>0?"\u2026 [":"["));let r=s.length-1;for(let i=0;i<=r;i++){let c=s[i],u=c.context[0],h=e.slice(...c.context);K(n,h,c.mark,u),i!=r&&n.push(y("] \u2026 ["))}return n.push(y(s.at(-1).context[1]<e.length?"] \u2026":"]")),n}function N(e){return k(e).split(/\s/).filter(t=>!!t).join(" ").toLowerCase()}var B=document.title;function T(e){document.title=e.length?B.replace(/^.+ -/,`${JSON.stringify(e)} at`):B}function ge(e){let t=e.state?e.state:"";V(N(t)),f.value=t,T(t)}function P(e,t){window.history.pushState(e,"",e?`${location.pathname}?${t}`:`${location.pathname}`),T(e)}var w=new Proxy(new URLSearchParams(location.search),{get:(e,t)=>e.get(t),set:(e,t,o)=>(e.set(t,o),t==="q"&&P(o,e),!0),deleteProperty:(e,t)=>(e.delete(t),t==="q"&&P("",e),!0)});function V(e){if(!e){W(),J();return}if(e===Q){I?L(E.noResults):$();return}j(e)}function pe(e){e.preventDefault();let t=N(f.value);V(t),f.value?w.q=f.value:delete w.q}function ye(){let e=w.q;if(e){let t=N(e);t&&j(t),f.value=e,window.history.replaceState(e,"",""),T(e)}}X.then(e=>e.ok?e.json():Promise.reject("Fetch response not ok")).then(e=>{R=e,S=lunr(function(){if(Array.isArray(a.lunrLanguages)){let t=new Set;a.lunrLanguages.forEach(n=>t.add(n)),t.add("en");let o=lunr.multiLanguage(...t);this.use(o)}this.use(Z),this.field("author"),this.field("title"),this.field("content"),this.ref("revid"),this.metadataWhitelist=["position"],this.k1(1.05),this.b(.6),R.forEach(t=>this.add(t))}),ye(),window.addEventListener("popstate",ge),document.getElementById("search-form").addEventListener("submit",pe),se()}).catch(e=>{L("Error: Failed to load search data. Try reloading page?"),console.error(e)});})();
