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
      let result = await DB.Categories.oneById(req.params.id);
      res.json(result);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  } else {
    try {
      let result = await DB.Categories.all();
      res.json(result);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
});

router.post('/', isAdmin, async (req, res) => {
  try {
    let result = await DB.Categories.insert(req.body);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

router.delete('/:id', isAdmin, async (req, res) => {
  try {
    let result = await DB.Categories.del(req.params.id);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

router.put('/:id', isAdmin, async (req, res) => {
  try {
    let id = req.params.id;
    let name = req.params.name;
    let result = await DB.Categories.update(id, name);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
})

export default router;