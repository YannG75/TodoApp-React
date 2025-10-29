function TodoItem({todo, toggleComplete, handleDelete}) {
    return (
        <div className="todo"
             style={todo.isCompleted ? {backgroundColor: 'lavender'} : {backgroundColor: '#f9f9f9'}}>
            <input type="checkbox" checked={todo.isCompleted} onChange={() => toggleComplete(todo.id)}/>
            <p style={{margin: '0 15px 0 0'}}>{todo.text}</p>
            <article style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                <button className="del" onClick={() => handleDelete(todo.id)}>🗑️</button>
            </article>
        </div>
    )

}

export default TodoItem