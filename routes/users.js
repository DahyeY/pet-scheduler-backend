const express = require('express');
const router = express.Router();
const { join, login, mypage } = require('../controller/userController');

router.use(express.json());

// 회원가입
router.post('/join', join);

// 로그인
router.post('/login', login);

// 마이페이지
router.get('/mypage', mypage);

module.exports = router;