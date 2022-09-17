import React from "react";
import AdsImg from "../assets/watch.png";
import Button from "./Button";
import Image from "next/image";

type Props = {};

const Ads2 = (props: Props) => {
  return (
    <section className=" relative w-full mt-[15rem] mb-[5rem]">
      <div className=" py-[2rem] bp6:py-0 flex-wrap bp6:flex-nowrap rounded-3xl bg-[#03ab069f] flex items-center w-full bp6:h-[40rem] px-[3rem] xs:px-[5rem] bp6:px-[2rem] bp5:px-[5rem] bp3:px-[10rem] ">
        <div className="absolute w-[20rem] xs:w-[25rem] sm:w-[30rem] bp3:w-[40rem] right-0 bp6:left-[20%] -top-[10%] bp6:-top-[30%]">
          <Image src={AdsImg} />
        </div>
        <div className="text-white w-full bp6:w-auto py-[3rem] bp6:py-0  mr-auto">
          <p className="opacity-80 ml-2">20% off</p>
          <p className="font-bold text-[6rem] xs:text-[7rem] md:text-[8rem] bp5:text-[10rem] bp5:-mt-[2rem]">HAPPY</p>
          <p className="font-bold text-[6rem] xs:text-[7rem] md:text-[8rem] bp5:text-[10rem] -mt-[2rem] xs:-mt-[4rem] bp5:-mt-[6rem]">HOURS</p>
          <p className="opacity-80 xs:-mt-[2rem] ml-2">10 Jul - 15 Dec</p>
        </div>
        <div className="text-white w-full bp6:w-auto py-[3rem] bp6:py-0">
          <p>Cesory</p>
          <p className="text-[3rem] md:text-[5rem]">Summer Sale</p>
          <p>
            Company that's grown from 270 to 480 employees in <br /> the last 12
            monnths{" "}
          </p>
          <Button
            class=" text-primary px-[2rem] py-[1rem] my-[2rem] bg-white"
            content="Shop"
          />
        </div>
      </div>
    </section>
  );
};

export default Ads2;
