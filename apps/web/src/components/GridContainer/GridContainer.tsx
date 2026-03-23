import "./GridContainer.css"

interface GridContainerProps {
  children: React.ReactNode,
  columns?: number,
  fullheight?: boolean
}

function GridContainer({ children, columns = 0, fullheight = false }: GridContainerProps) {

  // Pass the column count as a CSS custom property --columns
  const style = {
    "--columns": columns
  } as React.CSSProperties

  return (
    <div className={`grid-layout ${fullheight ? "full-height" : ""}`} style={style}
    >
      {children}
    </div>
  )
}

export default GridContainer