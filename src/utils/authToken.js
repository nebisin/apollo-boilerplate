const jwt = require("jsonwebtoken");
const { getTokenCookie }= require("../utils/authCookie");

const getUserId = (ctx, requireAuth = true) => {
  if (ctx.req) {
    const token = getTokenCookie(ctx.req);

    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_CODE);

      return decoded.userId;
    }
  }

  if (requireAuth) {
    throw new Error("Bu işlemi yapabilmek için giriş yapmalısınız.");
  }

  return null;
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET_CODE);
};


module.exports = { 
  getUserId,
  generateToken
}