import { Designer } from "@/utils/mockData";
import { AvailabilityPill } from "./AvailabilityPill";

interface DesignerCardProps {
  designer: Designer;
}

export function DesignerCard({ designer }: DesignerCardProps) {
  const progressPercentage = (
    ((designer.weeklyCapacity - designer.hoursAvailable) /
      designer.weeklyCapacity) *
    100
  ).toFixed(0);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <img
          src={designer.avatar}
          alt={designer.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{designer.name}</h3>
          <p className="text-sm text-gray-600">{designer.role}</p>
        </div>
      </div>

      <div>
        <p className="text-2xl font-bold text-gray-900">
          {designer.hoursAvailable}
        </p>
        <p className="text-sm text-gray-600">hours available</p>
      </div>

      <AvailabilityPill status={designer.status} />

      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs font-medium text-gray-600">
            {designer.weeklyCapacity - designer.hoursAvailable}/
            {designer.weeklyCapacity} hrs
          </p>
          <p className="text-xs font-medium text-gray-600">
            {progressPercentage}%
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
