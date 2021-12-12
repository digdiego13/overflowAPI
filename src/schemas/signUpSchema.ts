import Joi from 'joi';

const signUpSchema = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  class: Joi.string().min(5).max(200).required,
});

export default signUpSchema;