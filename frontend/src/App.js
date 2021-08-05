import React from 'react';
import TodoList from "./todo/TodoList";

function App() {
    const [todos, setTodos] = React.useState([
        { id: 1, completed: false, title: 'Title 1'},
        { id: 2, completed: false, title: 'Title 2'},
        { id: 3, completed: false, title: 'Title 3'}
    ]);

    function changeStatus(id) {
        setTodos(todos.map(item => {
            if(item.id === id) {
                item.completed = !item.completed
            }
            return item;
        }))
    }

    return (
        <div className='wrapper'>
            <h1>Title</h1>
            <TodoList todos={todos}s onChange={changeStatus}/>
        </div>
    );
}

export default App;
