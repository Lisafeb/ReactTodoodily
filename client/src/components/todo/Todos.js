import React, { useContext, useEffect, Fragment } from 'react'
import TodoContext from "../../context/todo/TodoContext";
import TodoItem from "./TodoItem";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Todos = () => {
    const todoContext = useContext(TodoContext);

    const { todos, getTodos, loading, priority, getOrderOfItems, updateOrderOfItems } = todoContext;

    useEffect(() => {
        getTodos();
    }, [])

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(priorityArray);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        makePriorityObjectAndUpdate(items)
        priorityArray = items;
    }

    const makePriorityObjectAndUpdate = (priorityArray) => {
        let object = { priority: { priorityIds: priorityArray } }
        updateOrderOfItems(object);
    }
    let priorityArray = []
    if (priority !== null && todos !== null && todos.length === 0 && !loading) {
        return <h4>Add something new on your todo list</h4>
    }

    if (priority !== [] && priority !== null) {

        priorityArray = priority;
    }
    return (
        <Fragment>
            { priorityArray !== [] && priorityArray !== null && todos !== null && !loading ? (

                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="todos">
                        {(provided) => (
                            <ul className="list-unstyled" {...provided.droppableProps} ref={provided.innerRef}>
                                {priorityArray.map(itemId =>
                                    todos.find(todo => todo._id === itemId) ? (
                                        <Draggable key={itemId} draggableId={itemId} index={priorityArray.indexOf(itemId)}>
                                            {(provided) => (
                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <TransitionGroup>
                                                        <CSSTransition key={itemId} timeout={500} classNames="item">
                                                            <Card className="mb-2">
                                                                <Card.Header>
                                                                    {new Date(todos.find(
                                                                        todo => todo._id === itemId
                                                                    ).date).toDateString()}
                                                                </Card.Header>
                                                                <Card.Body>

                                                                    <TodoItem
                                                                        key={itemId}
                                                                        todo={todos.find(
                                                                            todo => todo._id === itemId
                                                                        )} />

                                                                </Card.Body>
                                                            </Card>

                                                        </CSSTransition>
                                                    </TransitionGroup>
                                                </li>
                                            )}
                                        </Draggable>
                                    ) : null
                                )}
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