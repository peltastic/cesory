import classes from "../styles/product.module.css";
import React from "react";

type Props = {};

function ProductLoader({}: Props) {
  return (
   
      <div className={classes.Loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>

    </div>
  );
}

export default ProductLoader;
