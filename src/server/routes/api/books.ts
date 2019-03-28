import * as express from 'express';
import DB from '../../db';
import { RequestHandler } from 'express-serve-static-core';

const router = express.Router();

const isAdmin: RequestHandler = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.sendStatus(410);
  }
  return next();
}

router.get('/:id?', async (req, res) => {
  if (req.params.id) {
    try {
      let result = await DB.Books.one(req.params.id);
      res.json(result);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  } else {
    try {
      let result = await DB.Books.all();
      res.json(result);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
});

router.post('/', isAdmin, async (req, res) => {
  try {
    let result = await DB.Books.insert(req.body);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

router.delete('/:id', isAdmin, async (req, res) => {
  try {
    let result = await DB.Books.del(req.params.id);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

router.put('/:id', isAdmin, async (req, res) => {
  try {

  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
})

export default router;