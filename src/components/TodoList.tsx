import TodoItem from "./TodoItem";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  toggleComplete: (id: number) => void;
  handleDelete: (id: number) => void;
  handleEdit: (id: number, text: string) => void;
}

function TodoList({ todos, toggleComplete, handleDelete, handleEdit }: TodoListProps) {
  return (
    <SortableContext
      items={todos.map(t => t.id)}
      strategy={verticalListSortingStrategy}
    >
      <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </SortableContext>
  )
}

export default TodoList
