import "./App.css";
import React from "react";
import Main from "../pages/Main";
import GlobalStyle from "./GlobalStyle";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import { Grid } from "../elements";

function App() {
  return (
    <React.Fragment>
      <Grid>
        <ConnectedRouter history={history}>
          <GlobalStyle/>
          <Route path="/" exact component={Main} />
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
