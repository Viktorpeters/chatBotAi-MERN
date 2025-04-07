import { appCOnfigurations } from '../config/app.config.js';
export const setCookie = (res, token) => {
    return res.cookie('refresh_token', token, {
        httpOnly: true,
        secure: true,
        maxAge: +appCOnfigurations.COOKIE_EXP_TIME, //15minutes,
        sameSite: 'none'
    });
};
//# sourceMappingURL=set-cookie.js.map