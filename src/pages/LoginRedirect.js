import React from "react";
import { useDispatch } from "react-redux";
import Spinner from "../shared/Spinner";
import { actionCreators as userActions } from "../redux/modules/user";

// 개발환경 console.log() 관리용
import logger from "../shared/Console";


const LoginRedirect = (props) => {
  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  // 카카오에서 받은 인가코드 서버에 넘긴다.  
  React.useEffect(() => {
    logger(code);
    dispatch(userActions.kakaoLogin(code));
  }, []);

  return <Spinner />;
};

export default LoginRedirect;
