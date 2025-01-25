const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const app = express()
const port = 3000

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

// Set EJS as the view engine
app.set("view engine", "ejs")

// Sample product data
const cakes = [
  { id: 1, name: "Chocolate Cake", price: 25.99, image: "/images/chocolate-cake.jpg" },
  { id: 2, name: "Vanilla Cake", price: 22.99, image: "/images/vanilla-cake.jpg" },
  { id: 3, name: "Red Velvet Cake", price: 27.99, image: "/images/red-velvet-cake.jpg" },
  { id: 4, name: "Carrot Cake", price: 23.99, image: "/images/carrot-cake.jpg" },
]

// Routes
app.get("/", (req, res) => {
  res.render("index", { cakes })
})

app.get("/api/cakes", (req, res) => {
  res.json(cakes)
})

app.post("/api/order", (req, res) => {
  const order = req.body
  // Here you would typically process the order, save it to a database, etc.
  res.json({ message: "Order placed successfully!", order })
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

