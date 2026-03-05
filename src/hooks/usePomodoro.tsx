import { useReducer, useEffect, useCallback, act } from "react";
import { formatDate, formatTime, formatTimeString } from "../utils/FormatHelper";

export interface PomodoroSession {
  id: string,
  startDate: string;
  startTime: string;
  endTime: string;
  activeTime: string;
  msDuration: number;
}

type Mode = "focus" | "short break" | "long break"

interface PomodoroState {
  status: "idle" | "running" | "paused",
  mode: Mode,
  timeLeft: number,
  targetTime: number | null,
  completedCycles: number,
  sessionStartTime: number,
  latestStartTime: number,
  activeMs: number
}

type PomodoroAction =
  | {type: "START"}
  | {type: "PAUSE"}
  | {type: "AUTO_SWITCH"}
  | {type: "MANUAL_SWITCH", payload: Mode}
  | {type: "TICK"}
  | {type: "FINISH_SESSION"}

function PomodoroReducer(state: PomodoroState, action: PomodoroAction): PomodoroState {
  switch(action.type) {
    case "START":
      const setStartTime = state.status === "idle" ? Date.now() : state.sessionStartTime
      return {
        ...state, 
        status: "running",
        targetTime: Date.now() + state.timeLeft,
        sessionStartTime: setStartTime,
        latestStartTime: Date.now()
      }
    case "PAUSE":
      const newActiveMs = state.activeMs + (Date.now() - state.latestStartTime)
      return {
        ...state, 
        status: "paused",
        targetTime: null,
        activeMs: newActiveMs
      }
    case "AUTO_SWITCH": {
      const wasWorking = state.mode === "focus"
      //Complete a cycle after each work session
      const newCompletedCycles = wasWorking ? state.completedCycles + 1 : state.completedCycles

      let nextMode: Mode
      let nextCounter: number
      if(wasWorking) {
        nextMode = newCompletedCycles % 4 === 0 ? "long break" : "short break"
        nextCounter = newCompletedCycles % 4 === 0 ? 15 * 60 * 1000 : 5 * 60 * 1000
      } else {
        nextMode = "focus"
        nextCounter = 25 * 60 * 1000
      }

      return{
        ...state,
        mode: nextMode,
        completedCycles: newCompletedCycles,
        timeLeft: nextCounter,
        targetTime: Date.now() + nextCounter
      }
    }
    case "MANUAL_SWITCH":
      let modeTime: number
      if(action.payload === "focus") {
        modeTime = 25 * 60 * 1000
      } else if (action.payload === "short break") {
        modeTime = 5 * 60 * 1000
      } else {
        modeTime = 15 * 60 * 1000
      }

      return {
        ...state, 
        status: "idle",
        mode: action.payload,
        timeLeft: modeTime,
        targetTime: null,
        completedCycles: 0,
        sessionStartTime: 0,
        latestStartTime: 0,
        activeMs: 0,
      }
    case "TICK":
      if (state.status !== "running" || !state.targetTime) return state

      const msLeft = Math.max(0, Math.round((state.targetTime - Date.now())))
      return{
        ...state,
        timeLeft: msLeft
      }
    case "FINISH_SESSION": 
      return{
        ...state,
        status: "idle",
        mode: "focus",
        timeLeft: 25 * 60 * 1000,
        targetTime: null,
        completedCycles: 0,
        sessionStartTime: 0,
        latestStartTime: 0,
        activeMs: 0,
      }
    default:
      return state
  }
}

const initialPomodoroState: PomodoroState = {
  status: "idle",
  mode: "focus",
  timeLeft: 25 * 60 * 1000,
  targetTime: null,
  completedCycles: 0,
  sessionStartTime: 0,
  latestStartTime: 0,
  activeMs: 0,
}

export function usePomodoro() {
  const [ state, dispatch ] = useReducer(PomodoroReducer, initialPomodoroState)

  //Helper functions
  const handleStart = () => dispatch({ type: "START" })
  const handlePause = () => dispatch({ type: "PAUSE" })
  const handleTick = useCallback(() => dispatch({ type: "TICK" }), [])
  const handleAutoSwitch = () => dispatch({ type: "AUTO_SWITCH" })
  const handleManualSwitch = (mode: Mode) => dispatch({ type: "MANUAL_SWITCH", payload: mode})
  const handleFinish = () => {
    const totalActiveMs = state.activeMs + (Date.now() - state.latestStartTime)
    const startDate = new Date(state.sessionStartTime)
    const endDate = new Date(Date.now())
    
    const newsession: PomodoroSession = {
      id: crypto.randomUUID(),
      startDate: formatDate(startDate),
      startTime: formatTime(startDate),
      endTime: formatTime(endDate),
      activeTime: formatTimeString(totalActiveMs),
      msDuration: totalActiveMs
    }
    
    dispatch({ type: "FINISH_SESSION" })

    return newsession
  } 

  useEffect(() => {
    let interval: number | undefined;

    if (state.status === "running") {
      interval = window.setInterval(() => {
        handleTick()
      }, 300)
    }

    return () => clearInterval(interval)
  }, [state.status, state.targetTime, handleTick])

  useEffect(() => {
    if (state.timeLeft <= 0 && state.status === "running") {
      handleAutoSwitch();
    }
  }, [state.timeLeft, state.status]);

  return {
    pomodoroData: state,
    startPomodoro: handleStart,
    pausePomodoro: handlePause,
    finishPomodoro: handleFinish,
    autoSwitchPomodoro: handleAutoSwitch,
    manualSwitchPomodoro: handleManualSwitch
  }
}