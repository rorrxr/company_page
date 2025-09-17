const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        // 관리자 이름을 저장하는 필드
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 30,
        },
        // 관리자 비밀번호를 저장하는 필드
        password: {
            type: String,
            required: true,
            select: false,
        },
        // 관리자 중복 로그인을 방지하는 필드
        isLoggedIn: {
            type: Boolean,
            default: false,
        },
        // 계정의 활성 상태를 저장하는 필드
        isActive: {
            type: Boolean,
            default: true,
        },
        // 로그인 실패 횟수를 저장하는 필드
        failedLoginAttempts: {
            type: Number,
            default: 0,
        },
        // 마지막 로그인 시도 날짜를 기록하는 필드
        lastLoginAttempt: {
            type: Date,
        },
        // 관리자 로그인 시 접속 네트워크의 IP 주소를 저장하는 필드
        ipAddress: {
            type: String,
            trim: true,
        },
        // 계정이 생성된 시간을 기록하는 필드
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;