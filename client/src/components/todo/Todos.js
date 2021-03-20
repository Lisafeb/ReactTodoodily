import React, { useContext, Fragment } from 'react'
import TodoContext from "../../context/todo/TodoContext";
import TodoItem from "./TodoItem";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Todos = () => {
    const todoContext = useContext(TodoContext);

    const { todos } = todoContext;
    console.log(todos)
    return (
        <Fragment>
            <TransitionGroup>
                {todos.map(todo => (
                    <CSSTransition key={todo.id} timeout={500} classNames="item">
                        <TodoItem key={todo.id} todo={todo} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </Fragment>
    )
};

export default Todos;