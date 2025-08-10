import React from 'react';

const Navbar = () => {
  const links = [
    { 
      label: "About",  // Fixed typo (was "lable" in first item)
      url: "#about"
    },
    {
      label: "Services",  // Changed to plural for consistency
      url: "#services"    // Changed to match
    },
    {
      label: "Contact",
      url: "#contact"
    }
  ];

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4">
        <ul className="flex justify-center space-x-6 md:space-x-10">
          {links.map(({ label, url }, index) => (
            <li key={index}>
              <a 
                href={url}
                className="text-gray-800 hover:text-blue-600 font-medium transition-colors duration-300 py-2 px-3 rounded-md hover:bg-gray-50"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;