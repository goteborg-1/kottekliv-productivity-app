import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

export default function RootLayout() {
  return (
    <div className='body-container'>
      <Header/>
      
      <main>
        <Outlet/>
      </main>
    </div>
  )
}