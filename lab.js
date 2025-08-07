// Animate project cards
const cards = document.querySelectorAll(".project-card");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.3 });

cards.forEach((card) => observer.observe(card));

// Typewriter effect
const introText = document.querySelector(".lab-intro");
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

// Hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

