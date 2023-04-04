import { useState, useEffect } from "react";
import "./App.css";

function getTodos() {
  const getTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  return getTodos;
}

function App() {
  const [todos, setTodos] = useState(getTodos());
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => setTask(e.target.value);

  function handleFormSubmit(e) {
    let id;
    e.preventDefault();
    if (task !== "") {
      if (todos.length === 0) {
        id = 1;
      } else {
        id = todos[todos.length - 1].id + 1;
      }
      setTodos([...todos, { id: id, text: task.trim() }]);
      console.log("id de la ultima posición +1: ", todos);
    }
    setTask("");
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((task) => {
      return task.id !== id;
    });
    setTodos(removeItem);
  }

  const handleEditInputChange = (e) =>
    setCurrentTask({ ...currentTask, text: e.target.value });

  function handleEditClick(task) {
    setIsEditing(true);
    setCurrentTask({ ...task });
  }

  function handleUpdateTask(id, updatedTask) {
    const updatedItem = todos.map((task) => {
      return task.id === id ? updatedTask : task;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();
    handleUpdateTask(currentTask.id, currentTask);
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      {isEditing ? (
        <form onSubmit={handleEditFormSubmit}>
          <input
            name="editTodo"
            type="text"
            placeholder="Edit task"
            value={currentTask.text}
            onChange={handleEditInputChange} // Tampoco sé que hace exactamente esta liena.
          />
          <button type="submit">Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <input
            name="task"
            type="text"
            placeholder="Create a new task"
            value={task}
            onChange={handleInputChange}
          />
        </form>
      )}

      <ul className="task-list">
        {todos.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => handleEditClick(task)}>Edit</button>
            <button onClick={() => handleDeleteClick(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
