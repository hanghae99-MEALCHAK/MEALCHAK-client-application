// 개발환경에서의 console.log 관리
const env = process.env.NODE_ENV;

const logger = (msg, log) => {
  if (env === 'production') {
    return;
  }
  // 로그의 파라미터로 로그 설명과 내용을 받음
  console.log(msg, log);
};

export default logger;
