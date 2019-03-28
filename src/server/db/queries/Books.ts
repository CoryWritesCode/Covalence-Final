import { Query } from '../index';

const all = async () => Query('SELECT * FROM Books;');

const insert = async (categoryId: number, title: string, author: string, price: number) => Query('INSERT INTO Books VALUES (?);', [categoryId, title, author, price]);

const del = async (id: number) => Query('DELETE FROM Books WHERE id = ?;', [id]);

const update = async (id: number, categoryId: number, title: string, author: string, price: number) => Query('UPDATE Books SET (categoryId, title, author, price) VALUES (?, ?, ?, ?) WHERE id = ?;', [categoryId, title, author, price, id]);

export default {
  all,
  insert,
  del,
  update
}