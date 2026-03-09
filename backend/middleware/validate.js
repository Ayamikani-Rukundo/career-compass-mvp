/**
 * Validation middleware for assessment data
 * Prevents empty or malformed submissions
 */

function validateAssessmentData(req, res, next) {
  const {
    name,
    email,
    age,
    schoolLevel,
    favoriteSubjects,
    interests,
    dreamCareer,
  } = req.body;

  const errors = [];

  // Step 1: Basic Info
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("Name is required and must be at least 2 characters.");
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("A valid email is required.");
  }

  if (!age || isNaN(age) || age < 13 || age > 100) {
    errors.push("Age must be a number between 13 and 100.");
  }

  if (!schoolLevel || typeof schoolLevel !== "string") {
    errors.push("School level is required.");
  }

  // Step 2: Academic Profile
  if (
    !favoriteSubjects ||
    !Array.isArray(favoriteSubjects) ||
    favoriteSubjects.length === 0
  ) {
    errors.push("At least one favorite subject is required.");
  }

  // Step 3: Interests
  if (
    !interests ||
    typeof interests !== "string" ||
    interests.trim().length < 2
  ) {
    errors.push("At least one interest hobby is required.");
  }

  // Step 4: Goals
  if (
    !dreamCareer ||
    typeof dreamCareer !== "string" ||
    dreamCareer.trim().length < 2
  ) {
    errors.push("Dream career is required.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors,
    });
  }

  next();
}

module.exports = { validateAssessmentData };
