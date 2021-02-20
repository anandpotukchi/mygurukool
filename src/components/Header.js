/* global gapi */
import React, { Component, Fragment } from "react";
import * as _apiUtils from "./util/AxiosUtil";
import * as _constants from "./util/constants";
import * as _gconsts from "./util/gConsts";
import * as _msconsts from "./util/msConsts";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Header extends Component {
  render() {
    return (
      <Fragment>
        <header className="navbar navbar-expand navbar-dark bg-blue flex-column flex-md-row bd-navbar">
          <div className="container">
            <a className="navbar-brand mr-0 mr-md-2 logo">
              <i class="fas fa-book-open"></i> &nbsp; myGurukul
            </a>
            <ul className="navbar-nav">


              <li className="nav-item">
                  {/* Student Name */}
                  &nbsp;<b>{this.props.studentName}</b>
                {" "}
                &emsp;
                {this.props.isSignedIn ? (
                  <a
                    className="logout"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      let provider = sessionStorage.getItem(
                        _constants.LOGIN_PROVIDER
                      );

                      if (provider === _constants.GOOGLE) {
                        gapi.auth2.getAuthInstance().signOut();
                        //gapi.auth2.getAuthInstance().disconnect();
                      } else {
                        window.location.href =
                          "https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=" +
                          process.env.REACT_APP_OAUTH_LOGOUT_URI;
                      }
                      sessionStorage.clear();                    
                    }}
                  >
                    <i className="fas fa-power-off">&nbsp;Logout</i>
                  </a>
                ) : (
                  ""
                )}
              </li>
              
            </ul>
          </div>
        </header>
      </Fragment>
    );
  }
}
