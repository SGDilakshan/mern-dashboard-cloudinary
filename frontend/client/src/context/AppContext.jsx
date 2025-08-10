import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    
  const [header, setHeader] = useState(null);
  const [navbar, setNavbar] = useState(null);
  const [footer, setFooter] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all data once on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [headerRes, navbarRes, footerRes] = await Promise.all([
          axios.get("http://localhost:5000/api/header"),
          axios.get("http://localhost:5000/api/navbar"),
          axios.get("http://localhost:5000/api/footer"),
        ]);
        setHeader(headerRes.data[0] || null);
        setNavbar(navbarRes.data || null);
        setFooter(footerRes.data || null);

        // console.log(footer);
        console.log(header);

        

      } catch (error) {
        console.error("Failed to fetch initial data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ header, setHeader, navbar, setNavbar, footer, setFooter, loading }}>
      {children}
    </AppContext.Provider>
  );

};
