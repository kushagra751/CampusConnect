import express from 'express';
import {
  user_login,user_signup, user_logout,forget_user_pass, verify_otp, reset_password, get_profile, update_profile
}  from '../../controllers/authentication/user.controllers.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';

const router = express.Router();
router.get('/', (req, res) => {
  res.send('User base route is working');
});

router.post('/login', user_login);
router.post('/signup', user_signup);
router.post('/logout', user_logout);
router.post('/forgetpassword', forget_user_pass);
router.post('/verifyotp', verify_otp);
router.post('/resetpassword', reset_password);
router.get('/profile', authenticateToken, get_profile);
router.post('/profile/update', authenticateToken, update_profile);

export const UserRoute = router;
export default UserRoute;