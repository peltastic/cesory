import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { incrementCartCount, decrementCartCount } from "../redux/reducers/user";
import { useDispatch } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { splitNumber } from "../utils/functions";
import {
  addCart,
  increaseCart,
  decreaseCart,
  checkCart,
} from "../api/requests/cart";
import { AiOutlineMinus } from "react-icons/ai";
import classes from "../styles/product.module.css";
import Button from "../components/Button";
import TestImg from "../assets/header.png";
import Image from "next/image";

type Props = {
  name: string;
  image: string;
  price: number;
  id: string;
  category: string;
};

function Product(props: Props) {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.userInfo.userId);
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const { refetch } = useQuery(
    props.id,
    () => {
      let token = sessionStorage.getItem("token");
      if (!token || !userId || !props.id) {
        return;
      }
      return checkCart({ token: token, userId: userId, productId: props.id });
    },
    {
      onSuccess: (data) => {
        if (data?.data) {
          setTotalPrice(data?.data.total_price);
          setCartCount(data?.data.count);
          setPrice(data?.data.price);
        }
      },
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );
  const { mutate } = useMutation(addCart, {
    onSuccess: (data) => {
      dispatch(incrementCartCount());
    },
  });
  const increaseMutation = useMutation(increaseCart, {
    onSuccess: () => {
      setTotalPrice((prevState: number): number => (prevState += price));
    },
  });
  const decreaseMutation = useMutation(decreaseCart, {
    onSuccess: () => {
      if (cartCount <= 1) {
        dispatch(decrementCartCount());
      }
      setTotalPrice((prevState: number): number => (prevState -= price));
    },
  });
  const increaseCartHandler = () => {
    setCartCount((prevState: number): number => {
      return prevState + 1;
    });

    let token = sessionStorage.getItem("token");
    if (!userId || !props.id || !token) {
      return;
    }
    if (cartCount === 0) {
      mutate({
        body: {
          userId: userId,
          productId: props.id,
        },
      });
    } else {
      increaseMutation.mutate({
        token: token,
        userId: userId,
        productId: props.id,
      });
    }
  };
  const decreaseCartHandler = () => {
    setCartCount((prevState: number): number => {
      return prevState - 1;
    });
    let token = sessionStorage.getItem("token");
    if (!userId || !props.id || !token) {
      return;
    }
    decreaseMutation.mutate({
      token: token,
      userId: userId,
      productId: props.id,
    });
  };
  useEffect(() => {
    if (!userId || !props.id) {
      return;
    }
    refetch();
  }, []);
  return (
    <>
      <div className=" cursor-pointer w-[100%] xs:w-[70%] bp6:w-[45%] bp1:w-[23%] mx-[1rem] my-[1rem]">
        <div
          onClick={() => router.push(`/products/${props.id}`)}
          className="relative rounded-3xl  bg-gradient-to-br from-[#cacaca] to-[#ebebeb] h-[25rem] xs:h-[20rem] "
        >
          <div className="center w-[20rem]">
            <img src={props.image} />
          </div>
        </div>

        <div className="flex items-start my-2">
          <div className="text-black mr-auto">
            <p className="text-xl my-2">{props.name}</p>
            <p className="font-bold text-xl">
              ${totalPrice ? splitNumber(totalPrice || 0) : splitNumber(props.price || 0)}
            </p>
          </div>
          {cartCount ? (
            <div className=" flex text-black text-2xl items-center">
              <Button
                content={<AiOutlineMinus />}
                disabled={cartCount === 0}
                clicked={decreaseCartHandler}
                class="mx-3"
              />
              <p>{cartCount}</p>
              <Button
                content={<MdAdd />}
                clicked={increaseCartHandler}
                class="mx-3"
              />
            </div>
          ) : null}
        </div>
      </div>
      {/* <div
        className={`${classes.Product} ${classes.Glow}  mb-11 p-2 w-[30%] h-[35rem] cursor-pointer border-[2px] text-black border-[#ffffff3c] relative mx-4 ml-10`}
      >
        <div className={`border-white py-8 h-full w-full border `}>
          <div
            className="h-[70%] "
            onClick={() => router.push(`/products/${props.id}`)}
          >
            <img src={props.image} className="h-full mx-auto block" />
          </div>
          <h1 className="text-center mt-[2rem] text-2xl">{props.name}</h1>
          <div className=" w-full text-[1.5rem] flex absolute justify-center bottom-0 left-0 px-6 py-4 ">
            <p className={`${cartCount ? "mr-auto" : null}`}>
              ${totalPrice ? splitNumber(totalPrice) : splitNumber(props.price)}
            </p>
            
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Product;
