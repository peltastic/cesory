import Dashboard from "../components/Dashboard";
import Input from "../components/Input";
import classes from "../styles/addProduct.module.css";
import { IoAddSharp } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { BsUpload } from "react-icons/bs";
import { useState } from "react";
import { useMutation } from "react-query";
import { addProduct } from "../api/requests/product";
import { ProductReq } from "../api/types/product";

type Props = {};
type Product = {
  name: string;
  desc: string;
  brand: string;
  price: number;
  category: string;
  image: any;
};

function AddProducts({}: Props) {
  const [productData, setProductData] = useState<Product>({
    name: "",
    desc: "",
    brand: "",
    price: 0,
    category: "earphones",
    image: "",
  });
  const [uploadErrMessage, setUploadErrMessage] = useState<string>("");

  const upload = useMutation(addProduct, {
    onSuccess: () => {
      setProductData({
        name: "",
        desc: "",
        brand: "",
        price: 0,
        category: "earphones",
        image: "",
      });
    },
  });

  const onChangeHandler = (e: any, type: string): void => {
    setProductData({ ...productData, [type]: e.target.value });
  };

  const onSubmit = (): void => {
    if (
      !productData.brand ||
      !productData.category ||
      !productData.desc ||
      !productData.image ||
      !productData.name ||
      !productData.price
    ) {
      setUploadErrMessage("Complete the Form");
    } else {
      const body: ProductReq = {
        name: productData.name,
        price: productData.price,
        category: productData.category,
        productBrand: productData.brand,
        productImageFileUrl: productData.image,
        desc: productData.desc,
      };
      const token = sessionStorage.getItem("token");
      if (token) {
        upload.mutate({ token: token, body: body });
      }
    }
  };

  const readFileHandler = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProductData({ ...productData, image: reader.result });
      return reader.result;
    };
  };

  const selectFilesHandler = async (e: any) => {
    const imagesData = [];
    const files = e.target.files[0];
    imagesData.push(readFileHandler(files));
  };
  return (
    <>
      <div className={`flex ${classes.Container} flex-wrap w-full mt-[7.5rem]`}>
        <div className={`${classes.DashboardContainer} w-[50%]`}>
          <Dashboard username="pelz" title="Add Products" />
          <div className="w-[full] h-[30rem] relative">
            <div className=" text-black w-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
              {upload.isLoading ? (
                <h1 className="text-center">Uploading...</h1>
              ) : null}
              {upload.isSuccess ? (
                <h1 className="text-center">Uploaded!</h1>
              ) : null}
              <h1 className="mb-6 text-center text-red-700">
                {uploadErrMessage}
              </h1>
              <h1 className="text-center">
                Click on the button below to upload product to store after
                filling the form
              </h1>
              <button
                onClick={onSubmit}
                className="text-white flex mx-auto items-center bg-[#B3541E] px-6 py-2 text-lg rounded-full mt-6"
              >
                Upload
                <BsUpload className="ml-4" />
              </button>
            </div>
          </div>
        </div>
        <div
          className={`${classes.ProductContainer} text-black w-[40%] mx-auto px-[2rem]`}
        >
          <h1 className="text-white text-4xl text-center mb-11">ADD PRODUCT</h1>
          <div className="flex items-center w-full mb-[2rem]">
            <p className="mr-auto text-2xl">Product Name :</p>
            <Input
              type="text"
              class="w-full"
              changed={(e) => onChangeHandler(e, "name")}
              value={productData.name}
              placeholder={""}
              clicked={() => {
                return;
              }}
              show=""
              section="add"
            />
          </div>
          <div className="flex items-center  w-full mb-[2rem]">
            <p className="mr-auto text-2xl">Description :</p>
            <Input
              type="text"
              class="w-full"
              changed={(e) => onChangeHandler(e, "desc")}
              value={productData.desc}
              placeholder={""}
              clicked={() => {
                return;
              }}
              show=""
              section="add"
            />
          </div>
          <div className="flex items-center w-full mb-[2rem]">
            <p className="mr-auto text-2xl">Product Brand :</p>
            <Input
              type="text"
              class="w-full"
              changed={(e) => onChangeHandler(e, "brand")}
              value={productData.brand}
              placeholder={""}
              clicked={() => {
                return;
              }}
              show=""
              section="add"
            />
          </div>
          <div className="flex items-center  w-full mb-[2rem]">
            <p className="mr-auto text-2xl">Product Price:</p>
            <Input
              type="number"
              class="w-full"
              changed={(e) => onChangeHandler(e, "price")}
              value={productData.price}
              placeholder={""}
              clicked={() => {
                return;
              }}
              show=""
              section="add"
            />
          </div>
          <div className="flex items-center  w-full mb-[2rem]">
            <p className="mr-auto text-2xl">Category :</p>
            <div className="  items-center flex  w-[60%]">
              <select
                onChange={(e) => {
                  setProductData({ ...productData, category: e.target.value });
                }}
                className="cursor-pointer transition-all py-2 px-6 mx-auto outline-[#959595] text-[2rem]"
                name="cars"
                id="cars"
              >
                <option className="" value="volvo">
                  Earphones
                </option>
                <option value="headphones">Headphones</option>
                <option value="laptops">Laptops</option>
                <option value="speakers">Speakers</option>
                <option value="mobiles">Mobiles</option>
                <option value="watches">Watches</option>
              </select>
              {/* <div className="flex items-center mx-[4rem]">
                <p className="text-2xl">Phones</p>
                <div
                  onClick={() =>
                    setProductData({ ...productData, category: "phones" })
                  }
                  className={` w-[1.5rem] block h-[1.5rem] ml-[2rem] rounded-full ${
                    productData.category === "phones" ? "bg-[#B3541E]" : null
                  } border-[#B3541E] relative border`}
                ></div>
              </div>
              <div className="flex items-center mx-[4rem]">
                <p className="text-2xl">Laptops</p>
                <div
                  onClick={() =>
                    setProductData({ ...productData, category: "laptops" })
                  }
                  className={`h-[1.5rem] w-[1.5rem] ml-[2rem] block rounded-full ${
                    productData.category === "laptops" ? "bg-[#B3541E]" : null
                  } border-[#B3541E] border`}
                ></div> */}
              {/* </div> */}
            </div>
          </div>

          <div className="flex items-center  w-full mb-[2rem]">
            <p className="mr-auto text-2xl">Product Image :</p>
            <div className="w-[50%] flex justify-center  ">
              <div
                className={`mx-auto items-center border flex px-[2rem] ${
                  productData.image ? "bg-[#B3541E]" : null
                }`}
              >
                <input
                  type="file"
                  className={`${classes.FileInput} ${
                    productData.image ? "text-white" : "text-[#B3541E]"
                  }  mx-auto`}
                  onChange={selectFilesHandler}
                  accept="image/png, image/jpeg"
                />
                {!productData.image ? (
                  <IoAddSharp className="text-3xl text-[#B3541E]" />
                ) : (
                  <IoMdCheckmark className="text-3xl text-white" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProducts;
