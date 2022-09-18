import Product from "./Product";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getProducts } from "../api/requests/product";

type Props = {
    offset?: number;
    limit?: number;
    heading: string;
};

const Featured = (props: Props) => {
  const [productsList, setProductList] = useState<any[]>([]);
    const { data } = useQuery("featured", () =>
      getProducts({ limit: props?.limit, offset: props?.offset })
    );
    useEffect(() => {
      setProductList(data?.data.data);
    }, [data]);
  return (
    <section className="text-black w-full mt-28 mb-28">
      <h1 className="text-center mb-24 text-3xl text-black ">
       {props.heading}
      </h1>
      <div className="flex w-full flex-wrap xs:ml-6 bp1:ml-0 justify-center bp6:justify-start">
        {productsList?.map((item, index) => {
          return (
            <Product
              key={index}
              name={item?.name}
              price={item?.price}
              image={item?.product_image}
              id={item?.product_id}
              category={item?.category}
            />
          );
        })}
      </div>
      {/* <div className="text-white flex-wrap justify-center md:justify-start flex items-center">
        {productsList?.map((item, index) => {
          return (
            <Product
              key={index}
              name={item?.name}
              price={item?.price}
              image={item?.product_image}
              id={item?.product_id}
              category={item?.category}
              type={item?.product_type}
            />
          );
        })}
      </div> */}
    </section>
  );
};

export default Featured;
