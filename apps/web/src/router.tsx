import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage/TaskPage";
import RootLayout from "./Layouts/RootLayout";
import TodoListDisplay from "./components/Tasks/TodoListDisplay";
import TodoList from "./components/Tasks/TodoListForm";
import NotFound from "./pages/NotFound/NotFound";
import HistoryPage from "./pages/HistoryPage";
import TimerPage from "./pages/TimerPage/TimerPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "tasks",
        element: <TaskPage />,
        children: [
          {
            index: true,
            element: <TodoListDisplay />
          },
          {
            path: ":listId",
            element: 
            <>
            <TodoListDisplay />
            <TodoList />
            </>
          }
        ]
      },
      {
        path: "timer",
        element: <TimerPage />
      },
      {
        path: "history",
        element: <HistoryPage />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  },
])


{/* <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/tasks' element={<TaskPage/>}>
            <Route index element={<TodoListDisplay />}/>
            <Route path=':listId' element={<><TodoListDisplay /><TodoList /></>}/>
          </Route>
          <Route path='/timer' element={<TimerPage/>} />
          <Route path='/history' element={<HistoryPage/>} />
          <Route path='*' element={<NotFound />} />
        </Routes> */}