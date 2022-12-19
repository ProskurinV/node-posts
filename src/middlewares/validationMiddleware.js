const Joi = require('joi');

module.exports = {
  addPostValidation: (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string().alphanum().min(3).max(30).required(),
      text: Joi.string().alphanum().min(10).max(300).required(),
    });
    const validationSchema = schema.validate(req.body);
    if (validationSchema.error) {
      return res.status(400).json({
        status: validationSchema.error.details,
      });
    }
    next();
  },
};
