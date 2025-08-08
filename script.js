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
  const audio = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"); // Replace with local file if needed
  audio.loop = true;
  let isPlaying = false;
  if (musicToggle) {
    musicToggle.addEventListener("click", () => {
      if (!isPlaying) {
        audio.play().then(() => {
          isPlaying = true;
          musicToggle.textContent = "🔇 Pause Music";
        }).catch(error => {
          console.error("Audio play failed:", error);
          alert("Audio playback is blocked or the file is unavailable. Please use a local MP3 file.");
        });
      } else {
        audio.pause();
        isPlaying = false;
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
    const text = "I Am 2030";
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
  if (introText) {
    console.log("Typewriter element found:", introText); // Debug log
    const introString = introText.textContent.trim();
    console.log("Original text content:", introString); // Debug log
    introText.textContent = "";
    let i = 0;
    const speed = 50; // Consistent speed in milliseconds
    function typeIntro() {
      if (i < introString.length) {
        introText.textContent += introString.charAt(i);
        console.log("Typing:", introText.textContent); // Debug log
        i++;
        setTimeout(typeIntro, speed);
      } else {
        introText.style.borderRight = "none"; // Remove blinking cursor at end
        console.log("Typewriter completed:", introString); // Debug log
      }
    }
    typeIntro();
  } else {
    console.log("No .typewriter element found."); // Debug log
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

  // Calculator Modal Logic
  const calcSubmit = document.getElementById("calcSubmit");
  if (calcSubmit) {
    calcSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      const num1 = parseFloat(document.getElementById("calcNum1").value) || 0;
      const num2 = parseFloat(document.getElementById("calcNum2").value) || 0;
      const op = document.getElementById("calcOp").value;
      let result;
      switch (op) {
        case "+": result = num1 + num2; break;
        case "-": result = num1 - num2; break;
        case "*": result = num1 * num2; break;
        case "/": result = num2 !== 0 ? num1 / num2 : "Error: Division by zero"; break;
        default: result = "Invalid operation";
      }
      document.getElementById("calcResult").textContent = `Result: ${result}`;
    });
  }

  // Color Palette Modal Logic
  const generatePalette = document.getElementById("generatePalette");
  const paletteContainer = document.getElementById("paletteContainer");
  const colorDisplay = document.getElementById("colorDisplay");
  if (generatePalette && paletteContainer && colorDisplay) {
    function generateColors() {
      paletteContainer.innerHTML = "";
      colorDisplay.innerHTML = "";
      const colors = Array(5).fill().map(() => generatePastelColor());
      colors.forEach(color => {
        const div = document.createElement("div");
        div.className = "palette-color";
        div.style.backgroundColor = color;
        paletteContainer.appendChild(div);

        const displayDiv = document.createElement("div");
        displayDiv.className = "color-sample";
        displayDiv.style.backgroundColor = color;
        displayDiv.style.color = getContrastColor(color);
        displayDiv.textContent = "Sample";
        displayDiv.title = color;
        displayDiv.addEventListener("click", () => copyToClipboard(color));
        colorDisplay.appendChild(displayDiv);
      });
    }
    generatePalette.addEventListener("click", generateColors);
    generateColors(); // Initial generation
  }

  // Helper function to generate pastel colors
  function generatePastelColor() {
    const r = 128 + Math.floor(Math.random() * 127); // Start above 128 for lightness
    const g = 128 + Math.floor(Math.random() * 127);
    const b = 128 + Math.floor(Math.random() * 127);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  // Helper function to get contrasting text color
  function getContrastColor(hexcolor) {
    const r = parseInt(hexcolor.substr(1, 2), 16);
    const g = parseInt(hexcolor.substr(3, 2), 16);
    const b = parseInt(hexcolor.substr(5, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  }

  // Helper function to copy to clipboard
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert(`Copied ${text} to clipboard!`);
    }).catch(err => {
      console.error("Failed to copy:", err);
    });
  }

  // Form Validation Modal Logic
  const validationForm = document.getElementById("validationForm");
  if (validationForm) {
    validationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("formName").value.trim();
      const error = document.getElementById("formError");
      if (name.length > 0) {
        error.textContent = `Validated! Hello, ${name}!`;
        error.className = "text-success";
      } else {
        error.textContent = "Error: Name is required.";
        error.className = "text-danger";
      }
    });
  }

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