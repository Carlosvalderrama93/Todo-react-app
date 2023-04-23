import { useState, useEffect } from "react";

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  const getTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  return getTodos;
}

function formatTask(task) {
  task = task.trim(); // deleting ending and starting spaces
  task = task ? task.charAt(0).toUpperCase() + task.slice(1) : null; // transform the firts letter in uppercase
  const formatedTask = [];
  for (let i = 0; i < task.length; i++) {
    task[i] === " " && task[i + 1] === " "
      ? undefined
      : formatedTask.push(task[i]);
  }

  task = formatedTask.join(""); // Transform the array into a String
  return task;
}

function handleEditFormSubmit(e) {
  e.preventDefault();
  handleUpdateTask(currentTask.id, currentTask);
}
//APP()--------------APP()----------------APP()
export default function App() {
  const [todos, setTodos] = useState(getTodos());
  const [task, setTask] = useState();
  const [currentTask, setCurrentTask] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    saveTodos(todos);
    setCurrentTask({});
  }, [todos]);

  //CreateTask
  function handleFormSubmit(e) {
    e.preventDefault();
    const formatedTask = formatTask(task);
    const id = todos.length ? todos[todos.length - 1].id + 1 : 1; // adding an id to the new task.
    formatedTask
      ? setTodos([...todos, { id: id, text: formatedTask }])
      : alert("write a task");
    setTask("");
  }

  //UpdateTask
  function handleUpdateTask(id, updatedTask) {
    updatedTask.text = formatTask(updatedTask.text);
    const updatedItem = todos.map((task) => {
      return task.id === id ? updatedTask : task;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  }

  //DeleteTask
  function handleDeleteClick(id) {
    const removeItem = todos.filter((task) => {
      return task.id !== id;
    });
    setTodos(removeItem);
  }

  // InputText newTask
  function handleInputChange(e) {
    setTask(e.target.value);
  }

  // InputText updateTask
  function handleEditInputChange(e) {
    setCurrentTask({ ...currentTask, text: e.target.value });
  }

  //'Edit' button clicked
  function handleEditClick(task) {
    setIsEditing(true);
    setCurrentTask({ ...task });
  }

  // FIN---------FIN----------FIN

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
            onChange={handleEditInputChange} // Tampoco sé que hace exactamente esta linea.
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
