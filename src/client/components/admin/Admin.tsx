import * as React from 'react';
import { json, User, LogoutUser } from '../../utils/api';
import { RouteComponentProps, Link } from 'react-router-dom';
import Book from '../public/Book';

interface P extends RouteComponentProps {

}

interface S {
  books: { [x: string]: any; },
  editable: boolean,
  user: any
}

export default class Admin extends React.Component<P, S> {
  constructor(props: P) {
    super(props);

    this.state = {
      user: {},
      editable: true,
      books: []
    }
  }

  async componentWillMount() {
    if (!User || User.userid === null || User.userid === undefined) {
      this.props.history.push('/login');
    }
    try {
      let user = await json(`api/users/${User.userid}`)
      this.setState({
        user: user
      })
    } catch (e) {
      console.error(e);
      throw e;
    }
    try {
      let books = await json('/api/books');
      this.setState({
        books: books
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  handleLogOut () {
    LogoutUser();
  }

  handleDelete = async (id: number) => {
    if (!User || User.userid === null || User.userid === undefined) {
      this.props.history.push('/login');
    }
    try {
      await json(`api/books/${id}`, 'DELETE')
      window.location.reload();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  render () {
    var {
      books,
      editable
    } = this.state;
    var keys = Object.keys(books);

    return (
      <React.Fragment>
        <h2>Admin</h2>
        <Link to="books/new">New</Link>
        <button className="btn btn-danger" onClick={this.handleLogOut}>Log Out</button>
        <React.Fragment>
          {keys.map((val: any) => {
            let categoryid: number = books[val].categoryid;
            let id: number = books[val].id;
            let author: string = books[val].author;
            let title: string = books[val].title;
            let price: number = books[val].price;
            return <Book
              editable={editable}
              categoryid={categoryid}
              author={author}
              title={title}
              key={id}
              price={price}
              id={`${id}`} />
          })}
        </React.Fragment>
      </React.Fragment>
    )
  }
}