const express = require('express');
const router = express.Router();

router.use(express.json());

// 회원가입
router.post('/join', (req, res) => { res.send("회원가입") });

// 로그인
router.post('/login', (req, res) => { res.send("로그인") });

// 마이페이지
router.get('/mypage', (req, res) => { res.send("마이페이지") });

module.exports = router;