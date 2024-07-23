import { useState } from "react";
// import { login } from "../api/AuthAPI";

export default function LoginForm() {
    const [values, setValues] = useState({
        userid: "",
        password: "",
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        login(values)
            .then((response) => {
                localStorage.clear();
                localStorage.setItem('tokenType', response.tokenType);
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('refreshToken', response.refreshToken);
                window.location.href = `/home`;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="login-content login-content-signin">
            <div>
                <h2>로그인</h2>
                <form className="wrapper-box" onSubmit={handleLogin}>
                    <input type="text" className="form-control" id="userid" placeholder="아이디" onChange={handleChange} value={values.userid} required />
                    <input type="password" className="form-control" id="password" placeholder="비밀번호" onChange={handleChange} value={values.password} required />
                    <button type="submit" className="btn btn-submit">로그인</button>
                </form>
            </div>
        </div>
    );
}
