import { TodosInterface, StorageNameEnum } from "./todos/todos.model";
import { deleteTodo, checkTodo } from "./modifyTodo";
import { filterByAll, filterByCompleted, filterByPending } from "./main";

const taskList = document.querySelector<HTMLDivElement>("#taskList");

function createElement(item: TodosInterface, index: number) {
  const div = document.createElement("div");
  div.classList.add("todoItem");
  const title = document.createElement("p");
  title.classList.add("todoItem__title");
  title.innerHTML = item.title;
  const hr = document.createElement("hr");
  const todoItemContent = document.createElement("div");
  todoItemContent.classList.add("todoItem__content");
  const task = document.createElement("p");
  task.classList.add("todoItem__task");
  task.innerHTML = item.task;
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button__container");
  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("btn", "button__container--delete", `${index}`);
  buttonDelete.innerHTML = "Delete";
  const buttonCheck = document.createElement("button");
  buttonCheck.classList.add("btn", "button__container--check", `${index}`);
  buttonCheck.innerHTML = "Check";
  if (item.check) {
    buttonCheck.classList.add("button__container--checked");
    buttonCheck.innerHTML = "Checked";
  }

  buttonContainer.append(buttonDelete, buttonCheck);
  todoItemContent.append(task);
  div.append(title, hr, todoItemContent, buttonContainer);

  taskList?.append(div);
}

export function renderTodo() {
  //Elimino lo que este en el DOM para evitar duplicar contenido
  taskList != null ? (taskList.innerHTML = "") : null;
  const dataLocalStorage: string | null = localStorage.getItem(
    StorageNameEnum.TODOS
  );
  let todos: TodosInterface[] | null;

  if (dataLocalStorage !== null) {
    todos = JSON.parse(dataLocalStorage);
    if (todos?.length === 0 && taskList != null) {
      document.querySelector<HTMLElement>(".footer")?.classList.add("hidden");
      taskList.innerHTML = "No hay Todos";
    } else if (taskList != null) {
      document
        .querySelector<HTMLElement>(".footer")
        ?.classList.remove("hidden");
      if (window.location.hash.startsWith("#/pending")) {
        filterByPending?.classList.add("selected");
        if (filterByAll?.classList.contains("selected")) {
          filterByAll?.classList.remove("selected");
        } else {
          filterByCompleted?.classList.remove("selected");
        }
      } else if (window.location.hash.startsWith("#/completed")) {
        filterByCompleted?.classList.add("selected");
        if (filterByAll?.classList.contains("selected")) {
          filterByAll.classList.remove("selected");
        } else {
          filterByPending?.classList.remove("selected");
        }
      } else {
        filterByAll?.classList.add("selected");
        if (filterByCompleted?.classList.contains("selected")) {
          filterByCompleted?.classList.remove("selected");
        } else {
          filterByPending?.classList.remove("selected");
        }
      }
      if (window.location.hash.startsWith("#/pending")) {
        todos?.forEach((item: TodosInterface, index) => {
          if (!item.check) {
            createElement(item, index);
          }
        });
      } else if (window.location.hash.startsWith("#/completed")) {
        todos?.forEach((item: TodosInterface, index) => {
          if (item.check) {
            createElement(item, index);
          }
        });
      } else {
        todos?.forEach((item: TodosInterface, index) => {
          createElement(item, index);
        });
      }

      const button = document.querySelectorAll<HTMLButtonElement>(
        ".button__container--delete"
      );

      const buttonCheck = document.querySelectorAll<HTMLButtonElement>(
        ".button__container--check"
      );

      for (let index = 0; index < button.length; index++) {
        button[index].addEventListener("click", (e: Event) => {
          deleteTodo(e.target as HTMLButtonElement);
        });
        buttonCheck[index].addEventListener("click", (e: Event) => {
          checkTodo(e.target as HTMLButtonElement);
        });
      }
    }
  } else {
    localStorage.setItem(StorageNameEnum.TODOS, JSON.stringify([]));
    if (taskList != null) {
      document.querySelector<HTMLElement>(".footer")?.classList.add("hidden");
      taskList.innerHTML = "No hay Todos";
    }
  }
}
