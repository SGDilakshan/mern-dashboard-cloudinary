import React, { useEffect, useState } from "react";
import axios from "axios";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/footer");
        if (res.data && res.data.length > 0) {
          setFooterData(res.data[0]);
        } else {
          setFooterData(null);
        }
      } catch (err) {
        setError("Failed to load footer data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFooter();
  }, []);

  if (loading) {
    return (
      <footer className="bg-gray-800 text-white p-6 text-center">
        Loading...
      </footer>
    );
  }

  if (error) {
    return (
      <footer className="bg-red-600 text-white p-6 text-center">
        {error}
      </footer>
    );
  }

  if (!footerData) {
    return (
      <footer className="bg-gray-800 text-white p-6 text-center">
        No footer data found.
      </footer>
    );
  }

  return (
    <footer className="bg-gray-800 text-white p-6 text-center space-y-2">
      <p>Email: <a href={`mailto:${footerData.email}`} className="underline hover:text-gray-300">{footerData.email}</a></p>
      <p>Phone: <a href={`tel:${footerData.phone}`} className="underline hover:text-gray-300">{footerData.phone}</a></p>
      <p>Address: {footerData.address}</p>
    </footer>
  );
};

export default Footer;
