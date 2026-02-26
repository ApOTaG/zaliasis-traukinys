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
            const spicyHtml = item.spicy ? '<span class="spicy-icon" title="Spicy">🌶️</span>' : '';
            const delayStr = `style="transition-delay: ${index * 50}ms"`;

            // Translations
            const lang = window.currentLang || 'lt';
            const itemName = lang === 'en' ? (item.enName || item.name) : item.name;
            const itemDesc = lang === 'en' ? item.name : (item.enName || '');

            const itemHtml = `
                <div class="menu-item glass-card fade-in-section is-visible" ${delayStr}>
                    ${item.image ? `<div class="menu-img-wrap"><img src="${item.image}" alt="${itemName}" class="menu-item-img"></div>` : ''}
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
            const response = await fetch('/api/menu');
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
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    formFeedback.classList.remove('hidden');
                    contactForm.reset();
                    setTimeout(() => formFeedback.classList.add('hidden'), 5000);
                }
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
