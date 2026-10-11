// Dil seçimi: ?lang=tr|en > kayıtlı tercih > tarayıcı dili (Türkçe değilse İngilizce)
(function () {
  var param = new URLSearchParams(location.search).get("lang");
  var saved = null;
  try { saved = localStorage.getItem("bravo-lang"); } catch (e) {}
  var browser = (navigator.language || "en").toLowerCase().indexOf("tr") === 0 ? "tr" : "en";
  setLang(param === "tr" || param === "en" ? param : saved || browser);

  function setLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.set === lang));
    });
    var title = document.querySelector("meta[name='title-" + lang + "']");
    if (title) document.title = title.content;
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest(".lang button");
    if (!b) return;
    setLang(b.dataset.set);
    try { localStorage.setItem("bravo-lang", b.dataset.set); } catch (err) {}
  });
  document.addEventListener("DOMContentLoaded", function () { setLang(document.documentElement.lang); });
})();
