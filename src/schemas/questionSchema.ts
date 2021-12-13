import Joi from 'joi';

const questionSchema = Joi.object().keys({
  question: Joi.string().min(3).max(30).required(),
  student: Joi.string().max(20).required(),
  classroom: Joi.string().max(10).required(),
  tags: Joi.string().max(30).required(),
});

export default questionSchema;
