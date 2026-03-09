/**
 * Career Assessment MVP - Express Server
 * Handles form submissions and appends data to Google Sheets
 */

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { submitToSheets } = require("./services/googleSheets");
const { validateAssessmentData } = require("./middleware/validate");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8080"],
    credentials: true,
  }),
);
app.use(express.json());
// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/**
 * POST /api/career-submit
 * Validates assessment data and appends it to Google Sheetsconst appendToSheet = require("./googleSheets");

app.post("/api/career-submit", async (req, res) => {
 */
app.post("/api/career-submit", validateAssessmentData, async (req, res) => {
  console.log("Incoming scale:", req.body.creativeAnalyticalScale);
  try {
    const data = req.body;

    await submitToSheets(data);

    return res.status(200).json({
      success: true,
      message: "Assessment submitted successfully!",
    });
  } catch (error) {
    console.error("Submission error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to submit assessment. Please try again later.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
