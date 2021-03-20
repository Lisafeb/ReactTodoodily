import React, { useReducer } from 'react';
import TodoContext from './TodoContext';
import todoReducer from './TodoReducer';
import {
    ADD_TODO,
    DELETE_TODO,
    SET_TODO,
    UPDATE_TODO,
    CLEAR_TODO,
    SET_CURRENT,
    CLEAR_CURRENT,
    TODO_ERROR,
    GET_TODOS,
    CLEAR_TODOS
} from '../types';
import axios from 'axios';

const TodoState = props => {
    const initialState = {
        todos: null,
        current: null,
        error: null
    };

    const [state, dispatch] = useReducer(todoReducer, initialState);

    // ADD
    const addTodo = async todo => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('/api/todos', todo, config);
            dispatch({
                type: ADD_TODO,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: TODO_ERROR,
                payload: error.response.msg
            });
        }
    };

    // UPDATE
    const updateTodo = async todo => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.put(`/api/todos/${todo._id}`, todo, config);
            dispatch({
                type: UPDATE_TODO,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: TODO_ERROR,
                payload: error.response.msg
            });
        }
    }

    // DELETE
    const deleteTodo = async id => {
        try {
            axios.delete(`/api/todos/${id}`);

            dispatch({ 
                type: DELETE_TODO, 
                payload: id 
            });
        } catch (error) {
            dispatch({
                type: TODO_ERROR,
                payload: error.response.msg
            });
        }
       
    }
    // SET
    const setCurrent = todo => {
        dispatch({ type: SET_CURRENT, payload: todo });
    }
    // CLEAR
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }
    
    // GET ALL
    const getTodos = async () => {
        try {
            const res = await axios.get('/api/todos');
            dispatch({
                type: GET_TODOS,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: TODO_ERROR,
                payload: error.response.msg
            });
        }
    }
    return (
        <TodoContext.Provider
            value={{
                todos: state.todos,
                current: state.current,
                error: state.error,
                addTodo,
                deleteTodo,
                setCurrent,
                clearCurrent,
                updateTodo,
                getTodos
            }}
        >
            { props.children}
        </TodoContext.Provider>
    )
};

export default TodoState;