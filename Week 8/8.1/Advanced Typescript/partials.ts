interface Todo {
  title: string;
  description: string;
  id: number;
  done: boolean;
}

type UpdateTodoInput = Partial<Todo>; // Indicates that values present in interfaces are optional.

function UpdateTodo(id: number, newProp: UpdateTodoInput) {}

UpdateTodo(1, {
  description: "new title",
});
