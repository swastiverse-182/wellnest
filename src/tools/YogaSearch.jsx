import { useState } from "react";

function YogaSearch() {
  const [query, setQuery] = useState("");
  const [poses, setPoses] = useState([]);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const fetchYogaPoses = async () => {
    if (!query) return;

    setError("");
    setPoses([]);

    try {
      const res = await fetch("https://yoga-api-nzy4.onrender.com/v1/poses");
      const data = await res.json();

      const search = query.toLowerCase().trim();

      const filtered = data.filter((pose) => {
        const fields = [
          pose.english_name,
          pose.pose_description,
          pose.pose_benefits,
          pose.sanskrit_name_adapted,
        ];

        return fields.some(
          (field) => field && field.toLowerCase().includes(search)
        );
      });

      if (filtered.length === 0) {
        setError("No poses found. Try balance, strength, stretch.");
      } else {
        setPoses(filtered.slice(0, 6));
      }
    } catch {
      setError("Error fetching yoga poses");
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-black-700">
         Yoga Pose Finder
      </h2>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search pose, body part, or benefit (head, back, balance)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={fetchYogaPoses}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Find Poses
        </button>
      </div>

      {error && (
        <p className="text-red-600 text-sm mb-4">{error}</p>
      )}

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {poses.map((pose) => (
          <div
            key={pose.id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col"
          >
            <h4 className="font-semibold text-lg text-gray-800">
              {pose.english_name}
            </h4>

            <p className="text-sm text-gray-500 italic mb-2">
              {pose.sanskrit_name_adapted}
            </p>

            {pose.pose_benefits && (
              <div className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Benefits:</span>{" "}
                {expandedId === pose.id
                  ? pose.pose_benefits
                  : pose.pose_benefits.slice(0, 120) + "..."}
              </div>
            )}

            {pose.pose_benefits && (
              <button
                onClick={() =>
                  setExpandedId(
                    expandedId === pose.id ? null : pose.id
                  )
                }
                className="text-green-600 text-sm font-medium mb-3 hover:underline self-start"
              >
                {expandedId === pose.id ? "Show less" : "Read more"}
              </button>
            )}

            {pose.url_png && (
              <img
                src={pose.url_png}
                alt={pose.english_name}
                className="w-full h-48 object-contain rounded-lg bg-gray-50 mt-auto"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default YogaSearch;
