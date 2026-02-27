const translations = {
    lt: {
        navHome: "Pradžia",
        navAbout: "Apie Mus",
        navMenu: "Meniu",
        navContact: "Kontaktai",
        heroSub: "Autentiški skoniai Kaune",
        heroTitle: "Kinų Restoranas <br><span class='accent'>Žaliasis Traukinys</span>",
        heroDesc: "Kviečiame pasinerti į unikalią kinų virtuvės kelionę. Kiekvieną dieną su meile ir meistriškumu ruošiami tradiciniai patiekalai.",
        heroBtnMenu: "Atidaryti Meniu",
        heroBtnContact: "Susisiekti",
        aboutTitle: "Tradicijos ir skonis",
        aboutDesc: "Nuo traškios vištienos „Gou Bao“ iki tobulai paruoštos jautienos su sojos padažu – mūsų restorane rasite autentiškus kinų virtuvės skonius, kurie nustebins ir pradžiugins kiekvieną.",
        addressTitle: "Adresas",
        phoneTitle: "Telefonas",
        emailTitle: "El. paštas",
        menuTitle: "Mūsų <span class='accent'>Meniu</span>",
        menuSub: "Dienos pietūs nuo pirmadienio iki penktadienio 10:30 - 16:00 val.",
        contactTitle: "Susisiekite su mumis",
        contactSub: "Turite klausimų? Parašykite mums.",
        nameLabel: "Vardas",
        emailLabel: "El. paštas",
        messageLabel: "Žinutė",
        submitBtn: "Siųsti Žinutę",
        footerBrand: "Autentiškas Kinų Restoranas.",
        footerLinks: "Nuorodos",
        footerWork: "Darbo Laikas",
        footerDays: "I - V: 10:30 - 16:00<br>VI - VII: Uždaryta",
        footerDesc: "Autentiški kinų skoniai Kaune",
        footerAddress: "Gedimino g. 30, Kaunas",
        footerHoursTitle: "Darbo Laikas",
        footerHours1: "Dienos pietūs:",
        footerHours2: "Pr-P 10:30 - 16:00",
        footerSocialsTitle: "Sekite mus",
        copyRight: "&copy; 2026 Žaliasis Traukinys. Visos teisės saugomos."
    },
    en: {
        navHome: "Home",
        navAbout: "About Us",
        navMenu: "Menu",
        navContact: "Contact",
        heroSub: "Authentic tastes in Kaunas",
        heroTitle: "Chinese Restaurant <br><span class='accent'>Green Train</span>",
        heroDesc: "We invite you to immerse yourself in a unique journey of Chinese cuisine. Traditional dishes are prepared every day with love and skill.",
        heroBtnMenu: "Open Menu",
        heroBtnContact: "Contact Us",
        aboutTitle: "Traditions and taste",
        aboutDesc: "From crispy \"Gou Bao\" chicken to perfectly prepared beef in soy sauce – in our restaurant, you will find authentic Chinese flavors that will surprise and delight everyone.",
        addressTitle: "Address",
        phoneTitle: "Phone",
        emailTitle: "Email",
        menuTitle: "Our <span class='accent'>Menu</span>",
        menuSub: "Daily lunch from Monday to Friday 10:30 AM - 4:00 PM.",
        contactTitle: "Contact us",
        contactSub: "Have questions? Write to us.",
        nameLabel: "Name",
        emailLabel: "Email",
        messageLabel: "Message",
        submitBtn: "Send Message",
        footerBrand: "Authentic Chinese Restaurant.",
        footerLinks: "Links",
        footerWork: "Working Hours",
        footerDays: "Mon - Fri: 10:30 - 16:00<br>Sat - Sun: Closed",
        footerDesc: "Authentic Chinese tastes in Kaunas",
        footerAddress: "Gedimino g. 30, Kaunas",
        footerHoursTitle: "Working Hours",
        footerHours1: "Daily lunch:",
        footerHours2: "Mon-Fri 10:30 AM - 4:00 PM",
        footerSocialsTitle: "Follow us",
        copyRight: "&copy; 2026 Žaliasis Traukinys. All rights reserved."
    }
};

window.currentLang = 'lt';

function setLanguage(lang) {
    window.currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        } else if (el.placeholder) {
            el.placeholder = translations[lang][key];
        }
    });

    // Toggle active class on lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Re-render menu to update dish names
    if (typeof window.renderMenu === 'function') {
        window.renderMenu();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            setLanguage(btn.getAttribute('data-lang'));
        });
    });
});
