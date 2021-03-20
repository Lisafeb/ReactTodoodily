import React, { useContext, Fragment } from 'react'
import TodoContext from "../../context/todo/TodoContext";
import TodoItem from "./TodoItem";

const Todos = () => {
    const todoContext = useContext(TodoContext);

    const { todos } = todoContext;
    console.log(todos)
    return (
        <Fragment>
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </Fragment>
    )
};

export default Todos;