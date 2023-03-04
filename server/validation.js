const Joi = require("@hapi/joi");

//Register Validation

const registerValidation = (data) => {
    const schema = Joi.object({
        firstname: Joi.string().alphanum().min(1).max(100).required(),
        lastname: Joi.string().alphanum().min(1).max(100).required(),
        age: Joi.number().integer().min(0).max(130).required(),
        email: Joi.string().required().email(),
        password: Joi.string().alphanum().min(9).max(30).required(),
    });

    return schema.validate(data);

};
const loginValidation = (data) => {
    const schema = Joi.object({

        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;