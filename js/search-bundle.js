(()=>{var E={noResults:"No results found."},m={indexURI:"/searchindex.json",lunrLanguages:["en","ru"],maxResults:25,maxSummaryLength:100};var y,R;async function G(){try{let e=await fetch(m.indexURI);if(!e.ok)return;y=await e.json(),R=lunr(function(){if(Array.isArray(m.lunrLanguages)){let t=new Set;m.lunrLanguages.forEach(n=>t.add(n)),t.add("en");let o=lunr.multiLanguage(...t);this.use(o)}this.use(K),this.field("author"),this.field("title"),this.field("content"),this.ref("revid"),this.metadataWhitelist=["position"],y.forEach(t=>this.add(t))}),document.dispatchEvent(new CustomEvent("indexed"))}catch(e){console.log(e)}}var J=new RegExp(/[\u0300-\u036f]/g);function A(e){return e.normalize("NFD").replace(J,"")}function K(e){function t(o){let n=o.toString();return o.update(()=>A(n))}lunr.Pipeline.registerFunction(t,"normalizeDiac"),e.pipeline.before(lunr.stemmer,t)}var V=document.getElementById("search-display-tpl").content.querySelector("article"),k=document.createElement("mark");k.className="search-hit";var h=document.getElementById("search-output-region"),b=document.getElementById("search-input-container"),M=document.getElementById("search-error-container"),P=document.getElementById("search-error-content"),q=document.getElementById("search-results"),F=document.getElementById("results-count"),S=document.getElementById("search-results-body"),p=document.getElementById("search"),D,_=!1;function z(e){h.ariaBusy="true",h.setAttribute("aria-busy","true");let t=X(e);if(D=e,!t.length){_=!0,Q(E.noResults),I(),h.ariaBusy="false",h.setAttribute("aria-busy","false");return}_=!1,C(),te(e,t),h.ariaBusy="false",h.setAttribute("aria-busy","false")}function X(e){let t=ee(e);if(!t)return[];let o;try{o=Y(t)}catch(n){if(n instanceof lunr.QueryParseError)return[];throw n}return o}function Y(e){return typeof R=="undefined"?[]:R.search(e)}var H=new RegExp("\\p{sc=Han}","u");function Z(e){return H.test(e)?!0:e.startsWith("+")||e.startsWith("-")?e.length>2:e.length>1}function ee(e){let t=e.split(" ").filter(Z);return t.every(o=>o.startsWith("-"))?"":t.join(" ")}function Q(e){b.classList.add("form-item-error"),P.textContent=e,M.classList.remove("hide-element")}function C(){b.classList.remove("form-item-error"),M.classList.add("hide-element"),P.textContent=""}function U(){q.classList.remove("hide-element")}function I(){q.classList.add("hide-element")}function te(e,t){ne(),oe(e,t),U()}function ne(){S.textContent="",F.textContent=""}function T(e,t,o){let n=[];o?j(n,t,o):n.push(t),e.append(...n)}var v=new DocumentFragment;function oe(e,t){for(let o=0;o<Math.min(t.length,m.maxResults);o++){let n=t[o],r=y[n.ref],s=re(n.matchData.metadata),c=V.cloneNode(!0),i=c.querySelector("a");T(i,r.title,s.title),i.href=r.href;let a=c.querySelector(".tm-date");a.textContent=r.date;let l=c.querySelector(".tm-author");T(l,r.author,s.author);let f=c.querySelector(".post-content"),u;if(s.content)u=ue(r.content,s.content);else{let N=w(r.content,100,0,-1);u=[g("["),r.content.slice(0,N)],r.content.length>N&&u.push(g("] \u2026"))}f.append(...u),c.dataset.score=n.score.toFixed(2),c.normalize(),v.appendChild(c)}F.textContent=t.length.toString(),S.textContent="",S.appendChild(v)}function re(e){let t={};for(let[,o]of Object.entries(e))for(let[n,{position:r}]of Object.entries(o)){t[n]||(t[n]=[]);for(let[s,c]of r)t[n].push([s,s+c])}for(let[o,n]of Object.entries(t))n.sort((r,s)=>r[0]-s[0]),t[o]=se(n);return t}function se(e){if(!e.length)return e;let t=[],o=0,n=e[0][1];t[0]=e[0];for(let[r,s]of e.slice(1))r>n?(t.push([r,s]),n=s,o++):s>n&&(t[o][1]=s,n=s);return t}function ce(e){let t=k.cloneNode(!1);return t.textContent=e,t}var W=document.createElement("span");W.className="ell";function g(e){let t=W.cloneNode(!1);return t.textContent=e,t}function j(e,t,o,n=0){let r=0;for(let[s,c]of o)s-=n,c-=n,e.push(t.slice(r,s)),e.push(ce(t.slice(s,c))),r=c;e.push(t.slice(r))}function ie(e,t,o){if(!t.length)return[];let n=e.length,[r,s]=t[0],c=[{context:B(r-o,s+o,n),mark:[[r,s]]}],i=c[0];x(i,e);let a,l;for(let[f,u]of t.slice(1))[a,l]=B(f-o,u+o,n),[r,s]=i.context,a<=s?(i.context[1]=l,i.mark.push([f,u])):(i={},i.context=[a,l],i.mark=[[f,u]],c.push(i));return c.forEach(f=>{x(f,e)}),c}var d=new RegExp("[\\p{L}\\p{gc=Mark}\\p{gc=Connector_Punctuation}\\p{Join_Control}]","u");function w(e,t,o,n=1){if(t===0&&n>0||t===e.length&&n<0||H.test(e[t]))return t;if(n>0){if(d.test(e[t])&&!d.test(e[t-1]))return t}else if(n<0&&d.test(e[t-1])&&!d.test(e[t]))return t;let r,s=!0,c=!1;for(r=t;n*(r-o)<0;r+=n){if(s){if(d.test(e[r]))continue;s=!1,c=!0}if(c){if(!d.test(e[r]))continue;break}}return r+(n<0)}function x(e,t){let o=e.context[0];e.context[0]=w(t,o,e.mark[0][0]),o=e.context[1],e.context[1]=w(t,o,e.mark.at(-1)[1],-1)}function B(e,t,o){return[Math.max(0,e),Math.min(t,o)]}function ue(e,t,o=45){let n=[],r=ie(e,t,o);n.push(g(r[0].context[0]>0?"\u2026 [":"["));let s=r.length-1;for(let c=0;c<=s;c++){let i=r[c],a=i.context[0],l=e.slice(...i.context);j(n,l,i.mark,a),c!=s&&n.push(g(" \u2026 "))}return n.push(g(r.at(-1).context[1]<e.length?"] \u2026":"]")),n}function $(e){return A(e).split(/\s/).filter(t=>!!t).join(" ").toLowerCase()}var L=new Proxy(new URLSearchParams(location.search),{get:(e,t)=>e.get(t),set:(e,t,o)=>{e.set(t,o),window.history.replaceState({},"",`${location.pathname}?${e}`)},deleteProperty:(e,t)=>{e.delete(t),window.history.replaceState({},"",`${location.pathname}`)}});function ae(e){if(e.preventDefault(),!p.value){C(),I(),delete L.q;return}let t=$(p.value);if(!t){C(),I();return}if(t===D){_?Q(E.noResults):U();return}z(t),L.q=p.value}document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("search-form");e===null||p===null||e.addEventListener("submit",ae)});document.addEventListener("indexed",()=>{let e=L.q;if(e){let t=$(e);t&&z(t),p.value=e}});G();})();
