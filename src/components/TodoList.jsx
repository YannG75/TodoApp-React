import TodoItem from "./TodoItem";
function TodoList({filteredTodos, toggleComplete, handleDelete}) {
    return (
        filteredTodos.map((todo) => (
            <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                handleDelete={handleDelete}
            />
        ))
    )
}

export default TodoList