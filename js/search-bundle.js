(()=>{var x=(e,t,n)=>new Promise((r,o)=>{var a=i=>{try{c(n.next(i))}catch(l){o(l)}},s=i=>{try{c(n.throw(i))}catch(l){o(l)}},c=i=>i.done?r(i.value):Promise.resolve(i.value).then(a,s);c((n=n.apply(e,t)).next())});var E={noResults:"No results found."},d={indexURI:"/searchindex.json",lunrLanguages:["en","fr","ru"],maxSummaryLength:100};var f,m;function w(){return x(this,null,function*(){try{let e=yield fetch(d.indexURI);if(e.status!==200)return;f=yield e.json(),m=lunr(function(){if(Array.isArray(d.lunrLanguages)){let t=new Set;d.lunrLanguages.forEach(r=>t.add(r)),t.add("en");let n=lunr.multiLanguage(...t);this.use(n)}this.field("objectID"),this.field("author"),this.field("title"),this.field("lang"),this.field("tags"),this.field("kind"),this.field("type"),this.field("section"),this.field("content"),this.field("publishDate"),this.field("lastmod"),this.ref("href"),f.forEach(t=>this.add(t))}),document.dispatchEvent(new CustomEvent("indexed"))}catch(e){console.log(e)}})}function I(e){if(!e){g();return}let t=T(e);if(!t.length){C(E.noResults),g();return}b(),M(e,t)}function T(e){let t=e,n=B(e),r=L(n);return r.length>0?r:n!==t?L(t):[]}function L(e){return typeof m=="undefined"?[]:m.search(e).flatMap(t=>{if(t.ref==="undefined")return[];let n=f.filter(r=>r.href===t.ref)[0];return n.score=t.score,[n]})}function B(e){let t=e.split(" ");if(t.length===1)return e;let n="";for(let r of t)n+=`+${r} `;return n.trim()}function C(e){let t=document.querySelector(".search-container");t.classList.add("form-item-error"),t.classList.remove("focused"),document.querySelector(".search-error-message").innerHTML=e,document.querySelector(".search-error").classList.remove("hide-element")}function b(){let e=document.querySelector(".search-container");e.classList.add("focused"),e.classList.remove("form-item-error"),document.querySelector(".search-error").classList.add("hide-element"),document.querySelector(".search-error-message").innerHTML=""}function g(){document.getElementById("site-search").classList.remove("expanded"),document.getElementById("search-results").classList.add("hide-element")}function M(e,t){A(),k(e,t),H(),_()}function A(){document.getElementById("search-results-body").innerHTML="",document.getElementById("results-count").innerHTML=""}function k(e,t){let n=document.querySelector("template").content,r=document.createDocumentFragment(),o=document.getElementById("search-results-body");o.textContent="";for(let a in t){let s=t[a],c=n.cloneNode(!0),i=c.querySelector("article");i.dataset.score=s.score.toFixed(2);let l=c.querySelector("a");l.innerHTML=s.title,l.href=s.href;let h=c.querySelector(".post-content");h.innerHTML=P(e,s.content),r.appendChild(c)}o.appendChild(r),document.getElementById("results-count").textContent=t.length}function P(e,t){let n=new RegExp(q(e),"gmi"),r=new RegExp(/(?=[^])(?:\P{Sentence_Terminal}|\p{Sentence_Terminal}(?!['"`\p{Close_Punctuation}\p{Final_Punctuation}\s]))*(?:\p{Sentence_Terminal}+['"`\p{Close_Punctuation}\p{Final_Punctuation}]*|$)/,"guy"),o=Array.from(t.matchAll(n),l=>l.index),a=Array.from(t.matchAll(r),l=>l.index),s="",c="",i=0;for(let l of o){if(l>i){for(let u=0;u<a.length;u++)if(a[u]>l){let v=u>0?a[u-1]+1:0,y=a[u];i=y,s=t.slice(v,y).trim(),c+=`${s} ... `;break}}let h=R(c),p=h.filter(u=>u.length>50);if(p.length>0&&(c=Q(c,p)),h.length>=d.maxSummaryLength)break}return D(c,d.maxSummaryLength).replace(n,'<mark class="search-item">$&</mark>')}function q(e){let t=RegExp.escape(e);return t.split(" ").length===1?`(${t})`:`(${t.split(" ").join("|")})`}function R(e){let t=/\b(\w*)[\W|\s|\b]?/gm;return Array.from(e.matchAll(t),r=>r).map(r=>({word:r[0],start:r.index,end:r.index+r[0].length,length:r[0].length}))}function Q(e,t){return t.forEach(n=>{let r=$(n.word,20);e=e.replace(n.word,r)}),e}function $(e,t){let n="",r=e.length/t|0,o=e.length%t>0;o&&(r+=1);for(let a=0;a<r;a++){let s=a*t,c=s+t;o&&a===r-1&&(c=e.length),n+=e.slice(s,c)+" "}return n}function H(){document.getElementById("search-results").classList.remove("hide-element"),document.getElementById("site-search").classList.remove("expanded")}function _(){let e=setInterval(function(){let t=document.body.scrollTop>0?document.body:document.documentElement;t.scrollTop>0&&(t.scrollTop=t.scrollTop-50),t.scrollTop<1&&clearInterval(e)},10)}function D(e,t){let n=R(e);return n.length<=t?e:e.slice(0,n[t].end)+"..."}Object.prototype.hasOwnProperty.call(RegExp,"escape")||(RegExp.escape=function(e){return e.replace(/[.*+\-?^${}()|[\]\\]/g,"\\$&")});String.prototype.matchAll||(String.prototype.matchAll=function(e){function t(r,o){return r.includes(o)?r:r+o}function*n(r,o){let a=new RegExp(o,t(o.flags,"g")),s;for(;s=a.exec(r);)s.index=a.lastIndex-s[0].length,yield s}return n(this,e)});function F(e){return new Proxy(new URLSearchParams(window.location.search),{get:(n,r)=>n.get(r)})[e]}w();document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("search-form"),t=document.getElementById("search");e===null||t===null||(e.addEventListener("submit",n=>n.preventDefault()),t.addEventListener("keyup",n=>{n.preventDefault();let r=document.getElementById("search").value.trim().toLowerCase();I(r)}),t.addEventListener("input",n=>{n.currentTarget.value||g()}))});document.addEventListener("indexed",()=>{let e=F("q");e&&(document.getElementById("search").value=e,I(e))});})();
