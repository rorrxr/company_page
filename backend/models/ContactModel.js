const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true,
            trim : true, // 좌우측 공백 삭제
        },
        email: {
            type: String, 
            required: true,
            trim : true, // 좌우측 공백 삭제
        },
        phone: {
            type: String, 
            required: true,
            trim : true, // 좌우측 공백 삭제
        },
        message: {
            type: String, 
            required: true,
            trim : true, // 공백 삭제
        },
        status: {
            type: String, 
            enum: ['in Progress', 'pending', 'complated'], // 상태 값 제한
            default: 'in Progress',
            trim : true, // 좌우측 공백 삭제
        },
        createAt: {
            type: Date, 
            default: Date.now
        }
    },
    { timestamps: true, }
);

const Contact = mongoose.model('Contact', contactSchema);

