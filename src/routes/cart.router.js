// No logro corregir los errores del tipo: ValidatorError: Path `product` is required.

import { Router } from "express";
import {
  createCart,
  deleteAllProductsFromCart,
  deleteProductFromCart,
  getCartById,
  getCarts,
  updateCart,
  updateProductQuantity,
  purchaseCart,
} from "../controllers/cart.controller.js";
import { passportCall } from "../utils/passportCall.js";

const router = Router();

router.post("/", passportCall("jwt"), createCart);

router.get("/", passportCall("jwt"), getCarts);

// La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.

router.get("/:cid", passportCall("jwt"), getCartById);

// DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
router.delete(
  "/:cid/products/:pid",
  passportCall("jwt"),
  deleteProductFromCart
);

// PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos.
router.put("/:cid", passportCall("jwt"), updateCart);

// PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put("/:cid/products/:pid", passportCall("jwt"), updateProductQuantity);

// DELETE api/carts/:cid deberá eliminar todos los productos del carrito
router.delete("/:cid", passportCall("jwt"), deleteAllProductsFromCart);

router.post("/:cid/purchase", passportCall("jwt"), purchaseCart);

export default router;
