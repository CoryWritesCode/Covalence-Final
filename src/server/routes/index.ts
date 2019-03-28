import * as express from 'express';
import authRouter from './auth';

const router = express.Router();

router.use('/auth', authRouter);

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

export default router;