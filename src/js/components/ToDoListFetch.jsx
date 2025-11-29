import React, { useState, useEffect } from "react";

const BASE_URL = "https://playground.4geeks.com/todo";
const USERNAME = "cristian";

const ToDoListFetch = () => {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);

    const getTodos = () => {
        return fetch(`${BASE_URL}/users/${USERNAME}`)
            .then(res => {
                if (!res.ok) throw new Error("Error al obtener los todos");
                return res.json();
            })
            .then(data => {
                setTodoList(data.todos);
            })
            .catch(err => console.error(err));
    };


    const addTodo = () => {
        return fetch(`${BASE_URL}/todos/${USERNAME}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                label: todo,
                is_done: false
            })
        })
            .then(res => {
                if (!res.ok) throw new Error("Error al crear el todo");
                return res.json();
            })
            .catch(err => console.error(err));
    };

    const deleteTodo = (id) => {
        return fetch(`${BASE_URL}/todos/${id}`, {
            method: "DELETE"
        })
            .then(res => {
                if (!res.ok) throw new Error("Error al borrar el todo");
                return res.text();
            })
            .then(() => {
                getTodos();
            })
            .catch(err => console.error(err));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (todo === "") return alert('Mete minimo alguna tarea');

        addTodo().then(() => {
            getTodos();
            setTodo("");
        });
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div className="container-main">
            <h1>ToDos de {USERNAME}</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="todo"
                    value={todo}
                    placeholder="Añadir ToDo..."
                    onChange={(e) => setTodo(e.target.value)}
                />
                <button type="submit">Añadir</button>
            </form>

            <ul>
                {todoList.map((item) => (
                    <div key={item.id}>
                        <li>
                            {item.label}
                            <button onClick={() => deleteTodo(item.id)}>🗑️</button>
                        </li>

                        <hr/>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default ToDoListFetch;
