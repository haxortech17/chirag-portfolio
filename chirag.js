
// MOBILE MENU
const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector(".navbar");

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navbar.classList.contains("active")) {
        icon.classList.replace("fa-bars", "fa-xmark");
    } else {
        icon.classList.replace("fa-xmark", "fa-bars");
    }
});


// CLOSE MENU AFTER CLICK
document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");

        const icon = menuBtn.querySelector("i");
        icon.classList.replace("fa-xmark", "fa-bars");
    });
});


// SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    observer.observe(element);
});


// ACTIVE NAVIGATION
// ========== COMMON NAVIGATION ==========

(() => {

    const sections = document.querySelectorAll(
        "main > .page-section"
    );

    const allLinks = document.querySelectorAll(
        '.navbar a[href^="#"], .sidebar a[href^="#"], .logo[href^="#"], .connect-btn[href^="#"], .hero-buttons a[href^="#"]'
    );

    function openPage(pageId) {

        const target = document.getElementById(pageId);

        if (!target || !target.classList.contains("page-section")) {
            return;
        }

        // Show only selected section
        sections.forEach(section => {
            section.classList.toggle(
                "active",
                section.id === pageId
            );
        });

        // Update navbar and sidebar active links
        allLinks.forEach(link => {

            const isActive =
                link.getAttribute("href") === "#" + pageId;

            link.classList.toggle("active", isActive);

        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    // Handle all navigation clicks
    allLinks.forEach(link => {

        link.addEventListener("click", function(event) {

            const pageId = this.getAttribute("href").substring(1);

            if (document.getElementById(pageId)?.classList.contains("page-section")) {

                event.preventDefault();

                openPage(pageId);

                history.pushState(null, "", "#" + pageId);

            }

        });

    });

    // Browser back and forward buttons
    window.addEventListener("popstate", () => {

        openPage(location.hash.substring(1) || "home");

    });

    // Open correct section on page load
    openPage(location.hash.substring(1) || "home");

})();


// TERMINAL ANIMATION
const terminalLines = document.querySelectorAll(".terminal-line");
const terminalSuccess = document.querySelector(".terminal-success");

terminalLines.forEach((line, index) => {
    line.style.opacity = "0";

    setTimeout(() => {
        line.style.opacity = "1";
        line.style.transform = "translateX(0)";
    }, 800 + index * 1200);
});

terminalSuccess.style.opacity = "0";

setTimeout(() => {
    terminalSuccess.style.opacity = "1";
}, 5600);


// MOUSE GLOW EFFECT
document.addEventListener("mousemove", (e) => {

    const x = e.clientX;
    const y = e.clientY;

    document.body.style.setProperty("--mouse-x", x + "px");
    document.body.style.setProperty("--mouse-y", y + "px");

});


// SKILL CARD HOVER EFFECT
document.querySelectorAll(".skill-card").forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background = `
            radial-gradient(
                circle at ${x}px ${y}px,
                rgba(0, 180, 255, .15),
                #01060c 75%
            )
        `;

    });

    card.addEventListener("mouseleave", () => {
        card.style.background =
            "linear-gradient(145deg, #03101d, #01060c)";
    });

});


// CURRENT YEAR
document.querySelector("footer p").innerHTML =
    `© ${new Date().getFullYear()} TECHNICAL CHIRAG | ALL RIGHTS RESERVED.`;

const systemStats = [
    { value: "cpu-value", bar: "cpu-bar", current: 32 },
    { value: "ram-value", bar: "ram-bar", current: 56 },
    { value: "disk-value", bar: "disk-bar", current: 41 }
];

function updateSystemStats() {

    systemStats.forEach(stat => {

        // Random percentage change
        let change = Math.floor(Math.random() * 13) - 6;

        stat.current += change;

        // Percentage limits
        stat.current = Math.max(10, Math.min(95, stat.current));

        // Update percentage text
        document.getElementById(stat.value).textContent =
            stat.current + "%";

        // Update animated progress bar
        document.getElementById(stat.bar).style.width =
            stat.current + "%";

    });

}

// Initial animation
updateSystemStats();

// Update every 2 seconds
setInterval(updateSystemStats, 2000);
const text = "CHIRAG";
const typingElement = document.getElementById("typing-name");

let index = 0;

function typeEffect() {
    if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 300);
    } else {
        setTimeout(() => {
            typingElement.textContent = "";
            index = 0;
            typeEffect();
        }, 2000);
    }
}

typeEffect();
(() => {
    const links = document.querySelectorAll(".navbar a");
    const sections = document.querySelectorAll(".page-section");

    function showSection(id) {
        sections.forEach(section => {
            section.classList.toggle("active", section.id === id);
        });

        links.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + id
            );
        });
    }

    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();

            const id = this.getAttribute("href").substring(1);

            if (document.getElementById(id)) {
                showSection(id);
                history.pushState(null, "", "#" + id);
            }
        });
    });

    window.addEventListener("popstate", () => {
        showSection(location.hash.substring(1) || "home");
    });

    showSection(location.hash.substring(1) || "home");
})();