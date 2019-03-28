import * as React from 'react';
import { json, User } from '../../utils/api';
import { RouteComponentProps } from 'react-router-dom';


interface P extends RouteComponentProps<{ id: string }> {

}

interface S {
  title: string,
  author: string,
  price: number,
  category: string,
  saveStatus: string
}

export default class Create extends React.Component<P, S> {
  constructor(props: P) {
    super(props)

    this.state = {
      title: '',
      author: '',
      price: null,
      category: '',
      saveStatus: null
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
  }

  private saving: boolean = false;

  componentDidMount() {
    if (!User || User.id === null || User.role !== 'admin') {
      this.props.history.replace('/login');
    }
  }

  async handleClick() {

    if (this.saving) return;

    let obj = {
      title: this.state.title,
      authorid: User.userId,
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

      this.props.history.replace('/');
    } catch (e) {
      this.setState({ saveStatus: 'error' });
      console.log(e)
    };
  }

  handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      title: e.target.value
    });
  }

  handleTagChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      tag: e.target.value
    });
  }

  handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      content: e.currentTarget.value
    });
  }

  render() {
    let button: object;

    if (this.state.content.length < 1) {
      button = <button
        className="btn btn-outline-light"
        type="button">
        Publish
                  </button>
    } else {
      button = <button
        className="btn btn-outline-light"
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
        key={this.props.match.params.id}>
        <div className="card text-white bg-success mb-3"
          style={{
            margin: '20px',
            fontWeight: 'bold'
          }}>
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
                onChange={this.handleTitleChange}></input>
            </div>
            <div className="form-group"
              style={{
                paddingLeft: '20px',
                paddingRight: '20px'
              }}>
              <label>Tags:</label>
              <input
                type="text"
                className="form-control"
                placeholder="(Optional)"
                onChange={this.handleTagChange}></input>
            </div>
            <div className="form-group"
              style={{
                paddingLeft: '20px',
                paddingRight: '20px'
              }}>
              <label>Content:</label>
              <textarea
                className="form-control"
                value={this.state.content}
                onChange={this.handleContentChange} />
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