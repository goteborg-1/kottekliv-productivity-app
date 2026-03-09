import { useSessions, type Session } from "../../../context/SessionContext";

import Modal from "../Modal";
import Input from "../../Input/Input";
import Select from "../../Input/Select";
import Button from "../../Button/Button";
import "./AddSessionModal.css"

interface AddSessionModalProps {
  onClose: () => void
}

function AddSessionModal({onClose}: AddSessionModalProps) {

  const { addSession } = useSessions()

  const handleForm = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    //add id to the data
    const newSession = { ...data, id: crypto.randomUUID() }

    addSession(newSession as unknown as Session)
    onClose()
  }

  return(
    <Modal onClose={onClose} title="Log Session">
      <form 
        action="submit"
        onSubmit={handleForm}
      >
        <Input 
          name={"sessionName"}
          id={"sessionName"}
          label={"Session Name"}
          placeholder={"e.g. Report writing, Planning..."}
        />

        <div className="input-row">
          <Select
            name={"category"}
            id="category"
            label={"Category*"}
            selectLabel={"Select Category"}
            defaultValue={""}
            required

            options={[
              "Deep Work", 
              "Admin", 
              "Meeting", 
              "Break", 
              "Other"
            ]}
          />

          <Select
            name={"productivity"}
            id="productivity"
            label={"Productivity"}
            selectLabel={"Select Productivity"}
            defaultValue={""}

            options={[
              "1 - Poor", 
              "2 - Fair", 
              "3 - Good", 
              "4 - Very Good", 
              "5 - Excellent"
            ]}
          />
        </div>
        

        <Input 
          name={"date"}
          type={"date"}
          id="date"
          label={"Date*"}
          defaultValue={new Date().toISOString().split('T')[0]} // Default to today's date
          required
        />

        <div className="input-row">
            <Input
              name={"startTime"}
              type="time"
              id="start-time"
              label="Start Time*"
              required
            />
          
            <Input 
              name={"endTime"}
              type="time"
              id="end-time"
              label="End Time*"
              required
            />
        </div>

        <Button type={"submit"}>
          Save Session
        </Button>

        <p className="required-info">* Required fields</p>
      </form>
    </Modal>
  )
}

export default AddSessionModal