import { useState, useEffect } from "react";
// import { updateUserInfo, getUserInfo } from "../api/UserAPI"; // 사용자 정보 업데이트 및 조회 함수를 불러옵니다.

export default function UserInfoUpdateForm() {
    const [values, setValues] = useState({
        userid: "",
        password: "",
        confirm: "",
        username: "",
        nickname: "",
        phone: "",
        email: "",
        birthdate: "",
        gender: ""
    });

    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');

    useEffect(() => {
        // 컴포넌트 마운트 시 사용자 정보를 가져옵니다.
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const userInfo = await getUserInfo(); // 사용자 정보를 가져오는 API 호출
            setValues(prevValues => ({
                ...prevValues,
                ...userInfo,
                password: '', // 보안상 비밀번호는 비워둡니다
                confirm: ''
            }));
        } catch (error) {
            console.error("Failed to fetch user info:", error);
            alert("사용자 정보를 불러오는데 실패했습니다.");
        }
    };

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const passwordCheckResult = passwordCheckHandler(values.password, values.confirm);
        if (passwordCheckResult) {
            setPasswordError('');
            setConfirmError('');
        } else {
            return;
        }

        try {
            await updateUserInfo(values);
            alert("회원 정보가 성공적으로 업데이트되었습니다.");
            // 필요하다면 여기서 로그아웃 처리나 다른 페이지로 리다이렉트할 수 있습니다.
        } catch (error) {
            console.error("Failed to update user info:", error);
            alert("회원 정보 업데이트에 실패했습니다.");
        }
    };

    const passwordCheckHandler = (password, confirm) => {
        const passwordRegex = /^[a-z\d!@*&-_]{8,16}$/;
        if (password === '') {
            setPasswordError('비밀번호를 입력해주세요.');
            return false;
        } else if (!passwordRegex.test(password)) {
            setPasswordError('비밀번호는 8~16자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.');
            return false;
        } else if (confirm !== password) {
            setPasswordError('');
            setConfirmError('비밀번호가 일치하지 않습니다.');
            return false;
        } else {
            setPasswordError('');
            setConfirmError('');
            return true;
        }
    };

    return (
        <div className="login-content login-content-signup ml-0">
            <div>
                <h2>회원 정보 수정</h2>
                <form className="wrapper-box" onSubmit={handleUpdate}>
                    <input type="text" className="form-control" id="userid" placeholder="아이디" value={values.userid} disabled />
                    <input type="password" className="form-control" id="password" placeholder="새 비밀번호" onChange={handleChange} value={values.password} />
                    {passwordError && <small>{passwordError}</small>}
                    <input type="password" className="form-control" id="confirm" placeholder="새 비밀번호 확인" onChange={handleChange} value={values.confirm} />
                    {confirmError && <small>{confirmError}</small>}
                    <input type="text" className="form-control" id="username" placeholder="이름" onChange={handleChange} value={values.username} disabled />
                    <input type="text" className="form-control" id="nickname" placeholder="닉네임" onChange={handleChange} value={values.nickname} required />
                    <input type="text" className="form-control" id="phone" placeholder="전화번호" onChange={handleChange} value={values.phone} required />
                    <input type="email" className="form-control" id="email" placeholder="이메일" onChange={handleChange} value={values.email} required />
                    <input type="text" className="form-control" id="birthdate" placeholder="생년월일" onChange={handleChange} value={values.birthdate} required />
                    <input type="text" className="form-control" id="gender" placeholder="성별" onChange={handleChange} value={values.gender} required />
                    <button type="submit" className="btn btn-submit">정보 수정</button>
                </form>
            </div>
        </div>
    );
}