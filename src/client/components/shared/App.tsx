import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from '../public/Home';
import Create from '../public/Create';
import Categories from '../public/Categories';
import Books from '../public/Books';
import Login from '../admin/Login';
import Admin from '../admin/Admin';

export default function App () {
    return (
        <React.Fragment>
            <Router>
                <>
                    <Link to='/'>Home</Link>
                    <Route exact path="/" component={Home} />
                    <Link to="/books">Books</Link>
                    <Route exact path="/books" component={Books} />

                </>
            </Router>
        </React.Fragment>
    )
}