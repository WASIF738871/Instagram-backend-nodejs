import mongoose from 'mongoose';

import paginate from './plugins/paginate.plugin.js';
import toJSON from './plugins/toJSON.plugin.js';
import docList from './plugins/docList.plugin.js';

import { Tour } from './index.js';

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'A review can not be empty'],
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'A review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewSchema.plugin(paginate);
reviewSchema.plugin(toJSON);
reviewSchema.plugin(docList);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.statics.ratingStatistics = async function (tour) {
  const statistics = await this.aggregate([
    {
      $match: { tour },
    },
    {
      $group: {
        _id: '$tour',
        ratingsQuantity: { $sum: 1 },
        ratingsAverage: { $avg: '$rating' },
      },
    },
  ]);
  return statistics;
};

reviewSchema.post('save', async function (doc, next) {
  const statics = await this.constructor.ratingStatistics(doc.tour);
  delete statics[0]._id;
  await Tour.findByIdAndUpdate({ _id: doc.tour }, statics[0]);

  next();
});

//findByIdAndUpdate
//findByIdAndDelete

// At the same time this middleware is not working why
reviewSchema.post(/^findOneAnd/, async function (doc, next) {
  // this.findOne()   does not work here, query has already executed.
  const statics = await doc.constructor.ratingStatistics(doc.tour);
  if (statics[0]) {
    delete statics[0]._id;
    await Tour.findByIdAndUpdate({ _id: doc.tour }, statics[0]);
  } else {
    await Tour.findByIdAndUpdate({ _id: doc.tour }, { ratingsAverage: 4.5, ratingsQuantity: 0 });
  }
  next();
});

reviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'user',
  //   select: '-_id firstName email',
  // }).populate({
  //   path: 'tour',
  //   select: '-_id name',
  // });
  this.populate({
    path: 'user',
    select: '-_id firstName email',
  });

  next();
});

reviewSchema.statics.isUserReviewedOnThisTour = async function (tour, user) {
  const review = await this.findOne({ tour, user });
  return !!review;
};

const Review = mongoose.model('Review', reviewSchema);

export default Review;
