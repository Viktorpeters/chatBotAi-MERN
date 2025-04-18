import jwt from "jsonwebtoken";
import { appCOnfigurations } from "../config/app.config.js";
export const protectedRoute = (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token || token === "") {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    // verify token to verify if its still valid or has not expired
    try {
        const isValid = jwt.verify(token, appCOnfigurations.JWT_SECRET);
        req.user = isValid;
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(403).json({
                success: false,
                message: "token expired",
            });
        }
        res.status(401).json({
            message: error.message,
        });
    }
};
//# sourceMappingURL=protected.js.map