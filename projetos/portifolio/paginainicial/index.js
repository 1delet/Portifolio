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

// Funcionalidade do modo escuro
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");
const currentTheme = localStorage.getItem("theme") || "light";

// Aplicar tema salvo
if (currentTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  themeIcon.className = "bi bi-sun";
}

// Toggle do tema
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  // Adicionar classe de transição
  document.body.style.transition = "all 0.3s ease";

  if (currentTheme === "dark") {
    // Mudar para modo claro
    document.documentElement.setAttribute("data-theme", "light");
    themeIcon.className = "bi bi-moon";
    localStorage.setItem("theme", "light");
  } else {
    // Mudar para modo escuro
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.className = "bi bi-sun";
    localStorage.setItem("theme", "dark");
  }

  // Adicionar efeito visual ao botão
  themeToggle.style.transform = "rotate(360deg)";
  setTimeout(() => {
    themeToggle.style.transform = "rotate(0deg)";
    // Remover transição extra após a animação
    document.body.style.transition = "";
  }, 300);
});

// Atualizar navegação ativa baseado na rolagem
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id], header[id]");
  const navItems = document.querySelectorAll(".nav-item");

  let current = "home"; // Valor padrão
  const scrollPosition = window.pageYOffset + 150; // Offset para melhor detecção

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
      current = section.getAttribute("id");
    }
  });

  // Se estiver no final da página, forçar contato como ativo
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    current = "contact";
  }

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href") === `#${current}`) {
      item.classList.add("active");
    }
  });
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
  const cards = document.querySelectorAll(".project-card, .contact-item");
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
document.querySelectorAll(".project-card, .contact-item").forEach((card) => {
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
