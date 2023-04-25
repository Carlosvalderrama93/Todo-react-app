import React from "react";
import { useState, useEffect } from "react";

import Task from "./Task";
import getTodos from "../utils/getTodos";
import saveTodos from "../utils/saveTodos";
import textFormater from "../utils/textFormater";

export default function Base() {
  const [todos, setTodos] = useState(getTodos());
  const [textTask, setTextTask] = useState();
  const [currentTask, setCurrentTask] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    saveTodos(todos);
    setCurrentTask({});
  }, [todos]);

  //CreateTask
  function handleFormSubmit(e) {
    e.preventDefault();
    const textFormated = textFormater(textTask);
    const id = todos.length ? todos[todos.length - 1].id + 1 : 1; // adding an id to the new task.
    textFormated
      ? setTodos([...todos, { id: id, text: textFormated }])
      : alert("write a task");
    setTextTask("");
  }

  //UpdateTask
  function handleUpdateTask(id, updatedTask) {
    updatedTask.text = textFormater(updatedTask.text);
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

  // InputText newTask
  function handleInputChange(e) {
    setTextTask(e.target.value);
  }

  // InputText updateTask
  function handleEditInputChange(e) {
    setCurrentTask({ ...currentTask, text: e.target.value });
  }

  // FIN---------FIN----------FIN

  return (
    <>
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
            value={textTask}
            onChange={handleInputChange}
          />
          <button type="submit">Create</button>
        </form>
      )}

      <ul>
        {todos.map((task) => (
          <Task task={task} />
        ))}
      </ul>
    </>
  );
}
