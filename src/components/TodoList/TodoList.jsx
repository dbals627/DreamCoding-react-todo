import React, { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from "./TodoList.module.css";
import { useEffect } from "react";

export default function TodoList({ filter }) {
  //모든 해야 할 일을 담고 있는 데이터 (useState)
  const [todos, setTodos] = useState(() => readTodosFromLocalStorage());

  //새로운 투두를 todos에 업데이트
  const handleAdd = (todo) => setTodos([...todos, todo]);
  //업데이트 하고 싶은 것만
  const handleUpdate = (updated) =>
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  //투두 삭제
  const handleDelete = (deleted) =>
    setTodos(todos.filter((t) => t.id !== deleted.id));

  //마운트(투두가 변경될때마다 스토리지에 저장)
  //'todos'라는 키에 객체 저장(JSON으로 저장)
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //필터된 아이템만 가져옴
  const filtered = getFilteredItems(todos, filter);

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {/* 필터링 된 아이템만 맵 */}
        {filtered.map((item) => (
          //<li>태그였음
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>

      {/* 사용자에게 입력받는 로직 */}
      {/* add가 되면 handleAdd 콜백함수 호출 */}
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}
//스토리지 저장 함수
function readTodosFromLocalStorage() {
  console.log("readTodosFromLocalStorage");
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

function getFilteredItems(todos, filter) {
  if (filter === "all") {
    return todos;
  }
  //투두의 상태와 필터가 같을 때만 필터링
  return todos.filter((todo) => todo.status === filter);
}
