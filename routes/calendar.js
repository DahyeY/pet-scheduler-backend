const express = require('express');
const router = express.Router();

router.use(express.json());

// 반려동물 별 기본 달력
router.get('/:pet_id', (req, res) => { res.send("기본 달력") });

// 반려동물 별 날짜
router.get('/:date', (req, res) => { res.send("날짜") });

// 일정 추가
router.post('/:date', (req, res) => { res.send("일정 추가") });

// 일정 삭제
router.delete('/:date', (req, res) => { res.send("일정 삭제") });

module.exports = router;