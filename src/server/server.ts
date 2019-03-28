import * as path from 'path';
import * as express from 'express';
import * as passport from 'passport';
import './middleware/bearerstrategy';
import './middleware/localstrategy';
import apiRouter from './routes';

const app = express();

let p = path.join(__dirname, '../public');
console.log(p);

app.use(express.static(p));
app.use(express.json);
app.use(passport.initialize());
app.use(apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
