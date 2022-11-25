import { renderTodo } from "./todos";
import { TodosInterface } from "./todos/todos.model";
import { StorageNameEnum } from "./todos/todos.model";

export function deleteTodo(btn: HTMLButtonElement) {
  let indexToRemove: number = parseInt(btn.classList[2]);
  const todos: TodosInterface[] = JSON.parse(
    localStorage.getItem(StorageNameEnum.TODOS) || "[]"
  );
  todos.splice(indexToRemove, 1);
  localStorage.setItem(StorageNameEnum.TODOS, JSON.stringify(todos));
  renderTodo();
}
