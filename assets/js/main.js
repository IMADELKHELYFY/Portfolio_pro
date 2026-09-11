/* ===========================================================================
   Portfolio — Imad EL KHELYFY
   JavaScript sans dépendance : barre de progression, apparition au défilement,
   compteurs animés, scrollytelling des projets, lien de nav actif.
   =========================================================================== */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- Année du pied de page ---------------------------------------------- */

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* --- Barre de progression de lecture ------------------------------------ */

  const progressEl = document.getElementById("progress");

  function updateProgress() {
    if (!progressEl) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    progressEl.style.width = (ratio * 100).toFixed(2) + "%";
  }

  /* --- Apparition des blocs au défilement --------------------------------- */

  const revealables = document.querySelectorAll(".reveal");

  if (reduceMotion) {
    revealables.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
    );

    revealables.forEach((el, index) => {
      // Léger décalage pour que les éléments d'une même grille arrivent en cascade.
      el.style.transitionDelay = (index % 4) * 70 + "ms";
      revealObserver.observe(el);
    });
  }

  /* --- Compteurs chiffrés -------------------------------------------------- */

  function runCounter(el) {
    const target = Number(el.dataset.count || 0);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";

    if (reduceMotion) {
      el.textContent = prefix + target + suffix;
      return;
    }

    const duration = 1100;
    const start = performance.now();

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      // easeOutCubic : rapide au début, s'arrête net sur la valeur finale.
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => counterObserver.observe(el));

  /* --- Scrollytelling des projets ----------------------------------------- */
  /* Chaque .step active le .visual portant le même identifiant. L'étape retenue
     est celle dont le centre est le plus proche du centre de l'écran.
     Calculé à chaque frame de défilement plutôt qu'avec un IntersectionObserver :
     l'observer ne rapporte que les changements d'état, ce qui laisse l'étape
     active figée quand plusieurs étapes restent visibles en même temps.        */

  const steps = Array.from(document.querySelectorAll(".step"));
  const visuals = Array.from(document.querySelectorAll(".visual"));
  let activeStep = null;

  function activate(name) {
    if (name === activeStep) return;
    activeStep = name;
    steps.forEach((step) => step.classList.toggle("is-active", step.dataset.step === name));
    visuals.forEach((visual) => visual.classList.toggle("is-active", visual.dataset.visual === name));
  }

  function updateActiveStep() {
    if (steps.length === 0) return;

    const middle = window.innerHeight / 2;
    let best = steps[0];
    let bestDistance = Infinity;

    steps.forEach((step) => {
      const box = step.getBoundingClientRect();
      const distance = Math.abs(box.top + box.height / 2 - middle);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = step;
      }
    });

    activate(best.dataset.step);
  }

  /* --- Lien de navigation actif -------------------------------------------- */

  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function updateCurrentSection() {
    const probe = window.scrollY + window.innerHeight * 0.35;
    let currentId = null;

    sections.forEach((section) => {
      if (section.offsetTop <= probe) currentId = section.id;
    });

    navLinks.forEach((link) => {
      link.classList.toggle("is-current", link.getAttribute("href") === "#" + currentId);
    });
  }

  /* --- Boucle de défilement -------------------------------------------------
     Les trois mises à jour sont peu coûteuses (une dizaine de mesures) et le
     navigateur regroupe déjà les événements de défilement par frame : inutile
     de passer par requestAnimationFrame, qui reste suspendu tant que l'onglet
     est en arrière-plan.                                                      */

  function onScroll() {
    updateProgress();
    updateActiveStep();
    updateCurrentSection();
  }


  /* --- Hero « faisceau » ----------------------------------------------------
     Deux comportements, tous optionnels : si la section n'existe pas, rien
     ne s'exécute et le reste de la page fonctionne à l'identique.           */

  const hero = document.getElementById("hero");
  const beam = document.querySelector(".hero-beam");

  if (hero) {
    // 1. Apparition en cascade au chargement.
    const risers = Array.from(hero.querySelectorAll(".hero-rise"));
    if (reduceMotion) {
      risers.forEach((el) => el.classList.add("is-up"));
    } else {
      risers.forEach((el, i) => {
        el.style.transitionDelay = 120 + i * 110 + "ms";
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("is-up")));
      });
    }

    // 2. Le faisceau suit la souris de quelques pixels. Assez pour donner de
    //    la profondeur, assez peu pour ne pas devenir un gadget.
    if (beam && !reduceMotion) {
      window.addEventListener("pointermove", (e) => {
        const ratio = e.clientX / window.innerWidth - 0.5;
        beam.style.setProperty("--beam-x", (ratio * 34).toFixed(1) + "px");
      }, { passive: true });
    }
  }

  /* --- Menu mobile ----------------------------------------------------------
     Le panneau est replie par defaut ; il se referme des qu'on choisit une
     destination, sinon il reste ouvert par-dessus la section visee.        */

  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobile-menu");

  if (burger && mobileMenu) {
    function setMenu(open) {
      burger.setAttribute("aria-expanded", String(open));
      mobileMenu.hidden = !open;
    }

    burger.addEventListener("click", function () {
      setMenu(burger.getAttribute("aria-expanded") !== "true");
    });

    mobileMenu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });

    // Repasser en grand ecran laisse sinon un panneau ouvert mais masque,
    // et le bouton dans un etat « ouvert » qui ne correspond a rien.
    window.matchMedia("(min-width: 1024px)").addEventListener("change", function (ev) {
      if (ev.matches) setMenu(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  onScroll();
})();
