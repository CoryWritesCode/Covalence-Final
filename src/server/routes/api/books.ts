import * as express from 'express';
import DB from '../../db';
import { RequestHandler } from 'express-serve-static-core';

const router = express.Router();

const isAdmin: RequestHandler = (req, res, next) => {
  console.log(req.user)
  if (!req.user || req.user.role !== 'admin') {
    return res.sendStatus(410);
  }
  return next();
}

router.get('/:id?', async (req, res) => {
  if (req.params.id) {
    try {
      let [result] = await DB.Books.one(req.params.id);
      let [category] = await DB.Categories.oneById(result.categoryid)
      result['categoryname'] = category.name;
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

router.post('/new', async (req, res) => {
  let [category] = await DB.Categories.oneByName(req.body.category);
  console.log(category)
  if (category) {
    try {
      let result = await DB.Books.insert(category.id, req.body.title, req.body.author, req.body.price);
      res.json(result);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  } else {
    try {
      let [category] = await DB.Categories.insert(req.body.category);
      console.log('inside')
      console.log(category);
      let result = await DB.Books.insert(category.insertId, req.body.title, req.body.author, req.body.price);
      res.json(result);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let result = await DB.Books.del(req.params.id);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

router.put('/:id/edit', async (req, res) => {
  let [category] = await DB.Categories.oneByName(req.body.catergoryname);
  if (category) {
    try {
      let id = req.params.id;
      let catId = category.id;
      let title = req.body.title;
      let author = req.body.author;
      let price = req.body.price;
      let result = await DB.Books.update(id, catId, title, author, price);
      res.json(result);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  } else {
    let [category] = await DB.Categories.insert(req.body.catergoryname);
    if (category) {
      let obj = {
        categoryid: category.insertId,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price
      }
      try {
        let result = await DB.Books.insert(obj);
        res.json(result);
      } catch (e) {
        console.error(e);
        res.sendStatus(500);
      }
    }
  }
})

export default router;