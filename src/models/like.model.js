import mongoose from 'mongoose';

// Define the schema for the likes collection
const likeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Create the model for the 'likes' collection using the schema
const Like = mongoose.model('Like', likeSchema);

export default Like;
