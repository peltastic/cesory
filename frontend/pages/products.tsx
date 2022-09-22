import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { useQuery } from "react-query";
import { getProducts } from "../api/requests/product";
import ProductLoader from "../components/ProductLoader";
import classes from "../styles/products.module.css";
import Filter from "../components/Filter";
import Search from "../components/Search";
import { AiOutlineSearch } from "react-icons/ai";

export type Filter = {
  category: string;
};

const categories = [
  "All",
  "Headphones",
  "Laptops",
  "Speakers",
  "Mobiles",
  "Watches",
];

function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [filterOptions, setFilterOptions] = useState<Filter>({
    category: "",
  });
  const [searchValue, setSearchValue] = useState<string>("");
  const { refetch, isLoading } = useQuery(
    "products",
    () => {
      return getProducts({
        category: filterOptions.category,
        name: searchValue,
      });
    },
    {
      onSuccess: (data) => {
        setProducts(data?.data.data);
      },
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    refetch();
  }, [filterOptions]);
  useEffect(() => {
    refetch();
  }, [searchValue]);
  const filterOptionsHandler = (value: string) => {
    if (value === "all") {
      return setFilterOptions({ ...filterOptions, category: "" });
    }
    setFilterOptions({ ...filterOptions, category: value });
  };
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <>
      <div className="mt-[10rem] mb-4 md:mb-0 md:mt-0 md:fixed bg-transparent md:bg-white z-[50]  md:top-[7rem]   w-full">
        <div className="flex justify-center">
          <div className="w-[90%]  md:w-[70%] bp3:w-[70%] bp2:w-[50%] relative md:-ml-12 xs:ml-0">
            <Search
              class="border w-full relative  py-5 rounded-full px-5 text-2xl "
              placeholder="Search For Product Name "
              changed={searchHandler}
            />
            <div className="absolute right-[1rem] top-[50%] -translate-y-[50%] ">
              <AiOutlineSearch className="text-5xl text-[#d2d2d2]" />
            </div>
          </div>
        </div>
      </div>
      <div className="eqeeq">
        <div className="flex md:mt-[15rem] justify-center mb-[2rem] items-center ">
          {categories.map((el, index) => {
            return (
              <Filter
                class={`${
                  el.toLowerCase() === filterOptions.category
                    ? "bg-primary text-white"
                    : el.toLowerCase() === "all" && !filterOptions.category
                    ? "bg-primary text-white"
                    : null
                }
                }`}
                clicked={filterOptionsHandler}
                filter_name={el}
                key={index}
              />
            );
          })}
        </div>
        <div
          className={`${classes.Products} ${
            isLoading ? "justify-center" : ""
          } px-8  flex flex-wrap w-full mx-auto`}
        >
          {!isLoading ? (
            <>
              {products?.map((item: any, index: any) => {
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
            </>
          ) : (
            <div className="fixed top-[60%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
              <ProductLoader />
              <p className="text-center  mt-8 text-xl">Loading...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
