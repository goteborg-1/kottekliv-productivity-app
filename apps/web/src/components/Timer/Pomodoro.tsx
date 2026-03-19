import { formatPomodoroDisplay } from "../../utils/FormatHelper"

function Pomodoro({ timeLeft }: {timeLeft: number}) {
  return(
    <h2 className="timer">{formatPomodoroDisplay(timeLeft)}</h2>
  )
}

export default Pomodoro