import { TodosInterface, StorageNameEnum } from "./todos/todos.model";
import { deleteTodo } from "./modifyTodo";

export function renderTodo() {
  const taskList = document.querySelector<HTMLDivElement>("#taskList");
  //Elimino lo que este en el DOM para evitar duplicar contenido
  taskList != null ? (taskList.innerHTML = "") : null;
  const dataLocalStorage: string | null = localStorage.getItem(
    StorageNameEnum.TODOS
  );
  let todos: TodosInterface[] | null;

  if (dataLocalStorage !== null) {
    todos = JSON.parse(dataLocalStorage);
    if (todos?.length === 0 && taskList != null) {
      taskList.innerHTML = "No hay Todos";
    } else if (taskList != null) {
      todos?.forEach((item: TodosInterface, index) => {
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
        buttonDelete.classList.add(
          "btn",
          "button__container--delete",
          `${index}`
        );
        buttonDelete.innerHTML = "Delete";

        const buttonCheck = document.createElement("button");
        buttonCheck.classList.add("btn", "button__container--check");
        buttonCheck.innerHTML = "Check";

        buttonContainer.append(buttonDelete, buttonCheck);
        todoItemContent.append(task);
        div.append(title, hr, todoItemContent, buttonContainer);

        taskList.append(div);
      });

      const button = document.querySelectorAll<HTMLButtonElement>(
        ".button__container--delete"
      );
      button.forEach((btn: HTMLButtonElement) => {
        btn.addEventListener("click", (e: Event) => {
          deleteTodo(e.target as HTMLButtonElement);
        });
      });
    }
  } else {
    localStorage.setItem(StorageNameEnum.TODOS, JSON.stringify([]));
    if (taskList != null) taskList.innerHTML = "No hay Todos";
  }
}
