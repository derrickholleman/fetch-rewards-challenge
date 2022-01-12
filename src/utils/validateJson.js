function validateOccupationsAndStates(obj) {
  if (typeof obj.occupations !== "object" || typeof obj.states !== "object") {
    throw new Error("invalid data");
  }

  let validOccupations = obj.occupations.every(
    (occupation) => typeof occupation === "string"
  );

  let validStates = obj.states.every(
    (state) =>
      typeof state.name === "string" && typeof state.abbreviation === "string"
  );

  if (validOccupations && validStates) {
    return true;
  } else {
    throw new Error("invalid data");
  }
}

module.exports = { validateOccupationsAndStates };
