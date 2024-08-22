import express from 'express';

const router = express.Router();

router.post('/create-user', UserControllers.creatUser);

export const UserRoutes = router;