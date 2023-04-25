export default function getTodos() {
    const tasks = localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : [];
    return tasks;
  }