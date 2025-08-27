const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach decoded user info
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;