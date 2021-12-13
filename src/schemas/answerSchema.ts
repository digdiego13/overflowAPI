import Joi from 'joi';

const answerSchema = Joi.object().keys({
  answer: Joi.string().min(3).max(150).required(),
});

export default answerSchema;
