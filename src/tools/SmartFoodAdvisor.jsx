import { useState } from "react";
import { getFoodAdvice } from "../api/food";

function SmartFoodAdvisor() {
  const [query, setQuery] = useState("");
  const [recommended, setRecommended] = useState([]);
  const [avoidable, setAvoidable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFoods = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setRecommended([]);
    setAvoidable([]);

    try {
      const data = await getFoodAdvice(query);

      if (data.source === "rules") {
        setRecommended(data.recommended || []);
        setAvoidable(data.avoid || []);
      } else {
        setError("No recommendations found.");
      }
    } catch (err) {
      console.error(err);
      setError("Backend unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">
         Smart Food Advisor
      </h2>


      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">
          Enter a health condition or benefit
        </label>

        <input
          type="text"
          placeholder="e.g. diabetes, memory sharpness, menstrual health"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3
                     focus:outline-none
                     focus:border-gray-800
                     focus:ring-1 focus:ring-green-500
                     transition"
        />
      </div>

      <button
        onClick={fetchFoods}
        className="w-full bg-green-600 text-white py-3 rounded-xl
                   hover:bg-green-700 transition font-semibold mb-4"
      >
        Get Recommendations
      </button>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (recommended.length > 0 || avoidable.length > 0) && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Recommended Foods
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {recommended.map((food, idx) => (
                <li key={idx}>{food}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              Avoidable Foods
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {avoidable.map((food, idx) => (
                <li key={idx}>{food}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default SmartFoodAdvisor;
