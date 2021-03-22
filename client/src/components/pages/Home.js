import React, { useEffect, useContext } from 'react';
import Todos from '../todo/Todos';
import TodoForm from '../todo/TodoForm';
import TodoContext from "../../context/todo/TodoContext";

const Home = () => {
  const todoContext = useContext(TodoContext);

  const { getTodos, getOrderOfItems } = todoContext;

  useEffect(() => {
      getOrderOfItems();
      getTodos();
      
  }, []);
    return (
        <div className='grid-2'>
        <div>
          <TodoForm />
        </div>
        <div>
          <Todos />
        </div>
      </div>

    )
}
export default Home;
