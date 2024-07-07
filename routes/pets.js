const express = require('express');
const { petInformation, addPet, addTodo, deleteTodo } = require('../controller/petController');
const router = express.Router();

router.use(express.json());

// 반려동물 정보 조회
router.get('/', petInformation);

// 반려동물 추가
router.post('/', addPet);

// 하루 목표 추가
router.post('/todo', addTodo);

// 하루 목표 삭제
router.delete('/todo', deleteTodo);

module.exports = router;