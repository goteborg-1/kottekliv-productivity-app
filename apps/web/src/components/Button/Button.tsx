import './Button.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected?: boolean,
  variant?: "primary" | "secondary" | "neutral",
  size?: "base" | "small"
}

function Button({children, isSelected, variant="primary", size="base", ...rest}: ButtonProps){
  return(
    <button 
    className={`button-base ${variant} ${size} ${isSelected ? "selected" : ""}`}
    {...rest}
    >
      {children}
    </button>
  )
}

export default Button