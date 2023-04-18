const Joi = require("@hapi/joi");

//Register Validation

const docRegisterValidation = (data) => {
    const schema = Joi.object({
        firstname: Joi.string().regex(/^[a-zA-Z0-9 ]{1,100}$/).required(),
        lastname: Joi.string().regex(/^[a-zA-Z0-9  ]{1,100}$/).required(),
        age: Joi.number().integer().min(0).max(130).required(),
        email1: Joi.string().required().email(),
        email: Joi.string().required().email(),
        // password: Joi.string().alphanum().min(9).max(30).required(),
        sex: Joi.string().regex(/^[a-zA-Z0-9  ]{1,100}$/).required(),
        address: Joi.string().regex(/^[a-zA-Z0-9  ]{1,100}$/).min(1).max(100).required(),
        number: Joi.string().regex(/^[a-zA-Z0-9  ]{1,100}$/).min(1).max(100).required(),
        qualification: Joi.string().regex(/^[a-zA-Z0-9  ]{1,100}$/).min(1).max(100).required(),
        specialization: Joi.string().regex(/^[a-zA-Z0-9  ]{1,100}$/).min(1).max(100).required(),
    });
    return schema.validate(data);
};

const recepRegisterValidation = (data) => {
    const schema = Joi.object({
        firstname: Joi.string().regex(/^[a-zA-Z0-9 ]{1,100}$/).required(),
        lastname: Joi.string().regex(/^[a-zA-Z0-9  ]{1,100}$/).required(),
        age: Joi.number().integer().min(0).max(130).required(),
        email1: Joi.string().required().email(),
        email: Joi.string().required().email(),
        // password: Joi.string().alphanum().min(9).max(30).required(),
        sex: Joi.string().regex(/^[a-zA-Z0-9  ]{1,100}$/).required(),
        address: Joi.string().regex(/^[a-zA-Z0-9  ]{1,100}$/).min(1).max(100).required(),
        number: Joi.string().regex(/^[a-zA-Z0-9  ]{1,100}$/).min(1).max(100).required(),
    });

    return schema.validate(data);


};

const patientRegisterValidation = (data) => {
    const schema = Joi.object({
        firstname: Joi.string().regex(/^[a-zA-Z0-9 ]{1,100}$/).min(1).max(100).required(),
        lastname: Joi.string().regex(/^[a-zA-Z0-9 ]{1,100}$/).min(1).max(100).required(),
        age: Joi.number().integer().min(0).max(130).required(),
        email: Joi.string().required().email(),
        sex: Joi.string().regex(/^[a-zA-Z0-9 ]{1,100}$/).required(),
        address: Joi.string().regex(/^[a-zA-Z0-9 ]{1,100}$/).min(1).max(100).required(),
        number: Joi.string().regex(/^[a-zA-Z0-9 ]{1,100}$/).min(1).max(100).required(),
        // ipd: Joi.boolean().required(),
        // opd: Joi.boolean().required(),

        // ipdDetails: Joi.when('ipd', {
        //     is: true,
        //     then: Joi.object({
        //         doctor: Joi.string().required(),
        //         admittedDate: Joi.date(),
        //         roomNo: Joi.string().required(),
        //         dischargedDate: Joi.date()
        //     }),
        //     otherwise: Joi.forbidden()
        // }),
        // opdDetails: Joi.when('opd', {
        //     is: true,
        //     then: Joi.object({
        //         appointmentDate: Joi.date().required(),
        //         doctor: Joi.string().required()
        //     }),
        //     otherwise: Joi.forbidden()
        // })
    });

    return schema.validate(data);


};
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
    })
    return schema.validate(data);
};

module.exports.docRegisterValidation = docRegisterValidation;
module.exports.recepRegisterValidation = recepRegisterValidation;
module.exports.patientRegisterValidation = patientRegisterValidation;
module.exports.loginValidation = loginValidation;