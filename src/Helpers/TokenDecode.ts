import jwt_decode from "jwt-decode";

const TokenDecode = (token:string) => {
  return jwt_decode(token);
};

export default TokenDecode;