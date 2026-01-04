import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";

// helper to format yyyy-mm-dd → dd-mm-yyyy
function formatDate(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${d}-${m}-${y}`;
}

function CalendarEvent({ event, onDelete }) {
  return (
    <div className="flex justify-between items-start bg-green-100 border border-green-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div>
        <h3 className="font-semibold text-lg text-green-800">
          {event.title}
        </h3>

        <div className="flex flex-wrap items-center gap-4 text-sm text-green-700 mt-1">
          {/* Date */}
          <div className="flex items-center gap-1">
            <CalendarDaysIcon className="w-4 h-4" />
            <span>{formatDate(event.date)}</span>
          </div>

          {/* Time */}
          {event.time && (
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              <span>{event.time}</span>
            </div>
          )}
        </div>

        {event.details && (
          <p className="mt-2 text-sm text-gray-700">
            {event.details}
          </p>
        )}
      </div>

      <button
        onClick={() => onDelete(event.id)}
        className="text-red-500 hover:text-red-700 font-bold text-lg"
      >
        ✕
      </button>
    </div>
  );
}

export default CalendarEvent;
