import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./AddTodo.module.css";

///input창과 add버튼 컴포넌트

function AddTodo({ onAdd }) {
  //사용자가 입력받는 텍스트
  const [text, setText] = useState("");
  //입력값으로 설정
  const handleChange = (e) => setText(e.target.value);
  const handlesubmit = (e) => {
    //페이지 새로고침 방식
    e.preventDefault();
    //빈 텍스트는 입력 x
    //trim을 하는 순간 앞뒤여백이 사라짐
    if (text.trim().length === 0) {
      return;
    }
    //입력값 추가
    onAdd({ id: uuidv4(), text, status: "active" });
    //인풋창 초기화
    setText("");
  };
  return (
    <form className={styles.form} onSubmit={handlesubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Add Todo"
        value={text}
        onChange={handleChange}
      />
      <button className={styles.button}>Add</button>
    </form>
  );
}

export default AddTodo;
