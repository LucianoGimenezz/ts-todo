import { FormDataNames, TodosInterface, StorageNameEnum } from './todos/todos.model'

export function addTodo(form: FormData) {

  if ((form.get(FormDataNames.TITLE) as string).length === 0 
  || (form.get(FormDataNames.TASK) as string).length === 0) {
        alert('No se pudo agregar TODO');
  }else {
    const newTodo: TodosInterface = {
        title: form.get(FormDataNames.TITLE) as string,
        task: form.get(FormDataNames.TASK) as string
    }
    const todos: TodosInterface [] = JSON.parse(localStorage.getItem(StorageNameEnum.TODOS) as  string);
    todos.push(newTodo);
    localStorage.setItem(StorageNameEnum.TODOS, JSON.stringify(todos));
  }
}