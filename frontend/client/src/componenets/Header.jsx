import React, { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const [headerData, setHeaderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/header");
        if (res.data && res.data.length > 0) {
          setHeaderData(res.data[0]);
        } else {
          setHeaderData(null);
        }
      } catch (err) {
        setError("Failed to load header data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeader();
  }, []);

  if (loading) {
    return (
      <header className="bg-gray-100 p-8 text-center">
        <p>Loading...</p>
      </header>
    );
  }

  if (error) {
    return (
      <header className="bg-red-100 p-8 text-center text-red-700">
        <p>{error}</p>
      </header>
    );
  }

  if (!headerData) {
    return (
      <header className="bg-gray-100 p-8 text-center">
        <p>No header data found.</p>
      </header>
    );
  }

  return (
    <header className="bg-gray-100 p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">{headerData.title}</h1>
      {headerData.imageUrl ? (
        <img
          src={headerData.imageUrl}
          alt={headerData.title}
          className="mx-auto max-w-xs rounded-lg shadow-lg"
        />
      ) : (
        <p>No image available.</p>
      )}
    </header>
  );
};

export default Header;
