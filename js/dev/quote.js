import { i as initMultiStepForm } from "./index.min2.js";
import "./common.min.js";
window.addEventListener("load", () => {
  initMultiStepForm();
  const form = document.querySelector(".multi-step-form");
  if (form) {
    let redirectToHome = function() {
      if (redirectDone) return;
      redirectDone = true;
      console.log("Redirecting to index.html...");
      if (redirectTimeout) {
        clearTimeout(redirectTimeout);
      }
      redirectTimeout = setTimeout(() => {
        window.location.href = "index.html";
      }, 1e3);
    };
    let wasSending = false;
    let redirectTimeout = null;
    let redirectDone = false;
    const handleFormSent = (e) => {
      console.log("formSent event received (success)", e);
      if (!e.detail || e.detail.form === form) {
        redirectToHome();
      }
    };
    document.addEventListener("formSent", handleFormSent, { once: false });
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          const isSending = form.classList.contains("--sending");
          if (wasSending && !isSending && !redirectDone) {
            console.log("Form request completed (success or error), redirecting anyway...");
            redirectToHome();
          }
          wasSending = isSending;
        }
      });
    });
    observer.observe(form, {
      attributes: true,
      attributeFilter: ["class"]
    });
  }
});
