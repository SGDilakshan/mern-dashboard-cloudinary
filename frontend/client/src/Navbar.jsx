import React from 'react';

const Navbar = ({ links }) => {
  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex justify-center space-x-8">
        {links && links.map(({ label, url }, index) => (
          <li key={index}>
            <a href={url} className="text-white hover:underline" target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
