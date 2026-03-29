import { productService } from "../services/index.js";
import { successResponse } from "../utils/response.js";
 
// GET /api/v1/products
export const getProducts = async (req, res, next) => {
  try {
    const result = await productService.list(req.query);
    return successResponse(res, "Products fetched", result);
  } catch (err) { next(err); }
};
 
// GET /api/v1/products/:id
export const getProduct = async (req, res, next) => {
  try {
    const product = await productService.getOne(req.params.id);
    return successResponse(res, "Product fetched", { product });
  } catch (err) { next(err); }
};
 
// POST /api/v1/products  (admin)
export const createProduct = async (req, res, next) => {
  try {
    // If images were uploaded via multer/cloudinary, they're in req.files
    const images = req.files?.map(f => f.path) || req.body.images || [];
    const product = await productService.create(
      { ...req.body, images, thumbnail: images[0] || "" },
      req.user.id
    );
    return successResponse(res, "Product created", { product }, 201);
  } catch (err) { next(err); }
};
 
// PUT /api/v1/products/:id  (admin)
export const updateProduct = async (req, res, next) => {
  try {
    const newImages = req.files?.map(f => f.path) || [];
    const data = { ...req.body };
    if (newImages.length) {
      data.images    = newImages;
      data.thumbnail = newImages[0];
    }
    const product = await productService.update(req.params.id, data);
    return successResponse(res, "Product updated", { product });
  } catch (err) { next(err); }
};
 
// DELETE /api/v1/products/:id  (admin)
export const deleteProduct = async (req, res, next) => {
  try {
    await productService.delete(req.params.id);
    return successResponse(res, "Product deleted");
  } catch (err) { next(err); }
};