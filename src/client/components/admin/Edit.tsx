import * as React from 'react';
import { json, User, LogoutUser } from '../../utils/api';
import { RouteComponentProps, Link } from 'react-router-dom';
import Book from '../public/Book';

interface P extends RouteComponentProps {

}

interface S {

}

export default class Edit extends React.Component<P, S> {
  constructor(props: P) {
    super(props)
  }
}