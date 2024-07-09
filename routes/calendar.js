const express = require('express');
const { main, daily, addSchedule, deleteSchedule } = require('../controller/calendarController');
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
router.put('/:pet_id/:date/schedules', (req, res) => { res.send("일정 체크") });

// 하루 목표 완료
router.post('/:pet_id/:date/todos', (req, res) => { res.send("하루목표 완료") });

// 하루 목표 미완료
router.delete('/:pet_id/:date/todos', (req, res) => { res.send("하루목표 미완료") });

module.exports = router;