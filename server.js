import express from "express"
import productRoutes from "./routes/productRoutes.route.js"
import cartRoutes from "./routes/cartRoutes.route.js"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./DB.js";
import userRoutes from "./routes/userRoutes.route.js"


// Load environment variables (e.g., PORT, DB URI)
dotenv.config();
// Initialize express application
const app = express()

// Middleware to parse incoming JSON requests
app.use(express.json())
app.use(cors())

// Connect to MongoDB database
connectDB();


app.use("/api/products", productRoutes)
// Protected cart route; user must be authenticated via token
app.use("/api/cart", cartRoutes)
// User registration and login routes
app.use("/api/users", userRoutes)

// Define the port from environment or default to 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on PORT http://localhost:${PORT}`);
})