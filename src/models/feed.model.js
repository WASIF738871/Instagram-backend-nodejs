import mongoose from 'mongoose';

// Define the schema for the feeds collection
const feedSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model for the 'feeds' collection using the schema
const Feed = mongoose.model('Feed', feedSchema);

export default Feed;
