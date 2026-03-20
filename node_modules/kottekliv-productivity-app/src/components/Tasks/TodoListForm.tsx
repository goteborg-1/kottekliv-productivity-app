import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../Button/Button";
import { useTodo } from "@kottekliv/shared";
import "./TodoListForm.css";


function TodoList() {

  const [text, setText] = useState("");
  const {listId} = useParams<{listId: string}>() //Get ID from URL
  const {addTodo} = useTodo();



  const handleSubmit = (event: React.SubmitEvent) => { // avoids weird refresh i think?
      event.preventDefault();
      if (text.trim() === "" || !listId) return

      // sends text as payload and then deletes it from text useState
      addTodo(text, listId)
      setText("");
  };


  return (
    <div className="todo-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(event => setText(event.target.value))}
          placeholder="Add a new task..." 
        />
        
        <Button type="submit" variant="secondary">
          +
        </Button>
      </form>
    </div>
  )
}

export default TodoList