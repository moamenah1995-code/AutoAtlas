(() => {
  const storageKey = "autoatlas-theme";
  const labels = {
    ar: { dark: "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u062f\u0627\u0643\u0646", light: "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0641\u0627\u062a\u062d", switchTo: "\u062a\u0641\u0639\u064a\u0644 \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0641\u0627\u062a\u062d" },
    en: { dark: "Dark mode", light: "Light mode", switchTo: "Switch to light mode" },
    fr: { dark: "Mode sombre", light: "Mode clair", switchTo: "Activer le mode clair" },
    pt: { dark: "Modo escuro", light: "Modo claro", switchTo: "Ativar modo claro" },
  };

  const page = window.location.pathname.split("/").pop() || "index.html";
  const language = page.endsWith("-en.html") ? "en" : page.endsWith("-fr.html") ? "fr" : page.endsWith("-pt.html") ? "pt" : "ar";
  const copy = labels[language];
  let theme = "dark";
  try {
    theme = window.localStorage.getItem(storageKey) === "light" ? "light" : "dark";
  } catch {
    // The visual control still works when storage is unavailable.
  }

  function applyTheme() {
    document.documentElement.dataset.theme = theme;
  }

  function render(button) {
    const icon = document.createElement("span");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = theme === "light" ? "\u2600" : "\u263e";
    const text = document.createElement("span");
    text.textContent = theme === "light" ? copy.light : copy.dark;
    button.replaceChildren(icon, text);
    button.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    button.setAttribute("aria-label", theme === "light" ? copy.dark : copy.switchTo);
  }

  function mount() {
    document.querySelectorAll(".site-header .container").forEach((container) => {
      let button = container.querySelector(".theme-toggle");
      if (!button) {
        button = document.createElement("button");
        button.type = "button";
        button.className = "theme-toggle";
        const target = container.querySelector(".nav-container, .header-top") || container;
        target.appendChild(button);
      }
      render(button);
      if (button.dataset.themeBound === "true") return;
      button.dataset.themeBound = "true";
      button.addEventListener("click", () => {
        theme = theme === "dark" ? "light" : "dark";
        applyTheme();
        try {
          window.localStorage.setItem(storageKey, theme);
        } catch {
          // Keep this visit's selection even if browser storage is blocked.
        }
        render(button);
      });
    });
  }

  applyTheme();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
})();
