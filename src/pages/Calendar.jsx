import { useState, useEffect } from "react";
import CalendarEvent from "../components/CalendarEvent";
import calendarBg from "../assets/calendarBg.png";

function Calendar() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("healthEvents");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    localStorage.setItem("healthEvents", JSON.stringify(events));
  }, [events]);

  const addEvent = () => {
    if (!title || !date) {
      alert("Title and date are required");
      return;
    }

    setEvents((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        date,
        time,
        details,
      },
    ]);

    setTitle("");
    setDate("");
    setTime("");
    setDetails("");
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center py-12 px-4"
      style={{ backgroundImage: `url(${calendarBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/30"></div>

      {/* Main container */}
      <div className="relative z-10 max-w-5xl mx-auto bg-green-50/90 backdrop-blur-lg rounded-3xl p-6 md:p-10 shadow-xl border border-green-200">
        <h1 className="text-3xl font-bold mb-8 text-green-700 text-center">
          📅 Health Calendar
        </h1>

        {/* Add Event */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input
              className="border px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-500"
              placeholder="Event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="border px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-500"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              className="border px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-500"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <button
              onClick={addEvent}
              className="bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-semibold py-3"
            >
              Add
            </button>
          </div>

          <textarea
            className="border px-4 py-3 rounded-xl w-full focus:ring-2 focus:ring-green-500"
            placeholder="Details / notes (optional)"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        {/* Events list */}
        {events.length === 0 ? (
          <p className="text-gray-500 text-center">
            No events yet.
          </p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <CalendarEvent
                key={event.id}
                event={event}
                onDelete={deleteEvent}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Calendar;
