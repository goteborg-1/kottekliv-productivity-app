import { useState, useEffect } from "react"
import { getDayName, getMonthName } from "../../utils/dateHelper";
import "./WelcomeMessage.css"

function WelcomeMessage() {
  const [ isFirstTime, setIsFirstTime ] = useState<boolean>(false)
  const today = new Date()

  //Check if it´s the first time visiting
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    //If first time visiting, set true and add to localStorage to remember next time
    if (!hasVisited) {
      setIsFirstTime(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  return(
    <h2 className="welcome-message">
      {isFirstTime ? "Welcome!" : "Welcome Back!"}
      <span>{getDayName(today)}, {getMonthName(today)} {today.getDate()}, {today.getFullYear()}</span>
    </h2>
  )
}

export default WelcomeMessage