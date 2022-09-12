import jwt  from "jsonwebtoken";

const verifyUser = (req, res, next) => {
    if (req.user.id === req.params.id)  return next();
    return res.status(406).send("Trying to alter others information")
}

const verifyAdmin = (req, res, next) => {
    if (req.user.isAdmin) return next();
    return res.status(406).send("You are not an admin")
}

export const verifySessionToken = (req, res, next) => {
    const token = req.cookies.session_token;

    if (!token) {
        return res.status(401).send("Not Authorized!")
    }

    jwt.verify(token, process.env.KEY_GEN, (error, decoded) => {
        if (error) return res.status(404).send("Token is not valid")
        req.user = decoded;
        verifyUser(req, res, next);
    })
}

export const verifySessionTokenAdmin = (req, res, next) => {
    const token = req.cookies.session_token;

    if (!token) {
        return res.status(401).send("Not Authorized!")
    }

    jwt.verify(token, process.env.KEY_GEN, (error, decoded) => {
        if (error) return res.status(404).send("Token is not valid")
        req.user = decoded;
        verifyAdmin(req, res, next);
    })
}