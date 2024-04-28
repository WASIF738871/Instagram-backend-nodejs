import httpStatus from 'http-status';
import { Profile } from '../models/index.js';
import ApiError from '../utils/ApiError.utils.js';
import { customValidations } from '../validations/index.js';

const getAllProfiles = async (filter, options) => {
  return await Profile.docList(filter, options);
};

const retrieveProfile = async (id) => {
  if (!customValidations.isValidObjectId(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Profile ID!');
  }
  const profile = await Profile.findById(id);
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found!');
  }
  return profile;
};

const findProfile = async (filter, message) => {
  const profile = await Profile.findOne(filter);
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, message);
  }
  return profile;
};

const updateProfile = async (id, body) => {
  await retrieveProfile(id);
  return await Profile.findByIdAndUpdate(id, body, {
    new: true,
    // runValidators: true,
  });
};

const deleteProfile = async (id) => {
  await retrieveProfile(id);
  return await Profile.deleteOne({ _id: id });
};

const deleteManyProfile = async () => {
  return await Profile.deleteMany();
};

export default {
  getAllProfiles,
  retrieveProfile,
  findProfile,
  updateProfile,
  deleteProfile,
  deleteManyProfile,
};
