import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  let token = req.header("Authorization");
  if (!token)
    return res.status(400).send({ message: "Authorization denied: No token" });

  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkzZDMzM2I1NzhlMGVjNzhmZGUzNTYiLCJuYW1lIjoiUGVwaXRhIFBlcmxhIiwicm9sZUlkIjoiNjE5M2QyZGRiNTc4ZTBlYzc4ZmRlMzRlIiwiaWF0IjoxNjM3MDkwNDI5fQ.MpEzX3cP_KdzO56Y40YX6F6CGcOWvHWfsu7djrvsSKg

  token = token.split(" ")[1];
  if (!token)
    return res.status(400).send({ message: "Authorization denied: No token" });

  try {
    req.user = jwt.verify(token, process.env.SK_JWT);
    next();
  } catch (e) {
    return res
      .status(400)
      .send({ message: "Authorization denied: Invalid token" });
  }
};

export default auth;
