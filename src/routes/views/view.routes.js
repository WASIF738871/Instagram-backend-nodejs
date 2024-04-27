import express from 'express';

import {viewsControllers} from '../../controllers/index.js';

const router = express.Router();

router.get('/', viewsControllers.getOverview);

export default router;
