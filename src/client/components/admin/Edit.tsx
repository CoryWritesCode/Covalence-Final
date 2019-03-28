import * as React from 'react';
import { json } from '../../utils/api';
import { RouteComponentProps } from 'react-router-dom';
import Blog from '../public/Blog';


interface P extends RouteComponentProps<{ id: string }> {

}

interface S {
  title: string,
  content: string,
  blogs: { [x: string]: any }
}

export default class New extends React.Component<P, S> {
  constructor(props: P) {
    super(props)

    this.state = {
      title: '',
      content: '',
      blogs: {}
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  async handleClick(e: any) {
    e.preventDefault();
    try {
      let obj = {
        title: this.state.title,
        content: this.state.content,
      }

      await json(`http://localhost:3000/api/books/${this.props.match.params.id}/edit`, 'PUT', obj)

      this.setState({
        title: '',
        content: ''
      });

      this.props.history.goBack();
    } catch (e) { console.log(e) }
  }

  async componentWillMount() {
    let blogs = await json(`http://localhost:3000/api/books/${this.props.match.params.id}`)
    this.setState({ blogs: blogs });
  }

  handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      title: e.target.value
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

    var {
      blogs
    } = this.state;
    let id = this.props.match.params.id
    var keys = Object.keys(blogs);

    return (
      <React.Fragment
        key={this.props.match.params.id}>
        <React.Fragment>
          {keys.map((val) => {
            let { _created,
              author,
              content,
              tagname,
              title } = blogs[val];
            return <Book
              editable={editable}
              categoryid={categoryid}
              author={author}
              title={title}
              key={id}
              price={price}
              id={`${id}`}
              onClick={this.handleClick} />
          })}
        </React.Fragment>
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