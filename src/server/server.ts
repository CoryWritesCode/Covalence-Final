import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import * as passport from 'passport';
import './middleware/bearerstrategy';
import './middleware/localstrategy';
import apiRouter from './routes';

const app = express();

let p = path.join(__dirname, '../public');
console.log(p);

app.use(cors());
app.use(express.json());
app.use(express.static(p));
app.use(passport.initialize());
app.use(apiRouter);

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
