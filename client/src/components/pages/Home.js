import React, { Fragment } from 'react';
import Todos from '../todo/Todos';
import TodoForm from '../todo/TodoForm';
const Home = () => {
    return (
        <div>
            <div className="grid-2">
                <h1>Add todo</h1>
            </div>
            <div>
                <Todos />
                <TodoForm />
            </div>
        </div>

    )
}
export default Home;
