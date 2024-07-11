const express = require('express');
const { petInformation, addPet, deletePet, addTodo, deleteTodo } = require('../controller/petController');
const router = express.Router();

router.use(express.json());

// 반려동물 정보 조회
router.get('/:pet_id', petInformation);

// 반려동물 추가
router.post('/', addPet);

// 반려동물 삭제
router.delete('/', deletePet);

// 하루 목표 추가
router.post('/todo', addTodo);

// 하루 목표 삭제
router.delete('/todo', deleteTodo);

module.exports = router;