import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import Button from "./Button";

function Footer() {
  return (
    <footer className="flex flex-wrap px-[4rem] sm:px-[1rem] bp3:px-[5rem] py-[5rem]">
      <div className="w-full xs:w-[40%] md:w-[20%] mb-[2rem] xs:mb-0 text-[1.5rem] sm:text-base">
        <h1 className="text-[#e23e3e] text-4xl mr-10">cesorys</h1>
        <p className="text-[#848484] py-[2rem]">
          They are many various <br /> passages of products available <br /> but
          majority have
        </p>
        <div className="flex">
          <AiOutlineInstagram className="mr-[1rem]" />
          <FaLinkedinIn className="mx-[1rem]" />
          <FaFacebookF className="mx-[1rem]" />
          <AiOutlineTwitter className="mx-[1rem]" />
        </div>
      </div>
      <div className="my-5 xs:my-0 text-[1.5rem] sm:text-base  w-full xs:w-[30%] mt-4 md:mt-0 sm:w-[20%] md:w-[20%] text-left md:text-center bp2:text-left">
        <h1 className="font-bold">Quick Links</h1>
        <ul className="pt-[2rem]">
          <li>
            <Link href="">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="">
              <a>Shop</a>
            </Link>
          </li>
          <li>
            <Link href="">
              <a>Contact</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="my-5 xs:my-0 w-full text-[1.5rem] sm:text-base xs:w-[30%] sm:w-[20%] mt-4 md:mt-0  text-left md:text-center bp2:text-left">
        <h1 className="">Contact</h1>
        <ul className="text-[#848484] pt-[2rem]">
          <li>
            <p>cesory@email.com</p>
          </li>
          <li>
            <p>+999 8182 128812</p>
          </li>
          <li>
            <p>+999 2222 22838</p>
          </li>
        </ul>
      </div>
      <div className="w-full xs:w-[70%] bp6:w-[60%] md:w-[35%] mt-[5rem] md:mt-0">
        <h1 className="font-bold text-[1.5rem] sm:text-base">Subscribe to Our Email</h1>
        <p className="text-[3rem] font-bold">For latest News & Updates</p>
        <div className="relative bg-gradient-to-br h-[4rem] mt-[3rem] rounded-full from-[#ffffff]  to-[#cacaca] w-full">
          <input type="text" className="w-full outline-none bg-transparent h-full px-[2rem]" placeholder="Enter Your Email" />
          <Button class="px-[2rem]  bg-primary h-[3rem]  absolute right-[.5rem] top-[50%] -translate-y-[50%]"  content="Subscribe" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
