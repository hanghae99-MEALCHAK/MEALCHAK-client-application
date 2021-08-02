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
          let post = {
            post_id: p.id,
            title: p.title,
            contents: p.contents,
            category: p.menu.category,
            shop: p.restaurant,
            headCount: p.headCount,
            orderTime: p.orderTime,
            address: p.location.address,
            insert_dt: p.createdAt,
            username: p.user.username,
            user_id: p.user.id,
            userImg: p.user.profileImg,
            distance: p.distance,
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
