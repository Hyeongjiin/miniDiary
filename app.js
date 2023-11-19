const express = require('express'); 
const morgan = require('morgan') 
const path = require('path');
const dotenv = require('dotenv');
const { sequelize } = require('./models')

dotenv.config(); // .env의 설정을 바탕으로 process.env를 만들어준다
const router = require('./routes/index');

const app = express();
app.set('port', process.env.PORT || 8080);
sequelize.sync() // { force: true } - 개발시 테이블 초기화하고 다시 생성
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public'))); // app이 포함된 폴더의 경로와 public을 합친다
app.use(express.json()); // json 요청을 받을 수 있게 한다 - req.body 생성
app.use(express.urlencoded({ extended: false }));  // form 요청을 받을 수 있게 한다 - req.body 생성

app.use('/', router); // 요청이 들어오면 페이지라우터로 가서 요청에 받은 라우터가 있는지 확인한다. 

// 요청과 일치하는 라우터가 없다면 에러를 만들어준다
app.use((req, res, next) => { // 404 NOT FOUND
    const error = new Error(`${req.methid} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
// 에러 처리 미들웨어 
app.use((err, req, res, next) => {
    console.log(err.message);
    console.log(err.status);
    res.send({
        Message: err.message,
        ResultCode: err.status 
      });
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})