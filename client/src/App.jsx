import { useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";

import Todo from "./components/Todo";
import Model from "./components/Model";

const API_BASE = "http://localhost:3001";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    getTodos();
    console.log(todos);
  }, []);

  const getTodos = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log("Error : " + err));
  };

  async function completeTodo(id) {
    const data = await fetch(API_BASE + "/todo/complete/" + id).then((res) =>
      res.json()
    );

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
  }

  async function deleteTodo(id) {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
  }

  async function addTodo() {
    const data = await fetch(API_BASE + "/todo/new", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());

    setTodos([...todos, data]);
    setPopupActive(false);
    setNewTodo("");
  }

  return (
    <main className="relative ">
      <section className="z-0 border border-white/15 p-10 rounded-2xl backdrop-blur-2xl bg-black/15">
        <h2 className="text-4xl md:text-6xl font-bold">Welcom To 📔 </h2>
        <p className="text-2xl md:text-3xl font-semibold mt-4">Your Tasks</p>

        <div className="py-6 flex flex-col gap-3">
          {" "}
          {todos.map((todo) =>
            todos.length === 0 ? (
              <div className="text capitalize text-white">
                No todos in the list
              </div>
            ) : (
              <Todo
                key={todo._id}
                text={todo.text}
                complete={todo.complete}
                onClick={() => completeTodo(todo._id)}
                deleteOnClick={() => deleteTodo(todo._id)}
              />
            )
          )}
        </div>

        <IoAddCircleSharp
          onClick={() => setPopupActive(true)}
          size={50}
          className="cursor-pointer absolute z-10 right-0 bottom-0 -mb-6 left-8 animate-bounce"
        />

        <div className="blue__gradient w-[40%] h-[40%] absolute -z-50 right-0 bottom-0" />
        <div className="pink__gradient w-[40%] h-[40%] absolute -z-50 left-0 top-0" />
      </section>

      <section
        className={`${
          popupActive
            ? "absolute top-0 left-0 right-0 bottom-0 z-50"
            : "hidden "
        }`}
      >
        {popupActive ? (
          <Model
            onChange={(e) => setNewTodo(e.target.value)}
            onClick={addTodo}
            value={newTodo}
            close={() => setPopupActive(false)}
          />
        ) : (
          ""
        )}
      </section>
    </main>
  );
}

export default App;
