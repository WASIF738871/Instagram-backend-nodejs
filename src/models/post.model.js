import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';

// Define the schema for the posts collection
const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  images: {
    type: [String], // Assuming the images are stored as URLs
    required: true,
  },
  captions: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add plugin that converts mongoose to JSON
postSchema.plugin(toJSON);

// Create the model for the 'posts' collection using the schema
const Post = mongoose.model('Post', postSchema);

export default Post;
