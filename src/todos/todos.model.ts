export interface TodosInterface {
  title: string;
  task: string;
  check: boolean;
}

export enum FormDataNames {
  TITLE = "title",
  TASK = "task",
}

export enum StorageNameEnum {
  TODOS = "TODOS",
}
