/* global gapi */

import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Session from "./components/Session";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";

import * as _constants from "./components/util/constants"
import * as _gconsts from "./components/util/gConsts"
import CreateCourse from "./components/CreateCourse";

function googleUpdateSigninStatus(isSignedIn) {
  console.log("googleUpdateSigninStatus")

  if (isSignedIn) {
    let token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true).access_token
    sessionStorage.setItem(_constants.ACCESS_TOKEN, token)
    window.location.href = '/home'
  } else {
    sessionStorage.setItem(_constants.ACCESS_TOKEN, "")
    window.location.href = '/'
  }
}

function App() {
  useEffect(() => {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        'discoveryDocs': ['https://classroom.googleapis.com/$discovery/rest?version=v1'],
        scope: _gconsts.REACT_APP_GOOGLE_OAUTH_SCOPES,
      }).then(() => {
        // console.log("google api - client init:done")
        // console.log("gapi: " + gapi.auth2.getAuthInstance())
        sessionStorage.setItem("gapi", window.gapi.auth2.getAuthInstance())
        gapi.auth2.getAuthInstance().isSignedIn.listen(googleUpdateSigninStatus);
        })
      })
  })

  return (
    <BrowserRouter>
      <div>
        <Route
          exact={true}
          path="/"
          render={() => (
            <div className="App">
              <Session />
            </div>
          )}
        />
        <Route
          exact={true}
          path="/home"
          render={() => (
            <div className="App">
              <Home />
            </div>
          )}
        />
        <Route
          path="/auth"
          render={(props) => (
            <div className="App">
              <Auth {...props} />
            </div>
          )}
        />
      </div>
      <Route
          exact={true}
          //path="/createcourse"
          path="/home/createcourse"
          render={() => (
            <div className="App">
              <CreateCourse />
            </div>
          )}
        />
    </BrowserRouter>
  );
}

export default App;
