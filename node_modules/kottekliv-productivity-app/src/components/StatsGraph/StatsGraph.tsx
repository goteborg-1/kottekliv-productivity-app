import { useMemo } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip, type LineProps } from 'recharts';

import { makeMsReadable } from '@kottekliv/shared';
import { useSessions } from '@kottekliv/shared';
import graphData from '../../utils/graphHelper.js';
import "./StatsGraph.css"

function StatsGraph() {
  const { sessions } = useSessions()

  const chartData = useMemo(() => {
    if(!sessions) {
      return []
    }

    return graphData(sessions)
  }, [sessions])

  /* Line styleing */
  const lineProps: Partial<LineProps> = {
    type: "monotone",
    strokeWidth: 2,
    activeDot: { r: 6, strokeWidth: 0 }
  }

  return (
    <div className="graph-container"> 
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={chartData} 
          margin={{top: 16, right: 30}}
        >
          <CartesianGrid
            syncWithTicks={true}
            yAxisId="left"
          />
          
          <XAxis 
            dataKey="name"
            tickLine={false}
            dy={10}
          />

          {/* Left Y-axis for time */}
          <YAxis 
            yAxisId="left"
            tickFormatter={(value) => makeMsReadable(value * 60000)}
            tickLine={false}
            tickCount={5}
            domain={[0, 'auto']}
            dx={-10}
          />

          {/* Right Y-axis for productivity (hidden) */}
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            domain={[0, 5]}
            hide
          />
          
          {/* Shows when hover */}
          <Tooltip<number, string>
            formatter={(value, name) => {
              if (value === undefined) return [0, name ?? "Unknown"]
              const displayName = name ?? "Unknown"

              if (displayName.includes("Time")) {
                return [makeMsReadable(value * 60000), displayName]
              }
              return [value, displayName];
            }}
          />
          
          {/* Describes the lines */}
          <Legend 
            verticalAlign="top"
            iconType="plainline"
          />

          {/* Deep work graph */}
          <Line
            {...lineProps}
            name="Deep Work Time"
            yAxisId="left"
            dataKey="focusTime"
            stroke="var(--color-graph-1)" 
            dot={{ r: 4, stroke: "var(--color-graph-1)", fill: "var(--color-bg-surface)" }} 
          />

          {/* Productivity graph */}
          <Line 
            {...lineProps}
            name="Productivity (1-5)"
            yAxisId="right"
            dataKey="productivity" 
            stroke="var(--color-graph-2)" 
            dot={{ r: 4, stroke: "var(--color-graph-2)", fill: "var(--color-bg-surface)"  }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatsGraph