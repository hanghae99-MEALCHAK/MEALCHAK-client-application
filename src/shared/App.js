import "./App.css";
import React from "react";
import GlobalStyle from "./GlobalStyle";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/user";

import Spinner from "./Spinner";
import { Grid } from "../elements";
import { Main, LoginRedirect, Tutorial, Upload, DetailPage, Search, MyPage, RoadAddress, PostAddress, ChatRoomList } from "../pages";

// 사용자 token 여부
import { token } from "./OAuth";
import logger from "./Console";

function App() {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.user.is_loading);

  // token 정보 있을때 user redux에 저장
  React.useEffect(() => {
    if (token) {
      dispatch(userAction.loginCheck());
      logger("app.js user 정보", user_info);
    }
    logger("app.js token 정보", token);
    logger("is_loading", is_loading);
  }, []);

  if (is_loading) {
    return (
      <React.Fragment>
        <Spinner />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        <ConnectedRouter history={history}>
          <GlobalStyle />
          <Route path="/" exact component={Tutorial} />
          <Route path="/home" exact component={Main} />
          <Route path="/post/:id" exact component={DetailPage} />
          <Route path="/address" exact component={RoadAddress}/>
          <Route path="/postAddress" exact component={PostAddress}/>
          <Route path="/user/kakao/callback" exact component={LoginRedirect} />
          <Route path="/upload" exact component={Upload} />
          <Route path="/upload/:id" exact component={Upload} />
          <Route path="/search" component={Search}></Route>
          <Route path="/mypage" component={MyPage}></Route>
          <Route path="/chatlist" component={ChatRoomList}></Route>
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
