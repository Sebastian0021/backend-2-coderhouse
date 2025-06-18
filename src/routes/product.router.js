import { Router } from "express";
import { upload } from "../config/multer.config.js";
import { passportCall, authorization } from "../utils/passportCall.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

// La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior

router.get("/", passportCall("jwt"), authorization("admin"), getProducts);

// La ruta GET /:pid deberá traer sólo el producto con el id proporcionado

router.get(
  "/:pid",
  passportCall("jwt"),
  authorization("admin"),
  getProductById
);

// La ruta raíz POST / deberá agregar un nuevo producto

router.post(
  "/",
  passportCall("jwt"),
  authorization("admin"),
  upload.array("thumbnails"),
  createProduct
);

// La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.

router.put(
  "/:pid",
  passportCall("jwt"),
  authorization("admin"),
  upload.array("thumbnails"),
  updateProduct
);
// La ruta DELETE /:pid deberá eliminar el producto con el id proporcionado.

router.delete(
  "/:pid",
  passportCall("jwt"),
  authorization("admin"),
  deleteProduct
);

export default router;
