import * as express from 'express';
import DB from '../../db';

const router = express.Router();

router.get('/id:', async (req, res) => {
  try {
    let [user] = await DB.Users.oneById(req.params.id);
    res.json(user);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
})

export default router;