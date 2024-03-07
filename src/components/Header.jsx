import styles from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.png";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Header() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const location = useLocation();

  return (
    <header>
      <div className={styles["header-wrap"]}>
        <h1>
          <Link to="/">
            <img className={styles.logo} src={logo} alt="로고 이미지" />
          </Link>
        </h1>
        <div>
          {!user && (
            <div className={styles["sign_wrap"]}>
              {location.pathname !== "/signup" ? (
                <>
                  <Link to="/login" className={"btn-join"}>
                    로그인
                  </Link>
                  <Link to="/signup" className={"btn-join"}>
                    회원가입
                  </Link>
                </>
              ) : (
                <Link to="/login" className={"btn-join"}>
                  로그인
                </Link>
              )}
            </div>
          )}

          {user && (
            <div className={styles["welcome_wrap"]}>
              <p>
                환영합니다 <strong>{user.displayName}</strong>님!
              </p>
              <Link to="/" className="btn-logout" onClick={logout}>
                로그아웃
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
