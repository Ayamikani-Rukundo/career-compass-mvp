/**
 * Google Sheets Service
 * Appends assessment data as a new row in the configured Google Sheet
 */

const { google } = require("googleapis");

/**
 * Authenticate with Google using service account credentials
 */
console.log("EMAIL:", process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
console.log("KEY EXISTS:", !!process.env.GOOGLE_PRIVATE_KEY);

function getAuthClient() {
  console.log("PRIVATE KEY START:");
  console.log(process.env.GOOGLE_PRIVATE_KEY?.slice(0, 30));
  console.log("PRIVATE KEY END:");
  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/spreadsheets"],
    );
    return auth;
  } catch (err) {
    console.error("AUTH ERROR:", err);
    throw err;
  }
}

/**
 * Append assessment data to Google Sheets
 * @param {Object} data - The validated assessment form data
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

  // Format arrays as comma-separated strings for the spreadsheet
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
    range: "Sheet1!A:P", // Columns A through P
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });
}

module.exports = { submitToSheets };
