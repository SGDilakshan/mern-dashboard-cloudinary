import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Header = () => {
  const [headerData, setHeaderData] = useState({ title: '', imageUrl: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch header data from backend API
    const fetchHeader = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/header');
        if (response.data) {
          setHeaderData({
            title: response.data.title || '',
            imageUrl: response.data.imageUrl || ''
          });
        }
      } catch (error) {
        console.error('Error fetching header data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeader();
  }, []);

  if (loading) return <div>Loading header...</div>;

  return (
    <header className="flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">{headerData.title}</h1>
      {headerData.imageUrl && (
        <img
          src={headerData.imageUrl}
          alt="Header"
          className="w-48 h-auto rounded-md shadow-md"
        />
      )}
    </header>
  );
};

export default Header;
