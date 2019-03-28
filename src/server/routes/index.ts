import * as express from 'express';
import authRouter from './auth';
import apiRouter from './api';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/api', apiRouter);

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

export default router;