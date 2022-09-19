import Button from "./Button";
import HeroImg from "../assets/header.png";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className=" h-[90vh] mt-[1rem] md:mt-[5rem] rounded-3xl bg-gradient-to-br from-[#cacaca] to-[#ebebeb]">
      <div className="w-full px-[4rem] bp6:px-[8rem] bp2:px-[15rem]  center -mt-[3rem] md:mt-[3rem]">
        <h2 className="mb-6 font-bold  text-2xl md:text-[1.2rem] bp1:text-2xl  text-primary">
          GET
        </h2>
        <h2 className="font-bold text-[3rem] bp1:text-6xl">YOUR TECH</h2>
        <h1 className=" text-[5rem] md:text-[8rem] bp5:text-[10rem] bp3:text-[12rem] bp1:text-[15rem] xl:text-[17rem] text-white font-bold bp6:-mt-[1rem] bg5:-mt-[3rem]">
          ACCESORIES
        </h1>

        <div className="w-[25rem] bg5:w-[30rem] bp1:w-[45rem]  bp5:rotate-[25deg] absolute -top-[2rem] bp6:top-0 right-[0%] bp5:left-[40%] ">
          <Image src={HeroImg} alt="hero" />
        </div>
        <div className=" mt-[7rem] bg5:mt-[5rem] flex flex-wrap items-center">
          <Link href={"/products"}>
            <a className="mr-auto">
              <Button
                class="text-white bg-primary px-[2.4rem] sm:px-[3.6rem] bp2:px-[5.4rem]  py-[.8rem] sm:py-[1.2rem] bp2:py-[1.8rem] text-3xl"
                content="Shop Now"
              />
            </a>
          </Link>
          <p className="text-[#707070] w-full sm:w-auto text-xl text-left sm:text-right mt-[3rem] sm:mt-0">
            Buy Tech accessories for your devices,
            <br />
            like headphones, chargers, airpods
            <br className="block bp5:hidden" />
            and others at good proices{" "}
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
