// // import jwt from "jsonwebtoken";
// const jwt = (await import("jsonwebtoken")).default;

const JWT_SECRET = "unitech";

export const generateAccessToken = (_username) => {
  return _username;
};

export const generateRefreshToken = (_username) => {
  return _username;
};
