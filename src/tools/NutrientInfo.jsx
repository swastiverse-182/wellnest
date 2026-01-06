import { useState } from "react";
import { getFoodAdvice } from "../api/food";

function NutrientInfo() {
  const [food, setFood] = useState("");
  const [nutrition, setNutrition] = useState(null);
  const [nutritionError, setNutritionError] = useState("");

  const [query, setQuery] = useState("");
  const [recommended, setRecommended] = useState([]);
  const [avoidable, setAvoidable] = useState([]);
  const [advisorError, setAdvisorError] = useState("");
  const [loading, setLoading] = useState(false);

  /*  Nutrition  */
  const fetchNutrition = async () => {
    if (!food.trim()) return;

    setNutritionError("");
    setNutrition(null);

    try {
      const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${food}&pageSize=25&requireAllWords=true&api_key=${import.meta.env.VITE_USDA_API_KEY}`
      );
      const data = await res.json();

      if (!data.foods?.length) {
        setNutritionError("Food not found");
        return;
      }

      const validFood = data.foods.find(
        (item) =>
          item.dataType === "Foundation" ||
          item.dataType === "Survey (FNDDS)"
      );

      if (!validFood) {
        setNutritionError("No standard nutrition data available");
        return;
      }

      const nutrients = validFood.foodNutrients;
      const getValue = (name) =>
        nutrients.find((n) => n.nutrientName === name)?.value ?? 0;

      const protein = Number(getValue("Protein"));
      const carbs = Number(getValue("Carbohydrate, by difference"));
      const fat = Number(getValue("Total lipid (fat)"));
      const calories =
        getValue("Energy") || (protein * 4 + carbs * 4 + fat * 9).toFixed(1);

      setNutrition({
        name: validFood.description,
        serving: validFood.servingSize || 100,
        calories,
        protein,
        carbs,
        fat,
      });
    } catch {
      setNutritionError("Failed to fetch nutrition data");
    }
  };

  /* Smart Food Advisor */
  const fetchFoods = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setAdvisorError("");
    setRecommended([]);
    setAvoidable([]);

    try {
      const data = await getFoodAdvice(query);
      if (data.source === "rules") {
        setRecommended(data.recommended || []);
        setAvoidable(data.avoid || []);
      } else {
        setAdvisorError("No recommendations found");
      }
    } catch {
      setAdvisorError("Backend unavailable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-14">
      <h2 className="text-3xl font-bold text-center text-gray-900">
        Nutrition & Smart Food Guidance
      </h2>

      {/* INPUTS + BUTTONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Nutrition Input */}
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold text-center text-gray-800">
            Nutrition Info
          </h3>

          <input
            type="text"
            placeholder="Enter food (egg, rice, mushroom)"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-5 py-4
                       focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={fetchNutrition}
            className="w-full bg-green-600 text-white py-4 rounded-xl
                       font-semibold hover:bg-green-700 transition"
          >
            Get Nutrition
          </button>

          {nutritionError && (
            <p className="text-red-500 text-sm">{nutritionError}</p>
          )}
        </div>

        {/* Smart Advisor Input */}
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold text-center text-gray-800">
            Smart Food Advisor
          </h3>

          <input
            type="text"
            placeholder="Diabetes, immunity, menstrual health..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-5 py-4
                       focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={fetchFoods}
            className="w-full bg-green-600 text-white py-4 rounded-xl
                       font-semibold hover:bg-green-700 transition"
          >
            Get Recommendations
          </button>

          {loading && <p className="text-gray-600">Loading...</p>}
          {advisorError && (
            <p className="text-red-500 text-sm">{advisorError}</p>
          )}
        </div>
      </div>

      {/* RESULTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Nutrition Result */}
        {nutrition && (
          <div className="bg-green-50 rounded-xl p-6 space-y-2 text-base">
            <p><b>Food:</b> {nutrition.name}</p>
            <p><b>Serving:</b> {nutrition.serving} g</p>
            <p><b>Calories:</b> {nutrition.calories} kcal</p>
            <p><b>Protein:</b> {nutrition.protein} g</p>
            <p><b>Carbs:</b> {nutrition.carbs} g</p>
            <p><b>Fat:</b> {nutrition.fat} g</p>
          </div>
        )}

        {/* Advisor Result */}
        {(recommended.length > 0 || avoidable.length > 0) && (
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold text-green-700 mb-3">
                Recommended Foods
              </h4>
              <ul className="list-disc list-inside space-y-2">
                {recommended.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-red-600 mb-3">
                Avoidable Foods
              </h4>
              <ul className="list-disc list-inside space-y-2">
                {avoidable.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NutrientInfo;
