// 개발환경에서만 console.log 사용
const env = process.env.NODE_ENV;

const logger = (msg, log) => {
  if (env === 'production') {
    return;
  }
  console.log(msg, log);
};

export default logger;
