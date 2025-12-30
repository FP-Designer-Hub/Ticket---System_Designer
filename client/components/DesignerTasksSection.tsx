import { Designer, Task, getTasks } from "@/utils/mockData";
import { AvailabilityPill } from "./AvailabilityPill";
import { TaskCard } from "./TaskCard";
import { useState } from "react";

interface DesignerTasksSectionProps {
  designer: Designer;
  onTaskStatusChange?: (taskId: string, newStatus: Task["status"]) => void;
}

export function DesignerTasksSection({
  designer,
  onTaskStatusChange,
}: DesignerTasksSectionProps) {
  const allTasks = getTasks();
  const designerTasks = allTasks.filter(
    (task) =>
      task.assignedDesigner?.id === designer.id ||
      (task.status === "open" && task.suggestedDesigner.id === designer.id),
  );

  const completedCount = designerTasks.filter(
    (t) => t.status === "completed",
  ).length;
  const inProgressCount = designerTasks.filter(
    (t) => t.status === "in-progress",
  ).length;
  const openCount = designerTasks.filter((t) => t.status === "open").length;

  const completionPercentage =
    designerTasks.length > 0
      ? Math.round((completedCount / designerTasks.length) * 100)
      : 0;

  const progressPercentage = (
    ((designer.weeklyCapacity - designer.hoursAvailable) /
      designer.weeklyCapacity) *
    100
  ).toFixed(0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* Designer Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src={designer.avatar}
              alt={designer.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {designer.name}
              </h2>
              <p className="text-gray-600">{designer.role}</p>
            </div>
          </div>
          <AvailabilityPill status={designer.status} />
        </div>

        {/* Designer Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Active Tasks</p>
            <p className="text-2xl font-bold text-gray-900">
              {designerTasks.length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">In Progress</p>
            <p className="text-2xl font-bold text-purple-600">
              {inProgressCount}
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {completedCount}
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Completion Rate</p>
            <p className="text-2xl font-bold text-blue-600">
              {completionPercentage}%
            </p>
          </div>
        </div>
      </div>

      {/* Availability & Workload */}
      <div className="px-8 py-6 border-b border-gray-100 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold text-gray-900">
                Weekly Hours Available
              </p>
              <p className="text-sm font-medium text-gray-600">
                {designer.hoursAvailable} / {designer.weeklyCapacity} hrs
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  designer.status === "booked"
                    ? "bg-red-600"
                    : designer.status === "limited"
                      ? "bg-amber-500"
                      : "bg-green-600"
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold text-gray-900">
                Task Completion
              </p>
              <p className="text-sm font-medium text-gray-600">
                {completedCount} of {designerTasks.length}
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: `${designerTasks.length > 0 ? completionPercentage : 0}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="px-8 py-6">
        {designerTasks.length === 0 ? (
          <div className="text-center py-12">
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
            <p className="text-gray-500 font-medium">No tasks assigned</p>
            <p className="text-gray-400 text-sm mt-1">
              This designer is ready for new assignments
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-gray-400 rounded-full"></span>
              Assigned Tasks
            </h3>
            <div className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              {designerTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={onTaskStatusChange}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
