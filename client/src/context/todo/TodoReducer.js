import {
    ADD_TODO,
    DELETE_TODO,
    SET_TODO,
    UPDATE_TODO,
    CLEAT_TODO,
    SET_CURRENT,
    CLEAR_CURRENT
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo)
            }
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }

        default:
            return state;
    }
}