// 프로필 수정 페이지 image 수정
// 미리보기 이미지
import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const SET_PREVIEW = "SET_PREVIEW";
const SET_MASK = "SET_MASK";

const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
// 첫 회원가입 후 주소설정이 되어있지 않은 사용자의 가이드 뷰 필요 여부 판별 상태값
const setMask = createAction(SET_MASK, (is_mask) => ({is_mask}));

const initialState = {
  preview: null,
  is_mask: false,
};

export default handleActions(
  {
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
    [SET_MASK]: (state, action) =>
      produce(state, (draft) => {
        draft.is_mask = action.payload.is_mask;
      }),
  },
  initialState
);

const actionCreators = {
  setPreview,
  setMask,
};

export { actionCreators };
