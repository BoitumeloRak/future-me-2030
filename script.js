// script.js

document.addEventListener("DOMContentLoaded", () => {
  const typewriter = document.getElementById("typewriter");
  const text = "Welcome to 2030";
  let index = 0;

  function type() {
    if (index < text.length) {
      typewriter.textContent += text.charAt(index);
      index++;
      setTimeout(type, 150); // speed of typing
    } else {
      blinkCursor(); // optional visual enhancement
    }
  }

  function blinkCursor() {
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.innerHTML = "|";
    typewriter.appendChild(cursor);

    setInterval(() => {
      cursor.style.visibility = (cursor.style.visibility === "hidden") ? "visible" : "hidden";
    }, 500); // cursor blink rate
  }

  // Start typing
  type();

  // Mobile Hamburger Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

});
