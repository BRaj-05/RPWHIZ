import Product from "../models/Product.js";
import { AppError } from "../utils/AppError.js";

export const productService = {
  async list(params = {}) {
    let {
      page = 1,
      limit = 12,
      category,
      brand,
      minPrice,
      maxPrice,
      rating,
      search,
      sort = "createdAt",
      order = "desc",
      featured,
    } = params;

    page = Math.max(1, Number(page));
    limit = Math.min(50, Number(limit)); // 🔥 limit cap

    const query = { isActive: true, isDeleted: false };

    if (category) query.category = category;
    if (brand) query.brand = new RegExp(brand, "i");
    if (featured) query.isFeatured = true;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (rating) query.rating = { $gte: Number(rating) };

    if (search) {
      query.$text = { $search: search };
    }

    const sortObj = { [sort]: order === "asc" ? 1 : -1 };
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(query)
        .select("-__v -costPrice")
        .populate("category", "name slug")
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .lean(),

      Product.countDocuments(query),
    ]);

    return {
      products,
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
    };
  },

  async getOne(identifier) {
    const query = /^[0-9a-fA-F]{24}$/.test(identifier)
      ? { _id: identifier }
      : { slug: identifier };

    const product = await Product.findOne({
      ...query,
      isDeleted: false,
    })
      .populate("category", "name slug")
      .populate("createdBy", "name email")
      .lean();

    if (!product) throw new AppError("Product not found", 404);

    return product;
  },

  async create(data, adminId) {
    if (!data.name || !data.price) {
      throw new AppError("Name and price required", 400);
    }

    return await Product.create({
      ...data,
      createdBy: adminId,
    });
  },

  async update(productId, data) {
    const product = await Product.findByIdAndUpdate(
      productId,
      { $set: data },
      { new: true, runValidators: true }
    ).lean();

    if (!product) throw new AppError("Product not found", 404);

    return product;
  },

  async delete(productId) {
    const product = await Product.findByIdAndUpdate(productId, {
      isDeleted: true,
      isActive: false,
    });

    if (!product) throw new AppError("Product not found", 404);
  },

  async decrementStock(productId, quantity) {
    const product = await Product.findById(productId);

    if (!product) throw new AppError("Product not found", 404);

    if (quantity > 0 && product.stock < quantity) {
      throw new AppError(`Insufficient stock for ${product.name}`, 400);
    }

    product.stock -= quantity;
    await product.save();

    return product;
  },
};