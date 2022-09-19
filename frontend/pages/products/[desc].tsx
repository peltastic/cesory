import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { MdAdd } from "react-icons/md";
import { useQuery, useMutation } from "react-query";
import { splitNumber } from "../../utils/functions";
import { useDispatch } from "react-redux";
import {
  incrementCartCount,
  decrementCartCount,
} from "../../redux/reducers/user";
import {
  addCart,
  checkCart,
  increaseCart,
  decreaseCart,
} from "../../api/requests/cart";
import { getProduct } from "../../api/requests/product";
import styles from "../../styles/desc.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AiOutlineMinus } from "react-icons/ai";
import Messages from "../../components/Messages";
import Button from "../../components/Button";
import Filter from "../../components/Filter";
import Image from "next/image";
import Loader from "../../components/Loader";
import Featured from "../../components/Featured";

type Props = {};

function Description({}: Props) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userInfo);
  const token = useSelector((state: RootState) => state.user.token);
  const router = useRouter();
  const { desc } = router.query;
  const [data, setData] = useState<any>("");
  const [initialPrice, setInitialPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const productQuery = useQuery("product", () => getProduct({ id: desc }), {
    onSuccess: (data) => {
      const res = data?.data;
      setData(res?.data[0]);
      setInitialPrice(res?.data[0].price);
    },
    enabled: false,
    refetchOnWindowFocus: false,
  });
  const checCartQuery = useQuery(
    "checkCart",
    () => {
      let token = sessionStorage.getItem("token");
      if (!token || !user.userId || !desc) {
        return;
      }
      return checkCart({ token: token, userId: user.userId, productId: desc });
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
    onSuccess: () => {
      dispatch(incrementCartCount());
    },
  });
  const increaseMutation = useMutation(increaseCart, {
    onSuccess: () => {
      setTotalPrice((prevState: number): number => {
        if (prevState) {
          if (price) {
            return (prevState += price);
          }
          return (prevState += initialPrice);
        }
        return (prevState = initialPrice * 2);
      });
    },
  });
  const decreaseMutation = useMutation(decreaseCart, {
    onSuccess: () => {
      if (cartCount <= 1) {
        dispatch(decrementCartCount());
      }
      setTotalPrice((prevState: number): number => {
        if (cartCount <= 1) {
          return prevState;
        }
        if (price) {
          return (prevState -= price);
        }
        return (prevState -= initialPrice);
      });
    },
  });
  const increaseCartHandler = () => {
    setCartCount((prevState: number): number => {
      return prevState + 1;
    });

    if (!user.userId || !desc || !token) {
      return;
    }

    if (cartCount === 0) {
      mutate({
        body: {
          userId: user.userId,
          productId: desc,
        },
      });
    } else {
      increaseMutation.mutate({
        token: token,
        userId: user.userId,
        productId: desc,
      });
    }
  };
  const decreaseCartHandler = () => {
    setCartCount((prevState: number): number => {
      return prevState - 1;
    });
    let token = sessionStorage.getItem("token");
    if (!user.userId || !desc || !token) {
      return;
    }
    decreaseMutation.mutate({
      token: token,
      userId: user.userId,
      productId: desc,
    });
  };

  useEffect(() => {
    if (!desc) {
      return;
    }
    productQuery.refetch();
  }, [desc]);
  useEffect(() => {
    if (!desc || !user.userId) {
      return;
    }
    checCartQuery.refetch();
  }, [desc, user.userId]);

  const addCartHandler = () => {
    if (user.userId) {
      if (!data?.product_id || !user.userId) {
        return;
      }

      if (token) {
        mutate({
          body: {
            userId: user.userId,
            productId: data?.product_id,
          },
        });
        setCartCount(1);
      }
    } else {
      setShowMessage(!showMessage);
    }
  };

  const offsetStart = Math.floor(Math.random() * (10 + 1));

  return (
    <>
      {showMessage ? (
        <Messages className=" bg-[#000]" name="Sign In" link="/login" />
      ) : null}
      {data ? (
        <div
          className={`text-black mt-[12rem] mx-auto w-[90%] max-w-[800px] flex flex-wrap ${styles.Container}`}
        >
          <div className={` ${styles.ImageContainer} w-[50%] pl-5`}>
            <div className="w-[60%] mx-auto">
              <img src={data?.product_image} alt="" className="" />
            </div>
          </div>

          <div className={`${styles.DescContainer} w-[50%] relative`}>
            <h1 className="text-3xl mb-6 font-bold glow">{data?.name}</h1>
            <p className="text-xl">{data?.desc}</p>
            <p className="my-8 text-2xl">
              $
              {totalPrice ? splitNumber(totalPrice) : splitNumber(initialPrice)}
            </p>
            <p className="text-xl">{data?.product_brand}</p>
            <div className="flex flex-wrap w-full items-start mt-[2rem]">
              {cartCount < 1 ? (
                <button
                  onClick={addCartHandler}
                  className=" bg-primary text-white  rounded-full text-2xl px-10 py-2"
                >
                  Add to cart
                </button>
              ) : null}
              {cartCount ? (
                <div className="w-[30%] mr-16 flex items-center text-3xl justify-between">
                  <Button
                    class=""
                    clicked={decreaseCartHandler}
                    content={<AiOutlineMinus className="m-auto text-4xl" />}
                    disabled={cartCount === 0}
                  />
                  <p>{cartCount}</p>
                  <Button
                    class=""
                    clicked={increaseCartHandler}
                    content={<MdAdd className="m-auto text-4xl" />}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full mt-[15rem] justify-center">
          <Loader class="w-[20rem] h-[15rem] mr-20" />
          <div className="flex flex-col">
            <Loader class="w-[20rem] mb-5 h-[2rem]" />
            <Loader class="w-[15rem] mb-10 h-[2rem]" />
            <Loader class="w-[15rem] mb-20 h-[2rem]" />
            <div className=" flex items-center">
              <Loader class="w-[10rem] mr-8 h-[2rem]" />
              <Loader class="w-[10rem] h-[2rem]" />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap mt-[2rem]">
        <Featured offset={offsetStart} limit={4} heading="Related Products" />
      </div>

      <div className={`${styles.Footer}  bottom-0 w-full`}>
        <Footer />
      </div>
    </>
  );
}

export default Description;
