import { getTasks } from "@/utils/mockData";

interface ActivityItem {
  id: string;
  taskId: string;
  taskTitle: string;
  designer: string;
  action: string;
  icon: "update" | "start" | "complete" | "assign";
  timestamp: string;
  details?: string;
}

export function TaskActivityFeed() {
  const tasks = getTasks();

  // Generate mock activity feed
  const activities: ActivityItem[] = [
    {
      id: "1",
      taskId: "2",
      taskTitle: "Homepage Refresh",
      designer: "Adam Wilkins",
      action: "Progress updated to 45%",
      icon: "update",
      timestamp: "2 minutes ago",
      details: "Completed wireframes",
    },
    {
      id: "2",
      taskId: "3",
      taskTitle: "Create Onboarding Flow",
      designer: "Adam Wilkins",
      action: "Task assigned",
      icon: "assign",
      timestamp: "1 hour ago",
      details: "High priority task",
    },
    {
      id: "3",
      taskId: "1",
      taskTitle: "Rebranding Project",
      designer: "Mia Carter",
      action: "Task started",
      icon: "start",
      timestamp: "3 hours ago",
      details: "Design phase initiated",
    },
    {
      id: "4",
      taskId: "4",
      taskTitle: "Dashboard Redesign",
      designer: "Sophie Chen",
      action: "Comment added",
      icon: "update",
      timestamp: "4 hours ago",
      details: "Design direction approved",
    },
    {
      id: "5",
      taskId: "5",
      taskTitle: "New Icon Set Design",
      designer: "Sophie Chen",
      action: "Task queued",
      icon: "assign",
      timestamp: "5 hours ago",
      details: "Waiting for designer availability",
    },
  ];

  const getIconColor = (icon: ActivityItem["icon"]) => {
    const colors = {
      update: "bg-blue-100 text-blue-600",
      start: "bg-green-100 text-green-600",
      complete: "bg-purple-100 text-purple-600",
      assign: "bg-amber-100 text-amber-600",
    };
    return colors[icon];
  };

  const getIcon = (icon: ActivityItem["icon"]) => {
    const icons = {
      update: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
      start: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      complete: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      assign: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    };
    return icons[icon];
  };

  const findTaskTitle = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    return task?.title || "Unknown Task";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-900">Live Activity Feed</h2>
        <p className="text-sm text-gray-600 mt-1">
          Real-time updates across all tasks
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex gap-4">
              {/* Timeline Dot */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconColor(activity.icon)}`}
                >
                  {getIcon(activity.icon)}
                </div>
                {index < activities.length - 1 && (
                  <div className="w-0.5 h-12 bg-gradient-to-b from-gray-200 to-transparent mt-2"></div>
                )}
              </div>

              {/* Activity Content */}
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-gray-900 text-sm">
                    {activity.action}
                  </p>
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                    {activity.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {findTaskTitle(activity.taskId)}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                    {activity.designer}
                  </span>
                  {activity.details && (
                    <span className="text-xs text-gray-500 italic">
                      {activity.details}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer with refresh indicator */}
      <div className="px-8 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <p className="text-xs text-gray-600">
          Auto-updating • Refreshed {Math.floor(Math.random() * 60)}s ago
        </p>
      </div>
    </div>
  );
}
