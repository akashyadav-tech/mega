document.addEventListener("DOMContentLoaded", () => {
  const THEME_KEY = "theme";
  const body = document.body;
  const toggleBtn = document.getElementById("toggle-btn");
  const menuBtn = document.getElementById("menu-btn");
  const sideBar = document.querySelector(".side-bar");
  const userBtn = document.getElementById("user-btn");
  const profile = document.querySelector(".header .profile");
  const form = document.getElementById("doubtForm");
  const popup = document.getElementById("popup");

  // ---------- THEME ----------
  function applySavedTheme() {
    const saved = localStorage.getItem(THEME_KEY) || "light";
    if (saved === "dark") {
      body.classList.add("dark");
      toggleBtn.classList.replace("fa-sun", "fa-moon");
    } else {
      body.classList.remove("dark");
      toggleBtn.classList.replace("fa-moon", "fa-sun");
    }
  }
  toggleBtn.onclick = () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    toggleBtn.classList.toggle("fa-sun", !isDark);
    toggleBtn.classList.toggle("fa-moon", isDark);
  };
  applySavedTheme();

  // ---------- SIDEBAR ----------
  menuBtn.onclick = () => sideBar.classList.toggle("active");

  // ---------- PROFILE ----------
  userBtn.onclick = () => profile.classList.toggle("active");

  // ---------- DOUBT FORM ----------
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("doubt").value.trim();

    if (!name || !email || !message) return;

    const doubt = {
      id: Date.now(),
      name,
      email,
      message,
      status: "open",
      createdAt: new Date().toISOString(),
    };

    const doubts = JSON.parse(localStorage.getItem("doubts") || "[]");
    doubts.push(doubt);
    localStorage.setItem("doubts", JSON.stringify(doubts));

    // Show popup + redirect
    popup.classList.add("show");
    setTimeout(() => {
      popup.classList.remove("show");
      window.location.href = "my-doubts.html";
    }, 1500);

    form.reset();
  });
});
