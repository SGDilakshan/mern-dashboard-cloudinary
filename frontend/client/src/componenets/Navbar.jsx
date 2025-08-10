import React, { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch navbar data from backend
  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/navbar");
        // Assuming backend returns an array and you want the first document
        if (response.data && response.data.length > 0) {
          setLinks(response.data[0].links || []);
        } else {
          setLinks([]);
        }
      } catch (err) {
        setError("Failed to load navbar links");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNavbar();
  }, []);

  if (loading) return <nav className="p-4 bg-blue-600 text-white">Loading...</nav>;
  if (error) return <nav className="p-4 bg-red-600 text-white">{error}</nav>;

  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex justify-center space-x-8 text-white font-semibold">
        {links.map((link, idx) => (
          <li key={idx}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {link.name || link.label || "Unnamed Link"}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
