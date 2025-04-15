import { Router } from 'express';
import { AuthController } from './auth.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import {
  validateRequest,
  validateRequestCookies,
} from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { multerUpload } from '../../config/multer.config';

const router = Router();

router.post('/signup', multerUpload.single('image'), (req, res, next) => {
  req.body = JSON.parse(req.body.data);
  return AuthController.signUpUser(req, res, next);
});

router.post('/login', AuthController.loginUser);

router.post(
  '/change-password',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword,
);

router.post(
  '/generate-access-token-via-refresh-token',
  validateRequestCookies(AuthValidation.refreshTokenValidationSchema),
  AuthController.generateAccessTokeViaRefreshToken,
);

// router.post(
//   '/forget-password',
//   validateRequest(AuthValidation.forgetPasswordValidationSchema),
//   AuthController.forgetPassword,
// );

// router.post(
//   '/reset-password',
//   validateRequest(AuthValidation.resetPasswordValidationSchema),
//   AuthController.resetPassword,
// );

export const AuthRoutes = router;
