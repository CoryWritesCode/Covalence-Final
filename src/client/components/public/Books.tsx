import * as React from 'react';
import Book from './Book';
import {json} from '../../utils/api';
import { RouteComponentProps } from 'react-router-dom';

interface P extends RouteComponentProps {

}

interface S {
  books: { [x: string]: any; },
  editable: boolean
}

export default class Books extends React.Component<P, S> {
  constructor(props: P) {
    super(props)

    this.state = {
      books: [],
      editable: false
    }
  }

  async componentWillMount () {
    try {
      let books = await json('http://localhost:3000/api/books');
      this.setState({
        books: books
      });
    } catch (e) {
      console.error(e);
      throw (e);
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
        {keys.map((val: any) => {
          let categoryname: string = books[val].categoryname;
          let id: number = books[val].id;
          let author: string = books[val].author;
          let title: string = books[val].title;
          let price: number = books[val].price;
          return <Book
            editable={editable}
            categoryname={categoryname}
            author={author}
            title={title}
            key={id}
            price={price}
            id={`${id}`} />
        })}
      </React.Fragment>
    )
  }
}