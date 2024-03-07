import React from "react";
import styles from "../login/Login.module.css";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import logo from "../../images/logo.png";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [displayName, setDisplayName] = useState("");

  const { error, isPending, signup } = useSignup();

  const handleData = (event) => {
    if (event.target.type === "email") {
      setEmail(event.target.value);
    } else if (event.target.type === "password") {
      setPassword(event.target.value);
    } else if (event.target.type === "text") {
      setDisplayName(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password, displayName);
    signup(email, password, displayName);
  };

  return (
    <>
      <main>
        <h2 className={styles["img-title"]}>
          <img className={styles.logo} src={logo} alt="로고 이미지" />
          <strong className={styles.line}>회원가입</strong>
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

          <label className="label-style" htmlFor="user-nickname">
            닉네임
          </label>
          <input
            className="input-style"
            id="user-nickname"
            type="text"
            required
            onChange={handleData}
            value={displayName}
          ></input>

          <button className="black-btn" type="submit">
            회원가입
          </button>
        </form>
      </main>
    </>
  );
}
