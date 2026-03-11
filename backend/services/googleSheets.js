/**
 * Google Sheets Service
 * Appends assessment data as a new row in the configured Google Sheet
 */

const { google } = require("googleapis");
const path = require("path");

/**
 * Authenticate with Google using service account JSON file
 */
function getAuthClient() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, "../google-credentials.json"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    return auth;
  } catch (err) {
    console.error("AUTH ERROR:", err);
    throw err;
  }
}

/**
 * Append assessment data to Google Sheets
 */
async function submitToSheets(data) {
  console.log("Scale inside Sheets:", data.creativeAnalyticalScale);

  const auth = getAuthClient();
  const sheets = google.sheets({ version: "v4", auth });

  const {
    name,
    email,
    age,
    schoolLevel,
    favoriteSubjects,
    strongestSubjects,
    grades,
    interests,
    strengths,
    workPreference,
    creativeAnalyticalScale,
    dreamCareer,
    incomeExpectation,
    impactImportance,
  } = data;

  const formatField = (value) => {
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "string") return value;
    return "";
  };

  const row = [
    new Date().toISOString(),
    name,
    email,
    age,
    schoolLevel,
    formatField(favoriteSubjects),
    formatField(strongestSubjects),
    grades || "N/A",
    formatField(interests),
    formatField(strengths),
    workPreference || "N/A",
    creativeAnalyticalScale ?? "N/A",
    dreamCareer,
    incomeExpectation || "N/A",
    impactImportance || "N/A",
    JSON.stringify(data),
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A:P",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });

  console.log("Data successfully written to Google Sheets.");
}

module.exports = { submitToSheets };
