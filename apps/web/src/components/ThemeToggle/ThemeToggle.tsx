import { useEffect, useState } from "react"
import "./ThemeToggle.css"
import Button from "../Button/Button"

import { CiDark, CiLight } from "react-icons/ci";

function ThemeToggle() {
  // If a value exists in localStorage, parse it from string to boolean, otherwise default to true
  const [isLight, setIsLight] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme")
    return savedTheme === null ? true : savedTheme === "true"
  })

  // Adds or removes the "dark" class from the #root element whenever state changes
  useEffect(() => {
    const root = document.querySelector("#root")
    if (!root) return;
    isLight ? root.classList.remove("dark") : root.classList.add("dark")

    // Save the value in localStorage as a string
    localStorage.setItem("theme", isLight.toString());
  }, [isLight])

  const handleTheme = () => {
    setIsLight(!isLight)
  }

  return (
    <Button variant={"secondary"} onClick={handleTheme}>
      <span className="theme-toggle-content">
        {isLight ?
          <>
            <CiDark /> Dark Mode
          </>
          :
          <>
            <CiLight /> Light Mode
          </>}
      </span>
    </Button>
  )
}

export default ThemeToggle
