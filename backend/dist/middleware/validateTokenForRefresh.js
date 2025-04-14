import { validateJWt } from "../utils/decodeJwt.js";
export function validateTokenForRefresh(req, res, next) {
    // get the token
    const token = req.headers["authorization"].split(" ")[1];
    try {
        if (token === "") {
            return res.status(401).json({
                success: false,
                message: "No Token",
            });
        }
        const jwtInfo = validateJWt(token);
        console.log(jwtInfo);
        if (jwtInfo.isExpired) {
            req.expired = true;
            console.log("viktor here");
            next();
            return;
        }
        const timeLeftInSeconds = Math.floor(jwtInfo.decodedInfo?.exp - Math.floor(Date.now() / 1000));
        const formatedTimeLeftMins = `${Math.floor(timeLeftInSeconds / 60)}`.padStart(2, "O");
        const formatedTimeLeftsSeconds = `${timeLeftInSeconds % 60}`.padEnd(2, "O");
        const timeLeft = `${formatedTimeLeftMins}:${formatedTimeLeftsSeconds}`;
        res.status(202).json({
            suceess: true,
            message: "token still valid",
            timeLeft: timeLeft,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
//# sourceMappingURL=validateTokenForRefresh.js.map