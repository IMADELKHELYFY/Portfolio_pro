/* ===========================================================================
   Portfolio — Imad EL KHELYFY
   Projets data : étapes du scrollytelling + lecteur d'étude plein écran.

   Aucune dépendance. Le contenu vient de window.CASES (assets/js/cases.js),
   les libellés d'interface de window.PF.t (assets/js/i18n.js) ; ce fichier
   ne fait que la mise en scène.

   Le lecteur suit une structure fixe en dix temps, identique pour tous les
   projets — c'est ce qui rend deux études comparables :

     1  Problème business        6  Résultats
     2  Contexte                 7  Insights business
     3  Questions à résoudre     8  Stack technique
     4  Dataset                  9  Recommandations
     5  Méthodologie            10  GitHub / démonstration

   Bilinguisme : toute valeur de contenu peut être une chaîne (identique dans
   les deux langues) ou un objet {fr, en}. `L()` résout les deux cas. Un
   changement de langue redessine les étapes et, si elle est ouverte, l'étude
   courante — en conservant la position de lecture.

   Routage : #/etude/<slug> — l'URL est partageable et le bouton « retour »
   du navigateur referme le lecteur.
   =========================================================================== */

(function () {
  "use strict";

  var CASES = window.CASES || [];
  if (!CASES.length) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Utilitaires ───────────────────────────────────────────────────────── */

  function lang() { return window.PF ? window.PF.lang : "fr"; }
  function t(key) { return window.PF ? window.PF.t(key) : key; }

  /** Résout une valeur bilingue {fr, en} — ou renvoie la chaîne telle quelle. */
  function L(v) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      return v[lang()] !== undefined ? v[lang()] : (v.fr !== undefined ? v.fr : "");
    }
    return v === undefined || v === null ? "" : v;
  }

  function esc(s) {
    return String(s === undefined || s === null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /** Nombre localisé : virgule décimale + espace fine en FR, point + virgule en EN. */
  function fmt(n, decimals) {
    var d = decimals || 0;
    var parts = Math.abs(n).toFixed(d).split(".");
    var fr = lang() === "fr";
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, fr ? " " : ",");
    return (n < 0 ? "−" : "") + parts[0] + (parts[1] ? (fr ? "," : ".") + parts[1] : "");
  }

  function el(html) {
    var tpl = document.createElement("template");
    tpl.innerHTML = html.trim();
    return tpl.content.firstElementChild;
  }

  var ARROW = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var CHEVRON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
  var ZOOM = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/></svg>';
  var GITHUB = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.9c-2.78.62-3.37-1.21-3.37-1.21-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.570 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.06 10.06 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"/></svg>';
  var PLAY = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l14 9-14 9V3z"/></svg>';
  var SUN = '<svg class="i-sun" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON = '<svg class="i-moon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  /* ── Coloration syntaxique minimale ────────────────────────────────────── */

  var KEYWORDS = ("def|class|return|if|elif|else|for|while|import|from|as|in|is|not|and|or|"
    + "None|True|False|lambda|with|try|except|raise|yield|assert|global|pass|break|continue|"
    + "SELECT|FROM|WHERE|GROUP|ORDER|BY|JOIN|USING|WITH|CREATE|REPLACE|TABLE|LEFT|RIGHT|FULL|"
    + "OUTER|INNER|OVER|PARTITION|DISTINCT|CASE|WHEN|THEN|END|LIMIT|DESC|ASC|COUNT|SUM|AVG|"
    + "ROUND|COALESCE|coalesce|min|max|sum");

  var RX = new RegExp(
    "(#[^\\n]*|--[^\\n]*)"                                   // 1 commentaire
    + "|(\"\"\"[\\s\\S]*?\"\"\"|\"(?:[^\"\\\\\\n]|\\\\.)*\"|'(?:[^'\\\\\\n]|\\\\.)*')" // 2 chaîne
    + "|\\b(\\d+(?:[.,]\\d+)?)\\b"                            // 3 nombre
    + "|\\b(" + KEYWORDS + ")\\b",                            // 4 mot-clé
    "g"
  );

  function highlight(code, kind) {
    var safe = esc(code);
    if (kind !== "python" && kind !== "sql") return safe;
    return safe.replace(RX, function (m, com, str, num, kw) {
      if (com) return '<span class="c">' + com + "</span>";
      if (str) return '<span class="s">' + str + "</span>";
      if (num) return '<span class="n">' + num + "</span>";
      if (kw)  return '<span class="k">' + kw + "</span>";
      return m;
    });
  }

  /* ── Compteurs animés ──────────────────────────────────────────────────── */

  function countUp(node) {
    var target = parseFloat(node.dataset.val);
    var dec = parseInt(node.dataset.dec || "0", 10);
    var suffix = node.dataset.suffix || "";

    if (reduceMotion || !isFinite(target)) {
      node.textContent = fmt(target || 0, dec) + suffix;
      return;
    }
    var start = performance.now();
    var duration = 1000;
    (function frame(now) {
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      node.textContent = fmt(target * eased, dec) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    })(start);
  }

  /* ══════════════════════════════════════════════════════════════════════
     1 · ÉTAPES DU SCROLLYTELLING
     ══════════════════════════════════════════════════════════════════════ */

  var visualsHost = document.getElementById("case-visuals");
  var stepsHost = document.getElementById("case-steps");
  if (!visualsHost || !stepsHost) return;

  // Les 7 projets data ouvrent le scrollytelling (01 à 07) ; les projets IA,
  // statiques, ferment la liste avec leurs numéros en dur dans index.html.
  function projectNo(i) {
    var n = i + 1;
    return (n < 10 ? "0" : "") + n;
  }

  /** Les deux teintes d'un projet ; c'est le CSS qui tranche selon le thème.
      Une seule couleur ne peut pas rester lisible à la fois sur crème et
      sur fond sombre — d'où une valeur claire et une valeur sombre. */
  function caseVars(c) {
    return "--case-light:" + esc(c.accent) + ";--case-dark:" + esc(c.accentDark || c.accent);
  }

  /** Panneau collant : la capture de l'application, cadrée comme une fenêtre. */
  function visualHTML(c) {
    return '<figure class="visual has-case" data-visual="' + esc(c.slug)
      + '" style="' + caseVars(c) + '">'
      + '<div class="visual-shot">'
      +   '<span class="visual-shot__tag">' + esc(L(c.family)) + "</span>"
      +   '<img src="' + esc(c.cover) + '" alt="' + esc(c.title) + '" loading="lazy" decoding="async" />'
      + "</div>"
      + "</figure>";
  }

  /** Colonne de lecture : une étape de récit, plus un bouton vers l'étude. */
  function stepHTML(c, i) {
    var kpis = c.kpis.slice(0, 3).map(function (k) {
      return '<div class="step-kpi"><b>' + esc(fmt(k.value, k.decimals) + L(k.suffix))
        + "</b><span>" + esc(L(k.label)) + "</span></div>";
    }).join("");

    return '<article class="step has-case" data-step="' + esc(c.slug)
      + '" style="' + caseVars(c) + '">'
      + '<p class="step-index">' + esc(t("ui.study")) + " " + projectNo(i) + "</p>"
      + '<h3 class="step-title">' + esc(c.title) + "</h3>"
      + '<p class="step-body">' + esc(L(c.headline)) + "</p>"
      + '<p class="step-body">' + esc(L(c.pitch)) + "</p>"
      + '<div class="step-kpis">' + kpis + "</div>"
      + '<div class="step-tags">'
      +   c.tags.map(function (tag) { return '<span class="tag">' + esc(tag) + "</span>"; }).join("")
      + "</div>"
      + '<button class="step-cta" type="button" data-open="' + esc(c.slug) + '">'
      +   esc(t("ui.openCase")) + " " + ARROW
      + "</button>"
      + "</article>";
  }

  function renderScrolly() {
    visualsHost.innerHTML = CASES.map(visualHTML).join("");
    stepsHost.innerHTML = CASES.map(stepHTML).join("");
  }

  stepsHost.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-open]");
    if (btn) location.hash = "#/etude/" + btn.dataset.open;
  });

  /* ══════════════════════════════════════════════════════════════════════
     2 · LECTEUR PLEIN ÉCRAN
     ══════════════════════════════════════════════════════════════════════ */

  var reader = el(
    '<div class="case-reader" id="case-reader" role="dialog" aria-modal="true">'
    + '<div class="reader-bar">'
    +   '<div class="reader-bar__inner">'
    +     '<button class="reader-back" type="button" data-close></button>'
    +     '<div class="reader-bar__title"></div>'
    +     '<nav class="reader-toc"></nav>'
    +     '<div class="seg" role="group">'
    +       '<button type="button" class="seg-btn" data-set-lang="fr">FR</button>'
    +       '<button type="button" class="seg-btn" data-set-lang="en">EN</button>'
    +     "</div>"
    +     '<button type="button" class="seg-solo" data-toggle-theme>' + SUN + MOON + "</button>"
    +   "</div>"
    +   '<div class="reader-progress"></div>'
    + "</div>"
    + '<div class="reader-body"></div>'
    + "</div>"
  );
  document.body.appendChild(reader);

  var readerBody = reader.querySelector(".reader-body");
  var readerTitle = reader.querySelector(".reader-bar__title");
  var readerToc = reader.querySelector(".reader-toc");
  var readerProgress = reader.querySelector(".reader-progress");
  var readerBack = reader.querySelector(".reader-back");

  // Les dix temps de l'étude, dans l'ordre. Un seul tableau : le sommaire,
  // l'espion de défilement et le rendu s'en servent tous les trois.
  var SECTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  var current = null;   // étude affichée
  var figures = [];     // figures de l'étude courante, pour la lightbox

  /* ── Blocs de rendu ────────────────────────────────────────────────────── */

  function sec(n, inner) {
    return '<section class="reader-sec" id="sec-' + n + '">'
      + '<p class="reader-sec__label"><span class="reader-sec__no">' + n + "</span>"
      + esc(t("ui.sec" + n + ".title")) + "</p>"
      + '<h3 class="reader-sec__title">' + esc(t("ui.sec" + n + ".head")) + "</h3>"
      + '<p class="reader-sec__hint">' + esc(t("ui.sec" + n + ".hint")) + "</p>"
      + inner
      + "</section>";
  }

  /* 1 · Problème business */
  function sec1(c) {
    return sec(1, '<blockquote class="problem rv">' + esc(L(c.problem)) + "</blockquote>");
  }

  /* 2 · Contexte */
  function sec2(c) {
    var rows = ["secteur", "modele", "role", "perimetre", "calcul"].map(function (k) {
      return '<div class="ctx__row"><div class="ctx__k">' + esc(t("ui.ctx." + k)) + "</div>"
        + '<div class="ctx__v">' + esc(L(c.context[k])) + "</div></div>";
    }).join("");
    return sec(2, '<div class="ctx rv">' + rows + "</div>");
  }

  /* 3 · Questions à résoudre */
  function sec3(c) {
    return sec(3, '<div class="qbox rv"><ol>'
      + c.questions.map(function (q) { return "<li>" + esc(L(q)) + "</li>"; }).join("")
      + "</ol></div>");
  }

  /* 4 · Dataset */
  function sec4(c) {
    var d = c.dataset;
    var fields = d.fields.map(function (f) {
      return '<span class="tag">' + esc(f) + "</span>";
    }).join("");

    return sec(4, '<div class="ctx rv">'
      + '<div class="ctx__row"><div class="ctx__k">' + esc(t("ui.ds.source")) + "</div>"
      +   '<div class="ctx__v">' + esc(L(d.source)) + "</div></div>"
      + '<div class="ctx__row"><div class="ctx__k">' + esc(t("ui.ds.volume")) + "</div>"
      +   '<div class="ctx__v">' + esc(L(d.volume)) + "</div></div>"
      + '<div class="ctx__row"><div class="ctx__k">' + esc(t("ui.ds.fields")) + "</div>"
      +   '<div class="ctx__v"><div class="skill-val">' + fields + "</div></div></div>"
      + '<div class="ctx__row"><div class="ctx__k">' + esc(t("ui.ds.note")) + "</div>"
      +   '<div class="ctx__v">' + esc(L(d.note)) + "</div></div>"
      + "</div>");
  }

  /* 5 · Méthodologie — cadre 3×3, chaîne de traitement, annexe repliée */
  function sec5(c) {
    function col(titleKey, badgeKey, items) {
      return '<div class="fw__col rv"><p class="fw__head">' + esc(t(titleKey))
        + '<span class="fw__badge">' + esc(t(badgeKey)) + "</span></p>"
        + items.map(function (i) {
            return '<div class="fw__item"><b>' + esc(L(i.name)) + "</b><span>"
              + esc(L(i.why)) + "</span></div>";
          }).join("")
        + "</div>";
    }

    var flow = c.method.map(function (s, i) {
      return (i ? '<span class="flow__arrow">' + ARROW + "</span>" : "")
        + '<span class="flow__step"><i style="animation-delay:' + (i * 0.28) + 's"></i>'
        + esc(L(s)) + "</span>";
    }).join("");

    var tabs = c.appendix.code.map(function (b, i) {
      return '<button type="button" class="' + (i === 0 ? "is-on" : "") + '" data-tab="' + i + '">'
        + esc(L(b.label)) + "</button>";
    }).join("");

    var blocks = c.appendix.code.map(function (b, i) {
      return '<div class="code-block" data-panel="' + i + '"' + (i === 0 ? "" : " hidden") + ">"
        + '<div class="code-block__bar"><span class="code-block__dot"></span>' + esc(b.lang)
        + " — " + esc(L(b.label))
        + '<button class="code-copy" type="button" data-copy="' + i + '">'
        + esc(t("ui.copy")) + "</button></div>"
        + "<pre><code>" + highlight(L(b.body), b.lang) + "</code></pre>"
        + "</div>";
    }).join("");

    var diffs = c.appendix.difficulties.map(function (d) {
      return '<div class="diff"><p class="p">' + esc(L(d.p)) + '</p><p class="s">'
        + esc(L(d.s)) + "</p></div>";
    }).join("");

    var limits = c.appendix.limits.map(function (l) {
      return "<li>" + esc(L(l)) + "</li>";
    }).join("");

    return sec(5,
      '<p class="reader-sec__hint" style="margin-top:14px">' + esc(L(c.framework.intro)) + "</p>"
      + '<div class="fw">'
      +   col("ui.metrics", "ui.metricsBadge", c.framework.metrics)
      +   col("ui.dimensions", "ui.dimensionsBadge", c.framework.dimensions)
      + "</div>"
      + '<div class="flow rv">' + flow + "</div>"
      + '<div class="annex rv">'
      +   '<button class="annex__toggle" type="button" data-annex>'
      +     "<b>" + esc(t("ui.annexToggle")) + "</b>"
      +     "<small>" + c.appendix.code.length + " " + esc(t("ui.annexExtraits")) + " · "
      +       c.appendix.difficulties.length + " " + esc(t("ui.annexDiff")) + " · "
      +       c.appendix.limits.length + " " + esc(t("ui.annexLimites")) + "</small>"
      +     '<span class="annex__chevron">' + CHEVRON + "</span>"
      +   "</button>"
      +   '<div class="annex__panel"><div class="annex__inner"><div class="annex__pad">'
      +     '<div class="code-tabs">' + tabs + "</div>"
      +     blocks
      +     '<div class="dl-grid">'
      +       '<div class="dl-card"><h4>' + t("ui.difficulties") + "</h4>" + diffs + "</div>"
      +       '<div class="dl-card"><h4>' + t("ui.limits") + '</h4><ul class="limits">'
      +         limits + "</ul></div>"
      +     "</div>"
      +   "</div></div></div>"
      + "</div>");
  }

  /* 6 · Résultats — les chiffres, puis les captures qui les montrent */
  function sec6(c) {
    var kpis = c.kpis.map(function (k) {
      return '<div class="kpi rv">'
        + '<div class="kpi__value" data-val="' + k.value + '" data-dec="' + (k.decimals || 0)
        + '" data-suffix="' + esc(L(k.suffix)) + '">0</div>'
        + '<div class="kpi__label">' + esc(L(k.label)) + "</div>"
        + '<div class="kpi__note">' + esc(L(k.note)) + "</div>"
        + "</div>";
    }).join("");

    var figs = c.figures.map(function (f, i) {
      return '<figure class="fig rv" data-fig="' + i + '">'
        + '<div class="fig__head">'
        +   '<p class="fig__idx">' + esc(t("ui.figure")) + " " + (i + 1) + " / " + c.figures.length + "</p>"
        +   '<p class="fig__title">' + esc(L(f.title)) + "</p>"
        + "</div>"
        + '<button class="fig__shot" type="button" data-zoom="' + i + '">'
        +   '<img src="' + esc(f.img) + '" alt="' + esc(L(f.title)) + '" loading="lazy" decoding="async" />'
        +   '<span class="fig__zoom">' + ZOOM + " " + esc(t("ui.zoom")) + "</span>"
        + "</button>"
        + '<figcaption class="fig__read"><b>' + esc(t("ui.howToRead")) + "</b>"
        + esc(L(f.read)) + "</figcaption>"
        + "</figure>";
    }).join("");

    return sec(6, '<div class="kpi-row">' + kpis + '</div><div class="figs">' + figs + "</div>");
  }

  /* 7 · Insights business */
  function sec7(c) {
    return sec(7, c.insights.map(function (n, i) {
      return '<article class="ins rv">'
        + '<span class="ins__n">0' + (i + 1) + "</span>"
        + '<h4 class="ins__title">' + esc(L(n.title)) + "</h4>"
        + '<div class="ins__row"><p class="ins__k">' + esc(t("ui.insData"))
        +   '</p><p class="ins__v">' + esc(L(n.data)) + "</p></div>"
        + '<div class="ins__row"><p class="ins__k">' + esc(t("ui.insSoWhat"))
        +   '</p><p class="ins__v">' + esc(L(n.soWhat)) + "</p></div>"
        + '<div class="ins__row"><p class="ins__k">' + esc(t("ui.insDriver"))
        +   '</p><p class="ins__v">' + esc(L(n.driver)) + "</p></div>"
        + '<p class="ins__team">' + ARROW + " " + esc(L(n.team)) + "</p>"
        + "</article>";
    }).join(""));
  }

  /* 8 · Stack technique */
  function sec8(c) {
    return sec(8, '<div class="ctx rv">'
      + '<div class="ctx__row"><div class="ctx__k">' + esc(t("ui.stackTools")) + "</div>"
      +   '<div class="ctx__v"><div class="skill-val">'
      +     c.tags.map(function (x) { return '<span class="tag">' + esc(x) + "</span>"; }).join("")
      +   "</div></div></div>"
      + '<div class="ctx__row"><div class="ctx__k">' + esc(t("ui.ctx.stack")) + "</div>"
      +   '<div class="ctx__v">' + esc(L(c.context.stack)) + "</div></div>"
      + "</div>");
  }

  /* 9 · Recommandations */
  function sec9(c) {
    var rows = c.matrix.map(function (r) {
      // r.priority reste une clé stable (Haute / Moyenne / Basse) : la classe
      // CSS et la traduction en dérivent, jamais l'inverse.
      var cls = "prio--" + r.priority.toLowerCase();
      return "<tr><td>" + esc(L(r.action)) + "</td>"
        + '<td><span class="prio ' + cls + '">' + esc(t("prio." + r.priority)) + "</span></td>"
        + "<td>" + esc(L(r.impact)) + "</td>"
        + '<td class="owner">' + esc(L(r.owner)) + "</td>"
        + '<td class="kpi-cell">' + esc(L(r.kpi)) + "</td></tr>";
    }).join("");

    return sec(9, '<div class="matrix-wrap rv"><table class="matrix"><thead><tr>'
      + "<th>" + esc(t("ui.mxAction")) + "</th><th>" + esc(t("ui.mxPrio"))
      + "</th><th>" + esc(t("ui.mxImpact")) + "</th><th>" + esc(t("ui.mxOwner"))
      + "</th><th>" + esc(t("ui.mxKpi")) + "</th>"
      + "</tr></thead><tbody>" + rows + "</tbody></table></div>");
  }

  /* 10 · GitHub / démonstration */
  function sec10(c) {
    var links = c.links || {};
    var buttons = "";

    if (links.repo) {
      buttons += '<a class="link-btn" href="' + esc(links.repo) + '" target="_blank" rel="noopener">'
        + GITHUB + " " + esc(t("ui.repo")) + "</a>";
    }
    if (links.demo) {
      buttons += '<a class="link-btn" href="' + esc(links.demo) + '" target="_blank" rel="noopener">'
        + PLAY + " " + esc(t("ui.demo")) + "</a>";
    }

    var body = buttons
      ? '<div class="link-row">' + buttons + "</div>"
      : '<p class="link-none">' + esc(t("ui.repoSoon")) + "</p>";

    return sec(10, '<div class="rv">' + body
      + '<div class="run-line"><b>' + esc(t("ui.runLocal")) + "</b><code>"
      + esc(c.run) + "</code></div></div>");
  }

  function renderNav(c) {
    var i = CASES.indexOf(c);
    var prev = CASES[(i - 1 + CASES.length) % CASES.length];
    var next = CASES[(i + 1) % CASES.length];
    return '<div class="reader-next">'
      + '<button type="button" data-go="' + esc(prev.slug) + '"><small>&larr; '
      + esc(t("ui.prev")) + "</small><b>" + esc(prev.title) + "</b></button>"
      + '<button type="button" data-go="' + esc(next.slug) + '"><small>'
      + esc(t("ui.next")) + " &rarr;</small><b>" + esc(next.title) + "</b></button>"
      + "</div>";
  }

  /* ── Ouverture / fermeture ─────────────────────────────────────────────── */

  function paint(c, keepScroll) {
    var top = keepScroll ? reader.scrollTop : 0;
    var no = projectNo(CASES.indexOf(c));

    reader.classList.add("has-case");
    reader.style.setProperty("--case-light", c.accent);
    reader.style.setProperty("--case-dark", c.accentDark || c.accent);
    readerBack.innerHTML = "&larr; " + esc(t("ui.back"));
    readerTitle.innerHTML = "<em>" + esc(t("ui.study") + " " + no) + "</em> &nbsp;" + esc(c.title);
    readerToc.innerHTML = SECTIONS.map(function (n) {
      return '<button type="button" data-sec="sec-' + n + '" title="'
        + esc(t("ui.sec" + n + ".title")) + '">' + n + "</button>";
    }).join("");

    readerBody.innerHTML =
        '<header class="hero-case">'
      +   '<p class="hero-case__eyebrow"><span>' + esc(t("ui.study") + " " + no)
      +     "</span><span>·</span><span>" + esc(L(c.family))
      +     "</span><span>·</span><span>" + esc(c.title) + "</span></p>"
      +   '<h2 class="hero-case__headline">' + esc(L(c.headline)) + "</h2>"
      +   '<p class="hero-case__pitch">' + esc(L(c.pitch)) + "</p>"
      + "</header>"
      + sec1(c) + sec2(c) + sec3(c) + sec4(c) + sec5(c)
      + sec6(c) + sec7(c) + sec8(c) + sec9(c) + sec10(c)
      + renderNav(c);

    reader.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.classList.toggle("is-on", b.getAttribute("data-set-lang") === lang());
    });

    observeReveals(keepScroll);
    reader.scrollTop = top;
    updateReaderScroll();
  }

  function openCase(slug) {
    var c = CASES.filter(function (x) { return x.slug === slug; })[0];
    if (!c) { closeReader(); return; }

    current = c;
    figures = c.figures;
    paint(c, false);

    reader.classList.add("is-open");
    document.body.classList.add("reader-open");
  }

  function closeReader() {
    reader.classList.remove("is-open");
    document.body.classList.remove("reader-open");
    current = null;
    window.setTimeout(function () {
      if (!reader.classList.contains("is-open")) readerBody.innerHTML = "";
    }, 420);
  }

  /* ── Apparitions + compteurs dans le lecteur ───────────────────────────── */

  var revealObs = null;

  function observeReveals(showAll) {
    if (revealObs) revealObs.disconnect();

    var nodes = readerBody.querySelectorAll(".rv");

    // Après un changement de langue on repeint en place : tout ce qui était
    // déjà visible doit le rester, sans ré-animer.
    if (reduceMotion || showAll) {
      nodes.forEach(function (n) { n.classList.add("is-in"); });
      readerBody.querySelectorAll(".kpi__value").forEach(countUp);
      return;
    }

    revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        entry.target.querySelectorAll(".kpi__value").forEach(countUp);
        revealObs.unobserve(entry.target);
      });
    }, { root: reader, rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    nodes.forEach(function (n, i) {
      n.style.transitionDelay = (i % 4) * 60 + "ms";
      revealObs.observe(n);
    });
  }

  /* ── Progression + sommaire actif ──────────────────────────────────────── */

  function updateReaderScroll() {
    if (!current) return;
    var max = reader.scrollHeight - reader.clientHeight;
    var ratio = max > 0 ? reader.scrollTop / max : 0;
    readerProgress.style.width = (ratio * 100).toFixed(2) + "%";

    var probe = reader.scrollTop + reader.clientHeight * 0.3;
    var here = null;
    SECTIONS.forEach(function (n) {
      var node = readerBody.querySelector("#sec-" + n);
      if (node && node.offsetTop <= probe) here = "sec-" + n;
    });
    readerToc.querySelectorAll("button").forEach(function (b) {
      b.classList.toggle("is-here", b.dataset.sec === here);
    });
  }

  reader.addEventListener("scroll", updateReaderScroll, { passive: true });

  /* ── Interactions dans le lecteur ──────────────────────────────────────── */

  reader.addEventListener("click", function (e) {
    var target = e.target;

    // Les commutateurs langue / thème sont gérés par i18n.js (délégation
    // sur document) : on les laisse passer.
    if (target.closest("[data-set-lang]") || target.closest("[data-toggle-theme]")) return;

    if (target.closest("[data-close]")) {
      history.pushState(null, "", location.pathname + location.search);
      closeReader();
      return;
    }

    var toc = target.closest("[data-sec]");
    if (toc) {
      var node = readerBody.querySelector("#" + toc.dataset.sec);
      if (node) reader.scrollTo({ top: node.offsetTop - 8, behavior: reduceMotion ? "auto" : "smooth" });
      return;
    }

    var go = target.closest("[data-go]");
    if (go) { location.hash = "#/etude/" + go.dataset.go; return; }

    var zoom = target.closest("[data-zoom]");
    if (zoom) { openLightbox(parseInt(zoom.dataset.zoom, 10)); return; }

    var annexBtn = target.closest("[data-annex]");
    if (annexBtn) { annexBtn.closest(".annex").classList.toggle("is-open"); return; }

    var tab = target.closest("[data-tab]");
    if (tab) {
      var idx = tab.dataset.tab;
      var pad = tab.closest(".annex__pad");
      pad.querySelectorAll("[data-tab]").forEach(function (b) { b.classList.toggle("is-on", b === tab); });
      pad.querySelectorAll("[data-panel]").forEach(function (p) { p.hidden = p.dataset.panel !== idx; });
      return;
    }

    var copy = target.closest("[data-copy]");
    if (copy && current) {
      var body = L(current.appendix.code[parseInt(copy.dataset.copy, 10)].body);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(body).then(function () {
          copy.textContent = t("ui.copied");
          window.setTimeout(function () { copy.textContent = t("ui.copy"); }, 1600);
        });
      }
    }
  });

  /* ══════════════════════════════════════════════════════════════════════
     3 · LIGHTBOX
     ══════════════════════════════════════════════════════════════════════ */

  var lb = el(
    '<div class="lightbox" id="lightbox" role="dialog" aria-modal="true">'
    + '<div class="lightbox__bar">'
    +   '<div class="lightbox__cap"><span></span><p></p></div>'
    +   '<button class="lightbox__btn" type="button" data-lb="prev">&larr;</button>'
    +   '<button class="lightbox__btn" type="button" data-lb="next">&rarr;</button>'
    +   '<button class="lightbox__btn" type="button" data-lb="close">&times;</button>'
    + "</div>"
    + '<div class="lightbox__stage"><img alt="" /></div>'
    + "</div>"
  );
  document.body.appendChild(lb);

  var lbImg = lb.querySelector("img");
  var lbIdx = lb.querySelector(".lightbox__cap span");
  var lbCap = lb.querySelector(".lightbox__cap p");
  var lbAt = 0;

  function labelLightbox() {
    lb.querySelector('[data-lb="prev"]').setAttribute("aria-label", t("ui.lbPrev"));
    lb.querySelector('[data-lb="next"]').setAttribute("aria-label", t("ui.lbNext"));
    lb.querySelector('[data-lb="close"]').setAttribute("aria-label", t("ui.lbClose"));
  }

  function showFigure(i) {
    if (!figures.length) return;
    lbAt = (i + figures.length) % figures.length;
    var f = figures[lbAt];
    lbImg.src = f.img;
    lbImg.alt = L(f.title);
    lbIdx.textContent = t("ui.figure") + " " + (lbAt + 1) + " / " + figures.length;
    lbCap.textContent = L(f.title);
    lb.querySelector(".lightbox__stage").scrollTop = 0;
  }

  function openLightbox(i) {
    labelLightbox();
    showFigure(i);
    lb.classList.add("is-open");
  }

  function closeLightbox() {
    lb.classList.remove("is-open");
    lbImg.removeAttribute("src");
  }

  lb.addEventListener("click", function (e) {
    var b = e.target.closest("[data-lb]");
    if (!b) {
      if (e.target === lb || e.target.classList.contains("lightbox__stage")) closeLightbox();
      return;
    }
    if (b.dataset.lb === "close") closeLightbox();
    if (b.dataset.lb === "prev") showFigure(lbAt - 1);
    if (b.dataset.lb === "next") showFigure(lbAt + 1);
  });

  /* ── Clavier ───────────────────────────────────────────────────────────── */

  document.addEventListener("keydown", function (e) {
    if (lb.classList.contains("is-open")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showFigure(lbAt - 1);
      if (e.key === "ArrowRight") showFigure(lbAt + 1);
      return;
    }
    if (reader.classList.contains("is-open") && e.key === "Escape") {
      history.pushState(null, "", location.pathname + location.search);
      closeReader();
    }
  });

  /* ══════════════════════════════════════════════════════════════════════
     4 · CHANGEMENT DE LANGUE
     ══════════════════════════════════════════════════════════════════════ */

  document.addEventListener("pf:lang", function () {
    renderScrolly();
    if (current) {
      paint(current, true);                 // repeint sans perdre la position
      if (lb.classList.contains("is-open")) { labelLightbox(); showFigure(lbAt); }
    }
  });

  /* ══════════════════════════════════════════════════════════════════════
     5 · ROUTAGE PAR HASH
     ══════════════════════════════════════════════════════════════════════ */

  function route() {
    var m = /^#\/etude\/([a-z0-9-]+)$/.exec(location.hash || "");
    if (m) {
      if (lb.classList.contains("is-open")) closeLightbox();
      openCase(m[1]);
    } else if (reader.classList.contains("is-open")) {
      closeLightbox();
      closeReader();
    }
  }

  window.addEventListener("hashchange", route);

  renderScrolly();
  route();
})();
