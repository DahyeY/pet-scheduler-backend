const conn = require('../mysql')
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const ensureAuthorization = require('../auth');

// 유저의 반려동물 목록 
const getPets = (id) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT id as pet_id FROM pet WHERE user_id  = ?';
        let pets = []
        conn.query(sql, id,
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                else {
                    pets = results.map(item => item.pet_id);
                    resolve(pets);
                }
            }
        )
    })

}

const checkOwnership = async (pet_id, user_id) => {
    // 로그인한 유저의 반려동물인지 확인

    const pets = await getPets(user_id);
    if (pets.includes(pet_id)) {
        return true;
    } else {
        return false;
    }
}

const petInformation = async (req, res) => {
    const authorization = ensureAuthorization(req, res);
    const user_id = authorization.id;

    const { pet_id } = req.body;
    if (checkOwnership(pet_id, user_id)) {
        let response = {};

        sql = 'SELECT pet.name as name FROM pet WHERE pet.id  = ?'
        conn.query(sql, pet_id,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }
                else {

                    response.name = results[0].name;
                }
            }
        )

        sql = 'SELECT id as todo_id, title, color FROM daily_todo WHERE pet_id  = ?'
        conn.query(sql, pet_id,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }
                else {

                    response.daily_todo = results;
                }
            }
        )

        sql = 'SELECT id as schedule_id, title FROM schedule WHERE pet_id  = ?'
        conn.query(sql, pet_id,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }
                else {
                    response.schedule = results;
                    return res.status(StatusCodes.OK).json(response);
                }
            }
        )

    }
    else {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "로그인한 유저의 반려동물이 아닙니다."
        });
    }

}



module.exports = {
    petInformation,

};