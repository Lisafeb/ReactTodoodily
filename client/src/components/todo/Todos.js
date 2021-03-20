import React, { useContext, useEffect, Fragment } from 'react'
import TodoContext from "../../context/todo/TodoContext";
import TodoItem from "./TodoItem";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';

const Todos = () => {
    const todoContext = useContext(TodoContext);

    const { todos, getTodos, loading } = todoContext;

    useEffect(() => {
        getTodos();
    }, []);

    if(todos !== null && todos.length === 0 && !loading) {
        return <h4>Please add a contact</h4>
    }
    return (
        <Fragment>
            {todos !== null && !loading ? (
            <TransitionGroup>
                {todos.map(todo => (
                    <CSSTransition key={todo._id} timeout={500} classNames="item">
                        <TodoItem key={todo._id} todo={todo} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
            ) : <Spinner/> }
        </Fragment>
    )
};

export default Todos;