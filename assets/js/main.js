// Main Interactive Scripts with Profile Photo Manager
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Update Year in Footer
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });

  // Clear any legacy custom profile image in localStorage
  try {
    localStorage.removeItem('oalx_custom_profile_image');
  } catch(e) {}

  // Profile Photo Smart Fallback Loader
  // Otomatis mengenali berkas foto-profil.jpg, foto-profil.png, foto-profil.jpeg, atau foto-profil.webp di assets/images/
  const profileImageElements = document.querySelectorAll('.user-profile-img');
  const possiblePaths = [
    'assets/images/foto-profil.jpg',
    'assets/images/foto-profil.png',
    'assets/images/foto-profil.jpeg',
    'assets/images/foto-profil.webp'
  ];
  
  function findValidImage(urls, callback) {
    if (!urls || urls.length === 0) return;
    const testImg = new Image();
    testImg.onload = () => callback(urls[0]);
    testImg.onerror = () => findValidImage(urls.slice(1), callback);
    testImg.src = urls[0];
  }

  findValidImage(possiblePaths, (validUrl) => {
    profileImageElements.forEach(el => {
      el.src = validUrl;
    });
  });



  // ========================================================
  // SHOOTING STARS & COSMIC PARTICLES CONTROLLER
  // ========================================================
  initShootingStars();

  // ========================================================
  // PORTFOLIO MANAGER (FILTERS, CUSTOM PROJECTS & PREVIEWS)
  // ========================================================
  initPortfolioManager();

  // ========================================================
  // CONTACT FORM INTERACTION
  // ========================================================
  initContactForm();
});

function initShootingStars() {
  // Check if field already exists or create one
  let starField = document.querySelector('.shooting-stars-field');
  if (!starField) {
    starField = document.createElement('div');
    starField.className = 'shooting-stars-field';
    document.body.prepend(starField);
  }

  // Create subtle twinkling background stars
  const starCount = Math.min(window.innerWidth > 768 ? 28 : 14, 35);
  for (let i = 0; i < starCount; i++) {
    createTwinkleStar(starField);
  }

  // Periodic Shooting Star Spawner
  let shootingTimer = null;

  function scheduleNextStar() {
    if (document.hidden) {
      shootingTimer = setTimeout(scheduleNextStar, 2000);
      return;
    }
    const delay = Math.floor(Math.random() * 1800) + 1200; // 1.2s to 3.0s
    shootingTimer = setTimeout(() => {
      spawnShootingStar(starField);
      scheduleNextStar();
    }, delay);
  }

  // Spawn first one quickly
  setTimeout(() => {
    spawnShootingStar(starField);
    scheduleNextStar();
  }, 600);

  // Logo Interactive Meteor Shower Trigger
  const logoElements = document.querySelectorAll('.logo-moving-emblem, .group\\/logo');
  logoElements.forEach(logo => {
    logo.addEventListener('click', () => {
      triggerMeteorShower(starField, 4);
    });
  });

  // Handle Visibility Change
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearTimeout(shootingTimer);
    } else {
      scheduleNextStar();
    }
  });
}

function createTwinkleStar(container) {
  const star = document.createElement('span');
  star.className = 'twinkle-ambient-star';
  const size = (Math.random() * 2.5 + 1.2).toFixed(1);
  const posX = Math.random() * 100;
  const posY = Math.random() * 60; // Top 60% of viewport
  const duration = (Math.random() * 3 + 2).toFixed(1);
  const delay = (Math.random() * 4).toFixed(1);

  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.left = `${posX}vw`;
  star.style.top = `${posY}vh`;
  star.style.setProperty('--twinkle-dur', `${duration}s`);
  star.style.animationDelay = `${delay}s`;

  // Color variety: white, pale cyan, light indigo
  const colors = ['#ffffff', '#bae6fd', '#c7d2fe', '#e0e7ff'];
  star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

  container.appendChild(star);
}

function spawnShootingStar(container, customOriginX, customOriginY) {
  if (!container) return;

  const star = document.createElement('span');
  star.className = 'shooting-star';

  // Origin point: from upper right area diagonal towards bottom left
  const startX = customOriginX !== undefined 
    ? customOriginX 
    : Math.random() * (window.innerWidth * 0.8) + (window.innerWidth * 0.2);
  const startY = customOriginY !== undefined 
    ? customOriginY 
    : Math.random() * (window.innerHeight * 0.45) - 30;

  const length = Math.floor(Math.random() * 100) + 140; // 140px to 240px
  const duration = (Math.random() * 0.6 + 0.95).toFixed(2); // 0.95s to 1.55s
  const travelDistance = Math.floor(Math.random() * 300) + 520; // 520px to 820px

  star.style.width = `${length}px`;
  star.style.left = `${startX}px`;
  star.style.top = `${startY}px`;
  star.style.setProperty('--star-duration', `${duration}s`);
  star.style.setProperty('--star-distance', `${travelDistance}px`);

  container.appendChild(star);

  // Self cleanup when animation completes
  star.addEventListener('animationend', () => {
    star.remove();
  });
}

function triggerMeteorShower(container, count = 3) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      spawnShootingStar(container);
    }, i * 220);
  }
}

// ========================================================
// PORTFOLIO MANAGER IMPLEMENTATION
// ========================================================
function initPortfolioManager() {
  const PORTFOLIO_STORAGE_KEY = 'oalx_custom_portfolios';
  const customContainer = document.getElementById('userCustomProjectsContainer');
  const addModal = document.getElementById('addProjectModal');
  const openAddBtn = document.getElementById('openAddProjectModalBtn');
  const closeAddBtn = document.getElementById('closeAddProjectModalBtn');
  const cancelAddBtn = document.getElementById('cancelAddProjectBtn');
  const addForm = document.getElementById('addProjectForm');

  const previewModal = document.getElementById('previewProjectModal');
  const closePreviewBtn = document.getElementById('closePreviewProjectModalBtn');
  const previewTitle = document.getElementById('previewModalTitle');
  const previewDesc = document.getElementById('previewModalDesc');
  const previewBadge = document.getElementById('previewModalBadge');

  // Load and render custom projects from localStorage
  function loadCustomProjects() {
    if (!customContainer) return;
    try {
      const savedData = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
      const projects = savedData ? JSON.parse(savedData) : [];

      customContainer.innerHTML = '';
      if (projects.length === 0) {
        customContainer.classList.add('hidden');
        return;
      }

      customContainer.classList.remove('hidden');
      projects.forEach((proj, idx) => {
        const isYellow = proj.colorTheme === 'yellow';
        const cardBg = isYellow
          ? 'bg-gradient-to-b from-amber-50/90 via-white to-white border-2 border-amber-300 shadow-amber-100/50 hover:border-amber-500'
          : 'bg-gradient-to-b from-blue-50/90 via-white to-white border-2 border-blue-300 shadow-blue-100/50 hover:border-blue-500';

        const badgeBg = isYellow
          ? 'bg-amber-100 text-amber-950 border-amber-200'
          : 'bg-blue-100 text-blue-900 border-blue-200';

        const bannerBg = isYellow
          ? 'from-amber-500 via-amber-600 to-yellow-500 text-slate-900'
          : 'from-blue-600 to-indigo-700 text-white';

        const btnClass = isYellow
          ? 'bg-amber-100 text-amber-950 hover:bg-amber-400'
          : 'bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white';

        const techTagsHtml = proj.tech
          ? proj.tech.split(',').map(t => `
              <span class="text-[11px] font-medium px-2.5 py-1 rounded-lg border ${
                isYellow ? 'bg-amber-50 text-amber-900 border-amber-200' : 'bg-blue-50 text-blue-700 border-blue-200'
              }">
                ${escapeHTML(t.trim())}
              </span>
            `).join('')
          : '';

        const card = document.createElement('div');
        card.className = `portfolio-item card-hover-effect rounded-3xl p-6 shadow-lg flex flex-col justify-between ${cardBg}`;
        card.setAttribute('data-category', proj.category || 'jaringan');
        card.innerHTML = `
          <div>
            <div class="relative w-full h-48 rounded-2xl overflow-hidden bg-gradient-to-tr ${bannerBg} p-4 flex flex-col justify-between shadow-inner mb-5">
              <div class="flex items-center justify-between">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/30 backdrop-blur-md">
                  <span class="w-1.5 h-1.5 rounded-full ${isYellow ? 'bg-amber-900' : 'bg-blue-300'}"></span>
                  ${isYellow ? 'Kolom Kuning Emas' : 'Kolom Biru Modern'}
                </span>
                <button type="button" class="delete-custom-proj-btn text-xs bg-rose-500/90 hover:bg-rose-600 text-white px-2 py-0.5 rounded-full cursor-pointer" data-index="${idx}" title="Hapus Portofolio Ini">
                  ✕ Hapus
                </button>
              </div>
              <div class="bg-white/90 backdrop-blur-md rounded-xl p-3 text-slate-900 shadow">
                <p class="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">Proyek Saya</p>
                <p class="text-sm font-extrabold truncate">${escapeHTML(proj.title)}</p>
              </div>
            </div>

            <div class="flex items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${badgeBg}">
                ${escapeHTML(proj.category.toUpperCase())}
              </span>
              <span class="text-xs text-slate-400 font-medium">Karya Saya Sendiri</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900">${escapeHTML(proj.title)}</h3>
            <p class="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">${escapeHTML(proj.description)}</p>

            <div class="mt-4 flex flex-wrap gap-1.5">
              ${techTagsHtml}
            </div>
          </div>

          <div class="mt-6 pt-4 border-t ${isYellow ? 'border-amber-100' : 'border-blue-100'} flex items-center justify-between">
            <span class="text-xs font-semibold ${isYellow ? 'text-amber-800' : 'text-blue-600'} flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full ${isYellow ? 'bg-amber-500' : 'bg-blue-500'}"></span> Tersimpan di Browser
            </span>
            <button type="button" class="view-project-preview px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${btnClass}" data-title="${escapeHTML(proj.title)}" data-desc="${escapeHTML(proj.description)}" data-color="${proj.colorTheme}">
              Pratinjau Proyek &rarr;
            </button>
          </div>
        `;

        customContainer.appendChild(card);
      });

      // Bind delete buttons
      customContainer.querySelectorAll('.delete-custom-proj-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetIdx = parseInt(btn.getAttribute('data-index'), 10);
          deleteCustomProject(targetIdx);
        });
      });

      // Bind preview buttons
      bindPreviewButtons();
    } catch (err) {
      console.warn('Error reading custom projects', err);
    }
  }

  function deleteCustomProject(index) {
    if (confirm('Apakah Anda yakin ingin menghapus portofolio ini?')) {
      const savedData = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
      if (savedData) {
        const projects = JSON.parse(savedData);
        projects.splice(index, 1);
        localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(projects));
        loadCustomProjects();
      }
    }
  }

  // Open & Close Modal Handlers
  if (openAddBtn && addModal) {
    openAddBtn.addEventListener('click', () => {
      addModal.classList.remove('hidden');
    });
  }

  function closeAddModal() {
    if (addModal) {
      addModal.classList.add('hidden');
      if (addForm) addForm.reset();
    }
  }

  if (closeAddBtn) closeAddBtn.addEventListener('click', closeAddModal);
  if (cancelAddBtn) cancelAddBtn.addEventListener('click', closeAddModal);

  if (addModal) {
    addModal.addEventListener('click', (e) => {
      if (e.target === addModal) closeAddModal();
    });
  }

  // Form Submit Handler
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('projectTitleInput').value.trim();
      const category = document.getElementById('projectCategoryInput').value;
      const colorTheme = document.getElementById('projectColorThemeInput').value;
      const description = document.getElementById('projectDescInput').value.trim();
      const tech = document.getElementById('projectTechInput').value.trim();

      if (!title || !description) {
        alert('Mohon isi judul dan deskripsi proyek.');
        return;
      }

      const newProject = {
        title,
        category,
        colorTheme,
        description,
        tech,
        dateAdded: new Date().toISOString()
      };

      const savedData = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
      const projects = savedData ? JSON.parse(savedData) : [];
      projects.unshift(newProject);
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(projects));

      closeAddModal();
      loadCustomProjects();
    });
  }

  // Category Filter Handler
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-slate-900', 'text-white', 'shadow-sm', 'active');
        b.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-200');
      });
      btn.classList.add('bg-slate-900', 'text-white', 'shadow-sm', 'active');
      btn.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200');

      const filter = btn.getAttribute('data-filter');
      const allItems = document.querySelectorAll('.portfolio-item');
      allItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Preview Modal
  function bindPreviewButtons() {
    const previewBtns = document.querySelectorAll('.view-project-preview');
    previewBtns.forEach(btn => {
      btn.onclick = () => {
        const title = btn.getAttribute('data-title');
        const desc = btn.getAttribute('data-desc');
        const color = btn.getAttribute('data-color');

        if (previewTitle) previewTitle.textContent = title;
        if (previewDesc) previewDesc.textContent = desc;

        if (previewBadge) {
          if (color === 'yellow') {
            previewBadge.textContent = 'Kolom Kuning • Proyek Kreatif';
            previewBadge.className = 'inline-block px-3 py-1 rounded-full text-[10px] font-bold mb-3 bg-amber-100 text-amber-950 border border-amber-300';
          } else {
            previewBadge.textContent = 'Kolom Biru • Arsitektur Modern';
            previewBadge.className = 'inline-block px-3 py-1 rounded-full text-[10px] font-bold mb-3 bg-blue-100 text-blue-900 border border-blue-300';
          }
        }

        if (previewModal) previewModal.classList.remove('hidden');
      };
    });
  }

  function closePreviewModal() {
    if (previewModal) previewModal.classList.add('hidden');
  }

  if (closePreviewBtn) closePreviewBtn.addEventListener('click', closePreviewModal);
  if (previewModal) {
    previewModal.addEventListener('click', (e) => {
      if (e.target === previewModal) closePreviewModal();
    });
  }

  // Initial load
  loadCustomProjects();
  bindPreviewButtons();
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Contact Form Handler with Local Storage Backup & Friendly Notifications
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const successAlert = document.getElementById('contactSuccessAlert');
  const submitBtn = document.getElementById('submitContactBtn');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const senderName = document.getElementById('senderName')?.value.trim();
    const topic = document.getElementById('contactTopic')?.value;
    const subject = document.getElementById('subjectLine')?.value.trim();
    const message = document.getElementById('messageBody')?.value.trim();

    if (!senderName || !topic || !subject || !message) {
      alert('Mohon lengkapi seluruh kolom formulir sebelum mengirim.');
      return;
    }

    // Temporary button state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        Mengirim Pesan...
      `;
    }

    // Save message locally (without sensitive personal contact info)
    const newMsg = {
      id: Date.now(),
      senderName,
      topic,
      subject,
      message,
      sentAt: new Date().toLocaleString('id-ID')
    };

    try {
      const stored = JSON.parse(localStorage.getItem('oalx_contact_messages') || '[]');
      stored.unshift(newMsg);
      localStorage.setItem('oalx_contact_messages', JSON.stringify(stored));
    } catch (err) {
      console.warn('Gagal menyimpan pesan ke localStorage:', err);
    }

    // Simulate short network delay for realistic feedback
    setTimeout(() => {
      contactForm.reset();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Kirim Pesan Sekarang
        `;
      }

      if (successAlert) {
        successAlert.classList.remove('hidden');
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        setTimeout(() => {
          successAlert.classList.add('hidden');
        }, 8000);
      }
    }, 600);
  });
}



