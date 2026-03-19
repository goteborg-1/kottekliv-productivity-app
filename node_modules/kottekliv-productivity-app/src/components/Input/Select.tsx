import './Input.css'
import { IoIosArrowDown } from "react-icons/io"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  id: string,
  options: string[],
  selectLabel: string
}

function Select({label, id, options, selectLabel, ...rest}: SelectProps) {

  return(
    <div className = "input-container">
      {label && <label htmlFor={id}>{label}</label>}

        <div className='select-container'>
          <select id={id} {...rest}>
            <option value="" disabled >{selectLabel}</option>

            {options.map((option, index) => (
              <option key={index}>
                {option}
              </option>
            ))}
          </select>
          <IoIosArrowDown className="select-icon" />
        </div>
    </div>
  )
}

export default Select;