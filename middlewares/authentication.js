const { validateToken } = require("../services/auth");

function checkForAuthentication(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        //initialize user
        res.locals.user = null;

        if (!tokenCookieValue) {
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);

            req.user = userPayload;
            res.locals.user = userPayload;

        } catch (err) {
            console.log("JWT ERROR:", err.message);
            res.locals.user = null;
        }

        return next();
    };
}

module.exports = { checkForAuthentication };