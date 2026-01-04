import { useState } from "react";

/* Block clearly non-wellness topics */
const isNonWellnessQuery = (query) => {
  const blockedTerms = [
    "movie",
    "movies",
    "film",
    "trailer",
    "song",
    "music",
    "lyrics",
    "web series",
    "episode",
    "gaming",
    "game",
    "comedy",
    "standup",
    "review",
    "tv show",
    "series"
  ];

  const q = query.toLowerCase();
  return blockedTerms.some((term) => q.includes(term));
};

function YouTubeWellnessSearch() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    if (!query.trim()) {
      setError("Please enter a wellness topic");
      return;
    }

    /*  Stop non-wellness searches */
    if (isNonWellnessQuery(query)) {
      setError(
        "Please search for wellness topics like yoga, meditation, exercise, relaxation, or mental health."
      );
      setVideos([]);
      return;
    }

    setLoading(true);
    setError("");
    setVideos([]);

    try {
      /*  Bias YouTube towards wellness */
      const searchQuery = `${query} health wellness`;

      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(
          searchQuery
        )}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
      );

      const data = await res.json();

      if (data.error) {
        setError(data.error.message);
        setLoading(false);
        return;
      }

      if (!data.items || data.items.length === 0) {
        setError("No wellness videos found");
        setLoading(false);
        return;
      }

      setVideos(data.items.slice(0, 6));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch videos");
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      {/* Heading with Tailwind */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-left">
         Wellness Videos Search
      </h2>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search yoga, stress relief, knee pain, meditation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 w-7/12 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
        />

        <button
          onClick={fetchVideos}
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="flex flex-wrap gap-4 mt-5">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="w-[300px] border border-gray-300 rounded-xl p-2 shadow-sm"
          >
            <h4 className="text-sm font-medium mb-2">{video.snippet.title}</h4>

            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full rounded-lg"
              />
            </a>

            <p className="text-xs text-gray-600 mt-1">
              {video.snippet.channelTitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YouTubeWellnessSearch;
