import Product from "../model/productModel.model.js"


/**
 *Fetch all available products from the database
 *GET /api/products
*/
export const getAllProducts = async (req, res) => {
    try {
        // Fetch all product documents from the database
        let allProducts = await Product.find()
        // Respond with the fetched products
        res.status(200).json({
            message: "All Products",
            product: allProducts
        })
    }
    catch (err) {
        res.status(500).json({ message: "Error Getting the Products" }, err.message)
    }
}


/**
 *Fetch a single product by its ID
 *GET /api/products/:id
*/
export const getProductById = async (req, res) => {
    try {
        // Destructure product ID from URL parameters
        let { id } = req.params;

        // Find product by its MongoDB _id
        const productById = await Product.findById(id)
        if (!productById) return res.status(404).json({ error: "Product not found." });
        res.status(200).json({
            message: "Get Product by Id",
            product: productById
        })
    }
    catch (err) {
        // Handle errors such as invalid ID format or server issues
        res.status(500).json({ error: "Error fetching product." });
    }
}