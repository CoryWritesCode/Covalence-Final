import { Query } from '../index';

const oneById = async (id: number) => Query('SELECT * FROM Users WHERE id = ?;', [id]);

const insert = async (email: string, password: string, name: string) => Query('INSERT INTO Users (email, password, name) VAULES (?, ?, ?);', [email, password, name]);

export default {
  oneById,
  insert
}