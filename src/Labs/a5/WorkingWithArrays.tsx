import React, { useState, useEffect } from "react";
import axios from "axios";


function WorkingWithArrays() {
    const API = "http://localhost:4000/a5/todos";
    const [todo, setTodo] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });

    const [todos, setTodos] = useState([
        { id: "1", title: "Learn React", completed: false, description: "hi", due: "???" },
        { id: "2", title: "Learn Node", completed: false, description: "hi", due: "???" },
    ]);
    const fetchTodos = async () => {
        const response = await axios.get(API);
        setTodos(response.data);
    };

    const removeTodo = async (todo: any) => {
        const response = await axios
            .get(`${API}/${todo.id}/delete`);
        setTodos(response.data);
    };

    const createTodo = async () => {
        const response = await axios.get(`${API}/create`);
        setTodos(response.data);
    };

    const fetchTodoById = async (id: number) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    };

    const updateTitle = async () => {
        const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
        setTodos(response.data);
    };


    const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos([...todos, response.data]);
    };

    const updateTodo = async () => {
        const response = await axios.put(`${API}/${todo.id}`, todo);
        setTodos(todos.map((t: any) => (t.id === todo.id ? todo : t)));
    };





    useEffect(() => {
        fetchTodos();
    }, []);


    return (
        <div>
            <h3>Working with Arrays</h3>
            <button onClick={createTodo} >
                Create Todo
            </button>
            <button onClick={updateTitle} >
                Update Title
            </button>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>

                        <input checked={todo.completed}
                            type="checkbox" readOnly />
                        {todo.title}
                        <p>{todo.description}</p>
                        <p>{todo.due}</p>


                        <button onClick={() => fetchTodoById(parseInt(todo.id))} >
                            Edit
                        </button>

                        <button onClick={() => removeTodo(todo)} >
                            Remove
                        </button>

                        {todo.title}
                    </li>
                ))}
            </ul>



            <input type="number" value={todo.id}
                onChange={(e) => setTodo({
                    ...todo, id: parseInt(e.target.value)
                })} />
            <input type="text" value={todo.title}
                onChange={(e) => setTodo({
                    ...todo, title: e.target.value
                })} />



            {/* This is 3.5.1 */}
            <textarea value={todo.description}
                onChange={(e) => setTodo({
                    ...todo,
                    description: e.target.value
                })} />
            <input value={todo.due} type="date"
                onChange={(e) => setTodo({
                    ...todo, due: e.target.value
                })} />
            <label>
                <input checked={todo.completed} type="checkbox"
                    onChange={(e) => setTodo({
                        ...todo, completed: e.target.checked
                    })} />
                Completed
            </label>
            <button onClick={postTodo}> Post Todo </button>
            <br />
            <button onClick={updateTodo}>
                Update Todo
            </button>






            <h3>Updating an Item in an Array</h3>
            <a href={`${API}/${todo.id}/title/${todo.title}`} >
                Update Title to {todo.title}
            </a>

            <h2>I don't know what is happening</h2>





            <h4>Retrieving Arrays</h4>
            <a href={API}>
                Get Todos
            </a>




            <h4>Retrieving an Item from an Array by ID</h4>
            <input value={todo.id}
                onChange={(e) => setTodo({
                    ...todo,
                    id: parseInt(e.target.value)
                })} />
            <a href={`${API}/${todo.id}`}>
                Get Todo by ID
            </a>

            <br />

            <h3>Filtering Array Items</h3>
            <a href={`${API}?completed=true`}>
                Retrieving only completed shits
            </a>

            <h3>Creating new Items in an Array</h3>
            <a href={`${API}/create`}>
                Create Todo
            </a>


            <h3>Deleting from an Array</h3>
            <a href={`${API}/${todo.id}/delete`}>
                Delete Todo with ID = {todo.id}
            </a>

            <h3>3.3.7 On Your Own: Completed/Description</h3>
            <a href={`${API}/${todo.id}/completed/${todo.completed}`}>
                Update Completed
            </a>
            <input type="checkbox"
                checked={todo.completed}
                onChange={(e) => setTodo({
                    ...todo,
                    completed: (e.target.checked)
                })} />
            <br />

            <a href={`${API}/${todo.id}/description/${todo.description}`}>
                Update Description
            </a>
            <input type="textarea"
                value={todo.description}
                onChange={(e) => setTodo({
                    ...todo,
                    description: (e.target.value)
                })} />




        </div>
    );
}
export default WorkingWithArrays;

