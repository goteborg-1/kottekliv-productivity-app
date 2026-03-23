import './Card.css'

interface CardProps { 
  children: React.ReactNode,
  title?: React.ReactNode,
  span?: number,
  onClick?: () => void,
  className?: string
}

function Card({ children, title, span = 1, onClick, className }: CardProps) {

  const addSpan: React.CSSProperties = {
    gridColumn: `span ${span}`
  }


  // have these classes + any entered as a prop
  const cardClasses = [
    "card-base",
    onClick ? "is-clickable" : "",
    className || ""
  ].filter(Boolean).join(" ");

  return (
    <div
    className={cardClasses}
    style={addSpan}
    onClick={onClick}
    role={onClick ? "button" : undefined}
    tabIndex={onClick ? 0 : undefined}
    >

      {/* Render h2 if title exists */}
      {title && <h2 className="card-title">{title}</h2>}

      <div className="card-content">
        {children}
      </div>

    </div>
  )
}

export default Card