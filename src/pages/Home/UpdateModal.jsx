import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useFirestore } from "../../hooks/useFirestore";
export default function UpdateModal({ setModalShow, item }) {
  const { id, title, text } = item;
  const [newTitle, setNewTitle] = useState(title);
  const [newText, setNewText] = useState(text);
  const { updateDocument } = useFirestore("diary");

  const handleUpdate = (e) => {
    e.preventDefault();
    updateDocument(id, { title: newTitle, text: newText });
    setModalShow(false);
  };
  return (
    <div>
      <form id={styles["modal"]} onSubmit={handleUpdate}>
        <div className={styles["modal-wrap"]}>
          <div className={styles["close-wrap"]}>
            <button
              className={styles["modal-close"]}
              onClick={() => setModalShow(false)}
            >
              X
            </button>
          </div>
          <h3 className={styles["modal-title"]}>수정하기</h3>
          <input
            type="text"
            value={newTitle}
            className={styles["modal-input"]}
            placeholder="제목"
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <textarea
            value={newText}
            className={styles["modal-textarea"]}
            placeholder="오늘은 어떤 하루였나요?"
            onChange={(e) => setNewText(e.target.value)}
            required
          />
          <button type="submit" className={styles["modal-fixBtn"]}>
            수정하기
          </button>
        </div>
      </form>
    </div>
  );
}
