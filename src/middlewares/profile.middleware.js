import sharp from 'sharp';
import { catchAsync } from '../utils/index.js';
import { profileServices } from '../services/index.js';

const getMyProfile = catchAsync(async (req, res, next) => {
  const profile = await profileServices.findProfile({ user: req.user.id }, 'Profile not found!');
  req.params.id = profile.id;
  next();
});

const resizeCoverImage = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.coverImage = `cover-${req.user.id}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`uploads/${req.body.coverImage}`);
  }
  next();
});

export default {
  getMyProfile,
  resizeCoverImage,
};
