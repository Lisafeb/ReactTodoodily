import React, { useContext, useEffect, Fragment } from 'react'
import TodoContext from "../../context/todo/TodoContext";
import TodoItem from "./TodoItem";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Todos = () => {
    const todoContext = useContext(TodoContext);

    const { todos, getTodos, loading } = todoContext;

    useEffect(() => {
        getTodos();
    }, []);

    function handleOnDragEnd(result) {
        if (!result.destination) return;
    
        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        console.log(items)
        //updateTodos(items);
      }

    if (todos !== null && todos.length === 0 && !loading) {
        return <h4>Please add a contact</h4>
    }
    return (
        <Fragment>
            {todos !== null && !loading ? (

                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="todos">
                        {(provided) => (
                            <ul className="list-unstyled" {...provided.droppableProps} ref={provided.innerRef}>
                                {todos.map(todo => (
                                    <Draggable key={todo.title} draggableId={todo.title} index={todo.priority}>
                                        {(provided) => (
                                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <TransitionGroup>
                                                    <CSSTransition key={todo._id} timeout={500} classNames="item">

                                                        <TodoItem key={todo._id} todo={todo} />
                                                    </CSSTransition>
                                                </TransitionGroup>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>



            ) : <Spinner />}
        </Fragment>
    )
};

export default Todos;