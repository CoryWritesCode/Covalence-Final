import { Query } from '../index';

const all = async () => Query('SELECT * FROM Books;');

const one = async (id: number) => Query('SELECT * FROM Books WHERE id = ?;', [id]);

const insert = async (categoryid: number, title: string, author: string, price: number) => Query('INSERT INTO Books (categoryid, title, author, price) VALUES (?, ?, ?, ?);', [categoryid, title, author, price]);

const insertWithNewCategory = async (category: string, title: string, author: string, price: number) => Query('BEGIN; INSERT INTO Categories (name) VALUES (?); SELECT LAST_INSERT_ID() INTO @cat_id; INSERT INTO Books (categoryid, title, author, price) VALUES (@cat_id, ?, ?, ?); COMMIT;', [category, title, author, price]);

const del = async (id: number) => Query('DELETE FROM Books WHERE id = ?;', [id]);

const update = async (id: number, categoryId: number, title: string, author: string, price: number) => Query('UPDATE Books SET categoryId = ?, title = ?, author = ?, price = ? WHERE id = ?;', [categoryId, title, author, price, id]);

const updateWithNewCategory = async (id: number, category: string, title: string, author: string, price: number) => Query('BEGIN; INSERT INTO Categories (name) VALUES (?); SELECT LAST_INSERT_ID() INTO @cat_id; UPDATE Books SET categoryid = @cat_id, title = ?, author = ?, price = ? WHERE id = ?; COMMIT;', [category, title, author, price, id]);

export default {
  all,
  one,
  insert,
  del,
  update,
  insertWithNewCategory,
  updateWithNewCategory
}