import { useState, useEffect } from "react";

export default function UpdateInfoPage() {
  const [values, setValues] = useState({
    userid: "",
    password: "",
    confirm: "",
    username: "",
    nickname: "",
    phone: "",
    email: "",
    birthdate: "",
    gender: "",
  });

  useEffect(() => {
    // Fetch user data from an API or some source and set the initial values
    // Assuming you have a function fetchUserData that returns user data
    const userData = fetchUserData();
    setValues({
      ...values,
      userid: userData.userid,
      username: userData.username,
      nickname: userData.nickname,
      phone: userData.phone,
      email: userData.email,
      birthdate: userData.birthdate,
      gender: userData.gender,
    });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle the form submission logic here, e.g., send the updated data to the server
    console.log(values);
  };

  return (
    <div className="login-content login-content-signup">
      <div>
        <h2>정보 수정</h2>
        <form className="wrapper-box" onSubmit={handleRegister}>
          <input
            type="text"
            className="form-control"
            id="userid"
            placeholder="아이디"
            value={values.userid}
            disabled
          />
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="비밀번호"
            onChange={handleChange}
            value={values.password}
            required
          />
          <input
            type="password"
            className="form-control"
            id="confirm"
            placeholder="비밀번호 확인"
            onChange={handleChange}
            value={values.confirm}
            required
          />
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="이름"
            value={values.username}
            disabled
          />
          <input
            type="text"
            className="form-control"
            id="nickname"
            placeholder="닉네임"
            onChange={handleChange}
            value={values.nickname}
            required
          />
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="전화번호"
            onChange={handleChange}
            value={values.phone}
            required
          />
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="이메일"
            onChange={handleChange}
            value={values.email}
            required
          />
          <input
            type="text"
            className="form-control"
            id="birthdate"
            placeholder="생년월일"
            onChange={handleChange}
            value={values.birthdate}
            required
          />
          <input
            type="text"
            className="form-control"
            id="gender"
            placeholder="성별"
            onChange={handleChange}
            value={values.gender}
            required
          />
          <button type="submit" className="btn btn-submit">
            정보 수정하기
          </button>
        </form>
      </div>
    </div>
  );
}