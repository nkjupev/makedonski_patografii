/**
 * Resolves corpus/home image paths for hosting (and optional subfolder deploy).
 * Set <meta name="site-root" content="/your-repo-name"> when not served from domain root.
 */
(function () {
  function siteRoot() {
    var m = document.querySelector('meta[name="site-root"]');
    var p = m && m.getAttribute('content');
    return (p && String(p).trim().replace(/\/$/, '')) || '';
  }

  var root = siteRoot();

  function fixImages() {
    document.querySelectorAll('img[src]').forEach(function (img) {
      if (img.dataset.assetResolved) return;
      var attr = (img.getAttribute('src') || '').trim();
      if (!attr || /^(https?:|data:|blob:)/i.test(attr)) return;

      var path = attr.replace(/^\.\//, '');
      if (path.indexOf('assets/') !== 0) return;

      try {
        var next = root ? (root + '/' + path) : new URL(path, document.baseURI).href;
        if (img.src !== next) {
          img.src = next;
        }
        img.dataset.assetResolved = '1';
      } catch (e) {}
    });
  }

  fixImages();
  var mo = new MutationObserver(fixImages);
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();
