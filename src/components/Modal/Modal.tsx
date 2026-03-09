import { IoMdClose } from "react-icons/io";
import "./Modal.css"

interface ModalProps {
  children: React.ReactNode
  onClose: () => void,
  title?: React.ReactNode
}

function Modal({children, onClose, title}: ModalProps) {

  const handleClickOutside = () => {
    onClose()
  }
  
  // Prevents clicks inside the modal from bubbling up to the overlay and closing the window
  const stopClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return(
    <div className="overlay" onClick={handleClickOutside}>
      <div className="modal-container" onClick={stopClick}>
        <div className="modal-header-container">
          {title && <h2 className="modal-header">{title}</h2>}
          <button
            className="close-button"
            onClick={onClose}
          >
            <IoMdClose /> 
          </button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal