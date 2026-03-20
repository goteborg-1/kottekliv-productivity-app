import { useState } from "react"
import GridContainer from "../components/GridContainer/GridContainer"
import Card from "../components/Card/Card"
import StatsGraph from "../components/StatsGraph/StatsGraph"
import AddSessionModal from "../components/Modal/AddSessionModal/AddSessionModal"
import ShowSessionHistoryModal from "../components/Modal/ShowSessionHistoryModal/ShowSessionHistoryModal"
import type { Session } from "@kottekliv/shared"


// update/finish when storage logic gets updated
interface ManualSession {
  id: number;
  [key: string]: unknown;
}

function HistoryPage() {
  const [showAddSession, setShowAddSession] = useState(false)
  const [showSessionHistory, setShowSessionHistory] = useState(false)
  const [sessions, setSessions] = useState<Session[]>([]);

  const saveSession = (newSession: Omit<Session, "id">) => {
    setSessions([...sessions, { ...newSession, id: crypto.randomUUID()}]);
    /* TODO: Implement storage logic */
  };

  return (
    <div className="main-container">

      <GridContainer columns={2}>
        <Card
          title={"Log Session"}
          children={<p>Manually log previous sessions and breaks.</p>}
          onClick={() => setShowAddSession(true)}
        />

        <Card
          title={"Edit History"}
          children={<p>Manage and correct your saved sessions.</p>}
          onClick={() => setShowSessionHistory(true)}
        />
      </GridContainer>

      <GridContainer columns={1} fullheight={true}>
        <Card
          title={<div style={{ textAlign: "center", width: "100%" }}>Data Visualization</div>}
          children={<StatsGraph />}
        />
      </GridContainer>

      {showAddSession && (
        <AddSessionModal
          onClose={() => setShowAddSession(false)}
        />
      )}

      {showSessionHistory &&
        <ShowSessionHistoryModal
          onClose={() => setShowSessionHistory(false)}
        />
      }

    </div>
  )
}

export default HistoryPage
