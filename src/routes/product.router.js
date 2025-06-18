import { Router } from "express";
import { upload } from "../config/multer.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

// La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior

router.get("/", getProducts);

// La ruta GET /:pid deberá traer sólo el producto con el id proporcionado

router.get("/:pid", getProductById);

// La ruta raíz POST / deberá agregar un nuevo producto

router.post("/", upload.array("thumbnails"), createProduct);

// La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.

router.put("/:pid", upload.array("thumbnails"), updateProduct);
// La ruta DELETE /:pid deberá eliminar el producto con el id proporcionado.

router.delete("/:pid", deleteProduct);

export default router;
