import * as React from 'react';
import { json, User } from '../../utils/api';
import { RouteComponentProps } from 'react-router-dom';


interface P extends RouteComponentProps<{ id: string }> {

}

interface S {
  title: string,
  author: string,
  price: any,
  category: string,
  saveStatus: string
}

export default class Create extends React.Component<P, S> {
  constructor(props: P) {
    super(props)

    this.state = {
      title: '',
      author: '',
      price: '',
      category: '',
      saveStatus: null
    }

    this.handleClick = this.handleClick.bind(this);
  }

  private saving: boolean = false;

  async componentWillMount() {
    if (!User || User.id === null || User.role !== 'admin') {
      this.props.history.replace('/login');
    }
  }

  async handleClick() {

    if (this.saving) return;

    let obj = {
      title: this.state.title,
      author: this.state.author,
      price: this.state.price,
      category: this.state.category
    }

    try {
      this.saving = true;
      let result = await json('http://localhost:3000/api/books/new/', 'POST', obj);
      if (result) {
        this.setState({ saveStatus: 'success' });
      } else {
        this.setState({ saveStatus: 'error' });
      }

      this.props.history.replace('/admin');
    } catch (e) {
      this.setState({ saveStatus: 'error' });
      console.log(e)
    };
  }

  render() {
    let button: object;

    if (this.state.author.length < 1) {
      button = <button
        className="btn btn-outline-dark"
        type="button">
        Publish
                  </button>
    } else {
      button = <button
        className="btn btn-outline-dark"
        type="button"
        onClick={this.handleClick}>
        Publish
                  </button>
    }

    if (this.state.saveStatus === 'success') {
      alert('You did it!')
    } else if (this.state.saveStatus === 'error') {
      alert('Oh no! There was an error!')
    }

    return (
      <React.Fragment
        >
        <div className="card mb-3">
          <form>
            <div className="form-group"
              style={{
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingTop: '20px'
              }}>
              <label>Title:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter title"
                onChange={(e) => {this.setState({ title: e.target.value })}}></input>
            </div>
            <div className="form-group"
              style={{
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingTop: '20px'
              }}>
              <label>Author:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter title"
                onChange={(e) => { this.setState({ author: e.target.value }) }}></input>
            </div>
            <div className="form-group"
              style={{
                paddingLeft: '20px',
                paddingRight: '20px'
              }}>
              <label>Category:</label>
              <input
                type="text"
                className="form-control"
                placeholder="(Optional)"
                onChange={(e) => { this.setState({ category: e.target.value }) }}></input>
            </div>
            <div className="form-group"
              style={{
                paddingLeft: '20px',
                paddingRight: '20px'
              }}>
              <label>Price:</label>
              <textarea
                className="form-control"
                value={this.state.price}
                onChange={(e) => { this.setState({ price: e.target.value }) }} />
            </div>
            <div style={{
              paddingLeft: '20px',
              paddingBottom: '20px'
            }}>
              {button}
            </div>
          </form>
        </div>
      </React.Fragment>
    )
  }
}