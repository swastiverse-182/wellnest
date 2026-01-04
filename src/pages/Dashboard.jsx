import { useEffect, useState } from "react";

function Dashboard() {
  const [goals, setGoals] = useState([]);
  const [events, setEvents] = useState([]);

  //  Manual completed notes
  const [noteInput, setNoteInput] = useState("");
  const [completedNotes, setCompletedNotes] = useState(() => {
    const saved = localStorage.getItem("wellnest_completed_notes");
    return saved ? JSON.parse(saved) : [];
  });

  // LOAD DATA 
  useEffect(() => {
    const savedGoals = localStorage.getItem("wellnest_goals");
    const savedEvents = localStorage.getItem("healthEvents");

    setGoals(savedGoals ? JSON.parse(savedGoals) : []);
    setEvents(savedEvents ? JSON.parse(savedEvents) : []);
  }, []);

  // SAVE NOTES 
  useEffect(() => {
    localStorage.setItem(
      "wellnest_completed_notes",
      JSON.stringify(completedNotes)
    );
  }, [completedNotes]);

  const addNote = () => {
    if (!noteInput.trim()) return;

    setCompletedNotes((prev) => [
      ...prev,
      { id: Date.now(), text: noteInput },
    ]);
    setNoteInput("");
  };

  const removeNote = (id) => {
    setCompletedNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-10">
        Overview of your saved goals, reflections, and calendar events
      </p>

      {/* GOALS SUMMARY  */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">🎯 Saved Goals</h2>

        {goals.length === 0 ? (
          <p className="text-gray-500">No goals added yet.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1 text-gray-700 bg-white p-6 rounded-xl shadow-sm">
            {goals.map((g) => (
              <li key={g.id}>{g.text}</li>
            ))}
          </ul>
        )}
      </section>

      {/* COMPLETED NOTES */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          ✅ Completed Goals / Reflections
        </h2>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex gap-3 mb-4">
            <input
              className="flex-1 border px-4 py-2 rounded"
              placeholder="E.g. Completed morning yoga for 7 days"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
            />
            <button
              onClick={addNote}
              className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
            >
              Add
            </button>
          </div>

          {completedNotes.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No completed reflections yet
            </p>
          ) : (
            <ul className="space-y-2">
              {completedNotes.map((note) => (
                <li
                  key={note.id}
                  className="flex justify-between items-center border rounded px-4 py-2"
                >
                  <span className="text-gray-700">{note.text}</span>
                  <button
                    onClick={() => removeNote(note.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* CALENDAR SUMMARY */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">📅 Upcoming Events</h2>

        {events.length === 0 ? (
          <p className="text-gray-500">No calendar events added.</p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white p-5 rounded-xl shadow-sm"
              >
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <p className="text-gray-600 text-sm">
                  {event.date}
                  {event.time && ` • ${event.time}`}
                </p>
                {event.details && (
                  <p className="text-gray-500 mt-1">{event.details}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
