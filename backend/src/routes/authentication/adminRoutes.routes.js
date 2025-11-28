import express from 'express';
import {
  admin_signupRoute,
  admin_logoutRoute, 
  admin_loginRoute} 
from '../../controllers/authentication/admin.controllers.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('admin base route is working');
});

router.post('/login',admin_loginRoute);
router.post('/signup', admin_signupRoute);
router.post('/logout', admin_logoutRoute);


export const adminRoutes = router;
export default adminRoutes;