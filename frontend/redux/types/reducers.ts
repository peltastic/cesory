export type UserInfo = {
  username: string;
  userId: string;
  email: string;
  userRole: number;
};

export type UserState = {
  userInfo: UserInfo;
  cartCount: number;
  token: string;
};
