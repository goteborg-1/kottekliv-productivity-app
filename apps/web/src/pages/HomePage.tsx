import GridContainer from "../components/GridContainer/GridContainer"
import Card from "../components/Card/Card"
import TodoListDisplay from "../components/Tasks/TodoListDisplay"
import WelcomeMessage from "../components/WelcomeMessage/WelcomeMessage"
import DeepWorkStats from "../components/DeepWorkStats/DeepWorkStats"
import { useSessions } from "@kottekliv/shared"
import { makeMsReadable } from "@kottekliv/shared"

import StatsGraph from "../components/StatsGraph/StatsGraph"
import Quote from "../components/Quote/Quote"

function HomePage() {
  const { sessions } = useSessions();

  const today = new Date().toISOString().split("T")[0];

  const todaySessions = sessions.filter(s =>
    s.date === today && s.category === "Deep Work"
  );
  const totalMsToday = todaySessions.reduce((sum, s) => sum + s.msDuration, 0);
  const timeToday = makeMsReadable(totalMsToday);

  const todayDate = new Date();
  const dayOfWeek = todayDate.getDay();
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(todayDate);
  monday.setDate(todayDate.getDate() - daysFromMonday);
  const mondayStr: string = monday.toISOString().split("T")[0]!;

  const weekSessions = sessions.filter(s =>
    s.date >= mondayStr && s.category === "Deep Work"
  );
  const totalMsWeek = weekSessions.reduce((sum, s) => sum + s.msDuration, 0);
  const timeWeek = makeMsReadable(totalMsWeek);

  return (
    <div className="main-container">
      <GridContainer>
        <WelcomeMessage />
      </GridContainer>

      <GridContainer columns={4}>
        <Card
          title={timeToday}
          children={<p>Deep work today</p>}
          className="desktop-only"
        />

        <Card
          title={timeWeek}
          children={<p>Deep work this week</p>}
          className="desktop-only"
        />

        {/* Mobile: Combined Deep Work card */}
        <Card
          title="Deep Work"
          className="mobile-only"
          children={<DeepWorkStats today={timeToday} week={timeWeek} />}
        />

        <Card
          children={<Quote />}
          span={2}
        />
      </GridContainer>

      <GridContainer columns={2} fullheight={true}>
        <Card
          title={"Statistics"}
          children={<StatsGraph />}
        />

        <Card
          title="Tasks"
          children={
            <>
              <TodoListDisplay />
            </>
          }
        />
      </GridContainer>
    </div>
  )
}

export default HomePage
