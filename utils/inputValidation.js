const Joi = require("Joi");

const loginValidation = Joi.object({
    username: Joi.string().min(3).max(255).required().messages({
        "string.min": "username or email must have at least 3 characters",
    }),
    password: Joi.string().min(6).max(30).required(),
}).options({ stripUnknown: true });

const registerValidation = Joi.object({
    username: Joi.string().min(3).max(255).alphanum().required().messages({
        "string.min": "name must have at least 3 characters",
    }),
    email: Joi.string()
        .email({
            tlds: {
                allow: false,
            },
        })
        .required(),
    password: Joi.string().min(6).max(30).required(),
}).options({ stripUnknown: true });

module.exports = {
    loginValidation,
    registerValidation
};