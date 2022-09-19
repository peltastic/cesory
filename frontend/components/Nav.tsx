import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/router";
import classes from "../styles/nav.module.css";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setUserInfo, setInitialCartCount } from "../redux/reducers/user";
import Messages from "../components/Messages";
import NavMobile from "./NavMobile";
import Backdrop from "./Backdrop";

type Props = {
  admin: boolean;
};

function Nav(props: Props) {
  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.user.userInfo);
  const cartCount = useSelector((state: RootState) => state.user.cartCount);
  const router = useRouter();
  const [showUserOp, setShowUserOp] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);

  const logout = () => {
    sessionStorage.removeItem("token");
    dispatch(
      setUserInfo({
        username: "",
        userId: "",
        email: "",
        userRole: 0,
      })
    );
    dispatch(setInitialCartCount(0));
    router.push("/");
  };

  const cartHandler = () => {
    if (userData.userId) {
      router.push("/cart");
    } else {
      setShowMessage(!showMessage);
    }
  };
  return (
    <>
      {showMessage ? (
        <Messages className=" bg-[#e84949]" name="Login" link="/login" />
      ) : null}
      <div
        className={`${classes.NavMobileIcon}  z-[80]`}
        onClick={() => setShowNav(!showNav)}
      >
        <div className={`${showNav ? classes.Top : null}`}></div>
        <div className={`${showNav ? classes.Middle : null}`}></div>
        <div className={`${showNav ? classes.Below : null}`}></div>
      </div>
      <NavMobile
        logout={logout}
        show={showNav}
        isAdmin={props.admin}
        userId={!!userData.userId}
        clicked={() => setShowNav(!showNav)}
      />
      {showNav ? <Backdrop /> : null}
      <div
        className={`${classes.CartMobile} z-[50] fixed top-[4rem] right-[3rem] cursor-pointer`}
        onClick={cartHandler}
      >
        <AiOutlineShopping className={`  text-6xl   text-black`} />
        <div className="h-[1.5rem] w-[1.5rem] flex justify-center items-center absolute top-[-4px] right-[-4px] px-[.5px] py-[.5px] rounded-full">
          <p className=" text-xl text-black text-center">{cartCount || 0}</p>
        </div>
      </div>
      <nav
        className={`${classes.Nav} w-full  px-16 py-8  flex items-center text-black fixed top-0 left-0 z-20 bg-[#fffdfd]`}
      >
        <p className="text-[#e23e3e] text-4xl mr-10">cesorys</p>
        <ul className="flex text-[1.3rem] mt-[.5rem] mr-auto text-[#b8b8b8]">
          <li className="mr-[1rem]">
            <Link href={"/"}>
              <a
                className={`${router.pathname === "/" ? "text-black" : null}`}
              >
                Home
              </a>
            </Link>
          </li>

          <li className="mr-[1rem]">
            <Link href={"/products"}>
              <a
                className={`${router.pathname === "/products" ? "text-black" : null}`}
              >
                Shop
              </a>
            </Link>
          </li>
          <li className="mr-[1rem]">
            <p>Featured</p>
          </li>
          <li className="mr-[1rem]">About Us</li>
          <li className="mr-[1rem]">Contact</li>
        </ul>
        <div className="flex items-center"></div>
        {!userData.userId ? (
          <Link href={"/login"}>
            <a className="mr-[3rem] text-[1.2rem] text-black font-bold">
              LOGIN
            </a>
          </Link>
        ) : null}
        {userData.username ? (
          <div
            className="relative mr-[2rem]"
            onClick={() => setShowUserOp(!showUserOp)}
          >
            <div className="cursor-pointer px-4 py-2 flex items-center text-2xl  bg-[#a8a8a87e] rounded-full">
              <p className="mr-3">{userData.username}</p>
              <BiUserCircle />
              <IoIosArrowDown className="ml-4" />
            </div>
            <div
              className={`transition-all bg-[#544747] text-white absolute  ${
                showUserOp ? "max-h-[20rem] py-[1rem]" : "max-h-0"
              }   text-center text-[1.2rem] top-[100%] w-full `}
            >
              <ul className={`${showUserOp ? "block" : "hidden"}`}>
                <li>
                  {" "}
                  {props.admin && userData.userId ? (
                    <Link href={"/admin"}>
                      <a>
                        <button
                          className={` font-bold py-1 rounded-full `}
                        >
                          ADMIN
                        </button>
                      </a>
                    </Link>
                  ) : null}
                </li>
                <li>
                  <button className="font-bold py-1" onClick={logout}>
                    LOGOUT
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : null}

        <div
          className={`${classes.CartContainer} relative cursor-pointer`}
          onClick={cartHandler}
        >
          <AiOutlineShopping
            className={`${classes.Cart}  text-4xl z-50 text-black`}
          />
          <div className="h-[1.5rem] w-[1.5rem] flex justify-center items-center absolute top-[-7px] right-[-7px] px-[.5px] py-[.5px] rounded-full">
            <p className=" text-sm text-black text-center">{cartCount || 0}</p>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
