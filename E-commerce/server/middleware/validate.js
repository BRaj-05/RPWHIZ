// middleware/validate.js
export const validate = (schema) => (req, res, next) => {
  const data = {
    body: req.body,
    params: req.params,
    query: req.query,
  };

  const { error } = schema.validate(data);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};