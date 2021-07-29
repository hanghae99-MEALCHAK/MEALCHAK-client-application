import './App.css';
import React from 'react';
import GlobalStyle from './GlobalStyle';

import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userAction } from '../redux/modules/user';

import { Grid } from "../elements";
import { Main, LoginRedirect, Tutorial, Upload, DetailPage, Search, MyPage } from "../pages";
import RoadAddress from "../components/RoadAddress";

// 사용자 token 여부
import { token } from './OAuth';
import logger from './Console';

function App() {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);

  // token 정보 있을때 user redux에 저장
  React.useEffect(() => {
    if (token) {
      dispatch(userAction.loginCheck());
      logger('app.js user 정보', user_info);
    }
    logger('app.js token 정보', token);
  }, []);

  return (
    <React.Fragment>
      <Grid>
        <ConnectedRouter history={history}>
          <GlobalStyle />
          <Route path="/" exact component={Tutorial} />
          <Route path="/home" exact component={Main} />
          <Route path="/post/:id" exact component={DetailPage} />
          <Route path="/searchAddress" exact component={RoadAddress}/>
          <Route path="/user/kakao/callback" exact component={LoginRedirect} />
          <Route path="/upload" exact component={Upload} />
          <Route path="/upload/:id" exact component={Upload} />
          <Route path="/search" component={Search}></Route>
          <Route path="/mypage" component={MyPage}></Route>
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
