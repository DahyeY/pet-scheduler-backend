const express = require('express');
const { petInformation } = require('../controller/petController');
const router = express.Router();

router.use(express.json());

// 반려동물 정보 조회
router.get('/', petInformation);

// 반려동물 추가
router.post('/', (req, res) => { res.send("반려동물 추가") });

// 하루 목표 추가
router.post('/todo', (req, res) => { res.send("하루 목표 추가") });

// 하루 목표 삭제
router.delete('/todo', (req, res) => { res.send("하루 목표 삭제") });

module.exports = router;