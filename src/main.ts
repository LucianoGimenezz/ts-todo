import "./style.css";
import { addTodo } from "./addTodo";
import { renderTodo } from "./todos";

export const filterByPending = document.querySelector("#pending");
export const filterByCompleted = document.querySelector("#completed");
export const filterByAll = document.querySelector("#all");

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
  addTodo(e.target as HTMLFormElement);
});

window.addEventListener("hashchange", () => {
  if (window.location.hash.startsWith("#/pending")) {
    renderTodo();
    filterByPending?.classList.add("selected");
    if (filterByAll?.classList.contains("selected")) {
      filterByAll?.classList.remove("selected");
    } else {
      filterByCompleted?.classList.remove("selected");
    }
  } else if (window.location.hash.startsWith("#/completed")) {
    renderTodo();
    filterByCompleted?.classList.add("selected");
    if (filterByAll?.classList.contains("selected")) {
      filterByAll.classList.remove("selected");
    } else {
      filterByPending?.classList.remove("selected");
    }
  } else {
    renderTodo();
    filterByAll?.classList.add("selected");
    if (filterByCompleted?.classList.contains("selected")) {
      filterByCompleted?.classList.remove("selected");
    } else {
      filterByPending?.classList.remove("selected");
    }
  }
});

renderTodo();
