import { privateInstance } from "./config";
import { CartReq } from "../types/cart";
type Cart = {
  body: CartReq;
};

const addCart = ({ body }: Cart) => {
  return privateInstance.post("/cart/add", body);
};
const getCart = ({ userId }: any) => {
  return privateInstance.get(`cart/getcarts/${userId}`);
};

const increaseCart = ({ userId, productId }: any) => {
  return privateInstance.put(`cart/update/increase/${userId}/${productId}`);
};

const decreaseCart = ({ userId, productId }: any) => {
  return privateInstance.put(`cart/update/decrease/${userId}/${productId}`);
};
const checkCart = ({ userId, productId }: any) => {
  return privateInstance.get(`cart/checkCart/${userId}/${productId}`);
};
const deleteCart = ({ userId, cartId }: any) => {
  return privateInstance.delete(`cart/delete/${userId}/${cartId}`);
};
export { addCart, getCart, increaseCart, decreaseCart, checkCart, deleteCart };
