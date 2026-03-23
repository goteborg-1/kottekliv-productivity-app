import { createContext, useContext, useEffect, useReducer } from "react";
import { makeMsReadable } from "../utils/makeMsReadable";


// ---- INTERFACES ----

interface LastSession {
  id: string;
  startDate: string;
  startTime: string;
  endTime: string;
  activeTime: string;
  msDuration: number;
}

interface TimerState {
  isRunning: boolean;
  msStartTime: number;
  msPauseStart: number;
  msTotalPaused: number;
  msDisplay: number;
  lastSession: LastSession | null;
}

type TimerAction =
  | { type: "START"; payload: { nowMs: number } }
  | { type: "PAUSE"; payload: { nowMs: number } }
  | { type: "TICK";  payload: { nowMs: number } }
  | { type: "SAVE";  payload: { sessionData: LastSession } }
  | { type: "RESET"}

interface TimerContextValue {
  state: TimerState;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  saveTimer: () => LastSession | null;
  currentTimer: () => string;
  newestSession: LastSession | null;
  test: string;
}


// ---- HELPER FUNCTIONS ----

// Extract HH:MM from Date object (Sun Feb 01 2026 17:26:40 GMT+0100 ---> 17:26)
function formatTime(date: Date): string {
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  return `${hour}:${minute}`;
}

// Get YYYY-MM-DD from Date object (Sun Feb 01 2026 17:26:40 GMT+0100 ---> 2026-02-01)
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0]!; // using !assertion telling ts it can't be null or undefined
}


// ---- LOGIC/BRAIN ----

const timerReducer = (state: TimerState, action: TimerAction): TimerState => {
  switch (action.type) {

    case "START":
      // Scenario 1: First ever start (no previous session)
      if (state.msStartTime === 0) {
        return {
          ...state,
          isRunning: true,
          msStartTime: action.payload.nowMs,
        };
      }

      // Scenario 2: Resume from pause (calculate how long we were paused)
      const pauseDuration = action.payload.nowMs - state.msPauseStart;
      return {
        ...state,
        isRunning: true,
        msTotalPaused: state.msTotalPaused + pauseDuration,
        msPauseStart: 0,
      };

    case "PAUSE":
      return {
        ...state,
        isRunning: false,
        msPauseStart: action.payload.nowMs,
      };

    case "TICK": {
      const elapsed = action.payload.nowMs - state.msStartTime;
      const activeTime = elapsed - state.msTotalPaused;
      return {
        ...state,
        msDisplay: activeTime,
      };
    }

    case "SAVE":
      return {
        ...state,
        isRunning: false,
        msStartTime: 0,
        msPauseStart: 0,
        msTotalPaused: 0,
        msDisplay: 0,
        lastSession: action.payload.sessionData,
      };

    case "RESET":
      return {
        ...state,
        isRunning: false,
        msStartTime: 0,
        msPauseStart: 0,
        msTotalPaused: 0,
        msDisplay: 0,
      }

    default:
      return state;
  }
}


// ---- EXPORT/PROVIDER ----

export const TimerContext = createContext<TimerContextValue | undefined>(undefined);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(timerReducer, {
    isRunning: false,
    msStartTime: 0,
    msPauseStart: 0,
    msTotalPaused: 0,
    msDisplay: 0,
    lastSession: null,
  });

  // Make timer tick when running
  useEffect(() => {
    let interval: number | undefined;

    if (state.isRunning) {
      interval = setInterval(() => {
        dispatch({ type: "TICK", payload: { nowMs: Date.now() } });
      }, 100) as unknown as number;
    }

    return () => clearInterval(interval);
  }, [state.isRunning]);

  const startTimer = () => dispatch({ type: "START", payload: { nowMs: Date.now() } });
  const pauseTimer = () => dispatch({ type: "PAUSE", payload: { nowMs: Date.now() } });
  const resetTimer = () => dispatch({ type: "RESET" })

  const saveTimer = (): LastSession | null => {
    if (state.msStartTime === 0) {
      alert("Cannot save a session with 0 time! gotta work harder smh");
      return null;
    }

    const now = Date.now();

    let totalPaused = state.msTotalPaused;

    // If currently paused, add current pause duration
    if (!state.isRunning && state.msPauseStart > 0) {
      totalPaused += (now - state.msPauseStart);
    }

    const finalDuration = (now - state.msStartTime) - totalPaused;

    const startDate = new Date(state.msStartTime);
    const endDate = new Date(now);

    const sessionData: LastSession = {
      id: Date.now().toString(),
      startDate: formatDate(startDate),
      startTime: formatTime(startDate),
      endTime: formatTime(endDate),
      activeTime: makeMsReadable(finalDuration),
      msDuration: finalDuration,
    };

    dispatch({ type: "SAVE", payload: { sessionData } });

    return sessionData;
  };

  const currentTimer = (): string => makeMsReadable(state.msDisplay);

  const test = "yas queen slay!";

  const newestSession = state.lastSession;

  return (
    <TimerContext.Provider value={{ test, state, startTimer, pauseTimer, saveTimer, resetTimer, currentTimer, newestSession }}>
      {children}
    </TimerContext.Provider>
  )
}

export function useTimerContext(): TimerContextValue {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimerContext must be used within a TimerProvider");
  }
  return context;
}
