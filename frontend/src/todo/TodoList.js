import React from 'react';
import TodoItem from "./TodoItem";
import PropTypes from "prop-types"

const styles = {
    ul: {
        listStyle: 'none'
    }
}

function TodoList(props) {
    return (
        <ul style={styles.ul}>
            { props.todos.map( (todo, index) => {
                return (
                    <TodoItem
                        todo={todo}
                        index={index}
                        key={todo.id}
                        onChange={props.onChange}
                    />
                )
            }) }
        </ul>
    )
}

TodoList.propTypes = {
    todos: PropTypes.array,
    onChange: PropTypes.func.isRequired
}

export default TodoList
