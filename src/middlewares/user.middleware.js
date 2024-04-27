import httpStatus from 'http-status';
import sharp from 'sharp';
import { catchAsync, ApiError } from '../utils/index.js';

const protectPasswordToBeUpdated = catchAsync((req, res, next) => {
  // 1) Create Error if user posted password data
  if (req.body.password || req.body.confirmPassword) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'This route is not for password update. Please use /users/update-password',
    );
  }
  next();
});

const manageParamId = catchAsync((req, res, next) => {
  if (!req.params.id) req.params.id = req.user.id;
  next();
});

const getMe = catchAsync((req, res, next) => {
  req.params.id = req.user.id;
  next();
});

const resizePorfileImage = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`uploads/${req.file.filename}`);
  }
  next();
});

export default {
  protectPasswordToBeUpdated,
  manageParamId,
  getMe,
  resizePorfileImage
};
