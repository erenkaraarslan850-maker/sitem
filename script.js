// GSAP 3 ve ScrollTrigger Animasyonları
// jsDelivr CDN'den yüklenen kütüphaneler kullanılır.

document.addEventListener("DOMContentLoaded", () => {
  // Kullanıcının hareket azaltma tercihini denetle
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Aktif menü bağlantılarını güncellemek için ScrollSpy işlevi
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");

  const updateActiveNavLink = () => {
    let currentSectionId = "";
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // Menü bağlantılarına yumuşak kaydırma
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth"
          });
        }
      }
    });
  });

  // Eğer kullanıcı hareketi azaltmayı tercih ettiyse GSAP animasyonlarını çalıştırma
  if (prefersReducedMotion || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // 1. Kapak Bölümü Giriş Animasyonu
  const kapakTimeline = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });
  kapakTimeline
    .from(".navbar", { y: -50, opacity: 0, duration: 0.8 })
    .from(".kapak-media", { opacity: 0, scale: 0.95, y: 30 }, "-=0.4")
    .from(".main-title", { opacity: 0, y: 40 }, "-=0.8")
    .from(".tagline", { opacity: 0, y: 20 }, "-=0.8");

  // 2. Bölüm Başlıkları ve Görsellerinin Kaydırdıkça Yumuşakça Belirmesi
  // Hakkımda Bölümü
  gsap.from(".hakkimda-media", {
    scrollTrigger: {
      trigger: "#hakkimda",
      start: "top 75%",
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    x: -40,
    duration: 1,
    ease: "power2.out"
  });

  gsap.from(".hakkimda-text", {
    scrollTrigger: {
      trigger: "#hakkimda",
      start: "top 75%",
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    x: 40,
    duration: 1,
    ease: "power2.out"
  });

  // İlgi Alanlarım Bölümü (Başlık ve Kartlar)
  gsap.from("#ilgi-alanlarim .section-title", {
    scrollTrigger: {
      trigger: "#ilgi-alanlarim",
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 30,
    duration: 0.9,
    ease: "power2.out"
  });

  gsap.from(".cards-grid .card", {
    scrollTrigger: {
      trigger: ".cards-grid",
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
  });

  // İletişim Bölümü
  gsap.from(".iletisim-content", {
    scrollTrigger: {
      trigger: "#iletisim",
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power2.out"
  });
});
