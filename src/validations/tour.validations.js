import Joi from 'joi';

const createTour = {
  body: Joi.object().keys({
    name: Joi.string().required().min(10).max(40),
    duration: Joi.number().required(),
    maxGroupSize: Joi.number(),
    difficulty: Joi.string().valid('easy', 'medium','difficult'),
    ratingsAverage: Joi.number().min(1).max(5),
    ratingsQuantity: Joi.number(),
    price: Joi.number().required(),
    discountPrice: Joi.number(),
    summary: Joi.string(),
    description: Joi.string(),
    imageCover: Joi.string(),
    images: Joi.array(),
    startDates: Joi.array(),
    secretTour: Joi.boolean(),
    guides: Joi.array().items(Joi.string()),
  }),
};

const updateTour = {
  body: Joi.object().keys({
    name: Joi.string().min(10).max(40),
    duration: Joi.number(),
    maxGroupSize: Joi.number(),
    difficulty: Joi.string().valid('easy', 'medium','difficult'),
    ratingsAverage: Joi.number().min(1).max(5),
    ratingsQuantity: Joi.number(),
    price: Joi.number(),
    discountPrice: Joi.number(),
    summary: Joi.string(),
    description: Joi.string(),
    imageCover: Joi.string(),
    images: Joi.array(),
    startDates: Joi.array(),
    secretTour: Joi.boolean(),
    guides: Joi.array().items(Joi.string()),
  }),
};

export default { createTour, updateTour };
