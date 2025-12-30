import { getDesigners } from "@/utils/mockData";
import { AvailabilityPill } from "./AvailabilityPill";

export function DesignerAvailabilityWidget() {
  const designers = getDesigners();
  const availableDesigners = designers.filter(
    (d) => d.status === "available",
  ).length;
  const limitedDesigners = designers.filter(
    (d) => d.status === "limited",
  ).length;
  const bookedDesigners = designers.filter((d) => d.status === "booked").length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-900">
          Designer Availability
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Current team capacity and availability status
        </p>
      </div>

      <div className="px-8 py-6 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <p className="text-sm text-green-600 font-medium mb-1">Available</p>
            <p className="text-3xl font-bold text-green-700">
              {availableDesigners}
            </p>
            <p className="text-xs text-green-600 mt-2">Ready for new tasks</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
            <p className="text-sm text-amber-600 font-medium mb-1">Limited</p>
            <p className="text-3xl font-bold text-amber-700">
              {limitedDesigners}
            </p>
            <p className="text-xs text-amber-600 mt-2">Low capacity</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <p className="text-sm text-red-600 font-medium mb-1">
              Fully Booked
            </p>
            <p className="text-3xl font-bold text-red-700">{bookedDesigners}</p>
            <p className="text-xs text-red-600 mt-2">At capacity</p>
          </div>
        </div>

        {/* Designer List */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-gray-300 rounded-full"></span>
            Individual Status
          </h3>
          <div className="space-y-2">
            {designers.map((designer) => (
              <div
                key={designer.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={designer.avatar}
                    alt={designer.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {designer.name}
                    </p>
                    <p className="text-xs text-gray-500">{designer.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {designer.hoursAvailable}h
                    </p>
                    <p className="text-xs text-gray-500">
                      of {designer.weeklyCapacity}h
                    </p>
                  </div>
                  <AvailabilityPill status={designer.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm font-medium text-blue-900 mb-2 flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Tip for best results
          </p>
          <p className="text-xs text-blue-800">
            Assign high-priority tasks to available designers first. Consider
            team workload balance for better project outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}
