document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger")
    const nav = document.querySelector(".nav-links")
    const navLinks = document.querySelectorAll(".nav-links li")
  
    burger.addEventListener("click", () => {
      nav.classList.toggle("active")
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = ""
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
        }
      })
      burger.classList.toggle("active")
    })
  
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active")
        burger.classList.remove("active")
      })
    })
  
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        })
      })
    })
  
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
  
    const form = document.getElementById("contact-form")
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      alert("Thank you for your message! We will get back to you soon.")
      form.reset()
    })
  
    // Buy page functionality
    const cakeList = document.getElementById("cake-list")
    const cartItems = document.getElementById("cart-items")
    const cartTotal = document.getElementById("cart-total")
    const checkoutBtn = document.getElementById("checkout-btn")
    let cart = []
  
    // Fetch cakes from the backend
    fetch("/api/cakes")
      .then((response) => response.json())
      .then((cakes) => {
        cakes.forEach((cake) => {
          const cakeElement = document.createElement("div")
          cakeElement.classList.add("cake-item")
          cakeElement.innerHTML = `
                      <img src="${cake.image}" alt="${cake.name}">
                      <h3>${cake.name}</h3>
                      <p>$${cake.price.toFixed(2)}</p>
                      <div class="quantity-controls">
                          <button class="decrease">-</button>
                          <span class="quantity">0</span>
                          <button class="increase">+</button>
                      </div>
                      <button class="add-to-cart" data-id="${cake.id}">Add to Cart</button>
                  `
          cakeList.appendChild(cakeElement)
  
          const quantitySpan = cakeElement.querySelector(".quantity")
          const decreaseBtn = cakeElement.querySelector(".decrease")
          const increaseBtn = cakeElement.querySelector(".increase")
          const addToCartBtn = cakeElement.querySelector(".add-to-cart")
  
          decreaseBtn.addEventListener("click", () => {
            const quantity = Number.parseInt(quantitySpan.textContent)
            if (quantity > 0) {
              quantitySpan.textContent = quantity - 1
            }
          })
  
          increaseBtn.addEventListener("click", () => {
            const quantity = Number.parseInt(quantitySpan.textContent)
            quantitySpan.textContent = quantity + 1
          })
  
          addToCartBtn.addEventListener("click", () => {
            const quantity = Number.parseInt(quantitySpan.textContent)
            if (quantity > 0) {
              addToCart(cake, quantity)
              quantitySpan.textContent = "0"
            }
          })
        })
      })
  
    function addToCart(cake, quantity) {
      const existingItem = cart.find((item) => item.id === cake.id)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        cart.push({ ...cake, quantity })
      }
      updateCart()
    }
  
    function updateCart() {
      cartItems.innerHTML = ""
      let total = 0
  
      cart.forEach((item) => {
        const li = document.createElement("li")
        li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
        cartItems.appendChild(li)
        total += item.price * item.quantity
      })
  
      cartTotal.textContent = total.toFixed(2)
    }
  
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty!")
        return
      }
  
      fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message)
          cart = []
          updateCart()
        })
        .catch((error) => {
          console.error("Error:", error)
          alert("There was an error processing your order. Please try again.")
        })
    })
  })
  
  