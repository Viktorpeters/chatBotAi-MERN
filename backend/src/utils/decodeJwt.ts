import jwt from "jsonwebtoken";
import { appCOnfigurations } from "../config/app.config.js";
import { decode } from "punycode";
export function validateJWt(token: string): {
  isValid: boolean;
  isExpired: boolean;
  decodedInfo?: any;
} {
  try {
    
    const decoded = jwt.verify(token, appCOnfigurations.JWT_SECRET);

    return {
      isValid: true,
      isExpired: false,
      decodedInfo: decoded,
      };
      
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return {
        isValid: false,
        isExpired: true,
        decodedInfo: null,
      };
    }

    return {
      isValid: false,
      isExpired: false,
      decodedInfo: "",
    };
  }
}
