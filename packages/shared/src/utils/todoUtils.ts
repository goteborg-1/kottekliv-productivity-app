import type { TodoList, Todo } from "../contexts/TodoContext"

export type TodoWithListId = Todo & {listId: string}


/**
 * Get all tasks based on selected list or overview
 * @param state - The current list of Todo-object from state
 * @param listId - ID for the specific list to show, or "overview"
 * @returns A flat array of Tasks, where each task has a corresponding listId
 */
export function getTasksToDisplay(state: TodoList[], listId: string): TodoWithListId[] {
  // show all todos from all lists, tagged with their listId (overview)
  if(listId === "overview") {
    return state.flatMap((list) => (
      (list.todos || []).map((todo) => (
        {...todo, listId: list.id}
      ))
    ))
  }

  //Show only the selected lists todos
  const currentList = state.find((list) => (
    list.id === listId
  ))

  return currentList 
    ? currentList.todos.map((todo) => ({...todo, listId: currentList.id}))
    : []
}

/**
 * Sorts the tasks: incomplete first, then completed sorted by completion time
 * @param tasks The list to sort (usually from getTasksToDisplay)
 * @returns A new, sorted array of tasks
 */
export function getSortedTasks(tasks: TodoWithListId[]): TodoWithListId[] {
  return [...tasks].sort((a, b) => {
    if(a.isCompleted !== b.isCompleted) {
      return Number(a.isCompleted) - Number(b.isCompleted)
    }

    return (a.completedAt ?? 0) - (b.completedAt ?? 0)
  })
}