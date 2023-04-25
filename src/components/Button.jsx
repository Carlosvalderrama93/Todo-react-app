import React, { useEffect, useState } from "react";
import getTodos from "../utils/getTodos";
import saveTodos from "../utils/saveTodos";

export default function Button(props) {
  const [todos, setTodos] = useState(getTodos());
  const [currentTask, setCurrentTask] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  //'Edit' button clicked
  function handleEditClick(task) {
    console.log("Edit");
    setIsEditing(true);
    setCurrentTask({ ...task });
    // debugger
  }

  //DeleteTask
  function handleDeleteClick(id) {
    console.log("Delete");
    const removeItem = todos.filter((task) => {
      return task.id !== id;
    });

    setTodos(removeItem);
  }

  if (props.text === "Edit") {
    return (
      <button onClick={() => handleEditClick(props.task)}>{props.text}</button>
    );
  } else if (props.text === "Delete") {
    return (
      <button onClick={() => handleDeleteClick(props.task.id)}>
        {props.text}
      </button>
    );
  }
}
