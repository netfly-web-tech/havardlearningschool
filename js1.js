/**
 * HARVARD LEARNING SCHOOL / ST. LOUISE ACADEMY
 * Interactive UI Engine & Performance Script
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Initialize AOS Scroll Animations
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });
  
  // 2. Page Loader Removal
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 500);
    }
  });
  
  // 3. Mobile Hamburger Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });
    
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      });
    });
  }
  
  // 4. Header Scroll Shadow & Sticky Effects
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // 5. Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // 6. Hero Slider Functionality
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  let currentSlide = 0;
  let slideInterval;
  
  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) slide.classList.add('active');
    });
  };
  
  const nextSlideAction = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  };
  
  const prevSlideAction = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  };
  
  if (slides.length > 0) {
    nextBtn?.addEventListener('click', () => {
      nextSlideAction();
      resetInterval();
    });
    
    prevBtn?.addEventListener('click', () => {
      prevSlideAction();
      resetInterval();
    });
    
    const startInterval = () => slideInterval = setInterval(nextSlideAction, 5000);
    const resetInterval = () => {
      clearInterval(slideInterval);
      startInterval();
    };
    
    startInterval();
  }
  
  // 7. Animated Number Counters
  const counters = document.querySelectorAll('.counter-number');
  let counterAnimated = false;
  
  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const speed = target / 50;
      let count = 0;
      
      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };
  
  window.addEventListener('scroll', () => {
    const counterSection = document.querySelector('.counter-section');
    if (counterSection && !counterAnimated) {
      const sectionPos = counterSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight;
      if (sectionPos < screenPos - 100) {
        animateCounters();
        counterAnimated = true;
      }
    }
  });
  
  // 8. FAQ Accordion Interaction
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isActive = question.classList.contains('active');
      
      document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
        q.nextElementSibling.style.maxHeight = null;
      });
      
      if (!isActive) {
        question.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
  
  // 9. Gallery Lightbox Modal
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const closeModal = document.querySelector('.lightbox-close');
  const galleryTriggers = document.querySelectorAll('.lightbox-trigger');
  
  galleryTriggers.forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImg.src = img.src;
      modalImg.alt = img.alt;
    });
  });
  
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }
  
  // 10. Back to Top Button
  const backToTopBtn = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // 11. Form Validation & WhatsApp Redirect Engine
  const admissionForm = document.getElementById('admissionForm');
  const formFeedback = document.getElementById('formFeedback');
  
  if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      const inputs = admissionForm.querySelectorAll('input[required], textarea[required]');
      inputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        if (!input.value.trim()) {
          formGroup.classList.add('invalid');
          isValid = false;
        } else {
          formGroup.classList.remove('invalid');
        }
      });
      
      if (isValid) {
        // Collect form data values automatically
        const formData = new FormData(admissionForm);
        let messageText = "New Admission Inquiry:\n";
        
        for (let [key, value] of formData.entries()) {
          messageText += `${key}: ${value}\n`;
        }
        
        // Target WhatsApp phone number from the banner (+91 7982731319)
        const phoneNumber = "917982731319";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;
        
        if (formFeedback) {
          formFeedback.className = 'form-feedback success';
          formFeedback.innerText = 'Redirecting to WhatsApp to send your application...';
        }
        
        // Open WhatsApp in a new tab/window
        window.open(whatsappUrl, '_blank');
        
        admissionForm.reset();
      }
    });
  }
  
});