import { useState } from "react";
import "./TodoApp.css";

export default function TodoApp(){
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('')
    const [filter, setFilter] = useState('all')

    const handleAddTodo = (e) => {
        if (newTodo.trim() !== ''){
            const newTodoItem = {
                id: Date.now(),
                text: newTodo,
                completed: false,
                isEditing: false
            }
            setTodos([...todos, newTodoItem])
            setNewTodo('')
        }
    }

    const handleToggleCompleted = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? {...todo,completed: !todo.completed} : todo
        ))
    }

    const handleDeleteTodo = (id) => {
    if (window.confirm('Yakin mau dihapus?')) {
        if (window.confirm('Yang bener?')) {
            if (window.confirm('Serius nih?')) {
                const todoToDelete = todos.find(todo => todo.id === id);

                setTodos(todos.filter(todo => todo.id !== id));

                window.alert(`Saya harap kamu tidak menyesal, karena "${todoToDelete.text}" itu penting sekali`);
            }
        }
    }
}


    const handleStartEdit = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? {...todo, isEditing: true} : {...todo, isEditing: false}
            
        ));
    }

    const handleSaveEdit = (id, newText) => {
        if(newText.trim() === '') return;
        setTodos(todos.map(todo => 
            todo.id === id ? {...todo, text: newText, isEditing: false} : todo
        ));
        alert('anda mengubah ke: ' + newText)
    }

    const filterTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    })


    return(
        <div className="todo-container">
            <h1>Todo App</h1>
            <div className="todo-input">
                <input 
                type="text" 
                value={newTodo} 
                onChange={(e) => setNewTodo(e.target.value)} 
                onKeyDown={(e) => e.key === "Enter" && handleAddTodo(todos.id, e.target.value)}
                placeholder="tambah tugas kamu, jangan kebanyakan ya! nanti sakit 😊"
                />
                <button onClick={handleAddTodo}>
                    Tambah Tugas
                </button>
            </div>

            <div className="todo-filters">
                <button onClick={() => setFilter('all')}>Semua</button>
                <button onClick={() => setFilter('active')}>Belum Selesai</button>
                <button onClick={() => setFilter('completed')}>Selesai</button>
            </div>

            <div className="todo-list">
                {filterTodos.map(todo => {
                    return (
                        <div className="todo-item" key={todo.id}>
                            <input 
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleCompleted(todo.id)}
                            />

                            {todo.isEditing ? (
                                <input 
                                    type="text"
                                    defaultValue={todo.text}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(todo.id, e.target.value)}
                                    autoFocus
                                />

                            ): (
                                <span
                                onDoubleClick={() => handleStartEdit(todo.id)}
                                className={todo.completed ? 'completed' : ''}
                                >
                                    {todo.text}
                                </span>
                            )}

                            <button
                                onClick={() => handleDeleteTodo(todo.id)}
                                title="hapus todo"
                            >
                                <img src="delete.png" alt="hapus" style={{width: '16px'}}/>
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}