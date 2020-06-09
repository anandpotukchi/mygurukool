import React, {Component, Fragment} from 'react';
import '..//App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
export default class Header extends Component {
  render() {
    return (
      <Fragment>
        <header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
          <div className="container">
            <a className="navbar-brand mr-0 mr-md-2 logo">My Gurukool</a>
            <ul className="navbar-nav ml-md-auto">
              <li className="nav-item"><i className="far fa-user"></i>&nbsp;<a href="#" onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem('token');
                  window.location.href =
                  "https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=" +
                  process.env.REACT_APP_OAUTH_LOGOUT_URI;
                }}>Logout</a></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </header>
      </Fragment>
    )
  }
}
