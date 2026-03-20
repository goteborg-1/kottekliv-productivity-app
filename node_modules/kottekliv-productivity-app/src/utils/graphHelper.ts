import type { Session } from "../context/SessionContext"
import { getDayName } from "./dateHelper"

interface WeekDayRange {
  fullDate: string // "2026-02-17"
  displayName: string // "Today", "Yesterday", "Monday"
}

function graphData(sessions: Session[]) {

  //Get the date for the last 7 days
  const week: WeekDayRange[] = []

  for(let i = 6; i >= 0; i--) {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - i)
    
    const formattedDate = currentDate.toISOString().split('T')[0]!
    let dayName: string

    if(i === 0) {
      dayName = "Today"
    } else if (i === 1) {
      dayName = "Yesterday"
    } else {
      dayName = getDayName(currentDate)
    }

    week.push({fullDate: formattedDate, displayName: dayName})
  }

  //Go through the last 7 days
  return week.map((day) => {
    //Find sessions for the matching date
    const sessionsThisDay = sessions.filter((session) => session.date === day.fullDate)

    //Calculate how many minutes in deep work
    let totalFocusMinutes = 0
    sessionsThisDay.forEach(session => {
      if(session.category === "Deep Work") {
        totalFocusMinutes += (session.msDuration) / 60000 //From ms to min
      }
    })

    //Calculate average productivity level
    let totalProductivityScore = 0
    let sessionsWithRating = 0

    sessionsThisDay.forEach(session => {
      const scoreString: string = session.productivity.split(" - ")[0]! //Keep only number value as string
      const score: number = parseFloat(scoreString) //Cchange from string to number

      if(score > 0) {
        totalProductivityScore += score
        sessionsWithRating ++ //Keep track how many sessions were rated
      }
    })

    const averageProductivity = sessionsWithRating > 0
      ? totalProductivityScore / sessionsWithRating
      : 0

      return{
        name: day.displayName, //X-axis
        focusTime: Math.round(totalFocusMinutes), //First line in graph
        productivity: Number(averageProductivity.toFixed(1)) //Second line in graph
      }
  })
}

export default graphData