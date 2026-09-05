/* =========================================================
   Billion's Cakes Bakery — Script principal
   Catalogue, panier (localStorage), interactions UI
   ========================================================= */

(function () {
  "use strict";

  /* ---------------- Catalogue pâtisserie ---------------- */
  const PRODUITS = [
    { id: "gat-01", nom: "Royal Chocolat Or", categorie: "gateaux", prix: 42, unite: "/ pièce (6-8 pers.)", desc: "Mousse chocolat grand cru, praliné croustillant, feuille d'or comestible.", icone: "gateau", tag: "Signature" },
    { id: "gat-02", nom: "Fraisier Élégance", categorie: "gateaux", prix: 38, unite: "/ pièce (6-8 pers.)", desc: "Génoise vanille de Madagascar, crème mousseline, fraises fraîches.", icone: "gateau" },
    { id: "gat-03", nom: "Opéra Billion's", categorie: "gateaux", prix: 45, unite: "/ pièce (6-8 pers.)", desc: "Biscuit joconde, ganache café, glaçage miroir chocolat noir.", icone: "gateau", tag: "Best-seller" },
    { id: "mac-01", nom: "Coffret Macarons Prestige", categorie: "macarons", prix: 24, unite: "/ coffret de 12", desc: "Assortiment de saveurs signature : rose litchi, pistache, caramel fleur de sel.", icone: "macaron" },
    { id: "mac-02", nom: "Macarons Or & Vanille", categorie: "macarons", prix: 26, unite: "/ coffret de 12", desc: "Coque dorée, ganache vanille bourbon de Madagascar.", icone: "macaron", tag: "Édition limitée" },
    { id: "vien-01", nom: "Croissants Pur Beurre", categorie: "viennoiseries", prix: 3.5, unite: "/ pièce", desc: "Feuilletage 36 tours, beurre AOP, cuisson dorée à la minute.", icone: "croissant" },
    { id: "vien-02", nom: "Pain au Chocolat Suprême", categorie: "viennoiseries", prix: 3.8, unite: "/ pièce", desc: "Double barre de chocolat noir 70%, pâte feuilletée artisanale.", icone: "croissant" },
    { id: "tar-01", nom: "Tarte Citron Meringuée", categorie: "tartes", prix: 32, unite: "/ pièce (6 pers.)", desc: "Crémeux citron Amalfi, meringue italienne flambée, sablé breton.", icone: "tarte" },
    { id: "tar-02", nom: "Tarte Tropézienne Dorée", categorie: "tartes", prix: 30, unite: "/ pièce (6 pers.)", desc: "Brioche légère, crème pâtissière double, sucre perlé.", icone: "tarte" },
    { id: "petit-01", nom: "Mini Éclairs Assortis", categorie: "petits-fours", prix: 22, unite: "/ boîte de 10", desc: "Vanille, chocolat et café, glaçage brillant fait main.", icone: "eclair" },
    { id: "petit-02", nom: "Financiers Amande & Or", categorie: "petits-fours", prix: 18, unite: "/ boîte de 12", desc: "Beurre noisette, poudre d'amande, éclat de feuille d'or.", icone: "eclair", tag: "Nouveauté" },
    { id: "gat-04", nom: "Layer Cake Fleurs Sucrées", categorie: "gateaux", prix: 55, unite: "/ pièce (8-10 pers.)", desc: "Vanille & framboise, décor fleuri en pâte à sucre fait main.", icone: "gateau" }
  ];

  const CLE_PANIER = "billions_cakes_panier";

  /* ---------------- Icônes SVG (pictos produits) ---------------- */
  const ICONES = {
    gateau: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 34h44v18a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V34z"/><path d="M8 34c0-6 6-8 6-8s2 4 6 4 6-4 6-4 2 6 8 6 6-6 6-6 4 2 6 8" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 18V8" stroke-linecap="round"/><circle cx="32" cy="6" r="2.4" fill="currentColor" stroke="none"/><path d="M10 44h44" stroke-dasharray="2 4"/></svg>',
    macaron: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="32" cy="22" rx="20" ry="10"/><rect x="20" y="30" width="24" height="8" rx="2"/><ellipse cx="32" cy="42" rx="20" ry="10"/></svg>',
    croissant: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 40c-2-14 8-28 24-28 10 0 16 6 18 12-8-4-16-2-20 4-3 5-2 10 2 14-10 4-20 3-24-2z"/><path d="M20 30c4-2 9-2 12 1" /><path d="M26 38c4-2 8-1 11 2" /></svg>',
    tarte: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><path d="M32 10 58 46H6L32 10z"/><path d="M6 46h52v4a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4v-4z"/><path d="M32 10v36M20 46l6-16M44 46l-6-16" /></svg>',
    eclair: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="8" y="26" width="48" height="14" rx="7"/><path d="M14 26c2-4 6-4 8 0M28 26c2-4 6-4 8 0M42 26c2-4 6-4 8 0" /></svg>'
  };

  const ICONE_PANIER_VIDE = '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="24" cy="52" r="3"/><circle cx="46" cy="52" r="3"/><path d="M6 8h6l7 34h32l6-24H16"/></svg>';

  /* ---------------- Gestion du panier ---------------- */
  function lirePanier() {
    try {
      return JSON.parse(localStorage.getItem(CLE_PANIER)) || [];
    } catch (e) {
      return [];
    }
  }

  function ecrirePanier(panier) {
    localStorage.setItem(CLE_PANIER, JSON.stringify(panier));
    majBadgePanier();
  }

  function ajouterAuPanier(id) {
    const produit = PRODUITS.find((p) => p.id === id);
    if (!produit) return;
    const panier = lirePanier();
    const existant = panier.find((item) => item.id === id);
    if (existant) {
      existant.qte += 1;
    } else {
      panier.push({ id: produit.id, nom: produit.nom, prix: produit.prix, unite: produit.unite, icone: produit.icone, qte: 1 });
    }
    ecrirePanier(panier);
    afficherConfirmationAjout(produit.nom);
  }

  function modifierQte(id, delta) {
    let panier = lirePanier();
    panier = panier.map((item) => {
      if (item.id === id) item.qte = Math.max(0, item.qte + delta);
      return item;
    }).filter((item) => item.qte > 0);
    ecrirePanier(panier);
    if (document.getElementById("panier-liste")) rendrePanier();
  }

  function retirerDuPanier(id) {
    const panier = lirePanier().filter((item) => item.id !== id);
    ecrirePanier(panier);
    if (document.getElementById("panier-liste")) rendrePanier();
  }

  function totalPanier() {
    return lirePanier().reduce((somme, item) => somme + item.prix * item.qte, 0);
  }

  function nombreArticlesPanier() {
    return lirePanier().reduce((n, item) => n + item.qte, 0);
  }

  function majBadgePanier() {
    document.querySelectorAll("[data-cart-badge]").forEach((badge) => {
      const n = nombreArticlesPanier();
      badge.textContent = n;
      badge.style.display = n > 0 ? "flex" : "none";
    });
  }

  function afficherConfirmationAjout(nom) {
    let toast = document.getElementById("toast-ajout");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast-ajout";
      toast.style.cssText = "position:fixed;bottom:26px;right:26px;background:#3b1f52;color:#fdfbfe;padding:16px 22px;border:1px solid rgba(201,161,92,0.4);border-radius:2px;font-family:'Montserrat',sans-serif;font-size:13px;letter-spacing:0.04em;z-index:999;opacity:0;transition:opacity .35s ease, transform .35s ease;transform:translateY(10px);";
      document.body.appendChild(toast);
    }
    toast.textContent = "✓ " + nom + " ajouté à votre commande";
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    });
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
    }, 2400);
  }

  /* ---------------- Rendu : grille produits (menu.html) ---------------- */
  function rendreProduits(filtre) {
    const grille = document.getElementById("grille-produits");
    if (!grille) return;
    const liste = filtre && filtre !== "tous" ? PRODUITS.filter((p) => p.categorie === filtre) : PRODUITS;
    grille.innerHTML = liste.map((p) => `
      <article class="carte-produit">
        <div class="produit-visuel">
          ${p.tag ? `<span class="produit-tag">${p.tag}</span>` : ""}
          ${ICONES[p.icone] || ""}
        </div>
        <div class="produit-corps">
          <h3>${p.nom}</h3>
          <p class="produit-desc">${p.desc}</p>
          <div class="produit-pied">
            <span class="produit-prix">${p.prix.toFixed(2).replace(".00", "")} € <small style="font-weight:400;color:#8a7d6c;">${p.unite}</small></span>
            <button class="btn btn-noir btn-sm" data-ajouter="${p.id}">Ajouter</button>
          </div>
        </div>
      </article>
    `).join("");

    grille.querySelectorAll("[data-ajouter]").forEach((btn) => {
      btn.addEventListener("click", () => ajouterAuPanier(btn.getAttribute("data-ajouter")));
    });
  }

  function initFiltres() {
    const filtres = document.querySelectorAll(".filtre-btn");
    if (!filtres.length) return;
    filtres.forEach((btn) => {
      btn.addEventListener("click", () => {
        filtres.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        rendreProduits(btn.getAttribute("data-filtre"));
      });
    });
  }

  /* ---------------- Rendu : panier (commande.html) ---------------- */
  function rendrePanier() {
    const conteneur = document.getElementById("panier-liste");
    if (!conteneur) return;
    const panier = lirePanier();

    if (!panier.length) {
      conteneur.innerHTML = `<div class="panier-vide">${ICONE_PANIER_VIDE}<p>Votre sélection de pâtisserie est vide.</p><a href="menu.html" class="btn btn-outline btn-sm" style="color:#100c0a;border-color:rgba(16,12,10,0.3);">Découvrir la carte</a></div>`;
    } else {
      conteneur.innerHTML = panier.map((item) => `
        <div class="panier-item">
          <div class="panier-item-icone">${ICONES[item.icone] || ""}</div>
          <div class="panier-item-info">
            <h4>${item.nom}</h4>
            <span>${item.unite}</span>
          </div>
          <div class="panier-qte">
            <button type="button" data-moins="${item.id}" aria-label="Diminuer">−</button>
            <span>${item.qte}</span>
            <button type="button" data-plus="${item.id}" aria-label="Augmenter">+</button>
          </div>
          <div class="panier-prix">${(item.prix * item.qte).toFixed(2)} €</div>
          <button type="button" class="panier-retirer" data-retirer="${item.id}">Retirer</button>
        </div>
      `).join("");
    }

    const totalEl = document.getElementById("panier-total");
    if (totalEl) totalEl.textContent = totalPanier().toFixed(2) + " €";

    conteneur.querySelectorAll("[data-plus]").forEach((b) => b.addEventListener("click", () => modifierQte(b.getAttribute("data-plus"), 1)));
    conteneur.querySelectorAll("[data-moins]").forEach((b) => b.addEventListener("click", () => modifierQte(b.getAttribute("data-moins"), -1)));
    conteneur.querySelectorAll("[data-retirer]").forEach((b) => b.addEventListener("click", () => retirerDuPanier(b.getAttribute("data-retirer"))));
  }

  /* ---------------- Onglets (Précommande design / Panier pâtisserie) ---------------- */
  function initOnglets() {
    const onglets = document.querySelectorAll(".onglet-btn");
    if (!onglets.length) return;
    onglets.forEach((btn) => {
      btn.addEventListener("click", () => {
        onglets.forEach((b) => b.classList.remove("active"));
        document.querySelectorAll(".onglet-panel").forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.getAttribute("data-onglet")).classList.add("active");
      });
    });
  }

  /* ---------------- Navigation mobile ---------------- */
  function initNavMobile() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));
  }

  /* ---------------- Boutons radio stylisés (occasion) ---------------- */
  function initRadiosStylises() {
    document.querySelectorAll(".champ-radio").forEach((label) => {
      const input = label.querySelector("input");
      if (!input) return;
      const maj = () => {
        label.parentElement.querySelectorAll(".champ-radio").forEach((l) => l.classList.remove("selected"));
        if (input.checked) label.classList.add("selected");
      };
      input.addEventListener("change", maj);
      maj();
    });
  }

  /* ---------------- Formulaire de commande : récapitulatif caché ---------------- */
  function initFormulaireCommande() {
    const form = document.getElementById("form-commande");
    if (!form) return;
    const champRecap = form.querySelector("[name='recapitulatif_commande']");

    form.addEventListener("submit", () => {
      const panier = lirePanier();
      let recap = "";
      if (panier.length) {
        recap += "Articles de pâtisserie :\n";
        panier.forEach((item) => {
          recap += `- ${item.nom} x${item.qte} (${(item.prix * item.qte).toFixed(2)} €)\n`;
        });
        recap += `Total pâtisserie : ${totalPanier().toFixed(2)} €\n\n`;
      }
      const design = document.getElementById("design-description");
      if (design && design.value.trim()) {
        recap += "Précommande sur mesure :\n" + design.value.trim();
      }
      if (champRecap) champRecap.value = recap || "Aucun article sélectionné.";
      try { localStorage.removeItem(CLE_PANIER); } catch (e) {}
    });
  }

  /* ---------------- Année footer ---------------- */
  function majAnnee() {
    document.querySelectorAll("[data-annee]").forEach((el) => (el.textContent = new Date().getFullYear()));
  }

  document.addEventListener("DOMContentLoaded", () => {
    majBadgePanier();
    initNavMobile();
    initFiltres();
    initOnglets();
    initRadiosStylises();
    initFormulaireCommande();
    majAnnee();
    if (document.getElementById("grille-produits")) rendreProduits("tous");
    if (document.getElementById("panier-liste")) rendrePanier();
  });
})();
