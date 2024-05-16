import React, { useState } from 'react';

export default function TodoList() {
    const [todos, setTodos] = useState([]);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const form = e.target;
        const inp = form.querySelector('input[name="task"]');
        const task = inp.value.trim();

        if (task === '') {
            inp.classList.add('inp_empty');
        } else {
            inp.classList.remove('inp_empty');

            const time = new Date().getHours() + ":" + new Date().getMinutes();
            const newTodo = {
                id: Math.random(),
                task: task,
                completed: false,
                time: time
            };
            setTodos([...todos, newTodo]);
            inp.value = '';
        }
    };

    const removeTodo = (id) => {
        const filteredTodos = todos.filter(todo => todo.id !== id);
        setTodos(filteredTodos);
    };

    const toggleTodoCompletion = (clickedTodo) => {
        const updatedTodos = todos.map(todo =>
            todo.id === clickedTodo.id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

 

    return (
        <div className="main-div mx-auto w-1000">
            <div className="todo-text flex justify-center py-[50px]">
                <h1 className='text-4xl '>Todo List</h1>
            </div>
            <form name="creater" className="flex justify-center " onSubmit={formSubmitHandler}>
                <label className="flex gap-4">
                    <input type="text" name="task" placeholder="Enter task here" className="w-321 h-42 border-2 border-black rounded-lg px-5 transition duration-300" />
                    <button type="submit" className="w-[155px] h-[42px] bg-black rounded-lg text-white">Add</button>
                </label>
            </form>
            <hr className='mt-4 ' />
            <div className="container px-[20px] pt-8 pr-[50px] grid grid-cols-3 gap-20 ">
                {todos.length === 0 ?
                    <img src="https://raw.githubusercontent.com/SamirSobirov/Todo_List/main/img/nothing.jpeg" alt="image" className="w-full ml-[100%]" />
                    :
                    todos.map(todo => (
                        <div  key={todo.id} className= {`box ${todo.completed ? 'completed' : ' border-[1px]  border-black'}`}>
                            <div className="left" onClick={() => toggleTodoCompletion(todo)}>
                                <h2>{todo.task}</h2>
                                <span>{todo.time}</span>
                            </div>
                            <div className="right">
                                <button onClick={() => removeTodo(todo.id)}>
                                    <img className="cancelImg" src="https://raw.githubusercontent.com/SamirSobirov/Todo_List/9f0ee36463fec825c36bf26618facecf1ffc827e/img/cancel.svg" alt="Cancel" />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}











//   const [todos, setTodos] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [editIndex, setEditIndex] = useState(null);
//   const [editValue, setEditValue] = useState('');

//   useEffect(() => {
//     axios.get('/db.json')
//       .then(response => {
//         setTodos(response.data.tasks.map(task => task.name));
//       })
//       .catch(error => console.error('Error fetching todos:', error));
//   }, []);

//   const saveTodosToDB = (updatedTodos) => {
//     axios.patch('/db.json', { tasks: updatedTodos.map((name, id) => ({ id: id.toString(), name })) })
//       .then(response => console.log('Todos saved:', response))
//       .catch(error => console.error('Error saving todos:', error));
//   };

//   const handleChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (!inputValue.trim()) return;

//     const updatedTodos = [...todos, inputValue];
//     setTodos(updatedTodos);
//     saveTodosToDB(updatedTodos);
//     setInputValue('');
//     setEditIndex(null);
//     setEditValue('');
//   };

//   const handleDelete = (index) => {
//     const updatedTodos = todos.filter((_, i) => i !== index);
//     setTodos(updatedTodos);
//     saveTodosToDB(updatedTodos);
//   };

//   const handleEdit = (index) => {
//     setEditIndex(index);
//     setEditValue(todos[index]);
//   };

//   const handleCancelEdit = () => {
//     setEditIndex(null);
//     setEditValue('');
//   };

//   return (
//     <div className='mt-12 items-center text-center'>
//       <h1 className=' text-5xl font-extrabold'>Todo List</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           className='mt-[30px] h-12 p-[10px] w-[400px] rounded-lg'
//           type="text"
//           placeholder="Enter"
//           value={editIndex !== null ? editValue : inputValue}
//           onChange={handleChange}
//         />
//         <button type="submit" className='ml-4 bg-black text-white h-12 pl-4 pr-4 rounded-lg'>
//           {editIndex !== null ? 'Save' : 'Add'}
//         </button>
//         {editIndex !== null && <button type="button" className='rounded-lg bg-black text-white h-12 pl-4 pr-4 ml-4' onClick={handleCancelEdit}>Cancel</button>}
//       </form>
//       <ul className='mt-[50px] flex h-6 w-[100%] ml-4'>
//         {todos.map((todo, index) => (
//           <li className='text-center items-center mt-[20px] ml-5' key={index}>
//             {editIndex === index ? (
//               <>
//                 <input
//                   className=' h-8 p-[10px]'
//                   type="text"
//                   value={editValue}
//                   onChange={(event) => setEditValue(event.target.value)}
//                 />
//                 <button className='ml-4 bg-black text-white h-8 pl-4 pr-4' onClick={handleSubmit}>Save</button>
//                 <button className='ml-4 bg-black text-white h-8 pl-4 pr-4' onClick={handleCancelEdit}>Cancel</button>
//               </>
//             ) : (
//               <>
//                 {todo}
//                 <button className='ml-4 bg-black text-white h-8 pl-4 pr-4' onClick={() => handleEdit(index)}>Edit</button>
//                 <button className='ml-4 bg-black text-white h-8 pl-4 pr-4' onClick={() => handleDelete(index)}>Delete</button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
  // );
// }
