import express from 'express';

import userRoutes from './user.routes.js';
import profileRoutes from './profile.routes.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/profiles',
    route: profileRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
