import React from "react";
import styles from "./Home.module.css";
import DiaryForm from "./DiaryForm";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import DiaryList from "./DiaryList";
import Weather from "../../components/Weather";

export default function Home() {
  const { user } = useAuthContext();
  const { documents, err } = useCollection("diary", ["uid", "==", user.uid]);
  console.log(err);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return (
    <div className="container">
      <main className={styles["diary-main"]}>
        <Weather />
        <h2 className={styles["diary-title"]}>
          {year}년 {month}월 {day}일의 일기
        </h2>
        <DiaryForm uid={user.uid} />
      </main>
      <section>
        <h2 className="a11y-hidden">일기 목록</h2>
        <ul>
          {err && <strong>{err}</strong>}
          {documents && <DiaryList diaries={documents}></DiaryList>}
        </ul>
      </section>
    </div>
  );
}
