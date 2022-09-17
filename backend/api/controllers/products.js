const DB = require("../../db");
const { Op } = require("sequelize");

const { v4 } = require("uuid");
const { uploadImage } = require("../utils/cloudinary");

const add_product = async (req, res) => {
  const { name, price, desc, category, productBrand, productImageFileUrl } =
    req.body;
  const id = v4();
  try {
    const url = await uploadImage(productImageFileUrl);
    await DB.Product.create({
      name: name,
      price: price,
      desc: desc,
      category: category,
      product_id: id,
      product_image: url,
      product_brand: productBrand,
    });
    return res.status(200).send({
      message: "uploaded",
    });
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: "could Not send",
      err: e,
    });
  }
};

const get_product = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.sendStatus(400);
  }

  const products = await DB.Product.findAll({
    where: {
      product_id: id,
    },
  });
  return res.status(200).json({ data: products });
};
const get_products = async (req, res) => {
  const category = req.query.category || "";
  const limit = req.query.limit || null;
  const offset = req.query.offset || null;
  let products;
  if (category) {
    products = await executeSpecificQuery(category);
  } else {
    products = await DB.Product.findAll({ offset: offset, limit: limit });
  }
  return res.status(200).json({ data: products });
};

//testing now
const delete_product = async (req, res) => {
  const id = req.parmas.id;
  await DB.Product({
    where: {
      id: id,
    },
  });
  return res.json({ message: success });
};

//funcs
async function executeSpecificQuery(category) {
  // const logic = category && type ? "and" : "or";
  const products = await DB.Product.findAll({
    where: {
      category: category,
    },
  });
  return products;
}
module.exports = { add_product, get_products, get_product, delete_product };
