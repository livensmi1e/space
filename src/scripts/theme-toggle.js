const themeToggle = document.querySelector(".theme-toggle");
const moonIcon = document.querySelector(".fa-moon");
const sunIcon = document.querySelector(".fa-sun");

const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
        moonIcon.style.display = "none";
        sunIcon.style.display = "inline";
    } else {
        moonIcon.style.display = "inline";
        sunIcon.style.display = "none";
    }
};

const initTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";
        applyTheme(defaultTheme);
    }
};

themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
});

initTheme();
