import type { NextPage } from "next";
import { useMutation } from "react-query";
import { signUp, login } from "../api/requests/auth";
import { signinReq, signupReq } from "../api/types/auth";
import { useState } from "react";
import { useRouter } from "next/router";
import { setToken } from "../redux/reducers/user";
import { useDispatch } from "react-redux";
import Input from "../components/Input";
import Button from "../components/Button";

type Props = {};

const Login: NextPage = ({}: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [signupState, setSignupState] = useState<signupReq>({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signinState, setSigninState] = useState<signinReq>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const signupMutation = useMutation((body: signupReq) => signUp(body), {
    onSuccess: () => {
      setIsLogin(true);
      setSignupState({ ...signupState, email: "", password: "", name: "" });
    },
    onError: (error) => {
      const message: any = error;
      setErrorMessage(message.response.data.error);
    },
  });
  const { isLoading, mutate } = useMutation((body: signinReq) => login(body), {
    onSuccess: (data) => {
      const res: any = data;
      sessionStorage.setItem("token", res.data.accessToken);
      dispatch(setToken(res.data.accessToken));
      setSigninState({ ...signinState, email: "", password: "" });
      router.back();
    },
    onError: (error) => {
      const message: any = error;
      setErrorMessage(message.response.data.error);
    },
  });

  const onChange = (e: any, type: string): void => {
    setErrorMessage("");
    if (isLogin) {
      setSigninState({ ...signinState, [type]: e.target.value });
    } else {
      setSignupState({ ...signupState, [type]: e.target.value });
    }
  };

  const onSubmit = (e: any): void => {
    e.preventDefault();
    if (isLogin) {
      if (!signinState.email || !signinState.password) {
        setErrorMessage("Enter Empty Fields");
      } else {
        mutate(signinState);
      }
    } else {
      if (!signupState.email || !signupMutation) {
        setErrorMessage("Enter Empty Fields");
      } else {
        signupMutation.mutate(signupState);
      }
    }
  };

  let content;
  if (isLogin) {
    content = (
      <>
        <Input
          type="email"
          placeholder="Email"
          changed={(e) => onChange(e, "email")}
          value={signinState.email}
          class="w-[90%] m-auto   mb-8 "
          clicked={() => {
            return;
          }}
          show={""}
          section=""
        />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          changed={(e) => onChange(e, "password")}
          value={signinState.password}
          class="w-[90%] m-auto   mb-8 "
          clicked={() => setShowPassword(!showPassword)}
          show={showPassword}
          section=""
        />
      </>
    );
  } else {
    content = (
      <>
        <Input
          type="text"
          placeholder="Username"
          changed={(e) => onChange(e, "name")}
          value={signupState.name}
          class="w-[90%] m-auto  mb-8 "
          clicked={() => {
            return;
          }}
          show={""}
          section=""
        />
        <Input
          type="email"
          placeholder="Email"
          changed={(e) => onChange(e, "email")}
          value={signupState.email}
          class="w-[90%] m-auto   mb-8 "
          clicked={() => {
            return;
          }}
          show={""}
          section=""
        />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          changed={(e) => onChange(e, "password")}
          value={signupState.password}
          class="w-[90%] m-auto   mb-8 "
          clicked={() => setShowPassword(!showPassword)}
          show={showPassword}
          section=""
        />
      </>
    );
  }

  const activeStyle: string = ` ${
    isLogin ? "border-primary" : "border-[#03ab069f]"
  }  border-4 border z-10`;
  let loginContent = "Login";
  if (!isLogin) {
    loginContent = "Sign Up";
  }
  if (isLoading) {
    loginContent = "Loggin In...";
  }
  if (signupMutation.isLoading) {
    loginContent = "Signing Up...";
  }
  return (
    <div className=" mt-[15rem]  flex justify-center text-white ">
      <div className={` relative h-[50rem] w-[100%] bp6:w-[80%] bp3:w-[50%] px-8 my-auto`}>
        <div className="  absolute top-0 left-[50%] -translate-x-[50%] flex justify-center ">
          <button
            className={` text-black text-xl sm:text-base px-6 py-3${
              isLogin ? activeStyle : null
            }`}
            onClick={() => setIsLogin(true)}
          >
            LOGIN
          </button>
          <button
            className={` text-black text-2xl sm:text-base px-6 py-3 ${
              isLogin ? null : activeStyle
            }`}
            onClick={() => setIsLogin(false)}
          >
            SIGN UP
          </button>
        </div>
        <div className=" mt-[7rem] bp6:mt-[5rem] border px-6 py-11">
          <div className="text-center text-black text-4xl mb-[6rem]">
            {isLogin ? (
              <h1 className="">Login Into you Account</h1>
            ) : (
              <h1>Create a New Account</h1>
            )}
          </div>
          <div className="text-white">
            <form onSubmit={onSubmit}>
              {content}
              <Button
                content={loginContent}
                class={`${
                  isLogin ? "bg-primary" : "bg-[#03ab069f]"
                } flex justify-center text-white text-3xl mx-auto px-12 py-5 w-[90%] rounded-xl`}
              />
            </form>
          </div>
          {errorMessage ? (
            <p className="text-center text-red-600 text-xl mt-6">
              {errorMessage}!
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Login;
