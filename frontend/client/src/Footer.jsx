import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Footer = () => {
  const [footerData, setFooterData] = useState({
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/footer');
        if (response.data) {
          setFooterData({
            email: response.data.email || '',
            phone: response.data.phoneNumber || '',
            address: response.data.address || ''
          });
        }
      } catch (error) {
        console.error('Error fetching footer data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooter();
  }, []);

  if (loading) return <div>Loading footer...</div>;

  return (
    <footer className="bg-gray-800 text-white p-6 text-center">
      <p>Email: {footerData.email}</p>
      <p>Phone: {footerData.phone}</p>
      <p>Address: {footerData.address}</p>
    </footer>
  );
};

export default Footer;
