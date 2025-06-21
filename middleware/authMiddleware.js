import jwt from "jsonwebtoken"


/**
 *Middleware to protect routes by verifying JWT token
 *Applied to routes that require authentication
*/
export const protectedRoutes = (req, res, next) => {
    // Check if the request has an Authorization header with a Bearer token
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized, no token" })
    }
    // Extract token from "Bearer <token>"
    const token = req.headers.authorization.split(" ")[1];

    try {
        // Verify the token using secret 
        const decoded = jwt.verify(token, "helloworld")

        // Attach decoded user data to the request object
        req.user = decoded
        // Pass control to the next middleware or route handler
        next();
    }
    catch (err) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
}