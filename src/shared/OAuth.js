const Client_id = process.env.REACT_APP_KAKAO_LOGIN_API_KEY;

const env = process.env.NODE_ENV;
const devTarget =
  env === "development"
    ? "http://localhost:3000/user/kakao/callback"
    : "https://mealchak.com/user/kakao/callback";

const Redirection_url = devTarget;

// 로그인 버튼 클릭시 실행되는 url 주소
export const Kakao_auth_url = `https://kauth.kakao.com/oauth/authorize?client_id=${Client_id}&redirect_uri=${Redirection_url}&response_type=code`;

// 로그인 이후 세션에 저장된 토큰 정보
export const token = sessionStorage.getItem("token");
