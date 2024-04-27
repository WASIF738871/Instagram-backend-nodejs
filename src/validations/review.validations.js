import Joi from 'joi';

const createReview = {
  body: Joi.object().keys({
    review: Joi.string().required(),
    rating: Joi.number().min(1).max(5),
    tour: Joi.string(),
    user: Joi.string(),
  }),
};

const updateReview = {
  body: Joi.object().keys({
    review: Joi.string(),
    rating: Joi.number().min(1).max(5),
    tour: Joi.string(),
    user: Joi.string(),
  }),
};

export default { createReview, updateReview };
