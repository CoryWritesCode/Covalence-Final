import { Query } from '../index';

const oneById = async (id: number) => Query('SELECT * FROM Users WHERE id = ?;', [id]);

const insert = async (user: any) => Query('INSERT INTO Users SET ?;', [user]);

export default {
  oneById,
  insert
}