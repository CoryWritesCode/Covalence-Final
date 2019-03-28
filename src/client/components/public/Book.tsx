import * as React from 'react';

interface P {
  categoryid: number,
  author: string,
  id: string,
  title: string,
  price: number,
  editable?: boolean,
  key: number,
  handleClick?: any
  handleDelete?: any
}

export default function Book (props: P) {
  let buttons;
  if (props.editable) {
    buttons = [
      <React.Fragment>
        <a onClick={props.handleClick} className="card-link">Edit</a>
        <a onClick={props.handleDelete(props.id)} className="card-link">Delete</a>
      </React.Fragment>
    ];
  } else {
    buttons = <div></div>;
  }

  return (
    <div id={props.id} className="d-flex flex-wrap">
      <div className="card" key={props.key} style={{ width: '18rem'}} >
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{props.author}</h6>
          <p className="card-text">{props.price}</p>
          {buttons}
        </div>
      </div>
    </div>
  )
}