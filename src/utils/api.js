export async function getOccupationsAndStates() {
  try {
    const response = await fetch(
      "https://frontend-take-home.fetchrewards.com/form"
    );
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}

export async function submitUserData(userData) {
  try {
    return await fetch(
      "https://frontend-take-home.fetchrewards.com/form",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
  } catch (err) {
    console.error(err);
  }
}
