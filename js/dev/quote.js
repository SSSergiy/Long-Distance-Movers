import { i as initMultiStepForm } from "./index.min2.js";
import "./common.min.js";
window.addEventListener("load", () => {
  initMultiStepForm();
  const form = document.querySelector(".multi-step-form");
  if (form) {
    let validateZipCode = function(input) {
      if (!input) return false;
      const value = input.value.trim();
      const formGroup = input.closest(".form-group");
      const existingError = formGroup?.querySelector("[data-zip-error]");
      if (existingError) {
        existingError.remove();
      }
      input.classList.remove("--form-error", "--form-success");
      if (formGroup) {
        formGroup.classList.remove("--form-error", "--form-success");
      }
      if (value === "") {
        input.classList.add("--form-error");
        if (formGroup) {
          formGroup.classList.add("--form-error");
          formGroup.insertAdjacentHTML("beforeend", "<div data-zip-error>Zip code field can not be empty</div>");
        }
        return false;
      }
      if (value.length !== 5 || !/^\d{5}$/.test(value)) {
        input.classList.add("--form-error");
        if (formGroup) {
          formGroup.classList.add("--form-error");
          formGroup.insertAdjacentHTML("beforeend", "<div data-zip-error>Wrong zip code format</div>");
        }
        return false;
      }
      input.classList.add("--form-success");
      if (formGroup) {
        formGroup.classList.add("--form-success");
      }
      return true;
    }, restrictZipInput = function(input) {
      if (!input) return;
      input.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 5) {
          value = value.slice(0, 5);
        }
        e.target.value = value;
        validateZipCode(e.target);
      });
      input.addEventListener("keypress", (e) => {
        if (!/[0-9]/.test(e.key) && !["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key)) {
          e.preventDefault();
        }
      });
      input.addEventListener("paste", (e) => {
        e.preventDefault();
        const pastedText = (e.clipboardData || window.clipboardData).getData("text");
        const numbersOnly = pastedText.replace(/\D/g, "").slice(0, 5);
        input.value = numbersOnly;
        validateZipCode(input);
      });
      input.addEventListener("blur", () => {
        validateZipCode(input);
      });
    }, validateMovingDate = function(input) {
      if (!input) return false;
      const value = input.value.trim();
      const formGroup = input.closest(".form-group");
      const existingError = formGroup?.querySelector("[data-date-error]");
      if (existingError) {
        existingError.remove();
      }
      input.classList.remove("--form-error", "--form-success");
      if (formGroup) {
        formGroup.classList.remove("--form-error", "--form-success");
      }
      if (value === "" || value === "Select Move Date") {
        input.classList.add("--form-error");
        if (formGroup) {
          formGroup.classList.add("--form-error");
          formGroup.insertAdjacentHTML("beforeend", "<div data-date-error>Please select a moving date</div>");
        }
        return false;
      }
      input.classList.add("--form-success");
      if (formGroup) {
        formGroup.classList.add("--form-success");
      }
      return true;
    }, validateHomeSize = function() {
      const formGroup = form.querySelector(".home-size-options");
      if (!formGroup) return false;
      const selectedRadio = Array.from(homeSizeRadios).find((radio) => radio.checked);
      const errorElement = formGroup.querySelector("[data-select-error]");
      formGroup.classList.remove("--form-error", "--form-success");
      homeSizeRadios.forEach((radio) => {
        const option = radio.closest(".home-size-option");
        if (option) {
          option.classList.remove("--form-error", "--form-success");
        }
      });
      if (errorElement) {
        errorElement.style.display = "none";
        errorElement.textContent = "";
      }
      if (!selectedRadio || !selectedRadio.value) {
        formGroup.classList.add("--form-error");
        homeSizeRadios.forEach((radio) => {
          const option = radio.closest(".home-size-option");
          if (option) {
            option.classList.add("--form-error");
          }
        });
        if (errorElement) {
          errorElement.textContent = "Please select a home size";
          errorElement.style.display = "block";
        }
        return false;
      }
      formGroup.classList.add("--form-success");
      const selectedOption = selectedRadio.closest(".home-size-option");
      if (selectedOption) {
        selectedOption.classList.add("--form-success");
      }
      return true;
    }, restrictNameInput = function(input) {
      if (!input) return;
      input.addEventListener("input", (e) => {
        let value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
        value = value.replace(/\s+/g, " ");
        e.target.value = value;
        validateFullName(e.target);
      });
      input.addEventListener("keypress", (e) => {
        if (!/[a-zA-Z\s]/.test(e.key) && !["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key)) {
          e.preventDefault();
        }
      });
      input.addEventListener("paste", (e) => {
        e.preventDefault();
        const pastedText = (e.clipboardData || window.clipboardData).getData("text");
        const lettersOnly = pastedText.replace(/[^a-zA-Z\s]/g, "").replace(/\s+/g, " ");
        input.value = lettersOnly;
        validateFullName(input);
      });
    }, validateFullName = function(input) {
      if (!input) return false;
      const value = input.value.trim();
      const formGroup = input.closest(".form-group");
      const existingError = formGroup?.querySelector("[data-name-error]");
      if (existingError) {
        existingError.remove();
      }
      input.classList.remove("--form-error", "--form-success");
      if (formGroup) {
        formGroup.classList.remove("--form-error", "--form-success");
      }
      if (value === "") {
        input.classList.add("--form-error");
        if (formGroup) {
          formGroup.classList.add("--form-error");
          formGroup.insertAdjacentHTML("beforeend", "<div data-name-error>Full name field can not be empty</div>");
        }
        return false;
      }
      const nameParts = value.split(/\s+/).filter((part) => part.length > 0);
      if (nameParts.length < 2) {
        input.classList.add("--form-error");
        if (formGroup) {
          formGroup.classList.add("--form-error");
          formGroup.insertAdjacentHTML("beforeend", "<div data-name-error>Please enter first and last name</div>");
        }
        return false;
      }
      const firstName = nameParts[0];
      if (firstName.length < 3) {
        input.classList.add("--form-error");
        if (formGroup) {
          formGroup.classList.add("--form-error");
          formGroup.insertAdjacentHTML("beforeend", "<div data-name-error>First name must contain at least 3 letters</div>");
        }
        return false;
      }
      const lastName = nameParts[nameParts.length - 1];
      if (lastName.length < 3) {
        input.classList.add("--form-error");
        if (formGroup) {
          formGroup.classList.add("--form-error");
          formGroup.insertAdjacentHTML("beforeend", "<div data-name-error>Last name must contain at least 3 letters</div>");
        }
        return false;
      }
      input.classList.add("--form-success");
      if (formGroup) {
        formGroup.classList.add("--form-success");
      }
      return true;
    }, validatePhone = function(input) {
      if (!input) return false;
      const value = input.value.trim();
      const formGroup = input.closest(".form-group");
      const existingError = formGroup?.querySelector("[data-phone-error]");
      if (existingError) {
        existingError.remove();
      }
      input.classList.remove("--form-error", "--form-success");
      if (formGroup) {
        formGroup.classList.remove("--form-error", "--form-success");
      }
      if (value === "" || value === "+1(___) ___-____") {
        input.classList.add("--form-error");
        if (formGroup) {
          formGroup.classList.add("--form-error");
          formGroup.insertAdjacentHTML("beforeend", "<div data-phone-error>Phone field can not be empty</div>");
        }
        return false;
      }
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length < 10 || digitsOnly.length > 11) {
        input.classList.add("--form-error");
        if (formGroup) {
          formGroup.classList.add("--form-error");
          formGroup.insertAdjacentHTML("beforeend", "<div data-phone-error>Wrong phone number format</div>");
        }
        return false;
      }
      if (value.includes("_") || value.includes("(") && !value.match(/\+1\(\d{3}\)\s\d{3}-\d{4}/)) {
        input.classList.add("--form-error");
        if (formGroup) {
          formGroup.classList.add("--form-error");
          formGroup.insertAdjacentHTML("beforeend", "<div data-phone-error>Please enter a complete phone number</div>");
        }
        return false;
      }
      const phoneRegex = /^\+1\(\d{3}\)\s\d{3}-\d{4}$/;
      if (!phoneRegex.test(value)) {
        input.classList.add("--form-error");
        if (formGroup) {
          formGroup.classList.add("--form-error");
          formGroup.insertAdjacentHTML("beforeend", "<div data-phone-error>Wrong phone number format</div>");
        }
        return false;
      }
      input.classList.add("--form-success");
      if (formGroup) {
        formGroup.classList.add("--form-success");
      }
      return true;
    }, validateEmail = function(input) {
      if (!input) return false;
      const value = input.value.trim();
      const formGroup = input.closest(".form-group");
      const existingError = formGroup?.querySelector("[data-email-error]");
      if (existingError) {
        existingError.remove();
      }
      input.classList.remove("--form-error", "--form-success");
      if (formGroup) {
        formGroup.classList.remove("--form-error", "--form-success");
      }
      if (value === "") {
        input.classList.add("--form-error");
        if (formGroup) {
          formGroup.classList.add("--form-error");
          formGroup.insertAdjacentHTML("beforeend", "<div data-email-error>Email field can not be empty</div>");
        }
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        input.classList.add("--form-error");
        if (formGroup) {
          formGroup.classList.add("--form-error");
          formGroup.insertAdjacentHTML("beforeend", "<div data-email-error>Wrong email format</div>");
        }
        return false;
      }
      const strictEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!strictEmailRegex.test(value)) {
        input.classList.add("--form-error");
        if (formGroup) {
          formGroup.classList.add("--form-error");
          formGroup.insertAdjacentHTML("beforeend", "<div data-email-error>Wrong email format</div>");
        }
        return false;
      }
      input.classList.add("--form-success");
      if (formGroup) {
        formGroup.classList.add("--form-success");
      }
      return true;
    };
    const zipFromInput = form.querySelector("#zip-from");
    const zipToInput = form.querySelector("#zip-to");
    if (zipFromInput) {
      restrictZipInput(zipFromInput);
    }
    if (zipToInput) {
      restrictZipInput(zipToInput);
    }
    const movingDateInput = form.querySelector("#moving-date");
    if (movingDateInput) {
      movingDateInput.addEventListener("blur", () => {
        validateMovingDate(movingDateInput);
      });
      movingDateInput.addEventListener("input", () => {
        validateMovingDate(movingDateInput);
      });
      movingDateInput.addEventListener("change", () => {
        validateMovingDate(movingDateInput);
      });
      setInterval(() => {
        if (movingDateInput.value && movingDateInput.value.trim() !== "" && movingDateInput.value !== "Select Move Date") {
          validateMovingDate(movingDateInput);
        }
      }, 300);
    }
    const homeSizeRadios = form.querySelectorAll('input[name="home_size"][type="radio"]');
    if (homeSizeRadios.length > 0) {
      homeSizeRadios.forEach((radio) => {
        radio.addEventListener("change", () => {
          validateHomeSize();
        });
      });
    }
    const fullNameInput = form.querySelector("#full-name");
    if (fullNameInput) {
      restrictNameInput(fullNameInput);
      fullNameInput.addEventListener("input", () => {
        validateFullName(fullNameInput);
      });
      fullNameInput.addEventListener("blur", () => {
        validateFullName(fullNameInput);
      });
    }
    const phoneInput = form.querySelector("#phone");
    if (phoneInput) {
      phoneInput.addEventListener("input", () => {
        validatePhone(phoneInput);
      });
      phoneInput.addEventListener("change", () => {
        validatePhone(phoneInput);
      });
      phoneInput.addEventListener("blur", () => {
        validatePhone(phoneInput);
      });
    }
    const emailInput = form.querySelector("#email");
    if (emailInput) {
      emailInput.addEventListener("input", () => {
        validateEmail(emailInput);
      });
      emailInput.addEventListener("change", () => {
        validateEmail(emailInput);
      });
      emailInput.addEventListener("blur", () => {
        validateEmail(emailInput);
      });
    }
    window.quoteFormValidation = {
      validateZipCode,
      validateMovingDate,
      validateHomeSize,
      validateFullName,
      validatePhone,
      validateEmail,
      zipFromInput,
      zipToInput,
      movingDateInput,
      homeSizeRadios,
      fullNameInput,
      phoneInput,
      emailInput
    };
  }
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
