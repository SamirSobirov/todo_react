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
      // Если индекс для редактирования задачи установлен
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
    <div className='ml-6'>
      <h1 className='text-white'>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите"
          value={editIndex !== null ? editValue : inputValue}
          onChange={handleChange}
        />
        <button type="submit">{editIndex !== null ? 'Сохранить' : 'Добавить'}</button>
        {editIndex !== null && <button type="button" onClick={handleCancelEdit}>Отмена</button>}
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(event) => setEditValue(event.target.value)}
                />
                <button onClick={handleSubmit}>Сохранить</button>
                <button onClick={handleCancelEdit}>Отмена</button>
              </>
            ) : (
              <>
                {todo}
                <button onClick={() => handleEdit(index)}>Изменить</button>
                <button onClick={() => handleDelete(index)}>Удалить</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

