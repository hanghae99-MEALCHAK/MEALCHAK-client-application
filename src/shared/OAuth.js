const Client_id = "7bdd85c1e8d3b04bfc556d4b741605ec";


// redirect 되는 url로 프론트 배포 후 배포 주소 사용
// 배포 전에는 프론트 로컬 주소로 개발환경에서 로그인 과정 확인
// const Redirection_url = "http://surgo.kr/user/kakao/callback";
const Redirection_url = "http://localhost:3000/user/kakao/callback";
// const Redirection_url = "http://tenor-test1.s3-website.ap-northeast-2.amazonaws.com/user/kakao/callback";


// 로그인 버튼 클릭시 실행되는 url 주소
export const Kakao_auth_url = `https://kauth.kakao.com/oauth/authorize?client_id=${Client_id}&redirect_uri=${Redirection_url}&response_type=code`;

// 로그인 이후 세션에 저장된 토큰 정보
export const token = sessionStorage.getItem('token');
