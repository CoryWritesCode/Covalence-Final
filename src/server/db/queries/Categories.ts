import { Query } from '../index';

const all = async () => Query('SELECT * FROM Categories;');

const oneById = async (id: number) => Query('SELECT * FROM Categories WHERE id = ?;', [id]);

const oneByName = async (name: string) => Query('SELECT * FROM Categories WHERE name = ?;', [name]);

const insert = async (name: string) => Query('INSERT INTO Categories (name) VALUES (?);', [name]);

const del = async (id: number) => Query('DELETE FROM Categories WHERE id = ?;', [id]);

const update = async (id: number, name: string) => Query('UPDATE Categories SET name = ? WHERE id = ?;', [name, id]);

export default {
  all,
  oneById,
  oneByName,
  insert,
  del,
  update
}