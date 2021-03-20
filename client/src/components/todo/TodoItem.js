import React, { useContext, Fragment } from 'react'
import PropTypes from 'prop-types';
import TodoContext from '../../context/todo/TodoContext';

const TodoItem = ({ todo }) => {
    const todoContext = useContext(TodoContext);

    const { deleteTodo, setCurrent, clearCurrent } = todoContext;
    const {title, description, checked, _id, date} = todo;

    const onDelete = () => {
        deleteTodo(_id);
        clearCurrent();
    }

    let newDate = new Date(date).toDateString();

    return (
       <div className='card bg-light'>
           <h3 className="text-primary text-left">
               {title}{' '} 
               <span className={'badge ' + (checked ? 
               'badge-success' : 'badge-primary')}></span>
            </h3>
            <ul className="list">
                {description && ( 
                    <li>
                        <i className='fas fa-phone'/> {description}
                    </li>)}
            </ul>
            <ul className="list">
                {date && ( 
                    <li>
                        <i className='fas fa-phone'/> {newDate}
                    </li>)}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm"onClick={() => setCurrent(todo)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
       </div>
    )
};

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
}
export default TodoItem;