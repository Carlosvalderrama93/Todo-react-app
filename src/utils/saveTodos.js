export default function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
