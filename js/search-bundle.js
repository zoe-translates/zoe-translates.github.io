(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // ns-params:@params
  var i18n = { noResults: "No results found." };
  var searchConfig = { indexURI: "/index.json", lunrLanguages: ["en", "ru"], maxSummaryLength: 100 };

  // <stdin>
  var pagesIndex;
  var searchIndex;
  function initSearchIndex() {
    return __async(this, null, function* () {
      try {
        const response = yield fetch(searchConfig.indexURI);
        if (response.status !== 200)
          return;
        pagesIndex = yield response.json();
        searchIndex = lunr(function() {
          if (Array.isArray(searchConfig.lunrLanguages)) {
            let langs = /* @__PURE__ */ new Set();
            searchConfig.lunrLanguages.forEach((item) => langs.add(item));
            langs.add("en");
            const pipeline = lunr.multiLanguage(
              ...langs
            );
            this.use(pipeline);
          }
          this.field("objectID");
          this.field("title");
          this.field("lang");
          this.field("tags");
          this.field("kind");
          this.field("type");
          this.field("section");
          this.field("content");
          this.field("publishDate");
          this.field("lastmod");
          this.ref("href");
          pagesIndex.forEach((page) => this.add(page));
        });
        document.dispatchEvent(new CustomEvent("indexed"));
      } catch (e) {
        console.log(e);
      }
    });
  }
  function handleSearchQuery(query) {
    if (!query) {
      hideSearchResults();
      return;
    }
    const results = searchSite(query);
    if (!results.length) {
      displayErrorMessage(i18n.noResults);
      hideSearchResults();
      return;
    }
    hideErrorMessage();
    renderSearchResults(query, results);
  }
  function searchSite(query) {
    const originalQuery = query;
    const lunrQuery = getLunrSearchQuery(query);
    const results = getSearchResults(lunrQuery);
    if (results.length > 0) {
      return results;
    }
    if (lunrQuery !== originalQuery) {
      return getSearchResults(originalQuery);
    }
    return [];
  }
  function getSearchResults(query) {
    if (typeof searchIndex === "undefined")
      return [];
    return searchIndex.search(query).flatMap((hit) => {
      if (hit.ref === "undefined")
        return [];
      let pageMatch = pagesIndex.filter((page) => page.href === hit.ref)[0];
      pageMatch.score = hit.score;
      return [pageMatch];
    });
  }
  function getLunrSearchQuery(query) {
    const searchTerms = query.split(" ");
    if (searchTerms.length === 1) {
      return query;
    }
    let searchQuery = "";
    for (const term of searchTerms) {
      searchQuery += `+${term} `;
    }
    return searchQuery.trim();
  }
  function displayErrorMessage(message) {
    const searchContainer = document.querySelector(".search-container");
    searchContainer.classList.add("form-item-error");
    searchContainer.classList.remove("focused");
    document.querySelector(".search-error-message").innerHTML = message;
    document.querySelector(".search-error").classList.remove("hide-element");
  }
  function hideErrorMessage() {
    const searchContainer = document.querySelector(".search-container");
    searchContainer.classList.add("focused");
    searchContainer.classList.remove("form-item-error");
    document.querySelector(".search-error").classList.add("hide-element");
    document.querySelector(".search-error-message").innerHTML = "";
  }
  function hideSearchResults() {
    document.getElementById("site-search").classList.remove("expanded");
    document.getElementById("search-results").classList.add("hide-element");
  }
  function renderSearchResults(query, results) {
    clearSearchResults();
    updateSearchResults(query, results);
    showSearchResults();
    scrollToTop();
  }
  function clearSearchResults() {
    document.getElementById("search-results-body").innerHTML = "";
    document.getElementById("results-count").innerHTML = "";
  }
  function updateSearchResults(query, results) {
    const template = document.querySelector("template").content;
    const fragment = document.createDocumentFragment();
    const resultsBody = document.getElementById("search-results-body");
    resultsBody.textContent = "";
    for (const id in results) {
      const item = results[id];
      const result = template.cloneNode(true);
      const article = result.querySelector("article");
      article.dataset.score = item.score.toFixed(2);
      const a = result.querySelector("a");
      a.innerHTML = item.title;
      a.href = `${item.href}?utm_source=search`;
      const content = result.querySelector(".post-content");
      content.innerHTML = createSearchResultBlurb(query, item.content);
      fragment.appendChild(result);
    }
    resultsBody.appendChild(fragment);
    document.getElementById("results-count").textContent = results.length;
  }
  function createSearchResultBlurb(query, pageContent) {
    const searchQueryRegex = new RegExp(createQueryStringRegex(query), "gmi");
    const sentenceBoundaryRegex = new RegExp(/(?=[^])(?:\P{Sentence_Terminal}|\p{Sentence_Terminal}(?!['"`\p{Close_Punctuation}\p{Final_Punctuation}\s]))*(?:\p{Sentence_Terminal}+['"`\p{Close_Punctuation}\p{Final_Punctuation}]*|$)/, "guy");
    const searchQueryHits = Array.from(
      pageContent.matchAll(searchQueryRegex),
      (m) => m.index
    );
    const sentenceBoundaries = Array.from(
      pageContent.matchAll(sentenceBoundaryRegex),
      (m) => m.index
    );
    let parsedSentence = "";
    let searchResultText = "";
    let lastEndOfSentence = 0;
    for (const hitLocation of searchQueryHits) {
      if (hitLocation > lastEndOfSentence) {
        for (let i = 0; i < sentenceBoundaries.length; i++) {
          if (sentenceBoundaries[i] > hitLocation) {
            const startOfSentence = i > 0 ? sentenceBoundaries[i - 1] + 1 : 0;
            const endOfSentence = sentenceBoundaries[i];
            lastEndOfSentence = endOfSentence;
            parsedSentence = pageContent.slice(startOfSentence, endOfSentence).trim();
            searchResultText += `${parsedSentence} ... `;
            break;
          }
        }
      }
      const searchResultWords = tokenize(searchResultText);
      const pageBreakers = searchResultWords.filter((word) => word.length > 50);
      if (pageBreakers.length > 0) {
        searchResultText = fixPageBreakers(searchResultText, pageBreakers);
      }
      if (searchResultWords.length >= searchConfig.maxSummaryLength)
        break;
    }
    return ellipsize(searchResultText, searchConfig.maxSummaryLength).replace(
      searchQueryRegex,
      '<span class="search-item">$&</span>'
    );
  }
  function createQueryStringRegex(query) {
    const escaped = RegExp.escape(query);
    return escaped.split(" ").length === 1 ? `(${escaped})` : `(${escaped.split(" ").join("|")})`;
  }
  function tokenize(input) {
    const wordRegex = /\b(\w*)[\W|\s|\b]?/gm;
    const wordMatches = Array.from(input.matchAll(wordRegex), (m) => m);
    return wordMatches.map((m) => ({
      word: m[0],
      start: m.index,
      end: m.index + m[0].length,
      length: m[0].length
    }));
  }
  function fixPageBreakers(input, largeWords) {
    largeWords.forEach((word) => {
      const chunked = chunkify(word.word, 20);
      input = input.replace(word.word, chunked);
    });
    return input;
  }
  function chunkify(input, chunkSize) {
    let output = "";
    let totalChunks = input.length / chunkSize | 0;
    let lastChunkIsUneven = input.length % chunkSize > 0;
    if (lastChunkIsUneven) {
      totalChunks += 1;
    }
    for (let i = 0; i < totalChunks; i++) {
      let start = i * chunkSize;
      let end = start + chunkSize;
      if (lastChunkIsUneven && i === totalChunks - 1) {
        end = input.length;
      }
      output += input.slice(start, end) + " ";
    }
    return output;
  }
  function showSearchResults() {
    document.getElementById("search-results").classList.remove("hide-element");
    document.getElementById("site-search").classList.remove("expanded");
  }
  function scrollToTop() {
    const toTopInterval = setInterval(function() {
      const supportedScrollTop = document.body.scrollTop > 0 ? document.body : document.documentElement;
      if (supportedScrollTop.scrollTop > 0) {
        supportedScrollTop.scrollTop = supportedScrollTop.scrollTop - 50;
      }
      if (supportedScrollTop.scrollTop < 1) {
        clearInterval(toTopInterval);
      }
    }, 10);
  }
  function ellipsize(input, maxLength) {
    const words = tokenize(input);
    if (words.length <= maxLength) {
      return input;
    }
    return input.slice(0, words[maxLength].end) + "...";
  }
  if (!Object.prototype.hasOwnProperty.call(RegExp, "escape")) {
    RegExp.escape = function(str) {
      return str.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
    };
  }
  if (!String.prototype.matchAll) {
    String.prototype.matchAll = function(regex) {
      function ensureFlag(flags, flag) {
        return flags.includes(flag) ? flags : flags + flag;
      }
      function* matchAll(str, regex2) {
        const localCopy = new RegExp(regex2, ensureFlag(regex2.flags, "g"));
        let match;
        while (match = localCopy.exec(str)) {
          match.index = localCopy.lastIndex - match[0].length;
          yield match;
        }
      }
      return matchAll(this, regex);
    };
  }
  function getQueryParam(key) {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop)
    });
    return params[key];
  }
  initSearchIndex();
  document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search");
    if (searchForm === null || searchInput === null) {
      return;
    }
    searchForm.addEventListener("submit", (e) => e.preventDefault());
    searchInput.addEventListener("keyup", (e) => {
      e.preventDefault();
      const query = document.getElementById("search").value.trim().toLowerCase();
      handleSearchQuery(query);
    });
    searchInput.addEventListener("input", (e) => {
      if (!e.currentTarget.value) {
        hideSearchResults();
      }
    });
  });
  document.addEventListener("indexed", () => {
    const query = getQueryParam("q");
    if (query) {
      document.getElementById("search").value = query;
      handleSearchQuery(query);
    }
  });
})();
