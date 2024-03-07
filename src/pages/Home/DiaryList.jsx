import React, { useState } from "react";
import styles from "./Home.module.css";
import iconEdit from "../../images/icon-edit.svg";
import iconDelete from "../../images/icon-delete.svg";
import { useFirestore } from "../../hooks/useFirestore";
import UpdateModal from "./UpdateModal";

function formatFirebaseTimestamp(firebaseTimestamp) {
  const date = firebaseTimestamp.toDate();
  const formattedDate = date.toISOString().split("T")[0];
  const formattedTime =
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0");
  return formattedDate + " " + formattedTime;
}

export default function DiaryList({ diaries }) {
  const { deleteDocument } = useFirestore("diary");
  const [modalShow, setModalShow] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const openModal = (item) => {
    setCurrentItem(item);
    setModalShow(true);
  };
  return (
    <>
      {diaries.map((item) => {
        return (
          <li key={item.id}>
            <article className={styles["diary-article"]}>
              <h3 className={styles["article-title"]}>{item.title}</h3>
              <time
                className={styles["article-time"]}
                dateTime={formatFirebaseTimestamp(item.createdTime)}
              >
                {formatFirebaseTimestamp(item.createdTime)}
              </time>
              <p className={styles["article-content"]}>{item.text}</p>

              <div className={styles["button-group"]}>
                <button type="button" onClick={() => openModal(item)}>
                  <img src={iconEdit} alt="수정" />
                </button>
                <span></span>
                <button type="button" onClick={() => deleteDocument(item.id)}>
                  <img src={iconDelete} alt="삭제" />
                </button>
              </div>
            </article>
          </li>
        );
      })}
      {modalShow && (
        <UpdateModal setModalShow={setModalShow} item={currentItem} />
      )}
    </>
  );
}
