import { TodosInterface, StorageNameEnum } from "./todos/todos.model";

export function showTodos() {
  const taskList = document.querySelector<HTMLDivElement>("#taskList");
  const dataLocalStorage: string | null = localStorage.getItem(
    StorageNameEnum.TODOS
  );
  let todos: TodosInterface[] | null;

  if (dataLocalStorage !== null) {
    todos = JSON.parse(dataLocalStorage);
    if (todos?.length === 0 && taskList != null) {
      taskList.innerHTML = "No hay Todos";
    } else if (taskList != null) {
      todos?.forEach((item: TodosInterface) => {
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
        buttonDelete.classList.add("btn", "button__container--delete");
        buttonDelete.innerHTML = "Delete";

        const buttonCheck = document.createElement("button");
        buttonCheck.classList.add("btn", "button__container--check");
        buttonCheck.innerHTML = "Check";

        buttonContainer.append(buttonDelete, buttonCheck);
        todoItemContent.append(task);
        div.append(title, hr, todoItemContent, buttonContainer);

        taskList.append(div);
        //     taskList.innerHTML = `
        //     <div class="todoItem">
        //         <p class="todoItem__title">${item?.title}</p>
        //         <hr />
        //         <div class="todoItem__content">
        //             <p class="todoItem__task">${item?.task}</p>
        //         </div>
        //         <div class="button__container">
        //             <button class="btn button__container--delete">Delete</button>
        //             <button class="btn button__container--check">check</button>
        //         </div>

        //     </div>
        // `;
      });
    }
  } else {
    localStorage.setItem(StorageNameEnum.TODOS, JSON.stringify([]));
    if (taskList != null) taskList.innerHTML = "No hay Todos";
  }
}
