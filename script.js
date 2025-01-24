document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger")
    const nav = document.querySelector(".nav-links")
    const navLinks = document.querySelectorAll(".nav-links li")
  
    burger.addEventListener("click", () => {
      // Toggle Nav
      nav.classList.toggle("active")
  
      // Animate Links
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = ""
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
        }
      })
  
      // Burger Animation
      burger.classList.toggle("active")
    })
  
    // Close menu when a link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active")
        burger.classList.remove("active")
      })
    })
  
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        })
      })
    })
  
    // Highlight active menu item
    const sections = document.querySelectorAll("section")
    const navItems = document.querySelectorAll(".nav-links a")
  
    window.addEventListener("scroll", () => {
      let current = ""
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute("id")
        }
      })
  
      navItems.forEach((item) => {
        item.classList.remove("active")
        if (item.getAttribute("href").slice(1) === current) {
          item.classList.add("active")
        }
      })
    })
  
    // Form submission
    const form = document.getElementById("contact-form")
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      alert("Thank you for your message! We will get back to you soon.")
      form.reset()
    })
  })
  
  