// // import jwt from "jsonwebtoken";
// const jwt = (await import("jsonwebtoken")).default;

const JWT_SECRET = "unitech";

export const generateAccessToken = (_username) => {
  return _username + JWT_SECRET;
};

export const generateRefreshToken = (_username) => {
  return _username + JWT_SECRET;
};
