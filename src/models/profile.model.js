import mongoose from 'mongoose';

import { paginate, docList, toJSON } from './plugins/index.js';
// Define the schema for the profiles collection
const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  coverImage: {
    type: String,
    default: 'default_cover_image.jpg',
  },
  bio: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// add plugin that converts mongoose to json
profileSchema.plugin(toJSON);
profileSchema.plugin(paginate);
profileSchema.plugin(docList);

// Add middleware to the schema for populating data
profileSchema.pre(/^findOne/, function (next) {
  this.populate({
    path: 'user',
    select: '-_id firstName lastName email',
  });
  next();
});

// Create the model for the 'profiles' collection using the schema
const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
