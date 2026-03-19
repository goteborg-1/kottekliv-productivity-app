import { useTimerContext } from "@kottekliv/shared";
import "./Timer.css"

function Timer() {
  const { currentTimer } = useTimerContext();

  return (
    <h2 className="timer">{currentTimer()}</h2>
  )
}

export default Timer;
