import Product from "../model/productModel.model.js"
import { connectDB } from "../DB.js"
import dotenv from "dotenv"
import axios from "axios"

// Load environment variables from .env file
dotenv.config()

/**
 *Seeds product data into the MongoDB database
*/
const productsSeeder = async () => {
    try {
        //MongoDB connection
        await connectDB();

        //Deleting exisiting data in Database before seeding
        await Product.deleteMany({})

        // Fetch product data from external API
        const response = await axios.get("https://dummyjson.com/products");
        const products = response.data;
        const filtering = products.product
        const filteredProducts = filtering.map(product => ({
            title: product.title,
            description: product.description,
            price: product.price,
            discountPercentage: product.discountPercentage,
            rating: product.rating,
            stock: product.stock,
            brand: product.brand,
            shippingInformation: product.shippingInformation,
            availabilityStatus: product.availabilityStatus,
            category: product.category,
            thumbnail: product.thumbnail,
        }));
        // Insert all formatted products into the database
        await Product.insertMany(filteredProducts)
        console.log("Product Seeded to Database Succesfully");
        process.exit(0)
    }
    catch (err) {
        console.error("Seeding error:", err.message);
        process.exit(1)
    }
}


productsSeeder()