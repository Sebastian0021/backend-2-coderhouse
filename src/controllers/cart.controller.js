// import CartModel from "../dao/models/cart.model.js";
import CartRepository from "../repositories/cart.repository.js";
import ProductRepository from "../repositories/product.repository.js";
import TicketRepository from "../repositories/ticket.repository.js";
import { v4 as uuidv4 } from "uuid";

const productService = new ProductRepository();
const ticketService = new TicketRepository();
const cartService = new CartRepository();

export const createCart = async (req, res) => {
  try {
    const newCart = await cartService.createCart({ products: [] });
    res.status(201).json({ status: "success", data: newCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getCarts = async (req, res) => {
  try {
    const carts = await cartService.getCarts();
    res.status(200).json({ status: "success", data: carts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
// La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.

export const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.getCartById(cid);
    if (!cart) {
      return res
        .status(404)
        .json({ status: "error", message: "Cart not found" });
    }

    const formattedProducts = cart.products.map((item) => ({
      quantity: item.quantity,
      _id: item._id,
    }));

    res.status(200).json({ status: "success", data: formattedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
export const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartService.getCartById(cid);

    if (!cart) {
      return res
        .status(404)
        .json({ status: "error", message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (product) => product._id.toString() !== pid
    );

    await cartService.saveCart(cart);

    res
      .status(200)
      .json({ status: "success", message: "Product deleted from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos.
export const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const products = req.body;
    console.log("products", products);

    if (!Array.isArray(products)) {
      return res
        .status(400)
        .json({ status: "error", message: "Products must be an array" });
    }

    const cart = await cartService.getCartById(cid);

    if (!cart) {
      return res
        .status(404)
        .json({ status: "error", message: "Cart not found" });
    }

    const formattedProducts = products.reduce((acc, product) => {
      const existingProduct = acc.find(
        (item) => item.product.toString() === product._id.toString()
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        acc.push({ product: product._id, quantity: 1 });
      }
      return acc;
    }, []);

    const productsToUpdate = formattedProducts.reduce((acc, product) => {
      const existingProduct = cart.products.find(
        (item) => item.product.toString() === product.product.toString()
      );
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        acc.push(product);
      }
      return acc;
    }, []);

    if (productsToUpdate.length > 0) {
      cart.products.push(...productsToUpdate);
    }

    await cartService.saveCart(cart);

    res.status(200).json({ status: "success", data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
export const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (!quantity) {
      return res
        .status(400)
        .json({ status: "error", message: "Quantity is required" });
    }

    if (typeof quantity !== "number" || quantity <= 0) {
      return res.status(400).json({
        status: "error",
        message: "Quantity must be a positive number",
      });
    }

    const cart = await cartService.getCartById(cid);

    if (!cart) {
      return res
        .status(404)
        .json({ status: "error", message: "Cart not found" });
    }

    if (!cart.products || cart.products.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found in cart" });
    }

    const productIndex = cart.products.findIndex(
      (product) => product._id.toString() === pid
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found in cart" });
    }

    cart.products[productIndex].quantity = quantity;

    await cart.save();

    res.status(200).json({ status: "success", data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// DELETE api/carts/:cid deberá eliminar todos los productos del carrito
export const deleteAllProductsFromCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await cartService.getCartById(cid);

    if (!cart) {
      return res
        .status(404)
        .json({ status: "error", message: "Cart not found" });
    }

    cart.products = [];

    await cart.save();

    res
      .status(200)
      .json({ status: "success", message: "All products deleted from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await cartService.getCartWithProducts(cid);

    if (!cart) {
      return res
        .status(404)
        .json({ status: "error", message: "Cart not found" });
    }

    const productsToPurchase = [];
    const productsNotPurchased = [];
    let totalAmount = 0;

    // Iteramos sobre los productos del carrito para verificar el stock
    for (const item of cart.products) {
      const product = item.product;
      const quantity = item.quantity;

      if (product.stock >= quantity) {
        // Si hay stock, lo restamos y agregamos el producto a la lista de compra
        product.stock -= quantity;
        await productService.updateProduct(product._id, product);
        productsToPurchase.push(item);
        totalAmount += product.price * quantity;
      } else {
        // Si no hay stock, lo agregamos a la lista de no comprados
        productsNotPurchased.push(item._id);
      }
    }

    // Si se compraron productos, generamos el ticket
    if (productsToPurchase.length > 0) {
      const ticket = await ticketService.createTicket({
        code: uuidv4(),
        amount: totalAmount,
        purchaser: req.user.email, // El email del usuario logueado
      });

      // Actualizamos el carrito para que contenga solo los productos no comprados
      cart.products = cart.products.filter((item) =>
        productsNotPurchased.includes(item._id)
      );
      await cartService.saveCart(cart);

      return res.status(201).json({
        status: "success",
        message: "Purchase completed successfully",
        ticket,
        productsNotPurchased,
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "No products could be purchased due to lack of stock",
        productsNotPurchased,
      });
    }
  } catch (error) {
    console.error("Error purchasing cart:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
