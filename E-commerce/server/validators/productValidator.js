import Joi from "joi";
 
export const productSchema = Joi.object({
  name:           Joi.string().min(2).max(200).required(),
  description:    Joi.string().max(2000).optional(),
  brand:          Joi.string().max(100).optional(),
  sku:            Joi.string().max(100).optional(),
  price:          Joi.number().positive().required(),
  compareAtPrice: Joi.number().positive().allow(null).optional(),
  category:       Joi.string().hex().length(24).required(),
  stock:          Joi.number().integer().min(0).default(0),
  isFeatured:     Joi.boolean().optional(),
  tags:           Joi.array().items(Joi.string()).optional(),
  images:         Joi.array().items(Joi.string().uri()).optional(),
});
 
export const updateProductSchema = Joi.object({
  name:           Joi.string().min(2).max(200),
  description:    Joi.string().max(2000),
  brand:          Joi.string().max(100),
  sku:            Joi.string().max(100),
  price:          Joi.number().positive(),
  compareAtPrice: Joi.number().positive().allow(null),
  category:       Joi.string().hex().length(24),
  stock:          Joi.number().integer().min(0),
  isFeatured:     Joi.boolean(),
  isActive:       Joi.boolean(),
  tags:           Joi.array().items(Joi.string()),
});
 
export const reviewSchema = Joi.object({
  rating:  Joi.number().integer().min(1).max(5).required(),
  title:   Joi.string().max(100).optional(),
  comment: Joi.string().min(5).max(1000).required(),
});
 
export const orderSchema = Joi.object({
  paymentMethod: Joi.string().valid("cod", "razorpay", "stripe").required(),
  couponCode:    Joi.string().optional().allow(""),
  shippingAddress: Joi.object({
    name:    Joi.string().required(),
    phone:   Joi.string().required(),
    line1:   Joi.string().required(),
    city:    Joi.string().required(),
    state:   Joi.string().required(),
    pincode: Joi.string().required(),
  }).required(),
});
 