import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"

import Timer from "../../components/Timer/Timer"
import Pomodoro from "../../components/Timer/Pomodoro"
import Input from "../../components/Input/Input"
import Select from "../../components/Input/Select"
import Button from "../../components/Button/Button"
import Modal from "../../components/Modal/Modal"
import Productivity from "../../components/Productivity/Productivity"

import { useTimerContext } from "../../context/TimerContext"
import { useSessions, type Session } from "../../context/SessionContext"
import { usePomodoro, type PomodoroSession } from "../../hooks/usePomodoro"

import "./TimerPage.css"

interface FormData {
  sessionName: string;
  category: string;
}

function TimerPage() {
  const [ viewParam, setViewParam ] = useSearchParams()

  const [formData, setFormData] = useState<FormData>({ sessionName: "", category: "Other" })
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [chosenProductivity, setChosenProductivity] = useState<string | null>(null)

  const { startTimer, pauseTimer, saveTimer, state } = useTimerContext();
  const { sessions, addSession, editSession } = useSessions()
  const { pomodoroData, startPomodoro, pausePomodoro, finishPomodoro } = usePomodoro()

  //Switch between regular timer and pomodoro
  const currentMode = viewParam.get("mode") || localStorage.getItem("lastTimerMode") || "stopwatch"

  const setMode = (newMode: string) => {
    if(newMode === "stopwatch") {
      setViewParam({}, { replace: true })
    } else {
      setViewParam({ mode: newMode }, { replace: true })
    }

    localStorage.setItem("lastTimerMode", newMode)
  }

  useEffect(() => {
    const savedMode = localStorage.getItem("lastTimerMode");
    
    if (savedMode && savedMode !== currentMode) {
      setMode(savedMode);
    }
  }, [])

  // Create new session when save button is clicked
  const handleSave = () => {
    let timerData: PomodoroSession | null = null
    
    if(currentMode === "stopwatch") timerData = saveTimer()
    if(currentMode === "pomodoro") timerData = finishPomodoro()
    if (!timerData) return
        
    const newSession: Session = {
      id: timerData.id,
      sessionName: formData.sessionName,
      category: formData.category,
      date: timerData.startDate,
      startTime: timerData.startTime,
      endTime: timerData.endTime,
      activeTime: timerData.activeTime,
      msDuration: timerData.msDuration,
      productivity: "0 - Not Rated",
    }

    addSession(newSession)
    setCurrentId(timerData.id)
    setIsModalOpen(true)
    setFormData({ sessionName: "", category: "Other" })
  }

  const addProductivity = (level: string) => {
    if (!currentId) return

    const existingSession = sessions.find(s => s.id === currentId)

    if(existingSession) {
      editSession({
        ...existingSession,
        productivity: level
      })
    }

    setIsModalOpen(false)
  }

  return (
    <section className="main-container">

      <div className="switch-container">
        <button onClick={() => setMode("stopwatch")} className={currentMode === "stopwatch" ? "active switch" : "switch"}>Timer</button>
        <button onClick={() => setMode("pomodoro")} className={currentMode === "pomodoro" ? "active switch" : "switch"}>Pomodoro</button>
      </div>

      <div className="timer-circle">
        <Input
          name={"sessionName"}
          id="sessionName"
          placeholder="Add session name..."
          autoComplete="off"
          onChange={(e) => setFormData({ ...formData, sessionName: e.target.value })}
        />

        {currentMode === "stopwatch" ? <Timer /> : <Pomodoro timeLeft={pomodoroData.timeLeft}/>}

        <Select
          name={"category"}
          id="category"
          selectLabel={"Select Category"}
          defaultValue={""}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          options={[
            "Deep Work",
            "Admin",
            "Meeting",
            "Break",
            "Other"
          ]}
        />
      </div>

      {currentMode === "pomodoro" && (pomodoroData.status === "running" || pomodoroData.status === "paused") && (
        <p className="pomodoro-mode">{pomodoroData.mode}</p>
      )}

      {currentMode === "stopwatch" ? (
        <div className="timer-button-row">
          {state.isRunning ?
            <Button variant="secondary" onClick={pauseTimer}>Pause</Button>
            :
            <Button variant={state.msDisplay < 1 ? "primary" : "secondary"} onClick={startTimer}>Start</Button>
          }

          <Button onClick={handleSave} disabled={state.msDisplay < 1}>Save</Button>
        </div>
      ) : (
        <div className={`timer-button-row ${(pomodoroData.status === "running" || pomodoroData.status === "paused") && "pomodoro-buttons"}`}>
          {pomodoroData.status === "running" ?
            <Button variant="secondary" onClick={pausePomodoro}>Pause</Button>
            :
            <Button variant={pomodoroData.status === "idle" ? "primary" : "secondary"} onClick={startPomodoro}>Start</Button>
          }

          <Button onClick={handleSave} disabled={pomodoroData.status === "idle"}>Save</Button>
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={() => {
          setIsModalOpen(false)
          setCurrentId(null)
        }} 
          title="How would you rate your productivity?"
        >
          <Productivity onLevelSelect={(level) => setChosenProductivity(level)} />

          <div className="productivity-buttons">
            <Button onClick={() => addProductivity(chosenProductivity ?? "0 - Not Rated")}>
              Save
            </Button>

            <Button onClick={() => {
              setIsModalOpen(false)
              setCurrentId(null)
            }} 
            variant="secondary"
            >
              Skip
            </Button>
          </div>
        </Modal>
      )}

    </section>
  )
}

export default TimerPage
