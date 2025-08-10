import React from 'react';

const Footer = ({ email, phone, address }) => {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center">
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>Address: {address}</p>
    </footer>
  );
}

export default Footer;
