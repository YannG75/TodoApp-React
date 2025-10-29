import {useState, useEffect} from 'react'
import './App.css'
import TodoList from "./components/TodoList.jsx";
import TodoForm from "./components/TodoForm.jsx";
import {DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";

function App() {
    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            distance: 10,
        },
    });
    const touchSensor = useSensor(TouchSensor, {
        // Press delay of 250ms, with tolerance of 5px of movement
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });
    const sensors = useSensors(mouseSensor, touchSensor);

    const [todos, setTodos] = useState(() => {
        // Fonction d'initialisation (elle ne s'exécute qu'une seule fois)
        const savedTodos = localStorage.getItem('todos')
        if (savedTodos) {
            return JSON.parse(savedTodos)
        }
        return []
    })
    const [inputValue, setInputValue] = useState('')
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!inputValue) return

        const newTodo = {
            id: Date.now(),
            text: inputValue,
            isCompleted: false,
        }

        setTodos([...todos, newTodo])
        setInputValue('')
        localStorage.setItem('todos', JSON.stringify(todos))
    }


    const toggleComplete = (id) => {
        console.log("toggle")
        setTodos(todos.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo))
    }

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const handleEdit = (id, todoText) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, text: todoText} : todo))
    }

    const handleClearCompleted = () => {
        setTodos(todos.filter(todo => !todo.isCompleted))
    }

    const toggleAll = () => {
        const allCompleted = todos.every(todo => todo.isCompleted)
        setTodos(todos.map(todo => ({...todo, isCompleted: !allCompleted})))
    }

    const handleDragEnd = (event) => {
        const {active, over} = event

        if (active.id === over.id) return

        setTodos(todos => {
            const oldIndex = todos.findIndex(todo => todo.id === active.id)
            const newIndex = todos.findIndex(todo => todo.id === over.id)

            return arrayMove(todos, oldIndex, newIndex)
        })
    }

    const getFilteredTodos = () => {
        if (filter === "active") return todos.filter(todo => !todo.isCompleted)
        if (filter === "completed") return todos.filter(todo => todo.isCompleted)
        else return todos;
    }
    const filteredTodos = getFilteredTodos();

    return (
        <>
            <div className="app">
                <h1 style={{color: "#747bff"}}>Todo App</h1>
                <div>
                    <p>Nombre de todos : {todos.length}</p>
                    <p style={{marginTop: 0}}>{todos.filter(todo => !todo.isCompleted).length} tâche(s) restante(s)
                        sur {todos.length}</p>
                </div>

                <TodoForm
                    handleSubmit={handleSubmit}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
                <section>
                    <article
                        style={{display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-around'}}>
                        <button style={{backgroundColor: filter === 'all' ? 'lavender' : '#f9f9f9'}}
                                onClick={() => setFilter('all')}>Toutes
                        </button>
                        <button style={{backgroundColor: filter === 'active' ? 'lavender' : '#f9f9f9'}}
                                onClick={() => setFilter('active')}>actives
                        </button>
                        <button style={{backgroundColor: filter === 'completed' ? 'lavender' : '#f9f9f9'}}
                                onClick={() => setFilter('completed')}>Complétées
                        </button>
                    </article>
                </section>
                <article style={{display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-around'}}>
                    {todos.length !== 0 && <button
                        onClick={toggleAll}>
                        {todos.every(t => t.isCompleted) ? "tout Décocher" : "tout cocher"}
                    </button>
                    }
                    {todos.some(todo => todo.isCompleted) &&
                        <button onClick={handleClearCompleted}>Supprimer les tâches complétées</button>}
                </article>
                <DndContext
                collisionDetection={closestCenter}
                sensors={sensors}
                onDragEnd={handleDragEnd}
                >
                    <TodoList
                        todos={filteredTodos}
                        toggleComplete={toggleComplete}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                </DndContext>
            </div>
        </>
    )
}

export default App
