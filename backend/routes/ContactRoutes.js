const express = require('express');
const router = express.Router();
const Contact = require('../models/ContactModel');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    
    // 토큰이 없을 때
    if (!token) {
        // 토큰이 없습니다 반환
        return res.status(401).json({ message: '토큰이 없습니다' });
    }

    try{
        // JWT 토큰 검증
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 토큰이 유효할 때, 사용자 정보를 요청 객체에 추가
        req.user = decoded;

        // 다음 미들웨어 또는 라우트 핸들러로 이동
        next();
    }catch(err){
        // 토큰이 유효하지 않을 때
        return res.status(403).json({ message: '유효하지 않은 토큰입니다' });
    }
}

router.post('/', async (req, res) => {
    try{
        const { name, email, phone, message, status } = req.body;
        const Contact = new Contact({ name, email, phone, message, status });

        await Contact.save();
        res.status(201).json({ message: '문의가 성공적으로 저장되었습니다.' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 모든 문의 가져오기
router.get('/', authenticateToken, async (req, res) => {
    try{
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 특정 문의 가져오기
router.get('/:id', authenticateToken, async (req, res) => {
    try{
        const contacts = await Contact.findById(req.params.id);
        
        // 문의가 없을 때
        if(!contacts){
            return res.status(404).json({ message: '문의를 찾을 수 없습니다' });
        }
        res.status(200).json(contacts);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 문의 상태 업데이트
router.put('/:id', authenticateToken, async (req, res) => {
    try{
        const { status } = req.body;

        const contact = await Contact.findByIdAndUpdate(req.params.id);
        // 문의가 없을 때
        if(!contact){
            return res.status(404).json({ message: '문의를 찾을 수 없습니다' });
        }

        res.status(200).json({ message: '문의가 성공적으로 업데이트되었습니다.' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 문의 삭제
router.delete('/:id', authenticateToken, async (req, res) => {
    try{
        const contact = await Contact.findByIdAndDelete(req.params.id);
        // 문의가 없을 때
        if(!contact){
            return res.status(404).json({ message: '문의를 찾을 수 없습니다' });
        }
        res.status(200).json({ message: '문의가 성공적으로 삭제되었습니다.' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    }
});

module.exports = router;