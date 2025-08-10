import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Navbar = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newLink, setNewLink] = useState({ label: '', url: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/navbar');
        // Ensure we only keep the first 3 links
        const limitedLinks = response.data?.links?.slice(0, 3) || [];
        setLinks(limitedLinks);
      } catch (err) {
        setError("Failed to fetch navbar links.");
      } finally {
        setLoading(false);
      }
    };
    fetchNavbar();
  }, []);

  const handleDelete = async (linkId) => {
    try {
      await axios.delete(`http://localhost:3000/api/navbar/link/${linkId}`);
      setLinks(links.filter(link => link._id !== linkId));
    } catch (err) {
      setError("Failed to delete link.");
    }
  };

  const handleAdd = async () => {
    if (!newLink.label || !newLink.url) {
      setError("Please provide both label and URL");
      return;
    }
    
    if (links.length >= 3) {
      setError("Maximum 3 navbar links allowed");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/navbar/addlink', newLink);
      // Only keep the first 3 links after adding
      const updatedLinks = response.data.links.slice(0, 3);
      setLinks(updatedLinks);
      setNewLink({ label: '', url: '' });
      setError(null);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to add link.");
    }
  };

  if (loading) return <div className="text-center py-4">Loading navigation...</div>;

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mb-4">
            {error}
          </div>     
        )}

        {/* Display Links */}
        <ul className="flex justify-center space-x-6">
          {links.map(({ _id, label, url }) => (
            <li key={_id} className="group relative">
              <a
                href={url}
                className="text-gray-800 hover:text-blue-600 font-medium transition-colors duration-300 py-2 px-3 rounded-md hover:bg-gray-50"
              >
                {label}
              </a>
              <button
                onClick={() => handleDelete(_id)}
                className="absolute -top-2 -right-2 text-red-600 hover:text-red-800 font-bold bg-white rounded-full w-5 h-5 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Delete link ${label}`}
                title="Delete link"
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        {/* Add New Link (only show if less than 3 links) */}
        {links.length < 3 && (
          <div className="mt-4 text-center">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Nav Link
              </button>
            ) : (
              <div className="flex justify-center space-x-2">
                <input
                  type="text"
                  placeholder="Label (e.g. Home)"
                  value={newLink.label}
                  onChange={e => setNewLink({...newLink, label: e.target.value})}
                  className="border rounded px-3 py-1 text-sm w-32"
                />
                <input
                  type="text"
                  placeholder="URL (e.g. /home)"
                  value={newLink.url}
                  onChange={e => setNewLink({...newLink, url: e.target.value})}
                  className="border rounded px-3 py-1 text-sm w-32"
                />
                <button
                  onClick={handleAdd}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setError(null);
                  }}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;