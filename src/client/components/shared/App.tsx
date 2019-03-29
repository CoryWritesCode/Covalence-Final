import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from '../public/Home';
import Create from '../public/Create';
import Books from '../public/Books';
import Login from '../admin/Login';
import Admin from '../admin/Admin';
import Edit from '../admin/Edit';
import { User } from '../../utils/api';

export default function App () {
    let admin;
    if (localStorage.getItem('role') == 'admin') {
        admin = <Link to="/admin">Admin</Link>;
    }

    return (
        <React.Fragment>
            <Router>
                <>
                    <Link to='/'>Home</Link>
                    <Link to="/books">Books</Link>
                    <Link to="/login">Login</Link>
                    {admin}  
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/books" component={Books} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="/books/:id/edit" component={Edit} />
                    <Route exact path="/books/new" component={Create} />
                </Switch>
                </>
            </Router>
        </React.Fragment>
    )
}