import {useState} from 'react'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'

function TodoItem({todo, toggleComplete, handleDelete, handleEdit}) {
    // Hook pour le drag and drop
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({id: todo.id})

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

    return (
        <div
            ref={setNodeRef}
            className="todo"
            style={style}
            {...attributes}
            {...listeners}
        >
            <input type="checkbox" checked={todo.isCompleted} onChange={() => toggleComplete(todo.id)}/>
            {
                canEdit ? (
                    <input
                        type="text"
                        autoFocus
                        value={todoText}
                        onChange={(e) => setTodoText(e.target.value)}
                        onBlur={inputBlured}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') inputBlured()
                            if (e.key === 'Escape') {
                                setCanEdit(false)
                                setTodoText(todo.text)
                            }
                        }}
                    />
                ) : (<p style={{margin: '0 15px 0 0', width: '50%'}}>{todo.text}</p>)
            }

            <article style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                {!canEdit && <button className="edit" onClick={() => setCanEdit(!canEdit)}>✏️️</button>}
                <button className="del" onClick={() => handleDelete(todo.id)}>🗑️</button>
            </article>
        </div>
    )

}

export default TodoItem