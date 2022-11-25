import { renderTodo } from "./todos";
import { TodosInterface, StorageNameEnum } from "./todos/todos.model";

export function addTodo(form: HTMLFormElement) {
  if (
    (form["title"] as unknown as HTMLInputElement).value.length === 0 ||
    (form["task"] as unknown as HTMLTextAreaElement).value.length === 0
  ) {
    alert("No se pudo agregar TODO");
  } else {
    const newTodo: TodosInterface = {
      title: (form["title"] as unknown as HTMLInputElement).value,
      task: (form["task"] as unknown as HTMLTextAreaElement).value,
      check: false,
    };
    const todos: TodosInterface[] = JSON.parse(
      localStorage.getItem(StorageNameEnum.TODOS) as string
    );
    todos.push(newTodo);
    localStorage.setItem(StorageNameEnum.TODOS, JSON.stringify(todos));
    (form["title"] as unknown as HTMLInputElement).value = "";
    (form["task"] as unknown as HTMLTextAreaElement).value = "";
    renderTodo();
  }
}
