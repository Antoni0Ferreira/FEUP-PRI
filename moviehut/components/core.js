import React, { useState } from 'react';

export default function Core() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
          <button onClick={toggleDropdown}>Choose Core</button>
          {isOpen && (
            <select value={selectedContext} onChange={handleContextChange} className={styles.dropdown}>
                <option value="simple_conversations">Simple Context</option>
                <option value="complex_conversations">Complex Context</option>
            </select>
          )}
        </div>
      );
};

