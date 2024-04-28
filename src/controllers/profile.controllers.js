import factory from './handlerFactory.js';
import { Profile } from '../models/index.js';

const getAllProfiles = factory.getAll(Profile);
const retrieveProfile = factory.getOne(Profile);
const updateMyProfile = factory.updateOne(Profile, 'coverImage', 'bio');

export default {
  getAllProfiles,
  retrieveProfile,
  updateMyProfile,
};
