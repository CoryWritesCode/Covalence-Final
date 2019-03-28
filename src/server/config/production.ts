export default {
  mysql: {
    connectionLimit: process.env.CONN_LIMIT || 10,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_SCHEMA
  },
  auth: {
    secret: 'herewego'
  }
}