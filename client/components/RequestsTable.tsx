import { useState } from "react";
import { Task, assignTask } from "@/utils/mockData";
import { Button } from "@/components/ui/button";

interface RequestsTableProps {
  tasks: Task[];
  onTaskAssigned?: (taskId: string) => void;
}

export function RequestsTable({ tasks, onTaskAssigned }: RequestsTableProps) {
  const [assignedTasks, setAssignedTasks] = useState<Set<string>>(new Set());

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
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  const handleAssignTask = (taskId: string, designerId: string) => {
    const success = assignTask(taskId, designerId);
    if (success) {
      setAssignedTasks((prev) => new Set([...prev, taskId]));
      onTaskAssigned?.(taskId);
    }
  };

  const isDesignerFullyBooked = (task: Task) => {
    return task.suggestedDesigner.status === "booked";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Priority
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Due Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Best Available Designer
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Quick Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const priorityConfig_ = priorityConfig[task.priority];
              const statusConfig_ = statusConfig[task.status];
              const isBooked = isDesignerFullyBooked(task);
              const isAssigned =
                assignedTasks.has(task.id) || task.assignedDesigner;

              return (
                <tr
                  key={task.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {task.title}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${priorityConfig_.bgColor} ${priorityConfig_.textColor}`}
                    >
                      {priorityConfig_.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusConfig_.bgColor} ${statusConfig_.textColor}`}
                    >
                      {statusConfig_.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(task.dueDate)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={task.suggestedDesigner.avatar}
                        alt={task.suggestedDesigner.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-900">
                        {task.suggestedDesigner.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {isAssigned ? (
                      <span className="text-sm font-medium text-green-600">
                        ✓ Assigned
                      </span>
                    ) : isBooked ? (
                      <button
                        disabled
                        className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed text-sm"
                      >
                        Assign Task
                      </button>
                    ) : (
                      <Button
                        onClick={() =>
                          handleAssignTask(task.id, task.suggestedDesigner.id)
                        }
                        size="sm"
                        className="hover:bg-blue-700"
                      >
                        Assign Task
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
