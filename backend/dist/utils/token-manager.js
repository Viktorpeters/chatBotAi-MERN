import jwt from "jsonwebtoken";
import { appCOnfigurations } from "../config/app.config.js";
export const generateToken = (tokenType, payload) => {
    console.log(appCOnfigurations.JWT_SECRET);
    if (tokenType === "ACCESS") {
        console.log(appCOnfigurations.JWT_SECRET);
        return jwt.sign(payload, appCOnfigurations.JWT_SECRET, {
            expiresIn: +appCOnfigurations.ACCESS_EXPIRY_TIME,
        });
    }
    return jwt.sign(payload, appCOnfigurations.JWT_SECRET, {
        expiresIn: +appCOnfigurations.REFRESH_EXPIRY_TIME,
    });
};
//# sourceMappingURL=token-manager.js.map