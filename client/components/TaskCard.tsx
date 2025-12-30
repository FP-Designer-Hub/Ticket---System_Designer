import { Task } from "@/utils/mockData";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  onStatusChange?: (taskId: string, newStatus: Task["status"]) => void;
}

export function TaskCard({ task, onStatusChange }: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityConfig = {
    low: { label: "Low", bgColor: "bg-green-100", textColor: "text-green-800" },
    medium: {
      label: "Medium",
      bgColor: "bg-amber-100",
      textColor: "text-amber-800",
    },
    high: { label: "High", bgColor: "bg-red-100", textColor: "text-red-800" },
  };

  const statusConfig = {
    open: { label: "Open", bgColor: "bg-blue-100", textColor: "text-blue-800" },
    "in-progress": {
      label: "In Progress",
      bgColor: "bg-purple-100",
      textColor: "text-purple-800",
    },
    completed: {
      label: "Completed",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
    },
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysUntilDue = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgency = (dateString: string) => {
    const daysLeft = getDaysUntilDue(dateString);
    if (daysLeft <= 3) return { label: "Urgent", color: "text-red-600" };
    if (daysLeft <= 7) return { label: "Soon", color: "text-amber-600" };
    return { label: "On track", color: "text-green-600" };
  };

  const priorityConfig_ = priorityConfig[task.priority];
  const statusConfig_ = statusConfig[task.status];
  const urgency = getUrgency(task.dueDate);

  const handleStatusChange = (newStatus: Task["status"]) => {
    onStatusChange?.(task.id, newStatus);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm">{task.title}</h4>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
        >
          <svg
            className={`w-5 h-5 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${priorityConfig_.bgColor} ${priorityConfig_.textColor}`}
        >
          {priorityConfig_.label}
        </span>
        <span
          className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig_.bgColor} ${statusConfig_.textColor}`}
        >
          {statusConfig_.label}
        </span>
        <span
          className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${urgency.color} bg-gray-100`}
        >
          {urgency.label}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
        <span>Due: {formatDate(task.dueDate)}</span>
        <span className="font-medium">
          {getDaysUntilDue(task.dueDate)} days left
        </span>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-100 pt-4 space-y-4">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">
              Task Status
            </p>
            <div className="flex gap-2 flex-wrap">
              {(["open", "in-progress", "completed"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    task.status === status
                      ? statusConfig[status].bgColor +
                        " " +
                        statusConfig[status].textColor
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {statusConfig[status].label}
                </button>
              ))}
            </div>
          </div>

          {task.status === "in-progress" && (
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2">Progress</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full w-[45%]" />
                </div>
                <span className="text-xs font-medium text-gray-600">45%</span>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-900 transition-colors">
              View Details
            </button>
            <button className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-xs font-medium text-blue-700 transition-colors">
              Add Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
