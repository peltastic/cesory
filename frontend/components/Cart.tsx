import { MdAdd } from "react-icons/md";
import { AiOutlineMinus, AiFillDelete } from "react-icons/ai";
import { useMutation } from "react-query";
import { increaseCart, decreaseCart, addCart } from "../api/requests/cart";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import classes from "../styles/cart.module.css";
import { useRouter } from "next/router";
import { splitNumber } from "../utils/functions";
import { incrementCheckout, decrementCheckout } from "../redux/reducers/cart";
import TestImg from "../assets/header.png";
import Image from "next/image";
import Button from "./Button";

type Props = {
  productId: string;
  image: string;
  total_price: number;
  price: number;
  name: string;
  count: number;
  cartId: string;
  category: string;
  deleteCart: (id: string, cartId: string, amount: number) => void;
};

function Cart(props: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const userId = useSelector((state: RootState) => state.user.userInfo.userId);
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  useEffect(() => {
    if (props.count) {
      setCurrentCount(props.count);
    }
  }, [props.count]);
  useEffect(() => {
    if (props.price) {
      setPrice(props.price);
    }
  }, [props.price]);
  useEffect(() => {
    if (props.total_price) {
      setTotalPrice(props.total_price);
    }
  }, [props.total_price]);
  const { mutate } = useMutation(addCart, {
    onSuccess: () => {
      dispatch(incrementCheckout(price));
    },
  });
  const increaseMutation = useMutation(increaseCart, {
    onSuccess: () => {
      dispatch(incrementCheckout(price));
      setTotalPrice((prevState: number): number => {
        return (prevState += price);
      });
    },
  });
  const decreaseMutation = useMutation(decreaseCart, {
    onSuccess: () => {
      dispatch(decrementCheckout(price));
      setTotalPrice((prevState: number): number => {
        if (currentCount <= 1) {
          return prevState;
        }
        return (prevState -= price);
      });
    },
  });

  const increaseCartHandler = () => {
    setCurrentCount((prevState: number): number => {
      return prevState + 1;
    });

    let token = sessionStorage.getItem("token");
    if (!userId || !props.productId || !token) {
      return;
    }
    if (currentCount === 0) {
      mutate({
        body: {
          userId: userId,
          productId: props.productId,
        },
      });
    } else {
      increaseMutation.mutate({
        userId: userId,
        productId: props.productId,
      });
    }
  };
  const decreaseCartHandler = () => {
    setCurrentCount((prevState: number): number => {
      return prevState - 1;
    });
    let token = sessionStorage.getItem("token");
    if (!userId || !props.productId || !token) {
      return;
    }
    decreaseMutation.mutate({
      userId: userId,
      productId: props.productId,
    });
  };
  const clickHandler = () => {
    router.push(`/products/${props.productId}`);
  };
  return (
    <div className=" flex items-end mb-10">
      <div className="relative  rounded-3xl mr-8 w-[25rem] h-[25rem] bg-gradient-to-br from-[#cacaca] to-[#ebebeb]">
        <div className="center w-[25rem]">
          <Image src={TestImg} />
        </div>
      </div>
      <div className="">
        <div className="flex py-4 text-black -ml-2">
          <Button
            clicked={increaseCartHandler}
            content={<MdAdd />}
            class=" text-3xl mr-2 text-black"
          />
          <Button
            clicked={decreaseCartHandler}
            disabled={currentCount === 0}
            content={<AiOutlineMinus />}
            class="text-3xl text-black"
          />
        </div>
        <p className="py-4 text-xl ">{currentCount}</p>
        <h1 className="font-bold text-2xl  py-4">{props.name}</h1>
        <p className="font-bold text-2xl py-4">
          $
          {totalPrice
            ? splitNumber(totalPrice || 0)
            : splitNumber(props.total_price || 0)}
        </p>
      </div>
    </div>
    // <div
    //   className={`relative ${classes.Cart} ${classes.Glow} w-[30%] h-[35rem]  mx-auto text-white mb-14 flex flex-col items-center border  px-16 py-12`}
    // >
    //   <button
    //     onClick={() =>
    //       props.deleteCart(
    //         userId,
    //         props.cartId,
    //         totalPrice || props.total_price
    //       )
    //     }
    //     className="absolute right-4 top-4"
    //   >
    //     <AiFillDelete className="text-4xl glow" />
    //   </button>
    //   <div className="w-full cursor-pointer h-[70%]">
    //     <img
    //       className=" h-full mx-auto "
    //       onClick={clickHandler}
    //       src={props.image}
    //       alt=""
    //     />
    //   </div>
    //   <div className=" absolute bottom-8 flex flex-col items-center w-[70%]">
    //     <p className="text-2xl mb-4 cursor-pointer" onClick={clickHandler}>
    //       {props.name}
    //     </p>
    //     <p className="text-2xl mb-4">
    //       N
    //       {totalPrice
    //         ? splitNumber(totalPrice)
    //         : splitNumber(props.total_price)}
    //     </p>
    //     <div className="flex w-full justify-around items-center">
    //       <button
    //         className={`glow-border p-2 flex items-center justify-center`}
    //         onClick={decreaseCartHandler}
    //         disabled={currentCount === 0}
    //       >
    //         <AiOutlineMinus className="text-2xl" />
    //       </button>
    //       <p className="text-2xl">{currentCount}</p>
    //       <button
    //         className={`glow-border  flex items-center justify-center p-2`}
    //         onClick={increaseCartHandler}
    //       >
    //         <MdAdd className="text-2xl" />
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Cart;
