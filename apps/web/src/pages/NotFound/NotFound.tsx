import { Link } from "react-router-dom";
import { GoAlert } from "react-icons/go";
import Button from "../../components/Button/Button";
import "./NotFound.css";

function NotFound() {
    return (
    <div className="not-found-container">
      <div className="not-found-content">
        <GoAlert className="not-found-icon" size={64} />
        <h1>404</h1>
        <h2>Oops! Page not found</h2>
        <p>It looks like you've followed a path that doesn't exist. The page might have been moved or deleted.</p>
        <Button>
          <Link to="/" className="back-home-btn">
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFound