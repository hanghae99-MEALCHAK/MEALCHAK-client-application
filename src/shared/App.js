import './App.css';
import React from 'react';
import GlobalStyle from './GlobalStyle';

import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userAction } from '../redux/modules/user';

import Spinner from './Spinner';
import { Grid } from '../elements';

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
} from '../pages';

import ReviewWrite from '../pages/ReviewWrite';

// 사용자 token 여부
import { token } from './OAuth';
import logger from './Console';

function App() {
  const dispatch = useDispatch();

  const path = document.location.href.split('/')[3];

  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.user.is_loading);
  const is_login = useSelector((state) => state.user.is_login);

  // token 정보 있을때 user redux에 저장
  React.useEffect(() => {
    if (token) {
      dispatch(userAction.loginCheck(`/${path}`));
      logger('app.js user 정보', user_info);
    }
    logger('app.js token 정보', token);
    logger('is_loading', is_loading);
    logger('path', path);
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
          <Route path="/address" exact component={RoadAddress} />
          <Route path="/user/kakao/callback" exact component={LoginRedirect} />
          <Route path="/upload" exact component={Upload} />
          <Route path="/upload/:id" exact component={Upload} />
          <Route path="/search" component={Search} />
          <Route path="/mypage" component={MyPage} />
          <Route path="/mypost" component={MyPost} />
          <Route path="/myprofile" component={MyProfile} />
          <Route path="/userprofile" component={UserProfile} />
          <Route path="/profile" component={ProfileEdit} />
          <Route path="/myreview" component={MyReview} />
          <Route path="/settings" component={Settings} />
          <Route path="/chatlist" component={ChatRoomList} />
          <Route path="/chatting" component={Chat} />
          <Route path="/allowchat" component={AllowChat} />
          {/* <Route path="*" component={NotFound}></Route> */}
          <Route path="/write" component={ReviewWrite} />
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
