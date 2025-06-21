import User from "../model/userModel.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


/**
Register a new user
POST /api/users/register
 */
export const registerUser = async (req, res) => {
    try {
        // Extract user details from request body
        const { name, email, password } = req.body
        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide valid details" })
        }
        // Check if the user already exists in DB
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" })
        }

        // Hash the password using bcrypt
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name, email, password: hashPassword })
        console.log(newUser);

        // Generate JWT token valid for 1 day
        const token = jwt.sign(
            { userId: newUser._id, name: newUser.name, email: newUser.email },
            "helloworld",
            { expiresIn: "1d" }
        );
        console.log(token);

        const { _id, name: userName, email: userEmail } = newUser;
        res.status(201).json({ message: "User Registered", user: { _id, name: userName, email: userEmail }, token });
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message })
    }
}


/**
 *Login an existing user
 *POST /api/users/login
 */
export const loginUser = async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare entered password with hashed password in DB
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT token on successful login
        const token = jwt.sign({ userId: user._id, name: user.name, email: user.email }, "helloworld", { expiresIn: "1d" });
        // Respond with token and basic user info
        res.status(200).json({ message: "Login successful", token, user: { name: user.name, email: user.email } })
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
}