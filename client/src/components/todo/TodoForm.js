import React, { useState, useContext, useEffect } from 'react';
import TodoContext from '../../context/todo/TodoContext';

const TodoForm = () => {
    const todoContext = useContext(TodoContext);

    const { addTodo, clearCurrent, current, updateTodo } = todoContext;

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

    const { title, description, checked } = todo;

    const onChange = e => setTodo({ ...todo, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            addTodo(todo);
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
            <h2 className="text-primary">{current ? 'Edit Todo' : 'Add Todo'}</h2>
            <input
                type='text'
                placeholder='Title'
                name='title'
                value={title}
                onChange={onChange}
            />
            <input
                type='text'
                placeholder='Add a description'
                name='description'
                value={description}
                onChange={onChange}
            />
            <div>
                <input
                    type='submit'
                    value={current ? 'Update Todo' : 'Add Todo'}
                    className='btn btn-primary btn-block'
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