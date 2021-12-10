import Joi from 'joi';

const signUpSchema = Joi.object().keys({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(6).max(15),
  adress: Joi.string().min(5).max(200),
});

export default signUpSchema;
