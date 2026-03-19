import { useMemo, useReducer, createContext, useContext } from "react"
import { makeMsReadable } from "../utils/makeMsReadable";
import calculateDuration from "../utils/calculateDurationHelper";

export interface Session {
  id: string,
  sessionName: string,
  category: string,
  productivity: string,
  date: string,
  startTime: string,
  endTime: string,
  msDuration: number,
  activeTime: string,
}

interface SessionContextValue {
  sessions: Session[],
  addSession: (session: Session) => void,
  deleteSession: (id: string) => void,
  editSession: (session: Session) => void,
}

const SessionContext = createContext<SessionContextValue | null>(null)

type SessionAction =
  | {type: "ADD", payload: Session}
  | {type: "DELETE", payload: string}
  | {type: "EDIT", payload: Session}

function SessionReducer(state: Session[], action: SessionAction): Session[] {
  let updatedSessions: Session[] = state

  switch(action.type) {
    case "ADD": {

      const duration: number = action.payload.msDuration || calculateDuration({
        date: action.payload.date, 
        start: action.payload.startTime, 
        end: action.payload.endTime
      })

      //Set default value if no input is given
      const newSession = {
        ...action.payload,
        msDuration: duration,
        sessionName: action.payload.sessionName?.trim() || "Untitled Session",
        productivity: action.payload.productivity || "0 - Not Rated",
      }
      updatedSessions = [newSession, ...state]
      break 
    }
    case "DELETE":
      updatedSessions = state.filter(session => session.id !== action.payload)
      break
    case "EDIT":
      updatedSessions = state.map(session => 
        session.id === action.payload.id 
        ? { 
            ...session,
            ...action.payload
        } 
        : session) 
      break
    default:
      return state
  }

  localStorage.setItem("sessions", JSON.stringify(updatedSessions))
  return updatedSessions
}

export function SessionProvider({children}: {children: React.ReactNode}) {
  const initialState: Session[] = JSON.parse(localStorage.getItem("sessions") || "[]") as Session[]
  const [ state, dispatch ] = useReducer(SessionReducer, initialState)

  //Sort the sessions newest to oldest
  const sortedSessions = useMemo(() => {
    return [...state].sort((a, b) => {
        const dateTimeA = `${a.date} ${a.startTime}`;
        const dateTimeB = `${b.date} ${b.startTime}`;
      return dateTimeB.localeCompare(dateTimeA)
    })
  }, [state])

  const addSession = (incomingSession: Session) => {
    let draftSession = { ...incomingSession }

    //If added manually, add activetime and duration
    if (!draftSession.activeTime) {
      const ms = draftSession.msDuration || calculateDuration({
        date: draftSession.date,
        start: draftSession.startTime,
        end: draftSession.endTime
      }
    )
      
      draftSession.activeTime = makeMsReadable(ms)
      draftSession.msDuration = ms
    }

    dispatch({ type: "ADD", payload: draftSession })
  }

  const deleteSession = (id: string) => {
    if(window.confirm("Are you sure you want to delete this session?")){
        dispatch({ type: "DELETE", payload: id })
    }
  }

  const editSession = (updatedSession: Session) => {
    dispatch({ type: "EDIT", payload: updatedSession })
  }

  return(
    <SessionContext.Provider value={{ sessions: sortedSessions, addSession, deleteSession, editSession }}>
      {children}
    </SessionContext.Provider>
  )

}

export function useSessions() {
  const context = useContext(SessionContext)
  if(!context) {
    throw new Error("useSessions must be used within a SessionProvider")
  }

  return context
}

export default SessionProvider