import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { json, SetAccessToken } from '../../utils/api';

interface P extends RouteComponentProps { }
interface S {
  loginFailed: boolean;
  email: string;
  password: string;
}

export default class Login extends React.Component<P, S> {

  constructor(props: P) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginFailed: false
    }
  }

  private loggingIn = false; //Used to prevent double clicks on the login button

  login = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (this.loggingIn) return; //Check if there is a login request alreaady happening

    try {
      this.loggingIn = true;
      this.setState({ loginFailed: false }); //Resets the error Alert is there was an error

      let result = await json('/auth/login', 'POST',
        {
          email: this.state.email,
          password: this.state.password
        });

      if (result) {
        console.log(result);
        SetAccessToken(result.token, { userid: result.userid, role: result.role });
        if (result.role === 'admin') {
          this.props.history.push('/admin');
        } else {
          this.props.history.push('/');
        }
      } else {
        this.setState({ loginFailed: true });
      }
    } catch (e) {
      this.setState({ loginFailed: true });
    } finally {
      this.loggingIn = false;
    }
  }

  render() {

    let alert;
    if (this.state.loginFailed) {
      console.log("Get outta here!");
    } else {
      alert = null;
    }

    return (
      <main className="py-5">
        <div className="container py-5">
          <div className="row">
            <form
              className="col-md-4 offset-md-4"
              onSubmit={this.login}>
              <div className="form-row">
                <div className="col form-group">
                  <label className="login-label">Welcome back!</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Email"
                    onChange={(e) => { this.setState({ email: e.target.value }) }}
                    required />
                </div>
              </div>
              <div className="form-row">
                <div className="col form-group">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => { this.setState({ password: e.target.value }) }}
                    required />
                </div>
              </div>
              <div className="form-row form-group">
                <div className="col">
                  <button className="btn btn-outline-dark btn-lg w-100">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }
}
