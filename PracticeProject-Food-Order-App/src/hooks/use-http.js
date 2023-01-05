const useHttp = () => {
  async function getMeals(requestData) {
    const response = await fetch(requestData.url);
    if (!response.ok) {
      throw new Error(`Something went wrong: ${response.status}`);
    }
    try {
      const data = await response.json();

      const meals = Object.values(data);

      return meals;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  return {
    getMeals,
  };
};

export default useHttp;
