import React, { useContext, Fragment } from 'react'
import PropTypes from 'prop-types';
import TodoContext from '../../context/todo/TodoContext';
import { Button } from 'react-bootstrap';

const TodoItem = ({ todo }) => {
    const todoContext = useContext(TodoContext);

    const { deleteTodo, setCurrent, clearCurrent, updateTodo, priority, updateOrderOfItems } = todoContext;
    const { title, description, checked, _id, date } = todo;

    const onDelete = (id) => {
        deleteTodo(id);
        removeItemFromPriorityArray(id)
        clearCurrent();
    }

    const removeItemFromPriorityArray = (id) => {
        const items = Array.from(priority);
        let index = items.indexOf(id);
        items.splice(index, 1);
        let object = { priority: { priorityIds: items } }
        updateOrderOfItems(object);
    }
    const onCheck = () => {
        todo.checked = !todo.checked
        updateTodo(todo)
    }
    let newDate = new Date(date).toDateString();

    return (
        <div className="todo">
            <div style={{ textDecoration: todo.checked ? "line-through" : "" }}>
                <h4 className="text-primary text-left">
                    {title}{' '}
                    <span className={'badge ' + (checked ?
                        'badge-success' : 'badge-primary')}></span>
                </h4>
                <ul className="list">
                    {description && (
                        <li>
                            {description}
                        </li>)}
                </ul>

            </div>
            <div className="span1">
                <Button variant="outline-success" onClick={onCheck}>✔</Button>{' '}
                <Button variant="outline-info" onClick={() => setCurrent(todo)}>✎ </Button>{' '}
                <Button variant="outline-danger" onClick={() => onDelete(todo._id)}>✖</Button>

            </div>

        </div>
    )
};

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
}
export default TodoItem;