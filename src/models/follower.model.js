import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';

// Define the schema for the followers collection
const followerSchema = new mongoose.Schema({
  followingUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  followerUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add plugin that converts mongoose to JSON
followerSchema.plugin(toJSON);

// Create the model for the 'followers' collection using the schema
const Follower = mongoose.model('Follower', followerSchema);

export default Follower;
