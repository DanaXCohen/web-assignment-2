import {Router} from 'express';
import {Auth_controller} from '../controllers/auth_controller';

import {isAuthorized} from '../middleware/auth';

const router = Router();

router.post('/register', Auth_controller.register);
router.post('/login', Auth_controller.login);
router.post('/logout', [isAuthorized, Auth_controller.logout]);
router.post('/refresh-token', Auth_controller.refreshToken);

export default router;
