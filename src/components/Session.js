/* global gapi */

import React, { Component, Fragment } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Header from "./Header";
import { Redirect } from "react-router";
import * as _apiUtils from "./util/AxiosUtil";


import * as _constants from "./util/constants";
import * as _gconsts from "./util/gConsts";
import * as _msconsts from "./util/msConsts";

export default class Session extends Component {
  constructor(props) {
    super(props);
    this.state = { isSignedIn: false, accessToken: "" };

    sessionStorage.setItem(_constants.LOGIN_PROVIDER, "");
    sessionStorage.setItem(_constants.ACCESS_TOKEN, "");
  }

   render() {
    return (
      <Fragment>
        <Header isSignedIn={this.state.isSignedIn} />

          <div className="row bg-blue">
            <div className="col-md-2 offset-md-2">
              <div className="card" style={{"width": "50rem"}}>
                <div className="card-header border-0">
                  Login
                </div>
                <div className="card-body border-0">
                  <div className="row section-nav">
                    <div className="col-12">
                      {/* <div className="alert alert-success">
                        Please sign in using your School account.
                      </div> */}
                      <button
                        className="btn btn-lg btn-primary btn-block"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          let stateNow = new Date()
                            .toISOString()
                            .replace(/[^0-9]/g, "")
                            .slice(0, -3);
                          let random = Math.random().toString(36).substring(7);

                          sessionStorage.setItem(
                            _constants.LOGIN_PROVIDER,
                            _constants.MICROSOFT
                          );

                          window.location.href =
                            "https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize?client_id=" +
                            process.env.REACT_APP_CLIENT_ID +
                            "&response_type=id_token%20token&redirect_uri=" +
                            process.env.REACT_APP_OAUTH_REDIRECT_URI +
                            "&response_mode=fragment&scope=openid%20" +
                            _msconsts.REACT_APP_OAUTH_SCOPES +
                            //    "&prompt=consent" +
                            "&state=" +
                            stateNow +
                            "&nonce=" +
                            random;
                        }}
                      >
                        <i className="fab fa-microsoft mx-2"> </i>
                        Login With Microsoft
                      </button>

                      <button
                        className="btn btn-lg btn-primary btn-block"
                        type="button"
                        onClick={(e) => {
                          sessionStorage.setItem(
                            _constants.LOGIN_PROVIDER,
                            _constants.GOOGLE
                          );
                          window.gapi.auth2.getAuthInstance().signIn();
                        }}
                      >
                        <i className="fab fa-google mx-2"> </i>
                        Login With Google
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
      </Fragment>
    );
  }
}
