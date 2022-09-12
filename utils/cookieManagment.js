import jwt from "jsonwebtoken";

export const newCookie = (user) => {
    return jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.KEY_GEN, {expiresIn: "2h"})
}