const fetchData = async () => {
  try {
    const data = await fetch(
      "https://workdbackend.azurewebsites.net/getAllusers"
    );
    const json = await data.json();

    return json;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchData;
