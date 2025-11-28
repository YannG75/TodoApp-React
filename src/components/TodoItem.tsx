import { useState, KeyboardEvent } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Todo } from '../types'

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: number) => void;
  handleDelete: (id: number) => void;
  handleEdit: (id: number, text: string) => void;
}

function TodoItem({ todo, toggleComplete, handleDelete, handleEdit }: TodoItemProps) {
  // Hook pour le drag and drop
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: todo.id })

  const [canEdit, setCanEdit] = useState(false);
  const [todoText, setTodoText] = useState(todo.text.toString());

  // Style pour le drag & drop
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: todo.isCompleted ? 'lavender' : '#f9f9f9',
    cursor: canEdit ? 'text' : 'grab'  // Change le curseur
  }

  const inputBlured = () => {
    if (todoText.trim() === "") {
      setCanEdit(false);
      setTodoText(todo.text);
      return;
    }
    handleEdit(todo.id, todoText);
    setCanEdit(false);
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') inputBlured()
    if (e.key === 'Escape') {
      setCanEdit(false)
      setTodoText(todo.text)
    }
  }

  return (
    <div
      ref={setNodeRef}
      className="todo"
      style={style}
      {...attributes}
      {...listeners}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#747bff" d="M9 3h2v2H9zm4 0h2v2h-2zM9 7h2v2H9zm4 0h2v2h-2zm-4 4h2v2H9zm4 0h2v2h-2zm-4 4h2v2H9zm4 0h2v2h-2zm-4 4h2v2H9zm4 0h2v2h-2z" /></svg>
      <input type="checkbox" checked={todo.isCompleted} onChange={() => toggleComplete(todo.id)} />
      {
        canEdit ? (
          <input
            type="text"
            autoFocus
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            onBlur={inputBlured}
            onKeyDown={handleKeyDown}
          />
        ) : (<p style={{ margin: '0 15px 0 0', width: '50%' }}>{todo.text}</p>)
      }

      <article style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {!canEdit && <button className="edit" onClick={() => setCanEdit(!canEdit)}>✏️️</button>}
        <button className="del" onClick={() => handleDelete(todo.id)}>🗑️</button>
      </article>
    </div>
  )
}

export default TodoItem
