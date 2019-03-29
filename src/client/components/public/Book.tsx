import * as React from 'react';
import { Link } from 'react-router-dom';

interface P {
  categoryname?: string,
  categoryid?: number,
  author: string,
  id: string,
  title: string,
  price: number,
  editable?: boolean,
  deleteable?: boolean,
  key: number,
  onClick?: any
}

export default function Book (props: P) {
  let buttons;
  if (props.deleteable) {
    buttons = [
      <React.Fragment>
        <button onClick={props.onClick} className="card-link">Delete</button>
      </React.Fragment>
    ]
  } else if (props.editable) {
    buttons = [
      <React.Fragment>
        <Link to={`/books/${props.id}/edit`} className="card-link">Edit</Link>
      </React.Fragment>
    ];
  } else {
    buttons = <div></div>;
  }

  return (
    <div id={props.id} key={(props.id + 10)} className="d-flex flex-wrap">
      <div className="card"  style={{ width: '18rem'}} >
        <div className="card-body">
          <h4 className="card-title">{props.title}</h4>
          <h5 className="card-subtitle mb-2 text-muted">{props.author}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{props.categoryname}</h6>
          <p className="card-text">${props.price}</p>
          {buttons}
        </div>
      </div>
    </div>
  )
}