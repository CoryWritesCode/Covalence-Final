import * as React from 'react';

interface P {
  categoryid: number,
  author: string,
  id: string,
  title: string,
  price: number
}

export default function Book (props: P) {
  return (
    <div id={props.id} className="d-flex flex-wrap">
      <div className="card" style={{ width: '18rem'}} >
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{props.author}</h6>
          <p className="card-text">{props.price}</p>
          <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a>
        </div>
      </div>
    </div>
  )
}