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

    let body = {
      categoryname: this.state.category,
      title: this.state.title,
      author: this.state.author,
      price: this.state.price
    }

    try {
      await json(`http://localhost:3000/api/books/${this.state.book.id}/edit`, 'PUT', body);
      this.props.history.push('/admin');
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  render () {
    var {
      deleteable,
      book,
      title,
      author,
      category,
      price
    } = this.state;

    return (
      <React.Fragment>
        <Book 
          deleteable={deleteable}
          categoryname={book.categoryname}
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
              <label className="login-label">Edit Carefully</label>
              <input
                className="form-control"
                value={author}
                placeholder="Author"
                onChange={(e) => { this.setState({ author: e.target.value }) }}
                 />
            </div>
          </div>
          <div className="form-row">
            <div className="col form-group">
              <input
                className="form-control"
                value={title}
                placeholder="Title"
                onChange={(e) => { this.setState({ title: e.target.value }) }}
                 />
            </div>
          </div>
          <div className="form-row">
            <div className="col form-group">
              <input
                className="form-control"
                value={category}
                placeholder="Category"
                onChange={(e) => { this.setState({ category: e.target.value }) }}
                 />
            </div>
          </div>
          <div className="form-row">
            <div className="col form-group">
              <input
                className="form-control"
                value={`${price}`}
                placeholder="Price"
                onChange={(e) => { this.setState({ price: e.target.value }) }}
                 />
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