import React, { useState, useEffect } from 'react';
import '../styles/Toast.css';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`toast-container ${type}`}>
      <div className="toast-content">
        <div className="toast-icon">
          {type === 'success' && <i className="fas fa-check-circle"></i>}
          {type === 'error' && <i className="fas fa-exclamation-circle"></i>}
          {type === 'warning' && <i className="fas fa-exclamation-triangle"></i>}
          {type === 'info' && <i className="fas fa-info-circle"></i>}
        </div>
        <div className="toast-message">{message}</div>
        <button className="toast-close" onClick={() => {
          setIsVisible(false);
          if (onClose) onClose();
        }}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default Toast; 