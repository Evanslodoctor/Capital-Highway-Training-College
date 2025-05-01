(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  /**
   * Debounce function to limit how often a function is called
   */
  function debounce(func, wait = 100) {
    let timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
    };
  }

  document.addEventListener('scroll', debounce(toggleScrolled));

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Optimized Preloader - Will disappear when DOM is ready or after max 3 seconds
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    const hidePreloader = () => {
      preloader.style.transition = 'opacity 0.5s ease';
      preloader.style.opacity = '0';
      setTimeout(() => preloader.remove(), 500);
    };

    // Remove when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(hidePreloader, 1000); // Give it at least 1 second
    });

    // Safety net: remove after max 3 seconds
    setTimeout(hidePreloader, 3000);
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  document.addEventListener('scroll', debounce(toggleScrollTop));

  /**
   * Initialize functionality when DOM is ready
   */
  document.addEventListener('DOMContentLoaded', function() {
    toggleScrolled();
    toggleScrollTop();

    /**
     * Animation on scroll function and init
     */
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }

    /**
     * Initiate glightbox
     */
    if (typeof GLightbox !== 'undefined') {
      const glightbox = GLightbox({
        selector: '.glightbox'
      });
    }

    /**
     * Initiate Pure Counter
     */
    if (typeof PureCounter !== 'undefined') {
      new PureCounter();
    }

    /**
     * Init swiper sliders
     */
    function initSwiper() {
      if (typeof Swiper === 'undefined') return;
      
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );

        if (swiperElement.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      });
    }
    initSwiper();

    /**
     * Exam Bodies Swiper
     */
    if (typeof Swiper !== 'undefined') {
      const accreditationSwiper = new Swiper('.accreditation-swiper', {
        loop: true,
        speed: 600,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          576: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 30,
          }
        }
      });
    }
  });

  /**
   * Header scroll effect
   */
  window.addEventListener('scroll', debounce(function() {
    const topbar = document.getElementById('topbar');
    const header = document.getElementById('header');
    
    if (window.scrollY > 50) {
      header.classList.add('moving-up');
      topbar.style.opacity = "0";
    } else {
      header.classList.remove('moving-up');
      topbar.style.opacity = "1";
    }
  }));

})();