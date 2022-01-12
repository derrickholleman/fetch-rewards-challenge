function validateOccupationsAndStates(obj) {
  if (typeof obj.occupations !== "object" || typeof obj.states !== "object") {
    return false;
  }

  obj.occupations.forEach((occupation) =>
    typeof occupation !== "string" ? false : true
  );

  obj.states.forEach((state) =>
    typeof state.name !== "string" || typeof state.abbreviation !== "string"
      ? false
      : true
  );

  return true;
}

module.exports = { validateOccupationsAndStates };
