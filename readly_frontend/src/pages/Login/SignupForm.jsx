import { useState } from "react";
// import { signUp, idDuplicateCheck } from "../api/AuthAPI"; // idDuplicateCheck 함수를 불러옵니다.

export default function SignupForm() {
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

    const [idError, setIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');

    const [isIdCheck, setIsIdCheck] = useState(false); // 중복 검사를 했는지 안했는지
    const [isIdAvailable, setIsIdAvailable] = useState(false);

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const idCheckResult = await idCheckHandler(values.userid);
        if (idCheckResult) setIdError('');
        else return;

        if (!isIdCheck || !isIdAvailable) {
            alert('아이디 중복 검사를 해주세요.');
            return;
        }

        const passwordCheckResult = passwordCheckHandler(values.password, values.confirm);
        if (passwordCheckResult) {
            setPasswordError('');
            setConfirmError('');
        } else {
            return;
        }

        signUp(values)
            .then((response) => {
                window.location.href = `/login`;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const idCheckHandler = async (id) => {
        const idRegex = /^[a-z\d]{5,10}$/;
        if (id === '') {
            setIdError('아이디를 입력해주세요.');
            setIsIdAvailable(false);
            return false;
        } else if (!idRegex.test(id)) {
            setIdError('아이디는 5~10자의 영소문자, 숫자만 입력 가능합니다.');
            setIsIdAvailable(false);
            return false;
        }
        try {
            const responseData = await idDuplicateCheck(id);
            if (responseData) {
                setIdError('사용 가능한 아이디입니다.');
                setIsIdCheck(true);
                setIsIdAvailable(true);
                return true;
            } else {
                setIdError('이미 사용중인 아이디입니다.');
                setIsIdAvailable(false);
                return false;
            }
        } catch (error) {
            alert('서버 오류입니다. 관리자에게 문의하세요.');
            console.error(error);
            return false;
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
        <div className="login-content login-content-signup">
            <div>
                <h2>회원가입</h2>
                <form className="wrapper-box" onSubmit={handleRegister}>
                    <input type="text" className="form-control" id="userid" placeholder="아이디" onChange={handleChange} value={values.userid} required />
                    {idError && <small className={isIdAvailable ? 'idAvailable' : ''}>{idError}</small>}
                    <input type="password" className="form-control" id="password" placeholder="비밀번호" onChange={handleChange} value={values.password} required />
                    {passwordError && <small>{passwordError}</small>}
                    <input type="password" className="form-control" id="confirm" placeholder="비밀번호 확인" onChange={handleChange} value={values.confirm} required />
                    {confirmError && <small>{confirmError}</small>}
                    <input type="text" className="form-control" id="username" placeholder="이름" onChange={handleChange} value={values.username} required />
                    <input type="text" className="form-control" id="nickname" placeholder="닉네임" onChange={handleChange} value={values.nickname} required />
                    <input type="text" className="form-control" id="phone" placeholder="전화번호" onChange={handleChange} value={values.phone} required />
                    <input type="email" className="form-control" id="email" placeholder="이메일" onChange={handleChange} value={values.email} required />
                    <input type="text" className="form-control" id="birthdate" placeholder="생년월일" onChange={handleChange} value={values.birthdate} required />
                    <input type="text" className="form-control" id="gender" placeholder="성별" onChange={handleChange} value={values.gender} required />
                    <button type="submit" className="btn btn-submit">회원가입</button>
                </form>
            </div>
        </div>
    );
}
