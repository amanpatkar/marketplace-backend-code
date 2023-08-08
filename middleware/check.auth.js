const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Auth token not found" });
        }

        const decodedToken =  jwt.verify(token, process.env.JWT_KEY);
        req.userData = {email:decodedToken.email, userId:decodedToken.userId};
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Auth failed" });
    }
};
