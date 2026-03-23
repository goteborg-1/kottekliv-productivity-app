import { useState } from "react"
import Button from "../Button/Button"
import "./Productivity.css"

interface productivityLevel {
  level: number,
  description: string
}

// List of productivity levels with descriptions
const productivityLevels: productivityLevel[] = [
  {level: 1, description: "Poor" },
  {level: 2, description: "Fair" },
  {level: 3, description: "Good" },
  {level: 4, description: "Very Good" },
  {level: 5, description: "Excellent" }
]

function ProductivityLogger({onLevelSelect}: {onLevelSelect: (level: string) => void}) {

  // Local state to track the selected productivity level
  const [productivity, setProductivity] = useState("")

  // Updates state and notifies parent component
  const handleClick = (productivityLevels: productivityLevel) => {
    // Update state with the new level value
    const newLevel: string = `${productivityLevels.level} - ${productivityLevels.description}`
    setProductivity(newLevel)

    // Forward value to history if callback is provided and a selection is made
    onLevelSelect ? onLevelSelect(newLevel) : null
  }



  return(
    <div className="productivity">

      <div className="button-group">
      {/* Generate a button for each productivity level */}
      {productivityLevels.map((productivityLevel) => {
        //To style the chosen button
        const isSelected = productivity === `${productivityLevel.level} - ${productivityLevel.description}`

        return(
          <Button
          isSelected={isSelected}
          variant="neutral"
          onClick={() => handleClick(productivityLevel)}
          key={productivityLevel.level}
          >
              <span className="productivity-level">{productivityLevel.level}</span>
              <span className="productivity-description">{productivityLevel.description}</span>
          </Button>
        )
      })}
      </div>

    </div>
  )
}

export default ProductivityLogger