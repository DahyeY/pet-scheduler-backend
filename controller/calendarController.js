const conn = require('../mysql')
const { StatusCodes } = require('http-status-codes');
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
// 로그인한 유저의 반려동물인지 확인
const checkOwnership = async (pet_id, user_id) => {
    console.log("pet", pet_id, "user ", user_id);
    const pets = await getPets(user_id);
    if (pets.includes(pet_id)) {
        return true;
    } else {
        return false;
    }
}

const main = async (req, res) => {
    const authorization = ensureAuthorization(req, res);
    const user_id = authorization.id;
    const selected_pet_id = parseInt(req.params.pet_id);
    const { year, month } = req.body;

    if (await checkOwnership(selected_pet_id, user_id)) {
        let response = { selected_pet_id };

        sql = 'SELECT pet.name as name FROM pet WHERE pet.user_id  = ?'
        conn.query(sql, user_id,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }
                else {
                    response.pet = results;
                    console.log(response);
                }
            }
        )

        sql = `SELECT daily_todo_id, completed_at, color
                FROM daily_todo_log dtl
                JOIN daily_todo dt ON dt.id = dtl.daily_todo_id
                WHERE dt.pet_id = ? and YEAR(dtl.completed_at) = ? and MONTH(dtl.completed_at) = ? `;
        let values = [selected_pet_id, year, month];
        conn.query(sql, values,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }
                else {

                    response.todo_log = results;
                    console.log(response);

                }
            }
        )

        sql = 'SELECT date as schedule_date FROM schedule WHERE pet_id  = ?'
        conn.query(sql, selected_pet_id,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }
                else {
                    response.schedule = results;
                    console.log(response);

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
    main
};