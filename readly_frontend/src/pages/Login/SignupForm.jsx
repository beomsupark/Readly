import { useState, useEffect } from "react";
import { signUp } from "../../api/authAPI";

export default function SignupForm() {
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

    const [passwordTooltip, setPasswordTooltip] = useState(false);

    useEffect(() => {
        if (values.nickname) {
            setValues(prev => ({
                ...prev,
                text: `${values.nickname} 유저에 대한 설명입니다.`
            }));
        }
    }, [values.nickname]);

    const formatPhoneNumber = (value) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, "");
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        }
        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "phoneNumber") {
            const phoneNumber = value.replace(/[^\d]/g, "");
            setValues((prevValues) => ({
                ...prevValues,
                [id]: phoneNumber
            }));
        } else {
            setValues((prevValues) => ({
                ...prevValues,
                [id]: value
            }));
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const formattedValues = {
            ...values,
            phoneNumber: formatPhoneNumber(values.phoneNumber),
        };

        try {
            const signUpResponse = await signUp(formattedValues);
            console.log("회원가입 응답:", signUpResponse);
            
            alert("회원가입에 성공했습니다! 로그인 페이지로 이동합니다.");
            window.location.href = '/login';
        } catch (error) {
            console.error("Signup failed:", error);
            console.log("Signup failed:", error.errorMessage); // 에러 메시지 콘솔 출력
            alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="login-content login-content-signup">
            <div>
                <h2>회원가입</h2>
                <form className="wrapper-box" onSubmit={handleRegister}>
                    <input type="text" className="form-control" id="loginId" placeholder="아이디" onChange={handleChange} value={values.loginId} required />
                    <div className="relative">
                        <input 
                            type="password" 
                            className="form-control" 
                            id="loginPwd" 
                            placeholder="비밀번호" 
                            onChange={handleChange} 
                            value={values.loginPwd} 
                            required 
                            onMouseEnter={() => setPasswordTooltip(true)}
                            onMouseLeave={() => setPasswordTooltip(false)}
                        />
                        {passwordTooltip && (
                            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg p-2 text-sm text-gray-700">
                                비밀번호는 영문 대문자, 소문자, 숫자 및 특수기호가 각각 최소 1개 이상 포함되어야 하며, 길이는 8자 이상 16자 이하이어야 합니다.
                            </div>
                        )}
                    </div>
                    <input type="text" className="form-control" id="nickname" placeholder="닉네임" onChange={handleChange} value={values.nickname} required />
                    <input type="text" className="form-control" id="memberName" placeholder="이름" onChange={handleChange} value={values.memberName} required />
                    <input type="tel" className="form-control" id="phoneNumber" placeholder="전화번호 (숫자만 입력)" onChange={handleChange} value={values.phoneNumber} required />
                    <input type="email" className="form-control" id="email" placeholder="이메일" onChange={handleChange} value={values.email} required />
                    <div className="mb-4">
                        <input type="date" className="form-control" id="birthday" placeholder="생년월일" onChange={handleChange} value={values.birthday} required />
                    </div>
                    <div>
                        <label className="mr-4">
                            <input type="radio" name="gender" id="gender" value="M" onChange={handleChange} checked={values.gender === "M"} required />
                            남성
                        </label>
                        <label>
                            <input type="radio" name="gender" id="gender" value="F" onChange={handleChange} checked={values.gender === "F"} required />
                            여성
                        </label>
                    </div>
                    <div className="-mt-8">
                        <button type="submit" className="btn btn-submit">회원가입</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
