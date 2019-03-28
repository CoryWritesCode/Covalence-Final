import * as React from 'react';
import Book from './Book';

interface P {

}

interface S {
  books: { [x: string]: any; },
}

export default class Books extends React.Component<P, S> {
  constructor(props: P) {
    super(props)

    this.state = {
      books: []
    }
  }

  render () {
    var {
      books
    } = this.state;
    var keys = Object.keys(books);

    return (
      <React.Fragment>
        {keys.map((val: any) => {
          let categoryid: number = books[val].categoryid;
          let id: number = books[val].id;
          let author: string = books[val].author;
          let title: string = books[val].title;
          let price: number = books[val].price;
          return <Book
            categoryid={categoryid}
            author={author}
            title={title}
            key={id}
            price={price}
            id={`${id}`} />
        })}
      </React.Fragment>
  }
}