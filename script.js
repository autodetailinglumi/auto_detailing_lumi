// Initialize AOS (Animate on Scroll) library
document.addEventListener("DOMContentLoaded", (event) => {
    AOS.init({
        duration: 1000,
        once: true,
    });
    // Check if the loader element exists, if so, hide it after a delay
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 500); // Wait for fade out transition
        }, 800);
    }

    setupStickyNav();
    setupScrollToTop();
});

// 1. Mobile Menu Toggler
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    const burger = document.getElementById("burgerMenu");
    navLinks.classList.toggle("active");
    burger.classList.toggle("toggle");

    // Link fade animation
    navLinks.querySelectorAll("li").forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = "";
        } else {
            link.style.animation = "navLinkFade 0.5s ease forwards " + (index / 7 + 0.3) + "s";
        }
    });
}

// 2. Sticky Navigation Bar
function setupStickyNav() {
    const nav = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.classList.add("sticky");
        } else {
            nav.classList.remove("sticky");
        }
    });
}

// 3. Smooth Scroll Helper
function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
}

// 4. Contact Form Logic (WhatsApp and Email now both "real" client-side)
const phoneNumber = "38349839669"; 
const myEmail = "autodetailinglumi@gmail.com"; 

function prefillService(serviceName) {
    document.getElementById("service").value = serviceName;
    scrollToSection("contact"); 
}

function toggleMethod(radio) {
    const btn = document.getElementById("btnText");
    const emailRadio = document.querySelector("input[value='email']").closest(".radio-box");
    const whatsappRadio = document.querySelector("input[value='whatsapp']").closest(".radio-box");

    // Toggle active class visually
    if (radio.value === "whatsapp") {
        btn.innerHTML = "Dërgo në WhatsApp <i class='fab fa-whatsapp'></i>";
        whatsappRadio.classList.add("active");
        emailRadio.classList.remove("active");
    } else {
        // Email option
        btn.innerHTML = "Dërgo me Email <i class='fas fa-envelope'></i>";
        emailRadio.classList.add("active");
        whatsappRadio.classList.remove("active");
    }
}

function handleFormSubmit(event) {
    event.preventDefault();

    // Get Form Data
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const car = document.getElementById("car").value;
    const service = document.getElementById("service").value;
    const contactMethod = document.querySelector("input[name='contactMethod']:checked").value;
    
    // Simple Validation
    if (!name || !phone || !car || !service || service === "Zgjidhni shërbimin...") {
        alert("Ju lutemi plotësoni të gjitha fushat e nevojshme!");
        return;
    }

    const messageBody = "*Kërkesë e Re Ofertë/Termin nga Auto Detailing Lumi*\n------------------------------------\n*Emri:* " + name + "\n*Tel:* " + phone + "\n*Mjeti:* " + car + "\n*Shërbimi:* " + service + "\n------------------------------------\nJu lutem më kontaktoni për të caktuar terminin.";
    
    if (contactMethod === "whatsapp") {
        const waUrl = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(messageBody);
        window.open(waUrl, "_blank");
    } else if (contactMethod === "email") {
        const emailSubject = "Kërkesë Oferte nga " + name + " - " + service;
        const mailtoUrl = "mailto:" + myEmail + "?subject=" + encodeURIComponent(emailSubject) + "&body=" + encodeURIComponent(messageBody); 
        
        window.location.href = mailtoUrl;
    }
}

// 5. FAQ Accordion
function toggleFaq(item) {
    item.classList.toggle("active");
    const answer = item.querySelector(".faq-answer");
    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
    } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
    }
}

// 6. Scroll to Top Button
function setupScrollToTop() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    window.onscroll = function() { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    }

    scrollToTopBtn.onclick = function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
}