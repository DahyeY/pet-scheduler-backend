const conn = require('../mysql')
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const ensureAuthorization = require('../auth');
const dotenv = require('dotenv');
dotenv.config();

const join = (req, res) => {
    const { name, email, password } = req.body;

    let sql =
        'INSERT INTO user (`name`, `email`, `password`) VALUES (?, ?, ?)';

    // const salt = crypto.randomBytes(10).toString('base64');
    // const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

    let values = [name, email, password];
    conn.query(sql, values,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            if (results.affectedRows)
                return res.status(StatusCodes.CREATED).json(results);
            else
                return res.status(StatusCodes.BAD_REQUEST).end();
        })
};

const login = (req, res) => {
    const { email, password } = req.body;

    let sql = 'SELECT * FROM user WHERE email = ?';
    conn.query(sql, email,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            const loginUser = results[0];

            if (loginUser && loginUser.password == password) {

                // 토큰 발행
                const token = jwt.sign({
                    id: loginUser.id,
                    name: loginUser.name,
                    email: loginUser.email
                }, process.env.PRIVATE_KEY, {
                    expiresIn: '2h',
                    issuer: "admin"
                });

                res.cookie("token", token, {
                    httpOnly: true
                });
                console.log(token);

                return res.status(StatusCodes.OK).json(results);
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).end();
            }
        })
};

const mypage = (req, res) => {
    const authorization = ensureAuthorization(req, res);
    const { id, name, email } = authorization;
    console.log("auth.id: ", id);

    let pets = {};
    let sql = 'SELECT pet.id as pet_id, pet.name as pet_name FROM pet WHERE pet.user_id = ?'
    conn.query(sql, id,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            console.log("results:", results);
            console.log("pets:", pets);
            return res.status(StatusCodes.OK).json({
                user_name: name,
                email,
                pets: results
            });
        }
    )



    // let sql =
    //     'SELECT name as user_name, email user where ';

    // const salt = crypto.randomBytes(10).toString('base64');
    // const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

    // let values = [name, email, password];
    // conn.query(sql, values,
    //     (err, results) => {
    //         if (err) {
    //             console.log(err);
    //             return res.status(StatusCodes.BAD_REQUEST).end();
    //         }

    //         if (results.affectedRows)
    //             return res.status(StatusCodes.CREATED).json(results);
    //         else
    //             return res.status(StatusCodes.BAD_REQUEST).end();
    //     })
};

module.exports = {
    join,
    login,
    mypage
};