import express from 'express';
import { profileControllers } from '../../controllers/index.js';
import { profileValidations } from '../../validations/index.js';
import { validate, authMiddleware, profileMiddleware, upload } from '../../middlewares/index.js';

const router = express.Router();


router.use(authMiddleware.protect);


router.get('/my-profile',authMiddleware.restrictTo('user'), profileControllers.retrieveProfile);
router.patch(
  '/update-my-profile',
  authMiddleware.restrictTo('user'),
  profileMiddleware.getMyProfile,
  validate(profileValidations.updateMyProfile),
  upload.single('coverImage'),
  profileMiddleware.resizeCoverImage,
  profileControllers.updateMyProfile,
);

router.use(authMiddleware.restrictTo('admin'));

router.route('/').get(profileControllers.getAllProfiles);
router
  .route('/:id')
  .get(profileControllers.retrieveProfile)

export default router;
