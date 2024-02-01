const fetchData = async () => {
  try {
    const data = await fetch("http://localhost:3000/getAllusers");
    const json = await data.json();

    return json;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchData;
