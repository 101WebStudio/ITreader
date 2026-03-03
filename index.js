// Mobile menu
    document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
      document.querySelector('nav ul').classList.toggle('active');
      const icon = this.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });

    // Persistent dark mode with localStorage
    const toggle = document.getElementById('themeToggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('itreader-theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-mode');
      toggle.innerHTML = '<i class="fa-regular fa-sun"></i> <span>Light</span>';
    } else {
      toggle.innerHTML = '<i class="fa-regular fa-moon"></i> <span>Dark</span>';
    }

    toggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      if (isDark) {
        toggle.innerHTML = '<i class="fa-regular fa-sun"></i> <span>Light</span>';
        localStorage.setItem('itreader-theme', 'dark');
      } else {
        toggle.innerHTML = '<i class="fa-regular fa-moon"></i> <span>Dark</span>';
        localStorage.setItem('itreader-theme', 'light');
      }
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) window.scrollTo({top: target.offsetTop-70, behavior:'smooth'});
        document.querySelector('nav ul')?.classList.remove('active');
      });
    });

    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('section').forEach(section => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    // Stat counters
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      ScrollTrigger.create({
        trigger: stat,
        start: 'top 85%',
        onEnter: () => {
          let current = 0;
          const increment = target / 25;
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              stat.innerText = Math.ceil(current);
              requestAnimationFrame(updateCounter);
            } else {
              stat.innerText = target + (target===100?'+':'');
            }
          };
          updateCounter();
        },
        once: true
      });
    });
