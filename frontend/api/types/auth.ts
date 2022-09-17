export type signupReq = {
  name: string;
  email: string;
  password: string;
};

export type signinReq = {
  email: string;
  password: string;
};

export type refreshReq = {
  refreshToken: string;
};
