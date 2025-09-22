import i18n from "i18next";
import React from "react";
import { initReactI18next } from "react-i18next";

export const resources = {
  en: {
    translation: {
      home: "Home",
      about: "About",
      services: "Services",
      team: "Team",
      features: "Features",
      products: "Products",
      testimonials: "Testimonials",
      faq: "FAQ",
      dashboard: "Dashboard",
    },
  },
  fr: {
    translation: {
      home: "Accueil",
      about: "À propos",
      services: "Services",
      team: "Équipe",
      features: "Fonctionnalités",
      products: "Produits",
      testimonials: "Témoignages",
      faq: "FAQ",
      dashboard: "Tableau de bord",
    },
  },
  rw: {
    translation: {
      home: "Ahabanza",
      about: "Ibyerekeye",
      services: "Serivisi",
      team: "Itsinda",
      features: "Ibiranga",
      products: "Ibicuruzwa",
      testimonials: "Ubuhamya",
      faq: "Ibibazo",
      dashboard: "Dashboard",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default
  interpolation: {
    escapeValue: false,
  },
});
