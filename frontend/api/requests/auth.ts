import { signupReq, signinReq, refreshReq } from "../types/auth";
import { publicInstance, privateInstance } from "./config";

const signUp = (body: signupReq) => {
  return publicInstance.post("/auth/signup", body);
};

const login = (body: signinReq) => {
  return publicInstance.post("/auth/login", body);
};
const refresh = (body: refreshReq) => {
  return publicInstance.post("/auth/refresh", body);
};

const user = (token: string) => {
  privateInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return privateInstance.get("auth/user");
};

export { signUp, login, user, refresh };
