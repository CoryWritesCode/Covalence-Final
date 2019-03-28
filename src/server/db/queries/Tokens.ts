import { Query } from '../index';

const oneById = async (id: number) => Query('SELECT * FROM Tokens WHERE email = "?" LIMIT 1;', [id]);

const insert = async (userid: number) => Query('INSERT INTO Tokens (id, userid) VALUES (?, ?)', [null, userid]);

const update = async (id: number, token: string) => Query('UPDATE Tokens SET token = ? WHERE id = ?;', [token, id]);

export default {
  oneById,
  insert,
  update
}