import { Query } from '../index';

const all = async () => Query('SELECT * FROM Categories;');

const one = async (id: number) => Query('SELECT * FROM Categories WHERE id = ?;', [id]);

const insert = async (name: string) => Query('INSTER INTO Categories VALUES (?);', [name]);

const update = async (id: number, name: string) => Query('UPDATE Categories SET name = ? WHERE id = ?;', [name, id]);

export default {
  all,
  one,
  insert,
  update
}