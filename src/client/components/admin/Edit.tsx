import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { json } from '../../utils/api';
import Book from '../public/Book';

interface P extends RouteComponentProps<{ id: string }> {

}

interface S {
  book: { [x: string]: any; },
  deleteable: boolean,
  title: string,
  author: string,
  category: string,
  price: string
}

export default class Edit extends React.Component<P, S> {

  constructor(props: P) {
    super(props)

    this.state = {
      book: {},
      deleteable: true,
      title: '',
      author: '',
      category: '',
      price: '',
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

  save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

    }
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
        <form
          className="col-md-4 offset-md-4"
          onSubmit={this.save}>
          <div className="form-row">
            <div className="col form-group">
              <label className="login-label">Welcome back!</label>
              <input
                className="form-control"
                type="text"
                value={book.author}
                onChange={(e) => { this.setState({ author: e.target.value }) }}
                required />
            </div>
          </div>
          <div className="form-row">
            <div className="col form-group">
              <input
                className="form-control"
                type="text"
                value={book.title}
                onChange={(e) => { this.setState({ title: e.target.value }) }}
                required />
            </div>
          </div>
          <div className="form-row">
            <div className="col form-group">
              <input
                className="form-control"
                type="text"
                value={book.category}
                onChange={(e) => { this.setState({ category: e.target.value }) }}
                required />
            </div>
          </div>
          <div className="form-row">
            <div className="col form-group">
              <input
                className="form-control"
                type="text"
                value={`$${book.price}`}
                onChange={(e) => { this.setState({ price: e.target.value }) }}
                required />
            </div>
          </div>
          <div className="form-row form-group">
            <div className="col">
              <button className="btn btn-outline-dark btn-lg w-100">Save</button>
            </div>
          </div>
        </form>
      </React.Fragment>
    )
  }
}