import { ProductReq } from "../types/product";
import { privateInstance, publicInstance } from "./config";

type Add = {
  token: string;
  body: ProductReq;
};

const addProduct = ({ body }: Add) => {
  return privateInstance.post("/products/add", body);
};

const getProducts = ({ category, limit, offset }: any) => {
  return publicInstance.get(
    `/products/getproducts?category=${category || ""}&limit=${
      limit || ""
    }&offset=${offset || ""}`
  );
};

const getProduct = ({ id }: any) => {
  if (id) {
    return publicInstance.get(`/products/${id}`);
  }
};

export { addProduct, getProducts, getProduct };
