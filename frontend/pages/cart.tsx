import Cart from "../components/Cart";
import { useQuery } from "react-query";
import { getCart, deleteCart } from "../api/requests/cart";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import classes from "../styles/cart.module.css";
import ProductLoader from "../components/ProductLoader";
import { BsCart3 } from "react-icons/bs";
import { setCheckout } from "../redux/reducers/cart";
import { splitNumber } from "../utils/functions";
import { useMutation } from "react-query";
import { decrementCartCount } from "../redux/reducers/user";
import { decrementCheckout } from "../redux/reducers/cart";

type Props = {};

function Carts({}: Props) {
  const dispatch = useDispatch();
  let token: any;
  const [cartData, setCartData] = useState<any[]>([]);
  const userId = useSelector((state: RootState) => state.user.userInfo.userId);
  const checkout = useSelector((state: RootState) => state.cart.checkout);
  const { refetch, isLoading } = useQuery(
    "cart",
    () => {
      if (!userId || !token) {
        return;
      }
      return getCart({ userId: userId });
    },
    {
      enabled: false,
      onSuccess: (data) => {
        const res = data?.data;
        if (res) {
          setCartData(res.data);
          const sum: number = checkoutSum(res?.data);
          dispatch(setCheckout(sum));
          return;
        }
      },
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    if (userId) {
      token = sessionStorage.getItem("token");
      refetch();
    }
  }, [userId]);

  const checkoutSum = (data: any[]): number => {
    let sum: number = 0;
    for (const el of data) {
      sum += el.total_price;
    }
    return sum;
  };
  const deleteMutation = useMutation(deleteCart, {
    onSuccess: () => {
      dispatch(decrementCartCount());
      refetch();
    },
  });
  const deleteCartHandler = async (
    id: string,
    cartId: string,
    amount: number
  ) => {
    deleteMutation.mutate({
      userId: id,
      cartId: cartId,
    });
    const index = cartData.findIndex((el) => el.cart_id === cartId);
    cartData.splice(index, 1);
    dispatch(decrementCheckout(amount));
  };

  return (
    <>
      <button
        disabled={!!checkout}
        className={`text-white text-2xl z-[50] rounded-full ${classes.Glow} bg-[#000] fixed px-10 py-6 right-6 bottom-7`}
      >
        Checkout {splitNumber(checkout)}
      </button>

      <div className={` mt-[10rem] w-[50%] mx-[5rem]`}>
        {cartData.length > 0 ? (
          <div className="flex flex-wrap justify-start w-full">
            {cartData.map((item, index) => {
              return (
                <Cart
                  key={index}
                  name={item?.product_name}
                  price={item?.price}
                  total_price={item?.total_price}
                  image={item?.product_image}
                  productId={item?.product_id}
                  count={item?.count}
                  cartId={item?.cart_id}
                  category={item?.category}
                  deleteCart={deleteCartHandler}
                />
              );
            })}
          </div>
        ) : (
          <>
            {isLoading ? (
              <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                <ProductLoader />
                <p className="text-black glow text-center -ml-[3.5rem] mt-7 text-xl">
                  Loading...
                </p>
              </div>
            ) : (
              <div className="text-black fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                <BsCart3 className="text-[30rem]" />
                <p className="text-center text-2xl mt-10">No Item in Cart</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Carts;
