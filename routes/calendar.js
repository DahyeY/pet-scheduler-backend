const express = require('express');
const { main, daily, addSchedule, deleteSchedule, checkSchedule, addDailyTodoLog, deleteDailyTodoLog } = require('../controller/calendarController');
const router = express.Router();

router.use(express.json());

// 반려동물 별 기본 달력
router.get('/:pet_id', main);

// 반려동물 별 날짜
router.get('/:pet_id/daily', daily);

// 일정 추가
router.post('/:pet_id/schedules', addSchedule);

// 일정 삭제
router.delete('/:pet_id/schedules', deleteSchedule);

// 일정 완료 체크
router.put('/:pet_id/schedules', checkSchedule);

// 하루 목표 완료
router.post('/:pet_id/todos', addDailyTodoLog);

// 하루 목표 미완료
router.delete('/:pet_id/todos', deleteDailyTodoLog);

module.exports = router;