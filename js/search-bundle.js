(()=>{var p={noResults:"No results found."},f={indexURI:"/searchindex.json",lunrLanguages:["en","ru"],maxSummaryLength:100};var g,E;async function D(){try{let e=await fetch(f.indexURI);if(e.status!==200)return;g=await e.json(),E=lunr(function(){if(Array.isArray(f.lunrLanguages)){let t=new Set;f.lunrLanguages.forEach(r=>t.add(r)),t.add("en");let n=lunr.multiLanguage(...t);this.use(n)}this.use(P),this.field("author"),this.field("title"),this.field("content"),this.ref("revid"),this.metadataWhitelist=["position"],g.forEach(t=>this.add(t))}),document.dispatchEvent(new CustomEvent("indexed"))}catch(e){console.log(e)}}var F=new RegExp(/[\u0300-\u036f]/g);function P(e){function t(n){let r=n.toString();return n.update(()=>r.normalize("NFD").replace(F,""))}lunr.Pipeline.registerFunction(t,"normalizeDiac"),e.pipeline.before(lunr.stemmer,t),e.searchPipeline.before(lunr.stemmer,t)}var k=document.getElementById("search-display-tpl").content,m=document.getElementById("search-input-container"),v=document.getElementById("search-error-container"),w=document.getElementById("search-error-content"),T=document.getElementById("results-count"),y=document.getElementById("search-results-body"),a=document.getElementById("search"),B,S=!1;function M(e){let t=q(e);if(B=e,!t.length){S=!0,N(p.noResults),x();return}S=!1,L(),z(e,t)}function q(e){let t=U(e);if(!t)return[];let n;try{n=A(t)}catch(r){if(r instanceof lunr.QueryParseError)return[];throw r}return n}function A(e){return typeof E=="undefined"?[]:E.search(e).map(t=>{let n=g[t.ref];return n.score=t.score,n.metadata=t.matchData.metadata,n})}var O=new RegExp("\\p{sc=Han}","u");function Q(e){return O.test(e)?!0:e.startsWith("+")||e.startsWith("-")?e.length>2:e.length>1}function U(e){let t=e.split(" ").filter(Q);return t.every(n=>n.startsWith("-"))?"":t.join(" ")}function N(e){m.classList.add("form-item-error"),m.classList.remove("focused"),w.textContent=e,v.classList.remove("hide-element")}function L(){m.classList.add("focused"),m.classList.remove("form-item-error"),v.classList.add("hide-element"),w.textContent=""}function b(){document.getElementById("search-results").classList.remove("hide-element")}function x(){document.getElementById("search-results").classList.add("hide-element")}function z(e,t){W(),K(e,t),b()}function W(){y.innerHTML="",T.textContent=""}function K(e,t){let n=document.createDocumentFragment();y.innerHTML="";for(let r in t){let o=t[r],s=k.cloneNode(!0),c=X(o.metadata),i=s.querySelector("article");i.dataset.score=o.score.toFixed(2);let u=s.querySelector("a");u.href=o.href,u.innerHTML=c.title?R(o.title,c.title):o.title;let l=s.querySelector(".tm-date");l.textContent=o.date;let h=s.querySelector(".tm-author");h.innerHTML=c.author?R(o.author,c.author):o.author;let j=s.querySelector(".post-content"),d;c.content?d=V(o.content,c.content):(d=o.content.slice(0,100),o.content.length>100&&(d+=" \u2026")),j.innerHTML=d,n.appendChild(s)}y.appendChild(n),T.textContent=t.length}function X(e){let t={};for(let[,r]of Object.entries(e))for(let[o,{position:s}]of Object.entries(r)){t[o]||(t[o]=[]);for(let[c,i]of s)t[o].push([c,c+i])}let n;for(let r in t)n=t[r],n.sort((o,s)=>o[0]-s[0]),t[r]=G(n);return t}function G(e){if(!e.length)return e;let t=[],n=0,r=e[0][1];t[0]=e[0];for(let[o,s]of e.slice(1))o>r?(t.push([o,s]),r=s,n++):s>r&&(t[n][1]=s,r=s);return t}function R(e,t,n=0){let r=[],o=0;for(let[s,c]of t)s-=n,c-=n,r.push(e.slice(o,s)),r.push('<mark class="search-item">'),r.push(e.slice(s,c)),r.push("</mark>"),o=c;return r.push(e.slice(o)),r.join("")}function J(e,t,n){if(!t.length)return[];let[r,o]=t[0],s=[{context:I(r-n,o+n,e),mark:[[r,o]]}],c=s[0],i,u;for(let[l,h]of t.slice(1))[i,u]=I(l-n,h+n,e),[r,o]=c.context,i<=o?(c.context[1]=u,c.mark.push([l,h])):(c={},c.context=[i,u],c.mark=[[l,h]],s.push(c));return s}function I(e,t,n){return[Math.max(0,e),Math.min(t,n)]}function V(e,t,n=45){let r=[],o=J(e.length,t,n);return o[0].context[0]>0&&r.push(""),o.forEach(s=>{let c=s.context[0],i=e.slice(...s.context),u=R(i,s.mark,c);r.push(u)}),o[o.length-1].context[1]<e.length&&r.push(""),r.join(" \u2026 ")}function Y(e){return new Proxy(new URLSearchParams(window.location.search),{get:(n,r)=>n.get(r)})[e]}function _(e){return e.split(/\s/).filter(t=>!!t).join(" ").toLowerCase()}var H=document.getElementById("sidebar-checkbox");function Z(e){H.checked=0}function $(e){if(e.isComposing)return;if(e.preventDefault(),!a.value){L(),x();return}let t=_(a.value);if(!t){L(),x();return}if(t===B){S?N(p.noResults):b();return}M(t)}D();document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("search-form");e===null||a===null||(e.addEventListener("submit",t=>t.preventDefault()),H!==null&&a.addEventListener("mouseup",Z),a.addEventListener("input",$))});document.addEventListener("indexed",()=>{let e=Y("q");if(e){a.value=e;let t=_(e);t&&M(t)}});})();
