import { useMemo, useState } from "react"
import { Outlet, NavLink, useParams, useNavigate } from "react-router-dom"
import { getTasksToDisplay, useTodo } from "@kottekliv/shared"
import { ChevronRight, ChevronLeft, X } from "lucide-react"

import Card from "../../components/Card/Card"
import GridContainer from "../../components/GridContainer/GridContainer"
import "./TaskPage.css"

function TaskPage() {
  const navigate = useNavigate();

  const { state, createList, deleteList, getProgress } = useTodo()
  const { listId: urlListId } = useParams()
  
  const [isAdding, setIsAdding] = useState(false)
  const [newListTitle, setNewListTitle] = useState("")

  const listId = urlListId ?? "overview"

  const handleCreateList = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newListTitle.trim() === "") return

    const newId = `l-${Date.now()}`

    createList(newListTitle, newId)
    setNewListTitle("")

    navigate(`/tasks/${newId}`); //Redirect to the new page
    setIsAdding(false);
  }

  // handle click outside input, if nothing is filled, close, if filled, save
  const handleBlur = () => {
    const newId = `l-${Date.now()}`

    if (newListTitle.trim() !== "") {
      createList(newListTitle, newId)
      setNewListTitle("");
      navigate(`/tasks/${newId}`); //Redirect to the new page
    }
    setIsAdding(false);
  }

  const scroll = (offset: number) => {
    const nav = document.getElementById('todo-nav')!
    nav.scrollBy({ left: offset, behavior: 'smooth' })
  }

  //Find total tasks and finished tasks for the current list
  const relevantTodos = getTasksToDisplay(state, listId)
  const { totalTodos, finishedTodos } = getProgress(relevantTodos);

  return(
    <div className="main-container">
      <GridContainer fullheight={true}>
        <Card>
          <div className="todo-container">
            <div className="nav-wrapper">
              <button onClick={() => scroll(-150)} className="nav-arrow"> <ChevronLeft /> </button>
                <nav id="todo-nav" className="todo-nav">
                  <NavLink to="/tasks" end className="todo-nav-item">Overview</NavLink>
                  {state.map((list) => (
                    <NavLink key={list.id} to={`/tasks/${list.id}`} className="todo-nav-item">
                      <span>{list.title}</span>
                      <button 
                        className="delete-list-button"
                        onClick={(e) => {
                          e.preventDefault()
                          if(window.confirm(`Are you sure you want to delete todo list "${list.title}"?`)) {deleteList(list.id)}
                        }}
                      >
                        <X />
                      </button>
                    
                    </NavLink>
                  ))}

                  {!isAdding ? (
                      <button 
                        className="add-list-button" 
                        onClick={() => setIsAdding(true)}
                      >
                        +
                      </button>
                    ) : (
                      /* If isAdding is true, show form */
                      <form onSubmit={handleCreateList} className="create-list-form">
                        <input 
                          autoFocus
                          type="text" 
                          placeholder="Name your list..." 
                          value={newListTitle}
                          onChange={(e) => setNewListTitle(e.target.value)}
                          onBlur={handleBlur}
                        />
                      </form>
                    )}
                </nav>
              <button onClick={() => scroll(150)} className="nav-arrow"> <ChevronRight  /> </button>
            </div>

            <h2 className="todo-title">{state.find(list => list.id === listId)?.title || "Overview"}</h2>

            {totalTodos > 0 ? <p className="todo-stats">{finishedTodos}/{totalTodos} finished</p> : "Start by adding a task!"}
            <Outlet />
          </div>
        </Card>
      </GridContainer>
    </div>
  )
}

export default TaskPage