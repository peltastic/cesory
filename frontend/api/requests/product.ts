import { ProductReq } from "../types/product";
import { privateInstance, publicInstance } from "./config";

type Add = {
  token: string;
  body: ProductReq;
};

type ProductQueryReq = {
  category?: string;
  limit?: number;
  offset?: number;
  name?: string;
};

const addProduct = ({ body }: Add) => {
  return privateInstance.post("/products/add", body);
};

const getProducts = ({ category, limit, offset, name }: ProductQueryReq) => {
  return publicInstance.get(
    `/products/getproducts?category=${category || ""}&limit=${
      limit || ""
    }&offset=${offset || ""}&name=${name || ""}`
  );
};

const getProduct = ({ id }: any) => {
  if (id) {
    return publicInstance.get(`/products/${id}`);
  }
};

export { addProduct, getProducts, getProduct };
