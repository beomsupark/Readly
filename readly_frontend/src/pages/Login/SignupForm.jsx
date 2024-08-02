// src/components/SignupForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/AuthAPI";

export default function SignupForm() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        loginId: "",
        loginPwd: "",
        nickname: "",
        memberName: "",
        phoneNumber: "",
        email: "",
        birthday: "",
        gender: "",
        social: "R",
        text: ""
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await signUp(values);
            alert("회원가입에 성공했습니다. 로그인 페이지로 이동합니다.");
            navigate('/login');
        } catch (error) {
            console.error("Signup failed:", error.response.data);
            alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="login-content login-content-signup">
            <div>
                <h2>회원가입</h2>
                <form className="wrapper-box" onSubmit={handleRegister}>
                    <input type="text" className="form-control" id="loginId" placeholder="아이디" onChange={handleChange} value={values.loginId} required />
                    <input type="password" className="form-control" id="loginPwd" placeholder="비밀번호" onChange={handleChange} value={values.loginPwd} required />
                    <input type="text" className="form-control" id="nickname" placeholder="닉네임" onChange={handleChange} value={values.nickname} required />
                    <input type="text" className="form-control" id="memberName" placeholder="이름" onChange={handleChange} value={values.memberName} required />
                    <input type="tel" className="form-control" id="phoneNumber" placeholder="전화번호" onChange={handleChange} value={values.phoneNumber} required />
                    <input type="email" className="form-control" id="email" placeholder="이메일" onChange={handleChange} value={values.email} required />
                    <input type="date" className="form-control" id="birthday" placeholder="생년월일" onChange={handleChange} value={values.birthday} required />
                    <select className="form-control" id="gender" onChange={handleChange} value={values.gender} required>
                        <option value="">성별 선택</option>
                        <option value="M">남성</option>
                        <option value="F">여성</option>
                    </select>
                    <button type="submit" className="btn btn-submit">회원가입</button>
                </form>
            </div>
        </div>
    );
}