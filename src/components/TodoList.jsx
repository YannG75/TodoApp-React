import TodoItem from "./TodoItem";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";

function TodoList({todos, toggleComplete, handleDelete, handleEdit}) {
    return (
        <SortableContext
            items={todos.map(t => t.id)}
            strategy={verticalListSortingStrategy}
        >
            <div style={{marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
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