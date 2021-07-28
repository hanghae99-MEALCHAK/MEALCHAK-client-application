import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axiosModule from '../axios_module';

import logger from '../../shared/Console';

const GET_SEARCH_LIST = 'GET_SEARCH_LIST';

const getSearchList = createAction(GET_SEARCH_LIST, (search) => ({ search }));

const initialState = {
  search_list: [],
};

const getSearchListDB = (food) => {
  return function (dispatch, getState, { history }) {
    // const username = getState().user.user.username;
    axiosModule
      .post(`/search`, food)
      .then((result) => {
        dispatch(getSearchList(result.data));
      })
      .catch((err) => {
        logger('search모듈 - 24: ', err);
      });
  };
};

export default handleActions(
  {
    [GET_SEARCH_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.search_list = action.payload.search;
      }),
  },
  initialState
);

const actionCreators = {
  getSearchListDB,
};

export { actionCreators };
