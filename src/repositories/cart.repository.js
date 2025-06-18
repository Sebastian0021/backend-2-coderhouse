import CartDao from "../dao/cart.dao.js";
export default class CartRepository {
  constructor() {
    this.dao = new CartDao();
  }

  getCartById = async (cid) => {
    const cart = await this.dao.getCartById(cid);
    return cart;
  };

  getCarts = async () => {
    const carts = await this.dao.getCarts();
    return carts;
  };

  createCart = async (cart) => {
    const newCart = await this.dao.createCart(cart);
    return newCart;
  };

  saveCart = async (cart) => {
    const savedCart = await this.dao.saveCart(cart);
    return savedCart;
  };
}
