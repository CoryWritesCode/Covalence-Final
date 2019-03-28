import { Query } from '../index';

const one = async (id: number, token: string) => Query('SELECT * FROM Tokens WHERE id = ? AND token = ?;', [id, token]);

const insert = async (userid: number) => Query('INSERT INTO Tokens (id, userid) VALUES (?, ?)', [null, userid]);

const update = async (id: number, token: string) => Query('UPDATE Tokens SET token = ? WHERE id = ?;', [token, id]);

export default {
  one,
  insert,
  update
}