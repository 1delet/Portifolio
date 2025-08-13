// Variáveis globais
let currentImageIndex = 0;
let filteredImages = [];
let allImages = [];

// Inicialização quando o DOM carrega
document.addEventListener("DOMContentLoaded", function () {
  initializeGallery();
  setupEventListeners();
  loadImages();
});

// Inicializa a galeria
function initializeGallery() {
  allImages = Array.from(document.querySelectorAll(".gallery-item"));
  filteredImages = [...allImages];

  // Adiciona animação de entrada aos itens
  allImages.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";

    setTimeout(() => {
      item.style.transition = "all 0.5s ease";
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Configura os event listeners
function setupEventListeners() {
  // Filtros
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => filterImages(btn));
  });

  // Modal
  const modal = document.getElementById("modal");

  // Fechar modal ao clicar fora
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Teclas do teclado
  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("active")) {
      switch (e.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowLeft":
          prevImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
      }
    }
  });

  // Lazy loading das imagens
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll(".gallery-item img").forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

// Filtra as imagens por categoria
function filterImages(button) {
  const filter = button.getAttribute("data-filter");
  const galleryItems = document.querySelectorAll(".gallery-item");

  // Remove active de todos os botões
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Adiciona active ao botão clicado
  button.classList.add("active");

  // Filtra as imagens
  filteredImages = [];

  galleryItems.forEach((item, index) => {
    const category = item.getAttribute("data-category");

    if (filter === "all" || category === filter) {
      item.style.display = "block";
      item.classList.remove("hide");
      item.classList.add("show");
      filteredImages.push(item);

      // Animação de entrada
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0) scale(1)";
      }, index * 50);
    } else {
      item.classList.remove("show");
      item.classList.add("hide");

      setTimeout(() => {
        item.style.display = "none";
      }, 300);
    }
  });

  // Atualiza contador se necessário
  updateCounter();
}

// Abre o modal com a imagem
function openModal(button) {
  const galleryItem = button.closest(".gallery-item");
  const img = galleryItem.querySelector("img");
  const title = galleryItem.querySelector("h3").textContent;
  const description = galleryItem.querySelector("p").textContent;

  // Encontra o índice atual
  currentImageIndex = filteredImages.indexOf(galleryItem);

  // Atualiza o modal
  document.getElementById("modal-img").src = img.src;
  document.getElementById("modal-img").alt = img.alt;
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-description").textContent = description;

  // Mostra o modal
  const modal = document.getElementById("modal");
  modal.style.display = "flex";

  setTimeout(() => {
    modal.classList.add("active");
  }, 10);

  // Previne scroll do body
  document.body.style.overflow = "hidden";
}

// Fecha o modal
function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("active");

  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }, 300);
}

// Imagem anterior
function prevImage() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
  } else {
    currentImageIndex = filteredImages.length - 1;
  }
  updateModalImage();
}

// Próxima imagem
function nextImage() {
  if (currentImageIndex < filteredImages.length - 1) {
    currentImageIndex++;
  } else {
    currentImageIndex = 0;
  }
  updateModalImage();
}

// Atualiza a imagem do modal
function updateModalImage() {
  const currentItem = filteredImages[currentImageIndex];
  const img = currentItem.querySelector("img");
  const title = currentItem.querySelector("h3").textContent;
  const description = currentItem.querySelector("p").textContent;

  // Animação de saída
  const modalImg = document.getElementById("modal-img");
  modalImg.style.opacity = "0";
  modalImg.style.transform = "scale(0.9)";

  setTimeout(() => {
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-description").textContent = description;

    // Animação de entrada
    modalImg.style.opacity = "1";
    modalImg.style.transform = "scale(1)";
  }, 150);
}

// Carrega imagens dinamicamente (se necessário)
function loadImages() {
  // Esta função pode ser usada para carregar imagens de uma API
  // Por agora, as imagens já estão no HTML
  console.log("Galeria carregada com sucesso!");
  console.log(`Total de imagens: ${allImages.length}`);
}

// Atualiza contador de imagens (opcional)
function updateCounter() {
  // Você pode adicionar um contador se quiser
  console.log(
    `Mostrando ${filteredImages.length} de ${allImages.length} imagens`
  );
}

// Função para adicionar novas imagens dinamicamente
function addImage(src, alt, category, title, description) {
  const gallery = document.getElementById("gallery");

  const galleryItem = document.createElement("div");
  galleryItem.className = "gallery-item";
  galleryItem.setAttribute("data-category", category);

  galleryItem.innerHTML = `
        <img src="${src}" alt="${alt}" loading="lazy">
        <div class="overlay">
            <h3>${title}</h3>
            <p>${description}</p>
            <button class="view-btn" onclick="openModal(this)">
                <i class="fas fa-expand"></i> Ver
            </button>
        </div>
    `;

  gallery.appendChild(galleryItem);

  // Atualiza arrays
  allImages.push(galleryItem);

  // Se o filtro atual permite esta imagem
  const currentFilter = document
    .querySelector(".filter-btn.active")
    .getAttribute("data-filter");
  if (currentFilter === "all" || currentFilter === category) {
    filteredImages.push(galleryItem);
  }

  // Animação de entrada
  galleryItem.style.opacity = "0";
  galleryItem.style.transform = "translateY(30px)";

  setTimeout(() => {
    galleryItem.style.transition = "all 0.5s ease";
    galleryItem.style.opacity = "1";
    galleryItem.style.transform = "translateY(0)";
  }, 100);

  console.log("Nova imagem adicionada à galeria");
}

// Função para remover imagem
function removeImage(index) {
  if (index >= 0 && index < allImages.length) {
    const item = allImages[index];

    // Animação de saída
    item.style.opacity = "0";
    item.style.transform = "translateY(-30px)";

    setTimeout(() => {
      item.remove();
      allImages.splice(index, 1);

      // Remove das imagens filtradas também
      const filteredIndex = filteredImages.indexOf(item);
      if (filteredIndex > -1) {
        filteredImages.splice(filteredIndex, 1);
      }

      console.log("Imagem removida da galeria");
    }, 300);
  }
}

// Utilitário para mudança de tema (opcional)
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark-theme") ? "dark" : "light"
  );
}

// Carrega tema salvo
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }
}

// Performance: Debounce para redimensionamento
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Otimização para redimensionamento da janela
const handleResize = debounce(() => {
  // Reposiciona elementos se necessário
  console.log("Janela redimensionada");
}, 250);

window.addEventListener("resize", handleResize);

// Carrega tema ao inicializar
loadTheme();
