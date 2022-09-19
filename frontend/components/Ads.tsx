import React from "react";
import AdsImg from "../assets/ads.png";
import Image from "next/image";
import Button from "./Button";

type Props = {};

const Ads = (props: Props) => {
  return (
    <section className=" relative w-full mt-[15rem] mb-[5rem]">
      <div className="rounded-3xl bg-primary flex flex-wrap py-[2rem] bp6:py-0 bp6:flex-nowrap items-center w-full bp6:h-[40rem] px-[3rem] xs:px-[5rem] bp3:px-[10rem] ">
        <div className="absolute w-[25rem] xs:w-[30rem] sm:w-[35rem] bp3:w-[40rem] right-0 bp6:left-[20%] -top-[10%] bp6:-top-[30%]">
          <Image src={AdsImg} />
        </div>
        <div className="text-white w-full bp6:w-auto py-[3rem] bp6:py-0 mr-auto">
          <p className="opacity-80 ml-2">20% off</p>
          <p className="font-bold text-[6rem] xs:text-[8rem] md:text-[10rem] bp5:-mt-[2rem]">FINE</p>
          <p className="font-bold text-[6rem] xs:text-[8rem] md:text-[10rem] -mt-[2rem] xs:-mt-[4rem] bp5:-mt-[4rem]">SMILE</p>
          <p className="opacity-80 xs:-mt-[2rem] ml-2">10 Jul - 15 Dec</p>
        </div>
        <div className="text-white w-[full] bp6:w-[30%] py-[3rem] bp6:py-0">
          <p>Cesory</p>
          <p className="text-[3rem] md:text-[5rem]">Summer Sale</p>
          <p>
            Company that's grown from 270 to 480 employees in <br /> the last 12
            monnths{" "}
          </p>
          <Button class=" text-primary px-[3.6rem] py-[1.2rem] my-[2rem] text-2xl font-bold bg-white" content="Shop" />
        </div>
      </div>
    </section>
  );
};

export default Ads;
