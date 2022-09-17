import classes from "../styles/body.module.css";
import { GiAirZigzag } from "react-icons/gi";
import { IoPhonePortraitOutline, IoGameController } from "react-icons/io5";
import {FaLaptop} from "react-icons/fa"
import Link from "next/link";
import Button from "./Button"

type Props = {};

function Body({}: Props) {
  return (
    <>
      <section className={`${classes.Section} w-full flex h-[60vh] text-white mb-[4rem]`}>
        <div
          className={` border-[2rem] border-black ${classes.Section1} w-[50%]`}
        ></div>
        <div className="w-[50%] flex flex-col items-center justify-center">
          <p className="text-2xl text-center w-[70%] mb-[1rem]">
            Get the best gaming devices with amazing speed, performance and
            durability at the best prices
          </p>
          <GiAirZigzag className="text-[10rem] mt-[1rem] mb-10" />
          <Link href={"/products"}>
            <a>
             <Button content="Check Product" class="px-6 py-4 rounded-full" type="link"  />
            </a>
          </Link>
        </div>
      </section>
      <section className={`${classes.Section} w-full flex h-[60vh] text-white mb-[4rem]`}>
        <div className="w-[50%] flex flex-col items-center justify-center">
          <p className="text-2xl text-center w-[70%] mb-[1rem]">
            We sell the best phones for your day to day activities at reasonable
            prices
          </p>
          <IoPhonePortraitOutline className="text-[10rem] mt-[1rem] mb-10" />
          <Link href={"/products"}>
            <a>
            <Button content="Check Product" class="px-6 py-4 rounded-full" type="link"  />
            </a>
          </Link>
        </div>
        <div className={`${classes.Section2} w-[50%]`}></div>
      </section>
      <section className={`${classes.Section} w-full flex h-[60vh] text-white mb-[4rem]`}>
        <div className={`${classes.Section3} w-[50%]`}></div>
        <div className="w-[50%] flex flex-col items-center justify-center">
          <p className="text-2xl text-center w-[70%] mb-[1rem]">
            We sell the best gaming pc in our store which can handle the various
            kind of games and can also be used for other graphic intensive
            purposes
          </p>
          <IoGameController className="text-[8rem] mt-[1rem] mb-10" />
          <Link href={"/products"}>
            <a>
            <Button content="Check Product" class="px-6 py-4 rounded-full" type="link"  />
            </a>
          </Link>
        </div>
      </section>
      <section className={`${classes.Section} w-full flex h-[60vh] text-white mb-[4rem]`}>
        <div className="w-[50%] flex flex-col items-center justify-center">
          <p className="text-2xl text-center w-[70%] mb-[1rem]">
            Best regular laptops which good performance and durablity for good prices
          </p>
          <FaLaptop className="text-[8rem] mt-[1rem] mb-10" />
          <Link href={"/products"}>
            <a>
            <Button content="Check Product" class="px-6 py-4 rounded-full" type="link"  />
            </a>
          </Link>
        </div>
        <div className={`${classes.Section4} w-[50%]`}></div>
      </section>
    </>
  );
}

export default Body;
