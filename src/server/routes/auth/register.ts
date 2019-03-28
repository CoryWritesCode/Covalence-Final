import * as express from 'express';

import DB from '../../db';
import { HashPassword } from '../../utils/security/password';
import { CreateToken } from '../../utils/security/tokens';

const router = express.Router();

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    let user = req.body;
    console.log(user.body);
    user.password = HashPassword(user.password);
    console.log(user.password);
    let result: any = await DB.Users.insert(user);
    console.log(result);
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