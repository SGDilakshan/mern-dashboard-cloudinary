import React, { useContext } from "react";
import { AppContext } from "./context/AppContext";

const Home = () => {
  const { header, navbar, footer, loading } = useContext(AppContext);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* Header */}
      {header && (
        <header className="text-center p-8 bg-gray-100">
            <h1>wdjwjd</h1>
          <h1 className="text-4xl font-bold mb-4">{header.title}</h1>
          {header.imageUrl && (
            <img
              src={header.imageUrl}
              alt={header.title}
              className="mx-auto max-w-xs rounded"
            />
          )}
        </header>
      )}

      {/* Navbar */}
      {navbar && navbar.links && (
        <nav className="bg-blue-600 p-4 text-white flex justify-center space-x-8">
          {navbar.links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}

      {/* Footer */}
      {footer && (
        <footer className="bg-gray-800 text-white text-center p-6 mt-12 space-y-2">
          <p>Email: {footer.email}</p>
          <p>Phone: {footer.phone}</p>
          <p>Address: {footer.address}</p>
        </footer>
      )}
    </div>
  );
};

export default Home;
