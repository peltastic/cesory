import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useQuery } from "react-query";
import {
  setUserInfo,
  setInitialCartCount,
  setToken,
} from "../redux/reducers/user";
import { user } from "../api/requests/auth";
import Nav from "./Nav";
import { privateInstance } from "../api/requests/config";
import Head from "next/head";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  let token: string;

  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.userInfo);
  const tokenData = useSelector((state: RootState) => state.user.token);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { refetch } = useQuery("user", () => user(token), {
    enabled: false,
    onSuccess: (data) => {
      if (data) {
        const res = data.data;
        dispatch(
          setUserInfo({
            username: res.user_name,
            userId: res.user_id,
            email: res.email,
            userRole: res.user_role,
          })
        );
        dispatch(setInitialCartCount(res.cart_count));
      }
    },
  });
  useEffect(() => {
    if (userData.userRole === 5180) {
      setIsAdmin(true);
    }
  }, [userData.userRole]);
  useEffect(() => {
    const tokenRes = sessionStorage.getItem("token");
    if (tokenRes) {
      token = tokenRes;
    }
    if (token) {
      dispatch(setToken(token));
      refetch();
      privateInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }
  }, [tokenData]);
  return (
    <>
      <Head>
        <title>Tech Store</title>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Nav admin={isAdmin} />
      <div className="px-[1rem]">{children}</div>
    </>
  );
};

export default Layout;
