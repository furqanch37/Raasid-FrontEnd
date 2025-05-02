import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ToastNotification.css'; // Import the CSS file

const ToastNotification = ({
  message,
  show,
  onClose,
  linked,
  linkTexted,
  status,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenRendered, setHasBeenRendered] = useState(false); // Track first render
  const [progressKey, setProgressKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const remainingTimeRef = useRef(3000); // Default 3s countdown
  const startTimeRef = useRef(null); // Track when toast starts

  useEffect(() => {
    if (show) {
      setHasBeenRendered(true); // Remove initial hiding after first show
      setIsVisible(true);
      setProgressKey((prevKey) => prevKey + 1);
      remainingTimeRef.current = 3000; // Reset time
      startTimeRef.current = Date.now(); // Set the start time

      timerRef.current = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 400);
      }, remainingTimeRef.current);

      return () => clearTimeout(timerRef.current);
    }
  }, [show, onClose]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current); // Pause timer
      remainingTimeRef.current -= Date.now() - startTimeRef.current; // Update remaining time
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startTimeRef.current = Date.now(); // Reset start time

    timerRef.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 400);
    }, remainingTimeRef.current);
  };

  const getStatusClass = () => {
    switch (status) {
      case 'success':
        return 'progress-success';
      case 'loading':
        return 'progress-loading';
      case 'error':
        return 'progress-error';
      default:
        return 'progress-default';
    }
  };
  return (
    <div
      className={`toast-container ${
        !hasBeenRendered ? 'hideInitial' : isVisible ? 'show' : 'hide'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ position: 'relative', width: '100%' }}>
        <div
          key={progressKey}
          className={`toast-progress ${getStatusClass()} ${isPaused ? 'paused' : ''}`}
        ></div>
      </div>
      <button className="close-toast-btn" onClick={() => setIsVisible(false)}>
        &times;
      </button>
      <p className={`toast-message ${!linked ? 'centered-text' : ''}`}>
        {message}
      </p>

      {linked && (
        <Link to={linked} className="view-cart-btn">
          {linkTexted}
        </Link>
      )}
    </div>
  );
};

export default ToastNotification;
