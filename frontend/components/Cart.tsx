import { MdAdd } from "react-icons/md";
import { AiOutlineMinus, AiFillDelete } from "react-icons/ai";
import { useMutation } from "react-query";
import { increaseCart, decreaseCart, addCart } from "../api/requests/cart";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { splitNumber } from "../utils/functions";
import { incrementCheckout, decrementCheckout } from "../redux/reducers/cart";
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
      <div
        onClick={clickHandler}
        className="relative cursor-pointer rounded-3xl mr-8 w-[20rem] sm:w-[25rem] h-[20rem] sm:h-[25rem] bg-gradient-to-br from-[#cacaca] to-[#ebebeb]"
      >
        <div className="center w-[14rem] sm:w-[18rem]">
          <img src={props.image} />
        </div>
      </div>
      <div className="">
        <div className="flex py-4 text-black -ml-2">
          <Button
            clicked={decreaseCartHandler}
            disabled={currentCount === 0}
            content={<AiOutlineMinus />}
            class="text-3xl text-black"
          />
          <Button
            clicked={increaseCartHandler}
            content={<MdAdd />}
            class=" text-3xl mr-2 text-black"
          />
        </div>
        <p className="py-4 text-xl ">{currentCount}</p>
        <h1 className="font-bold text-2xl  py-4">{props.name}</h1>
        <div className="flex items-center">
          <p className="font-bold mr-6 text-2xl py-4">
            $
            {totalPrice
              ? splitNumber(totalPrice || 0)
              : splitNumber(props.total_price || 0)}
          </p>
          <button
            onClick={() =>
              props.deleteCart(
                userId,
                props.cartId,
                totalPrice || props.total_price
              )
            }
            className=""
          >
            <AiFillDelete className="text-3xl text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
