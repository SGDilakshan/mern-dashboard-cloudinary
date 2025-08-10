# MERN Dashboard

## Overview
This project is the frontend client of the MERN Stack Dashboard application, built with React and Vite for a fast and modern developer experience. It features a dynamic dashboard where users can update content for the Header, Navbar, and Footer components in real time.

Images are uploaded using Cloudinary, and the interface is styled with Tailwind CSS for a clean, responsive design. The app supports dynamic editing of titles, navigation links, and contact information without page reloads.

## Features
- React + Vite: Fast development with hot module replacement (HMR)
- Tailwind CSS: Utility-first CSS framework for styling
- Cloudinary Integration: Upload images from the dashboard with instant preview
- Dynamic Dashboard: Edit Header title and image, Navbar links, and Footer contact info live
- LocalStorage Persistence: (Optional) Saves changes locally to retain after refresh
- API Ready: Supports backend API integration to save and fetch content dynamically

## Technology Stack
- Frontend: React, Vite, Tailwind CSS
- Image Hosting: Cloudinary (unsigned uploads)
- State Management: React Hooks (optionally React Context or Redux)
- Backend: Node.js + Express (optional for data persistence)
- Database: MongoDB (optional)

## Setup & Installation
### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Steps
- Clone the repository
git clone https://github.com/yourusername/mern-dashboard-frontend.git
cd mern-dashboard-frontend

- Install dependencies
npm install

- Configure Cloudinary
Create a free Cloudinary account at cloudinary.com
In your Cloudinary dashboard, create an unsigned upload preset
Create a .env file at the project root and add:
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

- Run the development server
npm run dev

- Build for production
npm run build

- Preview production build
npm run preview

## Usage
- Open the dashboard page to edit the Header, Navbar, and Footer content.
- Upload images directly to Cloudinary and display them instantly in the Header.
- Edit navigation link labels and URLs dynamically.
- Update contact info in the footer.
- Changes reflect live without page reloads.
- (Optional) Changes persist across refresh using localStorage or backend API.

## Recommended ESLint Setup
- For production apps, consider using TypeScript and typescript-eslint for enhanced type safety and linting.
- Explore the React + TypeScript Vite template for a full TypeScript integration.

## Optional Backend Integration
- You can integrate with a Node.js + Express backend to persist data:
-   API endpoint /api/components to save and retrieve header, navbar, and footer data
-   Use MongoDB to store data
-   Secure Cloudinary credentials on the server side
-   Enable CORS for frontend requests

## License
This project is licensed under the MIT License.

## Contact
Sivanathan Dilakshan
Email: dilakshan.info@gmail.com
GitHub: https://github.com/SGDilakshan