import * as express from 'express';

import DB from '../../db';
import { HashPassword } from '../../utils/security/password';
import { CreateToken } from '../../utils/security/tokens';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    let user = req.body;
    user.password = HashPassword(user.password);
    let result: any = await DB.Users.insert(user);
    let token: any = await CreateToken({ userid: result.insertId });
    res.json({
      token,
      role: result.role,
      userid: result.id
    })
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
})

export default router;