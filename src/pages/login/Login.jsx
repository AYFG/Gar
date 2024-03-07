import { useLogin } from "../../hooks/useLogin";
import styles from "./Login.module.css";
import { useState } from "react";
import logo from "../../images/logo.png";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isPending, login } = useLogin();

  const handleData = (event) => {
    if (event.target.type === "email") {
      setEmail(event.target.value);
    } else if (event.target.type === "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
    login(email, password);
  };

  return (
    <>
      <main>
        <h2 className={styles["img-title"]}>
          <img className={styles.logo} src={logo} alt="로고 이미지" />
          <strong className={styles.line}>로그인</strong>
        </h2>

        <form className={styles["form-wrap"]} onSubmit={handleSubmit}>
          <label className="label-style" htmlFor="user-email">
            이메일
          </label>
          <input
            className="input-style"
            id="user-email"
            type="email"
            required
            onChange={handleData}
            value={email}
          />

          <label className="label-style" htmlFor="user-pw">
            비밀번호
          </label>
          <input
            className="input-style"
            id="user-pw"
            type="password"
            required
            onChange={handleData}
            value={password}
            autoComplete="currnet-password"
          />

          {isPending && <strong>로그인이 진행중입니다.</strong>}
          {!isPending && (
            <button className="black-btn" type="submit">
              로그인
            </button>
          )}
          {error && <strong>{error}</strong>}
        </form>
      </main>
    </>
  );
}
