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
    console.log('로그인');
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
                    httpOnly: true,
                    sameSite: 'None',
                    secure: true

                });
                console.log(token);

                let sql = 'SELECT id FROM pet WHERE user_id = ?';
                conn.query(sql, loginUser.id,
                    (err, results) => {
                        if (err) {
                            console.log(err);
                            return res.status(StatusCodes.BAD_REQUEST).end();
                        }
                        else if (results[0]) return res.status(StatusCodes.OK).json(results[0]);
                        else return res.status(StatusCodes.OK).json({ mypage: 1, token });
                    })

            } else {
                return res.status(StatusCodes.UNAUTHORIZED).end();
            }
        })
};

const mypage = (req, res) => {
    const authorization = ensureAuthorization(req, res);
    const { id, name, email } = authorization;
    console.log("auth.id: ", id);
    console.log("마이페이지 접속")

    let pets = {};
    let sql = 'SELECT pet.id as pet_id, pet.name as pet_name FROM pet WHERE pet.user_id = ?'
    conn.query(sql, id,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            return res.status(StatusCodes.OK).json({
                user_name: name,
                email,
                pets: results
            });
        }
    )


};

module.exports = {
    join,
    login,
    mypage
};