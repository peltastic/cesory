import { useEffect, useState } from "react";
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
  const [drop, setDrop] = useState<string>("");
  const [filterOptions, setFilterOptions] = useState<Filter>({
    category: "",
  });
  const { refetch, isLoading } = useQuery(
    "products",
    () => {
      return getProducts({
        category: filterOptions.category,
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
  const dropHandler = (filter_name: string) =>
    setDrop(filter_name === drop ? "" : filter_name);
  const filterOptionsHandler = (value: string) => {
    if (value === "all") {
      return setFilterOptions({ ...filterOptions, category: "" });
    }
    setFilterOptions({ ...filterOptions, category: value });
  };
  return (
    <>
      <div className="fixed bg-white top-[8rem] w-full">
        <div className="flex justify-center">
          <div className="w-[50%] relative">
            <Search
              class="border w-full py-5 rounded-full px-5 text-2xl"
              placeholder="Search For Product Name "
            />
            <div className="absolute right-[1rem] top-[50%] -translate-y-[50%] ">
              <AiOutlineSearch className="text-5xl text-[#d2d2d2]" />
            </div>
          </div>
        </div>
        {/* <div className="flex w-full justify-center">
          <Filter
            dropHand={dropHandler}
            drop={drop}
            filter_name="Device Type"
            filters={device_type}
            clicked={filterOptionsHandler}
            filterOption={filterOptions}
            type="products"
          />
          <Filter
            dropHand={dropHandler}
            drop={drop}
            filter_name="Category"
            filters={category}
            clicked={filterOptionsHandler}
            filterOption={filterOptions}
            type="products"
          />
        </div> */}
      </div>
      '
      <div className="eqeeq">
        <div className="flex mt-[15rem] justify-center mb-[2rem] items-center">
          {categories.map((el, index) => {
            return (
              <Filter
                class={`${
                  el.toLowerCase() === filterOptions.category
                    ? "bg-primary text-white"
                    : el.toLowerCase()  === "all" && !filterOptions.category
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
            <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
              <ProductLoader />
              <p className="text-center -ml-[4rem] mt-8 glow text-xl">
                Loading...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
