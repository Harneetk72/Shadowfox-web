let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-xmark");
    navbar.classList.toggle("active");
});
document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
        menuIcon.classList.add("fa-bars");
        menuIcon.classList.remove("fa-xmark");
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect for roles
    const typewriterSpan = document.querySelector('.typewriter');
    if (!typewriterSpan) return;
    const words = [
        "Web Developer",
        "UI/UX Enthusiast",
        "JavaScript Lover",
        "React Developer",
       
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 120;

    function highlightTypeScript(active) {
        if (active) {
            typewriterSpan.style.color = '#3178c6'; // TypeScript blue
            typewriterSpan.style.textShadow = '0 0 10px #3178c6, 0 0 20px #3178c6';
        } else {
            typewriterSpan.style.color = '';
            typewriterSpan.style.textShadow = '';
        }
    }

    function type() {
        const currentWord = words[wordIndex];
        // Highlight TypeScript
        if (currentWord.includes('TypeScript')) {
            highlightTypeScript(true);
        } else {
            highlightTypeScript(false);
        }
        if (isDeleting) {
            typewriterSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, typingSpeed / 2);
            }
        } else {
            typewriterSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 1200);
            } else {
                setTimeout(type, typingSpeed);
            }
        }
    }
    type();

    // Elements to animate
    const animatedEls = [
        document.querySelector('.home-content'),
        document.querySelector('.about-content'),
        ...document.querySelectorAll('.skills-box'),
        ...document.querySelectorAll('.projects-card')
    ].filter(Boolean);

    animatedEls.forEach(el => el.classList.add('fade-in'));

    function revealOnScroll() {
        animatedEls.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                el.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // in case already in view
});  