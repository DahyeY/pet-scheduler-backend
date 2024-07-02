const express = require("express"); // express 모듈을 가져와서
const app = express(); // 새로운 express앱을 생성
const port = 8080;

// app.get("/", (req, res) => res.send("Index.js"));

app.listen(port, () => console.log(`Example app listenint on port ${port}!`));


// const dotenv = require('dotenv');
// dotenv.config();



const conn = require('./mysql');

// app.get("/", (req, res) => {
//     const sql = 'select * from user';

//     conn.query(sql,
//         (err,results) => {
//             if(err){
//                 console.log(err);
//                 return res.status(400).end();
//             }
//             else {

//                 return res.status(200).json(results);
//             }
//         }
//     )
// })


const userRouter = require('./routes/users');
const petRouter = require('./routes/pets');
const calendarRouter = require('./routes/calendar');

app.use('/users', userRouter);
app.use('/pets', petRouter);
app.use('/calendar', calendarRouter);
