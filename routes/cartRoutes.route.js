import express from "express"
import { addToCart, updateCartItem, deleteCartItem, getCartItems } from "../controller/cartController.controller.js";
import { protectedRoutes } from "../middleware/authMiddleware.js";

const router = express.Router();

// user cant access /api/cart
router.use(protectedRoutes)

router.post("/", addToCart);
router.get("/", getCartItems);
router.patch("/:id", updateCartItem);
router.delete("/:id", deleteCartItem);

export default router