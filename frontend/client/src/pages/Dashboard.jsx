import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const {
    header,
    setHeader,
    navbar,
    setNavbar,
    footer,
    setFooter,
    loading,
  } = useContext(AppContext);

  // Header state
  const [headerTitle, setHeaderTitle] = useState("");
  const [headerImageUrl, setHeaderImageUrl] = useState("");

  // Navbar state
  const [navbarId, setNavbarId] = useState(null);
  const [links, setLinks] = useState([]);
  const [newNavLink, setNewNavLink] = useState({ label: "", url: "" });
  const [showAddNavInput, setShowAddNavInput] = useState(false);

  // Track which link is being edited
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [editLinkData, setEditLinkData] = useState({ label: "", url: "" });

  // Footer state
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (header) {
      setHeaderTitle(header.title || "");
      setHeaderImageUrl(header.imageUrl || "");
    }

    if (navbar && navbar.length > 0) {
      const navDoc = navbar[0];
      setNavbarId(navDoc._id);
      setLinks(navDoc.links || []);
    } else {
      setNavbarId(null);
      setLinks([]);
    }

    if (footer) {
      setEmail(footer.email || "");
      setPhone(footer.phone || "");
      setAddress(footer.address || "");
    }
  }, [header, navbar, footer]);

  // Header handlers
  const handleHeaderSave = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/header", {
        title: headerTitle,
        imageUrl: headerImageUrl,
      });
      setHeader(res.data);
      alert("Header saved!");
    } catch (error) {
      console.error(error);
      alert("Failed to save header.");
    }
  };

  const handleHeaderUpdate = async () => {
    try {
      const res = await axios.put("http://localhost:5000/api/header/update", {
        title: headerTitle,
        imageUrl: headerImageUrl,
      });
      setHeader(res.data);
      alert("Header updated!");
    } catch (error) {
      console.error(error);
      alert("Failed to update header.");
    }
  };

  // Navbar handlers
  const handleNewNavLinkChange = (e) => {
    const { name, value } = e.target;
    setNewNavLink((prev) => ({ ...prev, [name]: value }));
  };

  const openAddNavInput = () => {
    setShowAddNavInput(true);
  };

  const addNavlink = async () => {
    if (!newNavLink.label.trim() || !newNavLink.url.trim()) {
      alert("Please fill both label and URL.");
      return;
    }
    if (links.length >= 3) {
      alert("Maximum 3 navbar links allowed.");
      setShowAddNavInput(false);
      return;
    }

    const updatedLinks = [...links, newNavLink];

    try {
      let res;
      if (navbarId) {
        // Update existing navbar with new links array
        res = await axios.put(`http://localhost:5000/api/navbar/${navbarId}`, {
          links: updatedLinks,
        });
      } else {
        // Create new navbar
        res = await axios.post("http://localhost:5000/api/navbar", {
          links: updatedLinks,
        });
      }
      setNavbar([res.data]);
      setLinks(res.data.links);
      setNavbarId(res.data._id);
      alert("Navbar link saved!");
      setNewNavLink({ label: "", url: "" });
      setShowAddNavInput(false);
    } catch (error) {
      console.error(error);
      alert("Failed to save navbar link.");
    }
  };

  const handleDelete = async (id) => {
    try {
      // Remove link from local state first for UI feedback
    //   const updatedLinks = links.filter((link) => link._id !== id);
    //   setLinks(updatedLinks);

      // Update backend with new links array
      const res = await axios.delete(`http://localhost:5000/api/navbar/${id}`);
        
      

      setNavbar([res.data]);
      alert("Navbar link deleted!");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete navbar link.");
    }
  };

  // Open edit inputs for a specific link
  const startEditing = (link) => {
    setEditingLinkId(link._id);
    setEditLinkData({ label: link.label, url: link.url });
  };

  // Handle input changes while editing a link
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditLinkData((prev) => ({ ...prev, [name]: value }));
  };

  // Cancel editing mode
  const cancelEdit = () => {
    setEditingLinkId(null);
    setEditLinkData({ label: "", url: "" });
  };

  // Save updated link data
  const saveEdit = async () => {
    if (!editLinkData.label.trim() || !editLinkData.url.trim()) {
      alert("Both Label and URL are required.");
      return;
    }

    // Create a new links array with the updated link data
    const updatedLinks = links.map((link) =>
      link._id === editingLinkId ? { ...link, ...editLinkData } : link
    );

    try {
      const res = await axios.put(`http://localhost:5000/api/navbar/${navbarId}`, {
        links: updatedLinks,
      });
      setNavbar([res.data]);
      setLinks(res.data.links);
      alert("Navbar link updated!");
      cancelEdit();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update navbar link.");
    }
  };

  // Footer handlers
  const handleFooterSave = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/footer", {
        email,
        phone,
        address,
      });
      setFooter(res.data);
      alert("Footer saved!");
    } catch (error) {
      console.error(error);
      alert("Failed to save footer.");
    }
  };

  const handleFooterUpdate = async () => {
    try {
      const res = await axios.put("http://localhost:5000/api/footer/update", {
        email,
        phone,
        address,
      });
      setFooter(res.data);
      alert("Footer updated!");
    } catch (error) {
      console.error(error);
      alert("Failed to update footer.");
    }
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      {/* Header Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Edit Header</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded"
            value={headerTitle}
            onChange={(e) => setHeaderTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL (Cloudinary)"
            className="w-full p-2 border border-gray-300 rounded"
            value={headerImageUrl}
            onChange={(e) => setHeaderImageUrl(e.target.value)}
          />
          <div className="flex gap-4">
            <button
              onClick={handleHeaderSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Header
            </button>
            <button
              onClick={handleHeaderUpdate}
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900"
            >
              Update Header
            </button>
          </div>
        </div>
      </section>

      {/* Navbar Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Navbar Links</h2>
        <div className="mb-4 overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 border-b border-gray-300">Label</th>
                <th className="text-left px-4 py-2 border-b border-gray-300">URL</th>
                <th className="text-left px-4 py-2 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {navbar.map((link, idx) => (
                <tr key={link._id || idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {editingLinkId === link._id ? (
                      <input
                        type="text"
                        name="label"
                        value={editLinkData.label}
                        onChange={handleEditChange}
                        className="w-full p-1 border border-gray-400 rounded"
                      />
                    ) : (
                      link.label
                    )}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {editingLinkId === link._id ? (
                      <input
                        type="text"
                        name="url"
                        value={editLinkData.url}
                        onChange={handleEditChange}
                        className="w-full p-1 border border-gray-400 rounded"
                      />
                    ) : (
                      link.url
                    )}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 space-x-2">
                    {editingLinkId === link._id ? (
                      <>
                        <button
                          onClick={saveEdit}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(link)}
                          className="text-blue-600 hover:underline"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(link._id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!showAddNavInput && links.length < 3 && (
            <button
              onClick={openAddNavInput}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Another Link
            </button>
          )}
        </div>

        {showAddNavInput && (
          <div className="space-y-4 max-w-md">
            <input
              type="text"
              name="label"
              placeholder="Label"
              className="w-full p-2 border border-gray-300 rounded"
              value={newNavLink.label}
              onChange={handleNewNavLinkChange}
            />
            <input
              type="text"
              name="url"
              placeholder="URL"
              className="w-full p-2 border border-gray-300 rounded"
              value={newNavLink.url}
              onChange={handleNewNavLinkChange}
            />
            <div className="flex gap-4">
              <button
                onClick={addNavlink}
                className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-900"
              >
                Save Link
              </button>
              <button
                onClick={() => {
                  setShowAddNavInput(false);
                  setNewNavLink({ label: "", url: "" });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Footer Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Edit Footer</h2>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            className="w-full p-2 border border-gray-300 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full p-2 border border-gray-300 rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="flex gap-4">
            <button
              onClick={handleFooterSave}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Save Footer
            </button>
            <button
              onClick={handleFooterUpdate}
              className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-900"
            >
              Update Footer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
