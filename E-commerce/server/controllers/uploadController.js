import cloudinary from "../config/cloudinary.js";
import { AppError } from "../utils/AppError.js";
import { successResponse } from "../utils/response.js";

export const uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw new AppError("No files uploaded", 400);
    }

    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "shopora" },
            (error, result) => {
              if (error) reject(error);
              else
                resolve({
                  url: result.secure_url,
                  publicId: result.public_id,
                });
            }
          )
          .end(file.buffer);
      });
    });

    const images = await Promise.all(uploadPromises);

    return successResponse(res, "Images uploaded", { images });
  } catch (err) {
    next(err);
  }
};

export const deleteImage = async (req, res, next) => {
  try {
    const { publicId } = req.body;

    if (!publicId) throw new AppError("publicId required", 400);

    await cloudinary.uploader.destroy(publicId);

    return successResponse(res, "Image deleted");
  } catch (err) {
    next(err);
  }
};