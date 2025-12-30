import { Task, getTasks } from "@/utils/mockData";

export function ActiveTasksList() {
  const allTasks = getTasks();
  const activeTasks = allTasks.filter((task) => task.status !== "completed");

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
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-900">
          Active Tasks ({activeTasks.length})
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          All tasks currently assigned or awaiting assignment
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        {activeTasks.length === 0 ? (
          <div className="px-8 py-12 text-center">
            <svg
              className="w-12 h-12 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-500">No active tasks</p>
          </div>
        ) : (
          activeTasks.map((task) => {
            const priorityConfig_ = priorityConfig[task.priority];
            const statusConfig_ = statusConfig[task.status];
            const urgency = getUrgency(task.dueDate);

            return (
              <div
                key={task.id}
                className="px-8 py-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">
                      {task.title}
                    </h3>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${priorityConfig_.bgColor} ${priorityConfig_.textColor}`}
                    >
                      {priorityConfig_.label}
                    </span>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusConfig_.bgColor} ${statusConfig_.textColor}`}
                    >
                      {statusConfig_.label}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Due</p>
                      <p className="text-sm font-medium text-gray-900">
                        {formatDate(task.dueDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Status</p>
                      <p className={`text-sm font-medium ${urgency.color}`}>
                        {urgency.label}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Assigned to</p>
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            task.assignedDesigner
                              ? task.assignedDesigner.avatar
                              : task.suggestedDesigner.avatar
                          }
                          alt={
                            task.assignedDesigner
                              ? task.assignedDesigner.name
                              : task.suggestedDesigner.name
                          }
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <p className="text-sm font-medium text-gray-900">
                          {task.assignedDesigner
                            ? task.assignedDesigner.name
                            : task.suggestedDesigner.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {task.status === "in-progress" && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs font-medium text-gray-600">
                        Progress
                      </p>
                      <p className="text-xs font-medium text-gray-600">45%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full w-[45%]" />
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
