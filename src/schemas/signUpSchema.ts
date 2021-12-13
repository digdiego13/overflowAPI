import Joi from 'joi';

const signUpSchema = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  classroom: Joi.string().max(10).required(),
});

export default signUpSchema;
