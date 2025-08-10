import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSave, FiPlus, FiTrash2, FiImage, FiLink, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { lazy } from 'react';

const BASE_URL = 'http://localhost:3000/api';

const Dashboard = () => {
  const [content, setContent] = useState({
    header: { title: '', imageUrl: '' },
    navbar: [],
    footer: { email: '', phoneNumber: '', address: '' },
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('header');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [headerForm, setHeaderForm] = useState({ title: '', imageUrl: '' });
  const [navbarLinks, setNavbarLinks] = useState({label:'',url:''});
  const [footerForm, setFooterForm] = useState({ email: '', phoneNumber: '', address: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [headerRes, navbarRes, footerRes] = await Promise.all([
          axios.get(`${BASE_URL}/header`),
          axios.get(`${BASE_URL}/navbar`),
          axios.get(`${BASE_URL}/footer`),
        ]);

        setContent({
          header: headerRes.data || { title: '', imageUrl: '' },
          navbar: navbarRes.data?.links || [],
          footer: footerRes.data || { email: '', phoneNumber: '', address: '' },
        });

        setHeaderForm(headerRes.data || { title: '', imageUrl: '' });
        setNavbarLinks(navbarRes.data?.links?.slice(0, 3) || []);
        setFooterForm(footerRes.data || { email: '', phoneNumber: '', address: '' });
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('Failed to load content. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeaderForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFooterChange = (e) => {
    const { name, value } = e.target;
    setFooterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNavbarChange = (index, field, value) => {
    setNavbarLinks(prevLinks => {
      const newLinks = [...prevLinks];
      if (index >= 0 && index < newLinks.length) {
        newLinks[index] = { ...newLinks[index], [field]: value };
      }
      return newLinks;
    });
  };

  const addNavbarLink = () => {
    if (navbarLinks.length >= 3) {
      setErrorMessage('Maximum of 3 navigation links allowed');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    setNavbarLinks(prev => [...prev, { label: '', url: '' }]);
  };

  const removeNavbarLink = (index) => {
    setNavbarLinks(prev => prev.filter((_, i) => i !== index));
  };

  const submitHeader = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/header`, headerForm);
      showSuccess('Header saved successfully!');
    } catch (error) {
      showError('Error saving header');
    }
  };

  const submitNavbar = async (e) => {
    e.preventDefault();
    
    // Validate all links
    const invalidLinks = navbarLinks.filter(link => !link.label.trim() || !link.url.trim());
    if (invalidLinks.length > 0) {
      setErrorMessage('Please provide both label and URL for all links');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/navbar/addlink`, { 
         navbarLinks
      });
      
      setNavbarLinks(response.data.links || []);
      showSuccess('Navigation saved successfully!');
    } catch (error) {
      console.error('Error saving navbar:', error);
      showError('Error saving navigation');
    }
  };

  const submitFooter = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/footer`, footerForm);
      showSuccess('Footer saved successfully!');
    } catch (error) {
      showError('Error saving footer');
    }
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Website Dashboard</h1>
        </div>
        <nav className="mt-6">
          <button
            onClick={() => setActiveTab('header')}
            className={`flex items-center w-full px-6 py-3 text-left ${
              activeTab === 'header' 
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiImage className="mr-3" />
            Header
          </button>
          <button
            onClick={() => setActiveTab('navbar')}
            className={`flex items-center w-full px-6 py-3 text-left ${
              activeTab === 'navbar' 
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiLink className="mr-3" />
            Navigation
          </button>
          <button
            onClick={() => setActiveTab('footer')}
            className={`flex items-center w-full px-6 py-3 text-left ${
              activeTab === 'footer' 
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiMapPin className="mr-3" />
            Footer
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Notifications */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {errorMessage}
          </div>
        )}

        {/* Header Section */}
        {activeTab === 'header' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Header Settings</h2>
            <form onSubmit={submitHeader} className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={headerForm.title}
                  onChange={handleHeaderChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Website Title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={headerForm.imageUrl}
                  onChange={handleHeaderChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                  required
                />
                {headerForm.imageUrl && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                    <img 
                      src={headerForm.imageUrl} 
                      alt="Header Preview" 
                      className="max-h-40 object-contain border rounded-lg"
                      onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                    />
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FiSave className="mr-2" />
                Save Header
              </button>
            </form>
          </div>
        )}

        {/* Navbar Section */}
        {activeTab === 'navbar' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Navigation Settings</h2>
            <form onSubmit={submitNavbar} className="space-y-6">
              <div className="space-y-4">
                {navbarLinks.map((link, idx) => (
                  <div key={idx} className="flex items-center space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                      <input
                        type="text"
                        placeholder="Menu Item"
                        value={link.label}
                        onChange={(e) => handleNavbarChange(idx, 'label', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                      <input
                        type="url"
                        placeholder="/page"
                        value={link.url}
                        onChange={(e) => handleNavbarChange(idx, 'url', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeNavbarLink(idx)}
                      className="mt-6 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                      aria-label="Remove link"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex space-x-4">
                {navbarLinks.length < 3 && (
                  <button
                    type="button"
                    onClick={addNavbarLink}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    <FiPlus className="mr-2" />
                    Add Link
                  </button>
                )}
                <button
                  type="submit"
                  className={`flex items-center px-6 py-2 ${
                    navbarLinks.length > 0 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  disabled={navbarLinks.length === 0}
                >
                  <FiSave className="mr-2" />
                  Save Navigation
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Footer Section */}
        {activeTab === 'footer' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Footer Settings</h2>
            <form onSubmit={submitFooter} className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={footerForm.email}
                    onChange={handleFooterChange}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="contact@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={footerForm.phoneNumber}
                    onChange={handleFooterChange}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+1 (123) 456-7890"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                    <FiMapPin className="text-gray-400" />
                  </div>
                  <textarea
                    name="address"
                    value={footerForm.address}
                    onChange={handleFooterChange}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="123 Main St, City, Country"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FiSave className="mr-2" />
                Save Footer
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;