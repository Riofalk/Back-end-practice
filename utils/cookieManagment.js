import jwt from "jsonwebtoken";

export const cookieUpd = (req, res) => {

}

export const newCookie = (req, res, user) => {
    return jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.KEY_GEN, {expiresIn: "2h"})
}