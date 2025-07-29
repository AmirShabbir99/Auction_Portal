

export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const isProduction = process.env.NODE_ENV === "production";
  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
         secure: isProduction, // true for HTTPS (production), false for HTTP (localhost)
    sameSite: isProduction ? "None" : "Lax"
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
