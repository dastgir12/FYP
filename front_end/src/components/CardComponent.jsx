import React from 'react';

const CardComponent = ({ title, content, active }) => {
  return (
    <div className={`bg-white rounded-lg p-6 ${active ? 'shadow-lg' : ''}`}>
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};

export default CardComponent;
