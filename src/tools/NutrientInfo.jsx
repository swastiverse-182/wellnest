import { useState } from "react";
import SmartFoodAdvisor from "./SmartFoodAdvisor";

function NutrientInfo() {
  const [food, setFood] = useState("");
  const [nutrition, setNutrition] = useState(null);
  const [error, setError] = useState("");

  const fetchNutrition = async () => {
    if (!food.trim()) return;

    setError("");
    setNutrition(null);

    try {
      const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${food}&pageSize=25&requireAllWords=true&api_key=${import.meta.env.VITE_USDA_API_KEY}`
      );

      const data = await res.json();

      if (!data.foods || data.foods.length === 0) {
        setError("Food not found");
        return;
      }

      const validFood = data.foods.find(
        (item) =>
          item.dataType === "Foundation" ||
          item.dataType === "Survey (FNDDS)"
      );

      if (!validFood) {
        setError("No standard nutrition data available");
        return;
      }

      const nutrients = validFood.foodNutrients;

      const getValue = (name) =>
        nutrients.find((n) => n.nutrientName === name)?.value ?? "N/A";

      let protein = getValue("Protein");
      let carbs = getValue("Carbohydrate, by difference");
      let fat = getValue("Total lipid (fat)");
      let calories = getValue("Energy");
      let alcohol = getValue("Alcohol, ethyl");

      protein = protein !== "N/A" ? Number(protein) : 0;
      carbs = carbs !== "N/A" ? Number(carbs) : 0;
      fat = fat !== "N/A" ? Number(fat) : 0;
      alcohol = alcohol !== "N/A" ? Number(alcohol) : 0;

      if (calories === "N/A" && alcohol === 0) {
        calories = (protein * 4 + carbs * 4 + fat * 9).toFixed(1);
      }

      setNutrition({
        name: validFood.description,
        serving: validFood.servingSize || 100,
        calories,
        protein,
        carbs,
        fat,
        alcohol,
      });
    } catch {
      setError("Failed to fetch nutrition data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">
         Nutrition & Smart Food Guidance
      </h1>

      {/* Side-by-side on desktop, stacked on mobile */}
      <div className="grid md:grid-cols-2 gap-8 items-stretch">

        {/* Nutrition Info */}
        <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col h-full">
          <div className="h-full flex flex-col max-w-4xl mx-auto px-4 py-6">

            <h2 className="text-2xl font-bold mb-4 text-center text-black min-h-[40px] flex items-center justify-center">
              Nutrition Info
            </h2>

            <input
              type="text"
              placeholder="Enter food (egg, rice, mushroom)"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3
                         focus:outline-none
                         focus:border-gray-800
                         focus:ring-1 focus:ring-green-500
                         transition mb-4"
            />

            <button
              onClick={fetchNutrition}
              className="w-full bg-green-600 text-white py-3 rounded-xl
                         hover:bg-green-700 transition font-semibold mb-4"
            >
              Get Nutrition
            </button>

            {error && (
              <p className="text-red-500 text-center mb-4">{error}</p>
            )}

            {nutrition && (
              <div className="mt-4 bg-green-50 p-4 rounded-lg space-y-1 flex-1">
                <p><b>Food:</b> {nutrition.name}</p>
                <p><b>Serving:</b> {nutrition.serving} g</p>
                <p><b>Calories:</b> {nutrition.calories} kcal</p>
                <p><b>Protein:</b> {nutrition.protein} g</p>
                <p><b>Carbs:</b> {nutrition.carbs} g</p>
                <p><b>Fat:</b> {nutrition.fat} g</p>
                {nutrition.alcohol > 0 && (
                  <p className="text-orange-600 font-semibold">
                    ⚠ Contains alcohol
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Smart Food Advisor(unchanged) */}
        <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col h-full">
          <SmartFoodAdvisor />
        </div>

      </div>
    </div>
  );
}

export default NutrientInfo;
