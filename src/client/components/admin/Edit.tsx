import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { json } from '../../utils/api';
import Book from '../public/Book';

interface P extends RouteComponentProps<{ id: string }> {

}

interface S {
  book: { [x: string]: any; },
  deleteable: boolean
}

export default class Edit extends React.Component<P, S> {

  constructor(props: P) {
    super(props)

    this.state = {
      book: {},
      deleteable: true
    }

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    try {
      await json(`http://localhost:3000/api/books/${this.props.match.params.id}`, 'DELETE');

      this.props.history.replace('/admin');
    } catch (e) { console.log(e) }
  }

  async componentWillMount() {

    try {
      let blog = await json(`http://localhost:3000/api/books/${this.props.match.params.id}`);
      this.setState({ book: blog });
    } catch (e) { console.log(e) };

  }

  render () {
    var {
      deleteable,
      book
    } = this.state;

    return (
      <React.Fragment>
        <Book 
          deleteable={deleteable}
          categoryid={book.categoryid}
          author={book.author}
          title={book.title}
          key={book.id}
          price={book.price}
          id={`${book.id}`}
          onClick={this.handleClick}
        />
      </React.Fragment>
    )
  }
}