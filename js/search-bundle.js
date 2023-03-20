(()=>{var y={noResults:"No results found."},a={indexURI:"/searchindex.json",lunrLanguages:["en","ru"],maxHitsPerResult:5,maxResults:25};var R,S;async function G(){try{let e=await fetch(a.indexURI);if(!e.ok)return;R=await e.json(),S=lunr(function(){if(Array.isArray(a.lunrLanguages)){let t=new Set;a.lunrLanguages.forEach(n=>t.add(n)),t.add("en");let o=lunr.multiLanguage(...t);this.use(o)}this.use(K),this.field("author"),this.field("title"),this.field("content"),this.ref("revid"),this.metadataWhitelist=["position"],this.k1(1.05),this.b(.6),R.forEach(t=>this.add(t))}),document.dispatchEvent(new CustomEvent("indexed"))}catch(e){console.log(e)}}var J=new RegExp(/[\u0300-\u036f]/g);function A(e){return e.normalize("NFD").replace(J,"")}function K(e){function t(o){let n=o.toString();return o.update(()=>A(n))}lunr.Pipeline.registerFunction(t,"normalizeDiac"),e.pipeline.before(lunr.stemmer,t)}var V=document.getElementById("search-display-tpl").content.querySelector("article"),B=document.createElement("mark");B.className="search-hit";var m=document.getElementById("search-output-region"),P=document.getElementById("search-input-container"),k=document.getElementById("search-error-container"),M=document.getElementById("search-error-content"),q=document.getElementById("search-results"),F=document.getElementById("results-count"),_=document.getElementById("search-results-body"),f=document.getElementById("search"),D,C=!1;function H(e){m.ariaBusy="true",m.setAttribute("aria-busy","true");let t=X(e);if(D=e,!t.length){C=!0,z(y.noResults),w(),m.ariaBusy="false",m.setAttribute("aria-busy","false");return}C=!1,I(),ne(e,t),m.ariaBusy="false",m.setAttribute("aria-busy","false")}function X(e){let t=ee(e);if(!t)return[];let o;try{o=Y(t)}catch(n){if(n instanceof lunr.QueryParseError)return[];throw n}return o}function Y(e){return typeof S=="undefined"?[]:S.search(e)}var U=new RegExp("\\p{sc=Han}","u");function Z(e){return U.test(e)?!0:e.startsWith("+")||e.startsWith("-")?e.length>2:e.length>1}function ee(e){let t=e.split(" ").filter(Z);return t.every(o=>o.startsWith("-"))?"":t.join(" ")}function te(){f.removeAttribute("readonly");let e=document.getElementById("search-act");e&&e.removeAttribute("disabled"),f.removeAttribute("placeholder"),f.focus()}function z(e){P.classList.add("form-item-error"),M.textContent=e,k.classList.remove("hide-element")}function I(){P.classList.remove("form-item-error"),k.classList.add("hide-element"),M.textContent=""}function Q(){q.classList.remove("hide-element")}function w(){q.classList.add("hide-element")}function ne(e,t){oe(),re(e,t),Q()}function oe(){_.textContent="",F.textContent=""}function b(e,t,o){let n=[];o?j(n,t,o):n.push(t),e.append(...n)}var O=new DocumentFragment;function re(e,t){let o;a.maxResults<=0?o=t.length:o=Math.min(t.length,a.maxResults);for(let n=0;n<o;n++){let s=t[n],r=R[s.ref],c=se(s.matchData.metadata),i=V.cloneNode(!0),u=i.querySelector("a");b(u,r.title,c.title),u.href=new URL(r.href,location.origin).href;let h=i.querySelector(".tm-date");h.textContent=r.date;let p=i.querySelector(".tm-author");b(p,r.author,c.author);let d=i.querySelector(".post-content"),l;if(c.content)l=ae(r.content,c.content);else{let x=L(r.content,100,0,-1);l=[r.content.slice(0,x)],r.content.length>x&&l.push(E(" \u2026"))}d.append(...l),i.dataset.score=s.score.toFixed(2),i.normalize(),O.appendChild(i)}F.textContent=t.length.toString(),_.textContent="",_.appendChild(O)}function se(e){let t={};for(let[,o]of Object.entries(e))for(let[n,{position:s}]of Object.entries(o)){t[n]||(t[n]=[]);for(let[r,c]of s)t[n].push([r,r+c])}for(let[o,n]of Object.entries(t))n.sort((s,r)=>s[0]-r[0]),t[o]=ce(n);return t}function ce(e){if(!e.length)return e;let t=[],o=0,n=e[0][1];t[0]=e[0];for(let[s,r]of e.slice(1))s>n?(t.push([s,r]),n=r,o++):r>n&&(t[o][1]=r,n=r);return t}function ie(e){let t=B.cloneNode(!1);return t.textContent=e,t}var W=document.createElement("span");W.className="ell";function E(e){let t=W.cloneNode(!1);return t.textContent=e,t}function j(e,t,o,n=0){let s=0;for(let[r,c]of o)r-=n,c-=n,e.push(t.slice(s,r)),e.push(ie(t.slice(r,c))),s=c;e.push(t.slice(s))}function ue(e,t,o){if(!t.length)return[];let n=e.length,s=a.maxHitsPerResult<=0?t.length:a.maxHitsPerResult,[r,c]=t[0],i=[{context:T(r-o,c+o,n),mark:[[r,c]]}],u=i[0],h,p;for(let[d,l]of t.slice(1,s))[h,p]=T(d-o,l+o,n),[r,c]=u.context,h<=c?(u.context[1]=p,u.mark.push([d,l])):(u={},u.context=[h,p],u.mark=[[d,l]],i.push(u));return i.forEach(d=>{le(d,e)}),i}var g=new RegExp("[\\p{L}\\p{gc=Mark}\\p{gc=Connector_Punctuation}\\p{Join_Control}]","u");function L(e,t,o,n=1){if(t===0&&n>0||t===e.length&&n<0||U.test(e[t]))return t;if(n>0){if(g.test(e[t])&&!g.test(e[t-1]))return t}else if(n<0&&g.test(e[t-1])&&!g.test(e[t]))return t;let s,r=!0,c=!1;for(s=t;n*(s-o)<0;s+=n){if(r){if(g.test(e[s]))continue;r=!1,c=!0}if(c){if(!g.test(e[s]))continue;break}}return s+(n<0)}function le(e,t){let o=e.context[0];e.context[0]=L(t,o,e.mark[0][0]),o=e.context[1],e.context[1]=L(t,o,e.mark.at(-1)[1],-1)}function T(e,t,o){return[Math.max(0,e),Math.min(t,o)]}function ae(e,t,o=45){let n=[],s=ue(e,t,o);n.push(E(s[0].context[0]>0?"\u2026 [":"["));let r=s.length-1;for(let c=0;c<=r;c++){let i=s[c],u=i.context[0],h=e.slice(...i.context);j(n,h,i.mark,u),c!=r&&n.push(E("] \u2026 ["))}return n.push(E(s.at(-1).context[1]<e.length?"] \u2026":"]")),n}function $(e){return A(e).split(/\s/).filter(t=>!!t).join(" ").toLowerCase()}var N=new Proxy(new URLSearchParams(location.search),{get:(e,t)=>e.get(t),set:(e,t,o)=>{e.set(t,o),window.history.replaceState({},"",`${location.pathname}?${e}`)},deleteProperty:(e,t)=>{e.delete(t),window.history.replaceState({},"",`${location.pathname}`)}});function fe(e){if(e.preventDefault(),!f.value){I(),w(),delete N.q;return}let t=$(f.value);if(!t){I(),w();return}if(t===D){C?z(y.noResults):Q();return}H(t),N.q=f.value}document.addEventListener("DOMContentLoaded",()=>{G()});document.addEventListener("indexed",()=>{let e=document.getElementById("search-form");if(e===null||f===null)return;let t=N.q;if(t){let o=$(t);o&&H(o),f.value=t}e.addEventListener("submit",fe),te()});})();
