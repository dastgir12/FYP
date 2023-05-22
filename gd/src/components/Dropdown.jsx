import { useState } from 'react';
import { FaAngleDown, FaTimes } from 'react-icons/fa';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaAngleDown />}
      </div>
      {isOpen && (
        <div className="absolute top-10 right-0 bg-white border border-gray-200 rounded-lg py-2 px-4" onClick={() => setIsOpen(false)}>
          <p>Dropdown content goes here</p>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
