import React, { useState } from 'react';


export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) return;

    if (editIndex !== null) {
     
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = editValue;
      setTodos(updatedTodos);
      setEditIndex(null);
      setEditValue('');
    } else {
      setTodos([...todos, inputValue]);
    }
    setInputValue('');
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
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
      <h1 className=' text-5xl font-extrabold' >Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input className='mt-[30px] h-12 p-[10px] w-[400px] rounded-lg'
          type="text"
          placeholder="Введите"
          value={editIndex !== null ? editValue : inputValue}
          onChange={handleChange}
        />
        <button type="submit" className='ml-4 bg-black text-white h-12 pl-4 pr-4 rounded-lg'>{editIndex !== null ? 'Сохранить' : 'Добавить'}</button>
        {editIndex !== null && <button type="button" className='rounded-lg bg-black text-white h-12 pl-4 pr-4 ml-4' onClick={handleCancelEdit}>Отмена</button>}
      </form>
      <ul className='mt-[50px] flex h-6 w-[100%] ml-4 '>
        {todos.map((todo, index) => (
          <li className='text-center items-center mt-[20px] ml-5'  key={index}>
            {editIndex === index ? (
              <>
                <input className=' h-8 p-[10px]'
                  type="text"
                  value={editValue}
                  onChange={(event) => setEditValue(event.target.value)}
                />
                <button className='ml-4 bg-black text-white h-8 pl-4 pr-4' onClick={handleSubmit}>Сохранить</button>
                <button className='ml-4 bg-black text-white h-8 pl-4 pr-4' onClick={handleCancelEdit}>Отмена</button>
              </>
            ) : (
              <>
                {todo}
                <button className='ml-4 bg-black text-white h-8 pl-4 pr-4' onClick={() => handleEdit(index)}>Изменить</button>
                <button className='ml-4 bg-black text-white h-8 pl-4 pr-4' onClick={() => handleDelete(index)}>Удалить</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

