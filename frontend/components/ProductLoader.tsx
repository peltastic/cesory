import classes from "../styles/product.module.css";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

function ProductLoader() {
  const controls = useAnimation();
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: {
            delay,
            type: "spring",
            duration: 2,
            bounce: 0,
            repeat: Infinity,
          },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };
  useEffect(() => {
    controls.start("visible");
  }, [controls]);
  return (
    <div className={`w-[30%] ${classes.ProductLoader} mr-[4rem]`}>
      <motion.svg
        width="209"
        height="209"
        viewBox="0 0 309 309"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate={controls}
      >
        <motion.rect
          variants={draw}
          custom={0.5}
          x="154.535"
          y="3.36456"
          width="214"
          height="214"
          transform="rotate(44.9947 154.535 3.36456)"
          stroke="white"
          strokeWidth="4"
        />
        <motion.rect
          variants={draw}
          custom={0.5}
          x="155.408"
          y="14.7071"
          width="199"
          height="199"
          transform="rotate(44.9947 155.408 14.7071)"
          stroke="white"
          strokeOpacity="0.31"
        />
      </motion.svg>
    </div>
  );
}

export default ProductLoader;
