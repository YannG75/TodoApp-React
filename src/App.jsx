import { useState, useEffect } from 'react'
import './App.css'
import TodoList from "./components/TodoList.jsx";
import TodoForm from "./components/TodoForm.jsx";

function App() {
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

    function handleSubmit(e) {
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


    function toggleComplete(id) {
        console.log("toggle")
       setTodos(todos.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted}: todo))
    }

    function handleDelete(id) {
        setTodos(todos.filter(todo => todo.id !== id))
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
          <section >
              <article style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-around'}}>
                  <button style={{backgroundColor: filter === 'all' ? 'lavender' : '#f9f9f9' }} onClick={() => setFilter('all')}>Toutes</button>
                  <button style={{backgroundColor: filter === 'active' ? 'lavender' : '#f9f9f9' }} onClick={() => setFilter('active')}>actives</button>
                  <button style={{backgroundColor: filter === 'completed' ? 'lavender' : '#f9f9f9' }} onClick={() => setFilter('completed')}>Complétées</button>
              </article>
          </section>
          <TodoList
              filteredTodos={filteredTodos}
              toggleComplete={toggleComplete}
              handleDelete={handleDelete}
          />
      </div>
    </>
  )
}

export default App
