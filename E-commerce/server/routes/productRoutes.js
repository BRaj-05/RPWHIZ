// import productRouter from "express";
// import {
//   getProducts, getProduct, createProduct, updateProduct, deleteProduct,
// } from "../controllers/productController.js";
// import { protect, adminOnly, optionalAuth } from "../middleware/authMiddleware.js";
// import { upload } from "../middleware/uploadMiddleware.js";
// import { validate } from "../middleware/validate.js";
// import { productSchema, updateProductSchema } from "../validators/productValidator.js";
 
// const productRouter2 = productRouter();
 
// // Public routes
// productRouter2.get("/",    optionalAuth, getProducts);
// productRouter2.get("/:id", optionalAuth, getProduct);
 
// // Admin routes
// productRouter2.post("/",    protect, adminOnly, upload.array("images", 8), validate(productSchema),       createProduct);
// productRouter2.put("/:id",  protect, adminOnly, upload.array("images", 8), validate(updateProductSchema), updateProduct);
// productRouter2.delete("/:id", protect, adminOnly, deleteProduct);
 
// export default productRouter2;
 

import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getProducts);
router.get("/:id", getProduct);

// ADMIN
router.post("/", protect, adminOnly, upload.array("images", 8), createProduct);

router.put("/:id", protect, adminOnly, upload.array("images", 8), updateProduct);

router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;