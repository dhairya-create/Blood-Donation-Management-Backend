const joi = require("joi");

// const email_regex =
//   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = (user) => {
  const createUserSchema = joi
    .object({
      userName: joi.string().required(),
      name: joi.string().required(),
      email:joi.string().email().required(),
      password: joi.string().required(),
      contactNumber: joi.number().required(),
      address:joi.string().required(),
    //   dob:joi.date().required(),
    //   email: joi.string().custom((val, helper) => {
    //     if (email_regex.test(val)) {
    //       return true;
    //     }
    //     return helper.message("Enter Valid Email ID");
    //   }),
      
    //   mobileNumber:joi.string().required(),
    //   dob:joi.string().required(),
    })
    .options({ abortEarly: true });
  return createUserSchema.validate(user);
};