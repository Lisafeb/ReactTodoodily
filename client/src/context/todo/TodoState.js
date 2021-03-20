import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoContext from './TodoContext';
import todoReducer from './TodoReducer';
import {
    ADD_TODO,
    DELETE_TODO,
    SET_TODO,
    UPDATE_TODO,
    CLEAR_TODO,
    SET_CURRENT,
    CLEAR_CURRENT
} from '../types';

const TodoState = props => {
    const initialState = {
        todos: [
            {
                "checked": false,
                "id": "3",
                "title": "first",
                "description": "some description",
                "date": "2021-03-19T21:18:48.601Z"
            },
            {
                "checked": true,
                "id": "2",
                "title": "second",
                "description": "some description",
                "date": "2021-03-19T21:18:49.601Z"
            },
            {
                "checked": false,
                "id": "1",
                "title": "third",
                "description": "some description",
                "date": "2021-03-19T21:18:49.601Z"
            }
        ],
        current: null
    };

    const [state, dispatch] = useReducer(todoReducer, initialState);

    // ADD
    const addTodo = todo => {
        todo.id = uuidv4();
        dispatch({ type: ADD_TODO, payload: todo });
    }
    // DELETE
    const deleteTodo = id => {
        dispatch({ type: DELETE_TODO, payload: id });
    }
    // SET
    const setCurrent = todo => {
        dispatch({ type: SET_CURRENT, payload: todo });
    }
    // CLEAR
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }
    // UPDATE
    const updateTodo = todo => {
        dispatch({ type: UPDATE_TODO, payload: todo });
    }
    return (
        <TodoContext.Provider
            value={{
                todos: state.todos,
                current: state.current,
                addTodo,
                deleteTodo,
                setCurrent,
                clearCurrent,
                updateTodo
            }}
        >
            { props.children}
        </TodoContext.Provider>
    )
};

export default TodoState;