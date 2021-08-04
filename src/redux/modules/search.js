import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axiosModule from '../axios_module';

import logger from '../../shared/Console';

const GET_SEARCH_LIST = 'GET_SEARCH_LIST';

const getSearchList = createAction(GET_SEARCH_LIST, (search) => ({ search }));

const initialState = {
  list: [],
};

const getSearchListDB = (food) => {
  return function (dispatch, getState, { history }) {
    // const username = getState().user.user.username;
    axiosModule
      .post(`/search`, food)
      .then((res) => {
        logger('서치모듈', res);
        let search_list = [];

        res.data.forEach((p) => {
          let hour = p.orderTime.split(' ')[1].split(':')[0];
          let minute = p.orderTime.split(' ')[1].split(':')[1];
          let post = {
            post_id: p.postId,
            title: p.title,
            contents: p.contents,
            category: p.category,
            shop: p.restaurant,
            headCount: p.headCount,
            orderTime: hour + ':' + minute,
            orderDate: p.orderTime.split(' ')[0],
            address: p.address,
            insert_dt: p.createdAt,
            username: p.username,
            user_id: p.userId,
            userImg: p.profileImg,
            distance: p.distance,
            room_id: p.roomId,
            nowHeadCount: p.nowHeadCount,
          };
          search_list.push(post);
        });
        dispatch(getSearchList(search_list));
      })
      .catch((err) => {
        logger('search모듈 - getSeartchListDB: ', err);
      });
  };
};

export default handleActions(
  {
    [GET_SEARCH_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.search;
      }),
  },
  initialState
);

const actionCreators = {
  getSearchListDB,
};

export { actionCreators };
