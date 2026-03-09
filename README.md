Career Compass – MVP
Project Overview

Career Compass is a web-based career assessment application that collects user responses and stores them securely in Google Sheets for analysis.

The goal of this MVP is to:

Collect structured career preference data

Store responses in a connected Google Sheet

Provide a clean and responsive frontend experience

Validate and process data through a backend API

Tech Stack

This project is built with:

React

TypeScript

Vite

Tailwind CSS

shadcn-ui

Express.js (Backend)

Google Sheets API

Project Structure
career-compass/
│
├── frontend/ → React + Vite client
├── backend/ → Express server + Google Sheets integration
└── README.md
Running the Project Locally
1️⃣ Clone the Repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
2️⃣ Install Frontend Dependencies
cd frontend
npm install
npm run dev

Frontend will run on:

http://localhost:5173
3️⃣ Install Backend Dependencies

Open a new terminal:

cd backend
npm install
node server.js

Backend runs on:

http://localhost:5000
Environment Variables (Backend)

Create a .env file inside the backend folder with:

PORT=5000
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id

Make sure:

No trailing commas

The private key remains inside double quotes

\n is preserved exactly as shown

API Endpoint
POST /api/career-submit

Accepts assessment form data and appends it to Google Sheets.

Response:

{
"success": true,
"message": "Assessment submitted successfully!"
}
Current MVP Features

Career assessment form

Input validation middleware

Creative vs Analytical slider

Backend data processing

Automatic Google Sheets storage

Full JSON backup column in sheet

Deployment Notes

To deploy:

Frontend can be deployed using Vercel, Netlify, or similar platforms.

Backend can be deployed using Render, Railway, or similar Node hosting providers.

Environment variables must be configured in the hosting provider settings.

Future Improvements

Result scoring logic

Career recommendation engine

User authentication

Admin dashboard

Analytics visualization
