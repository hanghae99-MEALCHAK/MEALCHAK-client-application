const env = process.env.NODE_ENV;

const logger = (msg, log) => {
    if(env === 'production'){
        return;
    }
    console.log(msg, log)
}

export default logger;