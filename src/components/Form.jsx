import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    axios.get('/db.json')
      .then(response => {
        setTodos(response.data.tasks.map(task => task.name));
      })
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const saveTodosToDB = (updatedTodos) => {
    axios.patch('/db.json', { tasks: updatedTodos.map((name, id) => ({ id: id.toString(), name })) })
      .then(response => console.log('Todos saved:', response))
      .catch(error => console.error('Error saving todos:', error));
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) return;

    const updatedTodos = [...todos, inputValue];
    setTodos(updatedTodos);
    saveTodosToDB(updatedTodos);
    setInputValue('');
    setEditIndex(null);
    setEditValue('');
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    saveTodosToDB(updatedTodos);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(todos[index]);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditValue('');
  };

  return (
    <div className='mt-12 items-center text-center'>
      <h1 className=' text-5xl font-extrabold'>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          className='mt-[30px] h-12 p-[10px] w-[400px] rounded-lg'
          type="text"
          placeholder="Enter"
          value={editIndex !== null ? editValue : inputValue}
          onChange={handleChange}
        />
        <button type="submit" className='ml-4 bg-black text-white h-12 pl-4 pr-4 rounded-lg'>
          {editIndex !== null ? 'Save' : 'Add'}
        </button>
        {editIndex !== null && <button type="button" className='rounded-lg bg-black text-white h-12 pl-4 pr-4 ml-4' onClick={handleCancelEdit}>Cancel</button>}
      </form>
      <ul className='mt-[50px] flex h-6 w-[100%] ml-4'>
        {todos.map((todo, index) => (
          <li className='text-center items-center mt-[20px] ml-5' key={index}>
            {editIndex === index ? (
              <>
                <input
                  className=' h-8 p-[10px]'
                  type="text"
                  value={editValue}
                  onChange={(event) => setEditValue(event.target.value)}
                />
                <button className='ml-4 bg-black text-white h-8 pl-4 pr-4' onClick={handleSubmit}>Save</button>
                <button className='ml-4 bg-black text-white h-8 pl-4 pr-4' onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                {todo}
                <button className='ml-4 bg-black text-white h-8 pl-4 pr-4' onClick={() => handleEdit(index)}>Edit</button>
                <button className='ml-4 bg-black text-white h-8 pl-4 pr-4' onClick={() => handleDelete(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
