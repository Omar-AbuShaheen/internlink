import React, { useState, useRef, useEffect } from 'react';
import '../styles/Dropdown.css';

const Dropdown = ({
  trigger,
  items,
  placement = 'bottom-right', // bottom-right, bottom-left, top-right, top-left
  variant = 'default', // default, minimal
  width = 'auto',
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    if (onSelect) {
      onSelect(item);
    }
    setIsOpen(false);
  };

  return (
    <div className={`dropdown-container ${variant}`} ref={dropdownRef}>
      <div className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      {isOpen && (
        <div className={`dropdown-menu ${placement}`} style={{ width }}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`dropdown-item ${item.disabled ? 'disabled' : ''} ${item.danger ? 'danger' : ''}`}
              onClick={() => !item.disabled && handleItemClick(item)}
            >
              {item.icon && <span className="dropdown-item-icon">{item.icon}</span>}
              <span className="dropdown-item-label">{item.label}</span>
              {item.badge && <span className="dropdown-item-badge">{item.badge}</span>}
              {item.shortcut && <span className="dropdown-item-shortcut">{item.shortcut}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown; 