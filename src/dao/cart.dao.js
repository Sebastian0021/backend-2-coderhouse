import CartModel from "../dao/models/cart.model.js";
export default class CartDao {
  getCarts = async () => {
    try {
      const carts = await CartModel.find();
      return carts;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  getCartById = async (cid) => {
    try {
      const cart = await CartModel.findById(cid);
      return cart;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  createCart = async (cart) => {
    try {
      const newCart = await CartModel.create(cart);
      return newCart;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  saveCart = async (cart) => {
    try {
      await cart.save();
      return cart;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  getCartWithProducts = async (cid) => {
    try {
      const cart = await CartModel.findById(cid).populate("products.product");
      return cart;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
