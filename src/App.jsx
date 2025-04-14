import { useState } from "react";
import { v4 as uuid } from "uuid";

function App() {
  const [todo, setTodo] = useState();
  const [todolist, setTodolist] = useState([]);

  const onInputChange = (e) => setTodo(e.target.value);

  const onAddClick = () => {
    if (!todo?.trim()) return;
    setTodolist([...todolist, { id: uuid(), todo: todo.trim(), isCompleted: false }]);
    setTodo("");
  };

  const onDeleteClick = (id) => {
    const updatedList = todolist.filter((todo) => todo.id !== id);
    setTodolist(updatedList);
  };

  const isTaskCompleted = (id) => {
    const updatedList = todolist.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodolist(updatedList);
  };

  const onKeyDown = (e) => e.key === "Enter" && onAddClick();

  return (
    <div className="container">
      <div className="container-child">
        <h1>Todo List</h1>
        <div>
          <input
            type="text"
            value={todo}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            placeholder="Add task"
          />
          <button onClick={onAddClick}>Add</button>
        </div>
        {todolist.length > 0 &&
          todolist.map((todo) => (
            <div key={todo.id} className="task">
              <label className={todo.isCompleted ? "completed" : ""}>
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => isTaskCompleted(todo.id)}
                />
                <span>{todo.todo}</span>
              </label>
              <button onClick={() => onDeleteClick(todo.id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
