// ===== Global Variables =====
let currentLang = 'ar';
let currentTheme = 'light';
let isLoading = true;

// ===== Audio Context =====
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// ===== Sound Effects =====
const sounds = {
  click: () => playTone(800, 0.1, 'sine'),
  hover: () => playTone(600, 0.05, 'sine'),
  success: () => playTone(1000, 0.2, 'triangle'),
  notification: () => playSequence([440, 554, 659], 0.15)
};

function playTone(frequency, duration, type = 'sine') {
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

function playSequence(frequencies, duration) {
  frequencies.forEach((freq, index) => {
    setTimeout(() => playTone(freq, duration), index * duration * 1000);
  });
}

// ===== Language Data =====
const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    about: 'نبذة عني',
    projects: 'المشاريع',
    skills: 'المهارات',
    contact: 'التواصل',
    
    // Hero Section
    greeting: 'مرحباً بك في ملفي الشخصي!',
    name: 'أنا محمد',
    title: 'مطور ذكاء اصطناعي',
    heroDescription: 'مطور برمجيات متخصص في الذكاء الاصطناعي، مع خبرة عملية مثبتة في تصميم وتطوير الحلول التقنية المتكاملة من المفهوم إلى التنفيذ. أتميز في مجالات معالجة اللغات الطبيعية ورؤية الحاسوب.',
    exploreProjects: 'استكشف مشاريعي',
    contactMe: 'تواصل معي',
    projects: 'مشاريع',
    technologies: 'تقنيات',
    experience: 'سنوات خبرة',
    
    // About Section
    aboutTitle: 'نبذة عني',
    aboutSubtitle: 'تعرف على خلفيتي التعليمية والمهنية',
    education: 'التعليم',
    undergraduateStudent: 'طالب جامعي - السنة الثالثة',
    artificialIntelligence: 'الذكاء الاصطناعي',
    alAzharUniversity: 'جامعة الأزهر',
    highSchoolDiploma: 'شهادة الثانوية العامة',
    kuwaitSchool: 'مدرسة الكويت',
    
    // Projects Section
    projectsTitle: 'المشاريع',
    projectsSubtitle: 'استكشف مجموعة من أعمالي المتنوعة',
    keyFeatures: 'الميزات الرئيسية:',
    
    // Skills Section
    skillsTitle: 'المهارات التقنية',
    skillsSubtitle: 'تقنيات وأدوات متنوعة أتقنها',
    programmingLanguages: 'لغات البرمجة',
    aiMachineLearning: 'الذكاء الاصطناعي والتعلم الآلي',
    webDevelopment: 'تطوير الويب',
    mobileDevelopment: 'تطوير تطبيقات الهاتف',
    databases: 'قواعد البيانات',
    cloudComputing: 'الحوسبة السحابية',
    toolsTechnologies: 'أدوات وتقنيات أخرى',
    securityCryptography: 'التشفير والأمان',
    operatingSystems: 'أنظمة التشغيل',
    developmentTools: 'بيئات التطوير',
    
    // GitHub Stats Section
    githubStatsTitle: 'إحصائيات GitHub',
    githubStatsSubtitle: 'نظرة على نشاطي في GitHub',
    publicRepos: 'المستودعات العامة',
    starsEarned: 'النجوم المكتسبة',
    contributions: 'المساهمات',
    followers: 'المتابعون',
    
    // Awards Section
    awardsTitle: 'الجوائز والإنجازات',
    awardsSubtitle: 'اعتراف بالتميز والإبداع',
    hackathonWinner: 'فائز في الهاكاثون',
    hackathonDesc: 'حصلت على المركز الأول في مسابقة الهاكاثون للذكاء الاصطناعي',
    openSourceContributor: 'مساهم في المصادر المفتوحة',
    openSourceDesc: 'مساهمات فعالة في مشاريع المصادر المفتوحة',
    aiResearcher: 'باحث في الذكاء الاصطناعي',
    aiResearcherDesc: 'أبحاث متقدمة في مجال الذكاء الاصطناعي ومعالجة اللغات الطبيعية',
    fullStackDeveloper: 'مطور Full Stack',
    fullStackDesc: 'خبرة شاملة في تطوير التطبيقات من الواجهة الأمامية إلى الخلفية',
    
    // Contact Section
    contactTitle: 'تواصل معي',
    contactSubtitle: 'دعنا نتعاون في مشروعك القادم',
    email: 'البريد الإلكتروني',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    portfolio: 'الموقع الشخصي',
    followMe: 'تابعني على',
    
    // Footer
    footerText: '© 2024 محمد - مطور ذكاء اصطناعي. جميع الحقوق محفوظة.'
  },
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    skills: 'Skills',
    contact: 'Contact',
    
    // Hero Section
    greeting: 'Welcome to my GitHub Profile!',
    name: 'I\'m Mohammed',
    title: 'AI Developer',
    heroDescription: 'A software developer specializing in Artificial Intelligence, with proven practical experience in designing and developing integrated technical solutions from concept to execution. I excel in Natural Language Processing (NLP) and Computer Vision.',
    exploreProjects: 'Explore My Projects',
    contactMe: 'Contact Me',
    projects: 'Projects',
    technologies: 'Technologies',
    experience: 'Years Experience',
    
    // About Section
    aboutTitle: 'About Me',
    aboutSubtitle: 'Learn about my educational and professional background',
    education: 'Education',
    undergraduateStudent: 'Undergraduate Student - Third Year',
    artificialIntelligence: 'Artificial Intelligence',
    alAzharUniversity: 'Al-Azhar University',
    highSchoolDiploma: 'High School Diploma',
    kuwaitSchool: 'Kuwait School',
    
    // Projects Section
    projectsTitle: 'Projects',
    projectsSubtitle: 'Explore a collection of my diverse work',
    keyFeatures: 'Key Features:',
    
    // Skills Section
    skillsTitle: 'Technical Skills',
    skillsSubtitle: 'Various technologies and tools I master',
    programmingLanguages: 'Programming Languages',
    aiMachineLearning: 'AI & Machine Learning',
    webDevelopment: 'Web Development',
    mobileDevelopment: 'Mobile Development',
    databases: 'Databases',
    cloudComputing: 'Cloud Computing',
    toolsTechnologies: 'Tools & Technologies',
    securityCryptography: 'Security & Cryptography',
    operatingSystems: 'Operating Systems',
    developmentTools: 'Development Tools',
    
    // GitHub Stats Section
    githubStatsTitle: 'GitHub Statistics',
    githubStatsSubtitle: 'A look at my GitHub activity',
    publicRepos: 'Public Repositories',
    starsEarned: 'Stars Earned',
    contributions: 'Contributions',
    followers: 'Followers',
    
    // Awards Section
    awardsTitle: 'Awards & Achievements',
    awardsSubtitle: 'Recognition for excellence and innovation',
    hackathonWinner: 'Hackathon Winner',
    hackathonDesc: 'Won first place in AI hackathon competition',
    openSourceContributor: 'Open Source Contributor',
    openSourceDesc: 'Active contributions to open source projects',
    aiResearcher: 'AI Researcher',
    aiResearcherDesc: 'Advanced research in AI and Natural Language Processing',
    fullStackDeveloper: 'Full Stack Developer',
    fullStackDesc: 'Comprehensive experience in frontend to backend development',
    
    // Contact Section
    contactTitle: 'Contact Me',
    contactSubtitle: 'Let\'s collaborate on your next project',
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    portfolio: 'Portfolio',
    followMe: 'Follow Me',
    
    // Footer
    footerText: '© 2024 Mohammed - AI Developer. All rights reserved.'
  }
};

// ===== DOM Content Loaded =====
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

// ===== Initialize Application =====
function initializeApp() {
  // Initialize theme
  initializeTheme();
  
  // Initialize language
  initializeLanguage();
  
  // Setup event listeners
  setupEventListeners();
  
  // Setup scroll animations
  setupScrollAnimations();
  
  // Setup particles
  setupParticles();
  
  // Hide loading screen
  setTimeout(() => {
    hideLoading();
  }, 1000);
  
  // Play welcome sound
  setTimeout(() => {
    sounds.notification();
  }, 1500);
}

// ===== Theme Management =====
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  currentTheme = savedTheme;
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon();
}

function toggleTheme() {
  sounds.click();
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  updateThemeIcon();
  
  // Add transition effect
  document.body.style.transition = 'all 0.3s ease';
  setTimeout(() => {
    document.body.style.transition = '';
  }, 300);
}

function updateThemeIcon() {
  const themeToggle = document.getElementById('themeToggle');
  const icon = themeToggle.querySelector('i');
  
  if (currentTheme === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// ===== Language Management =====
function initializeLanguage() {
  const savedLang = localStorage.getItem('language') || 'ar';
  currentLang = savedLang;
  updateLanguage();
}

function toggleLanguage() {
  sounds.click();
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  localStorage.setItem('language', currentLang);
  updateLanguage();
}

function updateLanguage() {
  const html = document.documentElement;
  const body = document.body;
  const langToggle = document.getElementById('langToggle');
  
  // Update HTML attributes
  html.lang = currentLang;
  html.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  body.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  
  // Update language toggle button
  langToggle.textContent = currentLang === 'ar' ? 'EN' : 'ع';
  
  // Update all translatable elements
  updateTranslations();
  
  // Update navigation menu order for RTL
  updateNavigationOrder();
}

function updateTranslations() {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[currentLang] && translations[currentLang][key]) {
      element.textContent = translations[currentLang][key];
    }
  });
}

function updateNavigationOrder() {
  const navMenu = document.querySelector('.nav-menu');
  if (currentLang === 'ar') {
    navMenu.style.flexDirection = 'row-reverse';
  } else {
    navMenu.style.flexDirection = 'row';
  }
}

// ===== Event Listeners =====
function setupEventListeners() {
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', toggleTheme);
  
  // Language toggle
  const langToggle = document.getElementById('langToggle');
  langToggle.addEventListener('click', toggleLanguage);
  
  // Navigation toggle for mobile
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav-menu');
  
  navToggle.addEventListener('click', () => {
    sounds.click();
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      sounds.click();
      
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
      
      // Close mobile menu
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
  
  // Button hover effects
  const buttons = document.querySelectorAll('.btn, .nav-link, .social-link, .project-link');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      sounds.hover();
    });
    
    button.addEventListener('click', () => {
      sounds.click();
    });
  });
  
  // Skill item interactions
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      sounds.hover();
      item.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
    
    item.addEventListener('click', () => {
      sounds.click();
      item.style.animation = 'pulse 0.6s ease-in-out';
      setTimeout(() => {
        item.style.animation = '';
      }, 600);
    });
  });
  
  // Project card interactions
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      sounds.hover();
    });
  });
  
  // Scroll to top when clicking logo
  const logo = document.querySelector('.nav-logo');
  logo.addEventListener('click', () => {
    sounds.click();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Scroll indicator
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      sounds.click();
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // Contact form interactions (if exists)
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      sounds.hover();
    });
  });
  
  // Social links
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    link.addEventListener('click', () => {
      sounds.success();
    });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', handleKeyboardNavigation);
}

// ===== Keyboard Navigation =====
function handleKeyboardNavigation(e) {
  switch(e.key) {
    case 'Escape':
      // Close mobile menu
      const navMenu = document.querySelector('.nav-menu');
      const navToggle = document.getElementById('navToggle');
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      break;
      
    case 'Home':
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      break;
      
    case 'End':
      e.preventDefault();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      break;
  }
}

// ===== Scroll Animations =====
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Play sound for certain elements
        if (entry.target.classList.contains('section-title')) {
          setTimeout(() => sounds.notification(), 200);
        }
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    '.fade-in, .slide-in-left, .slide-in-right, .project-card, .skill-item, .stat-card, .award-card'
  );
  
  animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
  
  // Update active navigation link on scroll
  window.addEventListener('scroll', updateActiveNavLink);
  
  // Show/hide scroll to top button
  window.addEventListener('scroll', handleScrollToTop);
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

function handleScrollToTop() {
  const scrollTop = window.scrollY;
  const navbar = document.querySelector('.navbar');
  
  // Add/remove navbar background on scroll
  if (scrollTop > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// ===== Particles Animation =====
function setupParticles() {
  const particlesContainer = document.querySelector('.particles');
  if (!particlesContainer) return;
  
  // Create floating particles
  for (let i = 0; i < 50; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  // Random position and properties
  const size = Math.random() * 4 + 1;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 5;
  
  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    left: ${x}%;
    top: ${y}%;
    animation: float ${duration}s ${delay}s infinite linear;
    pointer-events: none;
  `;
  
  container.appendChild(particle);
}

// ===== Loading Screen =====
function hideLoading() {
  const loading = document.querySelector('.loading');
  if (loading) {
    loading.classList.add('hidden');
    setTimeout(() => {
      loading.remove();
    }, 500);
  }
  
  // Trigger entrance animations
  triggerEntranceAnimations();
}

function triggerEntranceAnimations() {
  const heroElements = document.querySelectorAll('.hero-title span, .hero-description, .hero-buttons');
  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 200);
  });
}

// ===== Utility Functions =====
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

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ===== Performance Optimizations =====
const debouncedResize = debounce(() => {
  // Handle resize events
  updateLayout();
}, 250);

const throttledScroll = throttle(() => {
  updateActiveNavLink();
  handleScrollToTop();
}, 16);

window.addEventListener('resize', debouncedResize);
window.addEventListener('scroll', throttledScroll);

function updateLayout() {
  // Update layout on resize
  const isMobile = window.innerWidth <= 768;
  const navMenu = document.querySelector('.nav-menu');
  
  if (!isMobile) {
    navMenu.classList.remove('active');
    document.getElementById('navToggle').classList.remove('active');
  }
}

// ===== Error Handling =====
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
  // Could implement error reporting here
});

// ===== Service Worker Registration =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// ===== Analytics and Tracking =====
function trackEvent(category, action, label) {
  // Implement analytics tracking
  console.log(`Event: ${category} - ${action} - ${label}`);
}

// Track button clicks
document.addEventListener('click', (e) => {
  if (e.target.matches('.btn')) {
    trackEvent('Button', 'Click', e.target.textContent.trim());
  }
  
  if (e.target.matches('.social-link')) {
    trackEvent('Social', 'Click', e.target.getAttribute('href'));
  }
  
  if (e.target.matches('.nav-link')) {
    trackEvent('Navigation', 'Click', e.target.textContent.trim());
  }
});

// ===== Accessibility Enhancements =====
function enhanceAccessibility() {
  // Add skip link
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.textContent = currentLang === 'ar' ? 'تخطي إلى المحتوى الرئيسي' : 'Skip to main content';
  skipLink.className = 'sr-only';
  skipLink.addEventListener('focus', () => {
    skipLink.classList.remove('sr-only');
  });
  skipLink.addEventListener('blur', () => {
    skipLink.classList.add('sr-only');
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add ARIA labels
  const themeToggle = document.getElementById('themeToggle');
  const langToggle = document.getElementById('langToggle');
  
  themeToggle.setAttribute('aria-label', currentLang === 'ar' ? 'تبديل الوضع الليلي' : 'Toggle dark mode');
  langToggle.setAttribute('aria-label', currentLang === 'ar' ? 'تبديل اللغة' : 'Toggle language');
  
  // Add focus indicators
  const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
  focusableElements.forEach(el => {
    el.addEventListener('focus', () => {
      el.style.outline = '2px solid var(--primary-color)';
      el.style.outlineOffset = '2px';
    });
    
    el.addEventListener('blur', () => {
      el.style.outline = '';
      el.style.outlineOffset = '';
    });
  });
}

// ===== Initialize Accessibility =====
document.addEventListener('DOMContentLoaded', enhanceAccessibility);

// ===== Custom Cursor Effect =====
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: var(--primary-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    opacity: 0;
  `;
  
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursor.style.opacity = '0.5';
  });
  
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '0.5';
  });
  
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  
  // Scale cursor on hover over interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .skill-item, .project-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(1.5)';
      cursor.style.background = 'var(--secondary-color)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.background = 'var(--primary-color)';
    });
  });
}

// Initialize custom cursor on desktop
if (window.innerWidth > 768) {
  initCustomCursor();
}

// ===== Preloader =====
function createPreloader() {
  const preloader = document.createElement('div');
  preloader.className = 'loading';
  preloader.innerHTML = `
    <div class="spinner"></div>
  `;
  
  document.body.appendChild(preloader);
  
  return preloader;
}

// ===== Initialize Preloader =====
const preloader = createPreloader();

// ===== Export functions for global access =====
window.portfolioApp = {
  toggleTheme,
  toggleLanguage,
  sounds,
  trackEvent
};

