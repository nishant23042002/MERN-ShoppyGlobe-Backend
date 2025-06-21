import Cart from "../model/cartModel.model.js";
import Product from "../model/productModel.model.js";


/**
 *Add a product to the cart or update quantity if it already exists
 *POST /api/cart
 */
export const addToCart = async (req, res) => {
    try {
        let { productId, quantity } = req.body;
        const userId = req.user.userId;
        // Check if product exists in the Product collection
        let product = await Product.findById(productId)
        if (!product) return res.status(404).json({ error: "Invalid product ID." });

        // Check if product already exists in the cart
        let existingItem = await Cart.findOne({ userId, productId });

        if (existingItem) {
            // If exists, increment the quantity
            existingItem.quantity += quantity;
            await existingItem.save();
            return res.status(200).json({ message: "Quantity updated", Product: existingItem });
        }

        // If not exists, create a new cart entry
        let item = await Cart.create({ userId, productId, quantity })
        res.status(201).json({
            message: "Cart Product",
            Product: item
        })
    }
    catch (err) {
        res.status(500).json({ message: "Failed to add Product to cart" }, err.message)
    }
}


/**
 *Fetch all items in the cart
 *GET /api/cart
 */
export const getCartItems = async (req, res) => {
    try {
        const userId = req.user.userId;
        // Populate product details from Product collection
        const cartItems = await Cart.find({ userId }).populate("productId");
        console.log(cartItems);
        res.status(200).json(cartItems);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch cart items" });
    }
};


/**
 *Update the quantity of a specific item in the cart
 *PATCH /api/cart/:id
 */
export const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.userId;
        let { id } = req.params;
        let { quantity } = req.body;
        // Update quantity using productId match
        const cartItem = await Cart.findOneAndUpdate(
            { userId, productId: id },
            { quantity },
            { new: true }
        );
        if (!cartItem) return res.status(404).json({ error: "Cart item not found." });
        res.status(200).json(cartItem);
    } catch (err) {
        res.status(500).json({ error: "Failed to update cart item." });
    }
}


/**
 *Delete an item from the cart
 *DELETE /api/cart/:id
 */
export const deleteCartItem = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log(userId);
        let { id } = req.params
        // Delete cart item by productId
        const result = await Cart.findOneAndDelete({ userId, productId: id });
        if (!result) return res.status(404).json({ error: "Cart item not found." });
        res.status(200).json({ message: "Item removed from cart." });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete cart item." });
    }
}