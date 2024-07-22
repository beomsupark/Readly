const LoginForm = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // 로그인 로직 추가
  };

  return (
    <div className="login-content login-content-signin">
      <div>
        <h2>로그인</h2>
        <form className="wrapper-box" onSubmit={handleLogin}>
          <input type="id" className="form-control" placeholder="아이디" required />
          <input type="password" className="form-control" placeholder="비밀번호" required />
          <button type="submit" className="btn btn-submit">로그인</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;