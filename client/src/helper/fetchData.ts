const url =
  process.env.NODE_ENV === "production"
    ? "https://server.kapit-coffee.com/getAllusers"
    : "http://localhost:3000/getAllusers";
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

const fetchData = async () => {
  try {
    const response = await fetch(url, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const json = await response.json();
    console.log(response);
    return json;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { fetchData, getCookie };
