// public/js/script.js

// AOS (Animate On Scroll) setup
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('[data-aos]');

  const animateOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    animatedElements.forEach((el) => {
      const boxTop = el.getBoundingClientRect().top;

      if (boxTop < triggerBottom) {
        el.classList.add('aos-animate');
      } else {
        el.classList.remove('aos-animate');
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Trigger once on load
});
