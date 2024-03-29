export const sendJwtToClient = (user, response, status) => {
  const token = user.generateJwtFromUser();

  const { JWT_COOKIE, NODE_ENV } = process.env;

  return response
    .status(status || 200)
    .cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      access_token: token,
      data: {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        id:user._id
      },
    });
};

export const isTokenIncluded = (req) => {
  return (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
  );
};

export const getAccessTokenFromHeader = (req) => {
  const authorization = req.headers.authorization;
  const access_token = authorization.split(" ")[1];
  return access_token;
};