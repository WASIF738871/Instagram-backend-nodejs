import Joi from 'joi';

const updateMyProfile = {
  body: Joi.object().keys({
    coverImage: Joi.string(),
    bio: Joi.string(),
  }),
};

export default { updateMyProfile };
