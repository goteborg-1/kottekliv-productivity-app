import { useState } from "react";
import { useParams } from "react-router-dom";

import { type Todo, type TodoList, useTodo } from "@kottekliv/shared";
import Input from "../Input/Input";

import { IoRadioButtonOffOutline, IoRadioButtonOn } from "react-icons/io5";
import { FiEdit3, FiTrash } from "react-icons/fi";
import "./TodoListDisplay.css";

function TodoListDisplay() {

  const { state, dispatch } = useTodo()
  const { listId: urlListId } = useParams()

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState<string>("")

  // Find which todos to show
  let tasksToDisplay: (Todo & { listId: string })[] = []

  if (!urlListId) {
    // show all todos from all lists, tagged with their listId
    tasksToDisplay = state.flatMap((list: TodoList) =>
      (list.todos || []).map((todo) => ({ ...todo, listId: list.id }))
    )
  } else {
    // show only its todos
    const currentList = state.find((list: TodoList) => list.id.toString() === urlListId);
    tasksToDisplay = currentList
      ? currentList.todos.map((todo) => ({ ...todo, listId: currentList.id }))
      : []
  }

  // Sort: incomplete first, then completed sorted by completion time
  const sortedTasks = [...tasksToDisplay].sort((a, b) => {
    if (a.isCompleted !== b.isCompleted) {
      return Number(a.isCompleted) - Number(b.isCompleted)
    }
    return (a.completedAt ?? 0) - (b.completedAt ?? 0)
  })

  const handleStartEdit = (task: Todo) => {
    setEditingId(task.id);
    setEditText(task.text);
  }

  const handleSaveEdit = (e: React.FormEvent, task: Todo & { listId: string }) => {
    e.preventDefault();
    if (editText.trim() === "") return;

    dispatch({
      type: "EDIT_TODO",
      payload: {
        todoId: task.id,
        listId: urlListId || task.listId,
        newText: editText
      }
    });
    setEditingId(null);
    setEditText("")
  };

  return (
    <ul className="todo-list">
      {sortedTasks.map((task) => (
        <li
          key={task.id}
          className={task.isCompleted ? "todo-item completed" : "todo-item"}
        >
          <div className="todo-checkbox">
            <button
              onClick={() => dispatch({ type: "TOGGLE_TODO", payload: { todoId: task.id, listId: urlListId || task.listId } })}
              className="check-btn"
            >
              {task.isCompleted ? (
                <IoRadioButtonOn size={20} color="var(--color-primary)" />
              ) : (
                <IoRadioButtonOffOutline size={20} color="var(--color-primary)" />
              )}
            </button>
          </div>
          {editingId === task.id ? (
            <form action="submit" onSubmit={(e) => handleSaveEdit(e, task)} className="todo-edit-form">
              <Input
                autoFocus
                value={editText}
                id="editTodoText"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleSaveEdit(e, task)}
              />
            </form>
          ) : (
            <p>
              <span className="todo-text">{task.text}</span>
              {!urlListId && <span className="list-tag"> ({state.find((l: TodoList) => l.id === task.listId)?.title})</span>}
            </p>
          )}
          {!editingId &&
            <div className="todo-button-wrapper">
              <button className="edit-todo-button" onClick={() => handleStartEdit(task)}>
                <FiEdit3 />
              </button>
              <button className="edit-todo-button" onClick={() => {
                dispatch({
                  type: "DELETE_TODO",
                  payload: { todoId: task.id, listId: urlListId || task.listId }
                })
              }}>
                <FiTrash />
              </button>
            </div>
          }
        </li>
      ))}
    </ul>
  );
}

export default TodoListDisplay;
