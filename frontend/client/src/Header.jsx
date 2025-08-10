import React from 'react';

const Header = ({ title, imageUrl }) => {
  return (
    <header className="flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt="Header" 
          className="w-48 h-auto rounded-md shadow-md" 
        />
      )}
    </header>
  );
}

export default Header;
