/* ========================================
   Scroll Fade-in Animation
   (IntersectionObserver)
   ======================================== */
document.addEventListener('DOMContentLoaded', function () {
  var fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    fadeEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ========================================
     Fixed CTA: hide when hero CTA is visible
     ======================================== */
  var fixedCta = document.querySelector('.fixed-cta');
  var heroCta = document.querySelector('.hero__cta');

  if (fixedCta && heroCta) {
    var ctaObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            fixedCta.style.transform = 'translateY(100%)';
          } else {
            fixedCta.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0 }
    );

    fixedCta.style.transition = 'transform 0.3s ease';
    ctaObserver.observe(heroCta);
  }

  /* ========================================
     Seat Indicator Animation
     ======================================== */
  var seatFill = document.querySelector('.seat-indicator__fill');
  if (seatFill) {
    // Start at 0 width, animate when visible
    var targetWidth = seatFill.style.width;
    seatFill.style.width = '0%';

    var seatObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            seatFill.style.width = targetWidth;
            seatObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    seatObserver.observe(seatFill);
  }
});
