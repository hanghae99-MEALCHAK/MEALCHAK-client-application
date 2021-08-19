import "./App.css";
import React from "react";
import GlobalStyle from "./GlobalStyle";

import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/user";

import Spinner from "./Spinner";
import { Grid } from "../elements";

import {
  Main,
  LoginRedirect,
  Tutorial,
  Upload,
  DetailPage,
  Search,
  MyPage,
  RoadAddress,
  ChatRoomList,
  Chat,
  NotFound,
  ProfileEdit,
  Settings,
  MyPost,
  MyReview,
  MyProfile,
  UserProfile,
  AllowChat,
} from "../pages";

import ReviewWrite from "../pages/ReviewWrite";

// 사용자 token 여부
import { token } from "./OAuth";
import logger from "./Console";

function App() {
  const dispatch = useDispatch();

  const path = document.location.href.split("/")[3];

  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.user.is_loading);
  const is_login = useSelector((state) => state.user.is_login);

  // token 정보 있을때 user redux에 저장
  React.useEffect(() => {
    if (token) {
      dispatch(userAction.loginCheck(`/${path}`));
      logger("app.js user 정보", user_info);
    }
    logger("app.js token 정보", token);
    logger("is_loading", is_loading);
    logger("path", path);
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
        <ConnectedRouter history={history}>
          <GlobalStyle />
          <Grid shape="topGrid">
            <Switch>
              <Route path="/" exact component={Tutorial} />
              <Route path="/home" exact component={Main} />
              <Route path="/post/:id" exact component={DetailPage} />
              <Route path="/address" exact component={RoadAddress} />
              <Route path="/user/kakao/callback" exact component={LoginRedirect}/>
              <Route path="/upload" exact component={Upload} />
              <Route path="/upload/:id" exact component={Upload} />
              <Route path="/search" exact component={Search} />
              <Route path="/mypage" exact component={MyPage} />
              <Route path="/mypost" exact component={MyPost} />
              <Route path="/myprofile" exact component={MyProfile} />
              <Route path="/userprofile/:id" exact component={UserProfile} />
              <Route path="/profile" exact component={ProfileEdit} />
              <Route path="/myreview" exact component={MyReview} />
              <Route path="/settings" exact component={Settings} />
              <Route path="/chatlist" exact component={ChatRoomList} />
              <Route path="/chatting" exact component={Chat} />
              <Route path="/allowchat" exact component={AllowChat} />
              <Route path="/write" exact component={ReviewWrite} />
              <Route component={NotFound} />
            </Switch>
          </Grid>
        </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
