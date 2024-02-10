const fetchData = async () => {
  try {
    const response = await fetch(
      "https://workdbackend.azurewebsites.net/getAllusers",
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchData;
