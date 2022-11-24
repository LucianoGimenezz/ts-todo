import "./style.css";
import { addTodo } from "./addTodo";
import { showTodos } from "./todos";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <section class="container">
      <h1>Add Todos</h1>
      <form class="container__addTodo">
        <input name="title" type="text" placeholder="Title" />
        <textarea name="task" placeholder="new Todo..."></textarea>
        <button type="submit" class="addTodo">Add</button>
      </form>
  </section>
`;
const form = document.querySelector<HTMLFormElement>(".container__addTodo");

form?.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  addTodo(formData);
});

document.addEventListener("DOMContentLoaded", () => {
  showTodos();
});