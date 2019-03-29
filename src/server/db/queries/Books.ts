import { Query } from '../index';

const all = async () => Query('SELECT * FROM Books;');

const one = async (id: number) => Query('SELECT * FROM Books WHERE id = ?;', [id]);

const insert = async (categoryid: number, title: string, author: string, price: number) => Query('INSERT INTO Books (categoryid, title, author, price) VALUES (?, ?, ?, ?);', [categoryid, title, author, price]);

const del = async (id: number) => Query('DELETE FROM Books WHERE id = ?;', [id]);

const update = async (id: number, categoryId: number, title: string, author: string, price: number) => Query('UPDATE Books SET (categoryId, title, author, price) VALUES (?, ?, ?, ?) WHERE id = ?;', [categoryId, title, author, price, id]);

export default {
  all,
  one,
  insert,
  del,
  update
}