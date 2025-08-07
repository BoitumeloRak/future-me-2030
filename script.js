// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  AOS.init({ duration: 1000, once: true });

  // Hamburger menu
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      themeToggle.textContent = document.body.classList.contains("light-theme") ? "🌑" : "🌙";
    });
  }

  // Music toggle
  const musicToggle = document.getElementById("music-toggle");
  const audio = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
  audio.loop = true;
  if (musicToggle) {
    musicToggle.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        musicToggle.textContent = "🔇 Pause Music";
      } else {
        audio.pause();
        musicToggle.textContent = "🎵 Play Music";
      }
    });
  }

  // Starry background
  const starryBg = document.createElement("div");
  starryBg.className = "starry-bg";
  document.body.appendChild(starryBg);
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.width = `${Math.random() * 3}px`;
    star.style.height = star.style.width;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    starryBg.appendChild(star);
  }

  // Typewriter effect for home page
  const typewriter = document.getElementById("typewriter");
  if (typewriter) {
    const text = "Welcome to 2030";
    let index = 0;
    function type() {
      if (index < text.length) {
        typewriter.textContent += text.charAt(index);
        index++;
        setTimeout(type, 150);
      }
    }
    typewriter.textContent = "";
    type();
  }

  // Typewriter effect for lab and other pages
  const introText = document.querySelector(".typewriter");
  if (introText && !typewriter) {
    const introString = introText.textContent;
    introText.textContent = "";
    let i = 0;
    function typeIntro() {
      if (i < introString.length) {
        introText.textContent += introString.charAt(i);
        i++;
        setTimeout(typeIntro, 30);
      }
    }
    typeIntro();
  }

  // Animate cards and timeline items
  const animatableElements = document.querySelectorAll(".project-card, .timeline-item");
  if (animatableElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.3 }
    );
    animatableElements.forEach((element) => observer.observe(element));
  }

  // Project button interactions
  const projectButtons = document.querySelectorAll(".project-btn");
  projectButtons.forEach(button => {
    button.addEventListener("click", () => {
      const project = button.getAttribute("data-project");
      if (project === "calculator") {
        const num1 = prompt("Enter first number:");
        const num2 = prompt("Enter second number:");
        const op = prompt("Enter operation (+, -, *, /):");
        if (num1 && num2 && op) {
          const n1 = parseFloat(num1);
          const n2 = parseFloat(num2);
          let result;
          switch (op) {
            case "+": result = n1 + n2; break;
            case "-": result = n1 - n2; break;
            case "*": result = n1 * n2; break;
            case "/": result = n2 !== 0 ? n1 / n2 : "Error: Division by zero"; break;
            default: result = "Invalid operation";
          }
          alert(`Result: ${result}`);
        }
      } else if (project === "palette") {
        const colors = Array(5).fill().map(() => `#${Math.floor(Math.random()*16777215).toString(16)}`);
        alert(`Color Palette: ${colors.join(", ")}`);
      } else if (project === "form") {
        const name = prompt("Enter your name:");
        if (name && name.trim().length > 0) {
          alert(`Form validated! Hello, ${name}!`);
        } else {
          alert("Validation failed: Name is required.");
        }
      }
    });
  });

  // Form submission feedback
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      })
        .then(() => alert("Message sent successfully!"))
        .catch(() => alert("Error sending message. Please try again."));
    });
  }
});
