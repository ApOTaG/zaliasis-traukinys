document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = () => {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // Close mobile menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('active') &&
            !mobileNav.contains(e.target) &&
            !mobileMenuBtn.contains(e.target)) {
            toggleMenu();
        }
    });

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });
    setTimeout(() => navbar.classList.remove('hidden-onload'), 100);

    // 3. Scroll Reveal Animations
    const fadeElements = document.querySelectorAll('.fade-in-section');
    const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    fadeElements.forEach(el => appearOnScroll.observe(el));

    // 4. Menu Data and Rendering
    window.menuItemsData = [];
    const menuContainer = document.getElementById('menu-container');

    window.renderMenu = () => {
        if (!menuContainer) return;
        menuContainer.innerHTML = '';

        window.menuItemsData.forEach((item, index) => {
            const spicySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="var(--clr-accent-red)" stroke="var(--clr-accent-red)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flame" style="vertical-align: middle; margin-top: -2px;"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`;
            const spicyHtml = item.spicy ? `<span class="spicy-icon" title="Spicy">${spicySvg}</span>` : '';
            const delayStr = `style="transition-delay: ${index * 50}ms"`;

            // Translations
            const lang = window.currentLang || 'lt';
            const itemName = lang === 'en' ? (item.enName || item.name) : item.name;
            const itemDesc = lang === 'en' ? item.name : (item.enName || '');

            const itemHtml = `
                <div class="menu-item glass-card fade-in-section is-visible" ${delayStr}>
                    ${item.image ? `<div class="menu-img-wrap"><img src="${item.image}" alt="${itemName}" class="menu-item-img" loading="lazy"></div>` : ''}
                    <div class="menu-item-content">
                        <div class="menu-item-header">
                            <h3 class="menu-item-title">${item.id}. ${itemName} ${spicyHtml}</h3>
                            <span class="menu-item-price">${item.price}</span>
                        </div>
                        <p class="menu-item-desc">${itemDesc}</p>
                    </div>
                </div>
            `;
            menuContainer.insertAdjacentHTML('beforeend', itemHtml);
        });
    };

    const fetchMenu = async () => {
        try {
            const response = await fetch('data/menu.json');
            if (!response.ok) throw new Error('Failed to fetch menu');
            window.menuItemsData = await response.json();
            window.renderMenu();
        } catch (error) {
            console.error('Error fetching menu:', error);
            menuContainer.innerHTML = '<p class="text-center">Nepavyko užkrauti meniu.</p>';
        }
    };
    fetchMenu();

    // 5. Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '...';
            submitBtn.disabled = true;

            try {
                // Simulate network request for static GitHub Pages hosting
                await new Promise(resolve => setTimeout(resolve, 800));

                formFeedback.classList.remove('hidden');
                contactForm.reset();
                setTimeout(() => formFeedback.classList.add('hidden'), 5000);
            } catch (error) {
                console.error(error);
                alert('Klaida!');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
