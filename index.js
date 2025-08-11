// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Atualizar navegação ativa baseado na rolagem
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-item");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href") === `#${current}`) {
      item.classList.add("active");
    }
  });

  // Se estiver no topo, marcar Home como ativo
  if (window.scrollY < 300) {
    navItems.forEach((item) => item.classList.remove("active"));
    document.querySelector('.nav-item[href="#"]').classList.add("active");
  }
});

// Animação dos cards ao aparecer na tela
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observar todos os cards
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card, .server-card");
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
});

// Efeito de hover nos links
document
  .querySelectorAll(".project-link, .social-links a, .footer-links a")
  .forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
    });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });

// Adicionar efeito de clique nos cards
document.querySelectorAll(".project-card, .server-card").forEach((card) => {
  card.addEventListener("click", function () {
    this.style.transform = "scale(0.98)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);
  });
});

// Loading suave da página
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Efeito parallax nas nuvens (opcional)
window.addEventListener("scroll", () => {
  const clouds = document.querySelectorAll(".cloud");
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;

  clouds.forEach((cloud, index) => {
    cloud.style.transform = `translateX(${rate * (index + 1) * 0.1}px)`;
  });
});

console.log("🚀 Portfólio carregado com sucesso!");
