import './App.css';
import React from 'react';
import Main from '../pages/Main';

import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

import { Grid } from '../elements';

import AllPost from '../pages/AllPost';
import PostDetail from './../pages/PostDetail';

function App() {
  return (
    <React.Fragment>
      <Grid>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Main} />
          <Route path="/allpost" exact component={AllPost} />
          <Route path="/post/:id" exact component={PostDetail} />
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
