import { Task } from "@/utils/mockData";
import { useEffect, useState } from "react";

interface LiveTaskCardProps {
  task: Task;
}

export function LiveTaskCard({ task }: LiveTaskCardProps) {
  const [progress, setProgress] = useState(45);
  const [isLive, setIsLive] = useState(true);

  // Simulate real-time progress updates
  useEffect(() => {
    if (task.status !== "in-progress") {
      setIsLive(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + Math.random() * 3, 100);
        return Math.round(newProgress);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [task.status]);

  const priorityConfig = {
    low: { label: "Low", bgColor: "bg-green-100", textColor: "text-green-800" },
    medium: {
      label: "Medium",
      bgColor: "bg-amber-100",
      textColor: "text-amber-800",
    },
    high: { label: "High", bgColor: "bg-red-100", textColor: "text-red-800" },
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getDaysUntilDue = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const priorityConfig_ = priorityConfig[task.priority];
  const daysLeft = getDaysUntilDue(task.dueDate);
  const isUrgent = daysLeft <= 3;

  return (
    <div
      className={`bg-white border-2 rounded-lg p-6 ${
        isLive && task.status === "in-progress"
          ? "border-blue-400 shadow-lg shadow-blue-100"
          : "border-gray-200"
      } transition-all duration-300`}
    >
      {/* Live Indicator */}
      {isLive && task.status === "in-progress" && (
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-red-600">LIVE</span>
          </div>
          <span className="text-xs text-gray-500">Last updated just now</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
            {isUrgent && (
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                URGENT
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${priorityConfig_.bgColor} ${priorityConfig_.textColor}`}
            >
              {priorityConfig_.label}
            </span>
            <span className="text-gray-600">
              Due {formatDate(task.dueDate)}
            </span>
          </div>
        </div>
        <div className="text-right">
          <img
            src={task.assignedDesigner?.avatar || task.suggestedDesigner.avatar}
            alt={
              task.assignedDesigner
                ? task.assignedDesigner.name
                : task.suggestedDesigner.name
            }
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
          />
          <p className="text-xs text-gray-600 mt-2 font-medium">
            {task.assignedDesigner
              ? task.assignedDesigner.name.split(" ")[0]
              : task.suggestedDesigner.name.split(" ")[0]}
          </p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-900">Progress</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-blue-600">{progress}%</p>
              {task.status === "in-progress" && (
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              )}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Time Estimates */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <p className="text-xs text-gray-600 mb-1">Days Remaining</p>
            <p
              className={`text-xl font-bold ${
                isUrgent ? "text-red-600" : "text-gray-900"
              }`}
            >
              {daysLeft}d
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
            <p className="text-xs text-gray-600 mb-1">Est. Complete</p>
            <p className="text-xl font-bold text-purple-600">
              {Math.ceil((100 - progress) / 5)}d
            </p>
          </div>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs font-semibold text-gray-900 mb-3">
          Recent Activity
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-0.5"></div>
            <span className="text-gray-600">Task started 2 hours ago</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-0.5"></div>
            <span className="text-gray-600">
              Progress updated {Math.floor(Math.random() * 30)}min ago
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0 mt-0.5"></div>
            <span className="text-gray-600">
              Assigned to{" "}
              {task.assignedDesigner?.name || task.suggestedDesigner.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
