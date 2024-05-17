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
                    <img src="./public/nothing_img.png" alt="image" className="h-[350px] w-full ml-[115%]" />
                    :
                    todos.map(todo => (
                        <div  key={todo.id} className= {`box ${todo.completed ? 'completed' : ' border-[2px] rounded-xl  border-black'}`}>
                            <div className="left" onClick={() => toggleTodoCompletion(todo)}>
                              <div className='flex justify-between'> 
                                <h2 className='pl-[20px] text-2xl text-violet-900'>{todo.task}</h2>
                                <span className='pr-2 text-sm text-blue-700'>{todo.time}</span>
                                </div>

                            </div>
                            <div className="text-right pr-1 ">
                                <button onClick={() => removeTodo(todo.id)}>
                                    <img  className="h-4 " src="https://raw.githubusercontent.com/SamirSobirov/Todo_List/9f0ee36463fec825c36bf26618facecf1ffc827e/img/cancel.svg" alt="Cancel" />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
