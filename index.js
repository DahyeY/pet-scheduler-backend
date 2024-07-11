const express = require("express"); // express 모듈을 가져와서
const app = express(); // 새로운 express앱을 생성
const port = 8080;
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',  // 리액트 애플리케이션의 도메인을 설정
    credentials: true
}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.get('/main', (req, res) => {
    res.json({ message: 'Hello, world!' });
});



const conn = require('./mysql');




const userRouter = require('./routes/users');
const petRouter = require('./routes/pets');
const calendarRouter = require('./routes/calendar');

app.use('/users', userRouter);
app.use('/pets', petRouter);
app.use('/calendar', calendarRouter);
