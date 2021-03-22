import React, { useState, useContext, useEffect } from 'react';
import TodoContext from '../../context/todo/TodoContext';

const TodoForm = () => {
    const todoContext = useContext(TodoContext);

    const { todos, getTodos, addTodo, clearCurrent, current, updateTodo, updateOrderOfItems, priority } = todoContext;

    useEffect(() => {
        if (current !== null) {
            setTodo(current);
        } else {
            setTodo({
                title: '',
                description: ''
            })
        }
    }, [todoContext, current]);

    const [todo, setTodo] = useState({
        title: '',
        description: '',
        checked: ''
    });

    const addNewItemToPriorityArray = (id) => {
        const items = Array.from(priority);
        items.push(id);
        let object = { priority: { priorityIds: items } }
        updateOrderOfItems(object);
    }

    const { title, description, checked } = todo;

    const onChange = e => setTodo({ ...todo, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            addTodo(todo)
                .then(response => addNewItemToPriorityArray(response._id))
        } else {
            updateTodo(todo);
        }
        clearAll();
    }

    const clearAll = () => {
        clearCurrent();
    }
    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-dark">{current ? 'Edit Todo' : 'Add Todo'}</h2>
            <label class="form-label"></label>
            <input
                type='text'
                placeholder='Title'
                name='title'
                value={title}
                onChange={onChange}
            />
            <label class="form-label"></label>
            <input
                type='text'
                placeholder='Add a description'
                name='description'
                value={description}
                onChange={onChange}
            />
            <label class="form-label"></label>
            <div>
                <input
                    type='submit'
                    value={current ? 'Update Todo' : 'Add Todo'}
                    className='btn btn-dark btn-block'
                />
            </div>
            {current && <div>
                <button className="btn btn-light btn-block" onClick={clearAll}>Clear
                    </button>
            </div>}
        </form>
    )
};

export default TodoForm;