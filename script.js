// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
  setupTabs();
  loadFeaturedPosts();
  setupEditor();
  loadEvents();
});

// Configurar pestañas del diario
function setupTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remover clase active de todos los botones y contenidos
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      // Agregar clase active al botón clickeado
      this.classList.add('active');
      
      // Mostrar el contenido correspondiente
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// Función para vista previa de imágenes
function previewImage(event, galleryId) {
  const files = event.target.files;
  if (!files.length) return;

  Array.from(files).forEach(file => {
    if (!file.type.match('image.*')) {
      showError('Solo se permiten archivos de imagen!');
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      createImageElement(e.target.result, galleryId);
    };
    reader.readAsDataURL(file);
  });
}

// Función para crear elementos de imagen
function createImageElement(imgSrc, galleryId) {
  const galleryItem = document.createElement("div");
  galleryItem.className = "gallery-item animate__animated animate__zoomIn";
  
  const img = document.createElement("img");
  img.src = imgSrc;
  
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteBtn.onclick = function() {
    Swal.fire({
      title: '¿Eliminar esta foto?',
      text: "Se borrará de tu diario",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ff9eb5',
      cancelButtonColor: '#888',
      confirmButtonText: 'Sí, eliminar',
      background: '#fff0f5',
      color: '#5a3d4d'
    }).then((result) => {
      if (result.isConfirmed) {
        galleryItem.classList.add('animate__zoomOut');
        setTimeout(() => galleryItem.remove(), 300);
      }
    });
  };
  
  galleryItem.appendChild(img);
  galleryItem.appendChild(deleteBtn);
  document.getElementById(galleryId).appendChild(galleryItem);
}

// Función para guardar imágenes (simulada)
function saveImages(galleryId, section) {
  const gallery = document.getElementById(galleryId);
  const images = gallery.querySelectorAll('img');
  
  if (images.length === 0) {
    showError('Sube algunas fotos lindas primero!');
    return;
  }

  showSuccess('Imágenes guardadas correctamente');
  party.sparkles(document.querySelector('.save-btn'), {
    count: party.variation.range(30, 50),
    speed: party.variation.range(100, 300)
  });
}

// Configurar el editor de posts
function setupEditor() {
  const editorTools = document.querySelectorAll('.tool-btn');
  
  editorTools.forEach(tool => {
    tool.addEventListener('click', function() {
      const command = this.getAttribute('data-command');
      
      if (command === 'bold' || command === 'italic') {
        document.execCommand(command, false, null);
      } else if (command === 'insertImage') {
        const url = prompt('Ingresa la URL de la imagen:');
        if (url) document.execCommand('insertImage', false, url);
      } else if (command === 'createLink') {
        const url = prompt('Ingresa la URL del enlace:');
        if (url) document.execCommand('createLink', false, url);
      }
    });
  });
}

// Funciones de utilidad
function showError(message) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
    background: '#fff0f5',
    color: '#5a3d4d'
  });
}

function showSuccess(message) {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500,
    background: '#fff0f5',
    color: '#5a3d4d'
  });
}

// Funciones simuladas para cargar contenido
function loadFeaturedPosts() {
  // Simular carga de posts destacados
}

function loadEvents() {
  // Simular carga de eventos
}

function publishPost() {
  const title = document.getElementById('post-title').value;
  const content = document.getElementById('post-content').value;
  
  if (title && content) {
    showSuccess('Artículo publicado correctamente');
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
  } else {
    showError('Por favor completa el título y contenido');
  }
}