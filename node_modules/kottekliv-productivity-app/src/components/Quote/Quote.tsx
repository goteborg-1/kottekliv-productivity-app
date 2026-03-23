import { useEffect, useState } from "react"
import useAxiosApi from "../../hooks/useAxiosApi"
import "./Quote.css"

const adviceBaseURL = "https://api.adviceslip.com"

interface AdviceResponse {
  slip: {
    id: number;
    advice: string;
  }
}

function Quote() {
  const [ quote, setQuote ] = useState<string>("")
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState("")
  
  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const adviceApi = await useAxiosApi(adviceBaseURL)
        const res = await adviceApi.get<AdviceResponse>("/advice")
        setQuote(res.data.slip.advice)
      } catch (error) {
        setError("An error does not become a mistake until you refuse to correct it.")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if(loading) {
    return(
      <div className="quote-container">
        <p className="quote loading-text">
          Loading quote
          <span className="dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </p>
      </div>
    )
  }

  if(error) {
    return(
      <div className="quote-container">
        <p className="quote">
          {error}
        </p>
      </div>
    )
  }

  return(
    <div className="quote-container">
      <p className="quote">{quote}</p>
    </div>
  )
}

export default Quote