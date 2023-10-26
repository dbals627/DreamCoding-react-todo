import "./App.css";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import { useState } from "react";
import { DarkModeProvider } from "./components/context/DarkModeContext";

//필터종류(고정된 값)
const filters = ["all", "active", "completed"];

function App() {
  //필터는 공통적인 부분이므로 app에 useState
  //현재 선택된 필터 'all'
  const [filter, setFilter] = useState(filters[0]);

  return (
    <>
      <DarkModeProvider>
        {/* 모든 필터, 현재 필터, 필터가 변경되면 호출될 수 있는 setFilter */}
        <Header filters={filters} filter={filter} onFilterChange={setFilter} />
        {/* 현재 상태: All */}
        <TodoList filter={filter} />
      </DarkModeProvider>
    </>
  );
}

export default App;
