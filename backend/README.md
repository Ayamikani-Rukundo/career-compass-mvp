# Career Assessment Backend

Express server that receives assessment submissions and stores them in Google Sheets.

## Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Google Sheets API:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project (or select existing)
   - Enable the **Google Sheets API**
   - Go to **Credentials** → **Create Credentials** → **Service Account**
   - Download the JSON key file
   - Copy the `client_email` and `private_key` from the JSON

3. **Create your Google Sheet:**
   - Create a new Google Sheet
   - Add these headers in row 1: `Timestamp | Name | Email | Age | School Level | Favorite Subjects | Strongest Subjects | Grades | Interests | Strengths | Work Preference | Creative vs Analytical | Dream Career | Income Expectation | Impact Importance`
   - Share the sheet with your service account email (give **Editor** access)
   - Copy the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

4. **Set environment variables:**
   ```bash
   cp .env.example .env
   ```
   Fill in your credentials in the `.env` file.

5. **Run the server:**
   ```bash
   # Development (with auto-reload)
   npm run dev

   # Production
   npm start
   ```

## API Endpoints

### `GET /api/health`
Health check endpoint.

### `POST /api/career-submit`
Submit assessment data.

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 17,
  "schoolLevel": "high-school",
  "favoriteSubjects": ["Math", "Science"],
  "strongestSubjects": ["Math"],
  "grades": "A",
  "interests": ["Coding", "Reading"],
  "strengths": ["Problem Solving"],
  "workPreference": "hybrid",
  "creativeVsAnalytical": 7,
  "dreamCareer": "Software Engineer",
  "incomeExpectation": "high",
  "impactImportance": "very-important"
}
```

## Folder Structure
```
backend/
├── server.js                 # Entry point
├── middleware/
│   └── validate.js           # Request validation
├── services/
│   └── googleSheets.js       # Google Sheets API integration
├── .env.example              # Environment variables template
├── package.json
└── README.md
```
