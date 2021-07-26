import "./App.css";
import React from "react";
import Main from "../pages/Main";
import GlobalStyle from "./GlobalStyle";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/user";

// pages, elements
import { Main, LoginRedirect, Tutorial } from "../pages";
import { Grid } from "../elements";


// 사용자 token 여부
import { token } from "./OAuth";
import logger from "./Console";


function App() {
  const dispatch = useDispatch();
  const user_info = useSelector(state => state.user.user);

  // token 정보 있을때 user redux에 저장
  React.useEffect(()=>{
    if(token){
      dispatch(userAction.loginCheck());
      logger('app.js user 정보', user_info)
    }
    logger('app.js token 정보', token);
  },[])

  return (
    <React.Fragment>
      <Grid>
        <ConnectedRouter history={history}>
          <GlobalStyle/>
          <Route path="/" exact component={Main} />
          <Route path="/user/kakao/callback" exact component={LoginRedirect} />
          <Route path="/tutorial" exact component={Tutorial} />
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
